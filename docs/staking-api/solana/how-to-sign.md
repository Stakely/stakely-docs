---
sidebar_position: 33
---
# How to sign

Once you have completed the first action of the flow (as explained in the diagram), you will need to sign the unsigned transaction.

There are several ways to achieve this. We will explain a couple of them:

## Signing with private key

### Signing with @solana/web3 JS using a Private Key:

This method involves the use of the Solana web3 JavaScript library, which allows developers to interact with the Solana blockchain directly from a JavaScript application. To sign a transaction, a developer typically imports the SDK, creates a transaction object, and then uses a private key to sign this object. This signing process is crucial as it verifies the identity of the transaction initiator and ensures the transaction cannot be altered without the initiator's consent.

Complete with your own wallet private key or seed at `.env`

```
SOL_WALLET_PRIVATE_KEY=
```

```javascript
const web3 = require('@solana/web3.js')
const bs58 = require('bs58')

const accountFrom = {
  privateKey: process.env.COSMOS_WALLET_PRIVATE_KEY,
};

const getRawTransaction = async(
  encodedTransaction
) =>{
  let recoveredTransaction;
  try {
    recoveredTransaction = web3.Transaction.from(
      Buffer.from(encodedTransaction, 'hex')
    );
  } catch (error) {
    recoveredTransaction = web3.VersionedTransaction.deserialize(
      Buffer.from(encodedTransaction, 'hex')
    );
  }
  return recoveredTransaction;
}

const signUnsignedTxWithPk = async ({unsigned_tx_hex}) => {
  const recoveredTransaction = await getRawTransaction(unsigned_tx_hex);

  let signatures;
  let transactionBuffer = recoveredTransaction.serializeMessage();

  const decodedPk = bs58.decode(accountFrom.privateKey);
  const keypair = web3.Keypair.fromSecretKey(decodedPk);

  if (recoveredTransaction instanceof web3.VersionedTransaction) {
    recoveredTransaction.sign([keypair]);
  } else {
    recoveredTransaction.partialSign(keypair);
  }
  // recoveredTransaction.partialSign(nonceAccount);
  signatures = [Buffer.from(recoveredTransaction.signature).toString("hex")];

  return signatures;
}
// Get unsigned_tx_hex from stake action response (reference at doc models SolanaStakeActionResponseDTO)

const signature_hex = await signUnsignedTxWithPk({unsigned_tx_hex })
// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

1. Get the `unsigned_tx_hex` from any of the Stake actions `action/create-nonce-account`, `action/stake`, `action/unstake`, `action/withdraw`
2. Pass it to the signer code explaind below
3. Once you have the signature proceed calling `action/prepare`


## Signing by using external custodian integration

### Fireblocks

Using external custodian services such as [Fireblocks](https://www.fireblocks.com/) provides an additional layer of security for transaction signing.

Fireblocks, as a custodian, manages the private keys on behalf of the user, ensuring they are stored securely and are not exposed during the transaction process.

To sign a transaction, the transaction details are sent to Fireblocks via its API.

Fireblocks then signs the transaction securely within its infrastructure and returns the signed transaction, ready for submission to the blockchain network.

On the code example we will be providing a Javascript example with the usage of [Fireblocks SDK JS/TS](https://github.com/fireblocks/fireblocks-sdk-js)


Complete with your own Fireblocks credentials at `.env`

```
FIREBLOCKS_API_SECRET=
FIREBLOCKS_API_KEY=
FIREBLOCKS_BASE_URL=
FIREBLOCKS_VAULT_ID=
```

```javascript
const web3 = require('@solana/web3.js')

const { FireblocksSDK, TransactionOperation, PeerType, TransactionStatus } =  require("fireblocks-sdk")

const apiSecret = process.env.FIREBLOCKS_API_SECRET;
const apiKey = process.env.FIREBLOCKS_API_KEY;
const baseUrl = process.env.FIREBLOCKS_BASE_URL;
const vaultId = process.env.FIREBLOCKS_VAULT_ID;

const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

const getRawTransaction = async(
  encodedTransaction
) =>{
  let recoveredTransaction;
  try {
    recoveredTransaction = web3.Transaction.from(
      Buffer.from(encodedTransaction, 'hex')
    );
  } catch (error) {
    recoveredTransaction = web3.VersionedTransaction.deserialize(
      Buffer.from(encodedTransaction, 'hex')
    );
  }
  return recoveredTransaction;
}

const waitForTxCompletion = async (fbTx) => {
  try {
    let tx = fbTx;
    while (tx.status != TransactionStatus.COMPLETED) {
      if (
        tx.status == TransactionStatus.BLOCKED ||
        tx.status == TransactionStatus.FAILED ||
        tx.status == TransactionStatus.CANCELLED
      ) {
        throw Error(`Fireblocks signer: the transaction has been ${tx.status}`);
      } else if (tx.status == TransactionStatus.REJECTED) {
        throw Error(
          `Fireblocks signer: the transaction has been rejected, make sure that the TAP security policy is not blocking the transaction`,
        );
      }
      tx = await fireblocks.getTransactionById(fbTx.id);
    }

    return await fireblocks.getTransactionById(fbTx.id);
  } catch (err) {
    throw new Error("Fireblocks signer (waitForTxCompletion): " + err);
  }
}

const signWithFb = async (transactionBuffer) => {
  const assetId = "SOL";
  // const assetId = "SOL_TEST"; // For Fireblocks testnet

  const tx = {
    assetId: assetId,
    operation: TransactionOperation.RAW,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: vaultId
    },
    note: "Sign transaction from stakely staking api",
    "extraParameters": {
      "rawMessageData": {
        "messages": [
          {
            "content": transactionBuffer.toString("hex")
          }
        ]
      }
    }
  };
  const fbTx = await fireblocks.createTransaction(tx);
  const result = await waitForTxCompletion(fbTx);
  let signatures = [];
  result.signedMessages?.forEach((signedMessage) => {
    if (signedMessage.derivationPath[3] == 0) {
      signatures.push(signedMessage.signature.fullSig);
    }
  });
  return signatures;
}

// Get unsigned_tx_hash_hex from stake action response (reference at doc models StakeActionResponseDTO)
const transactionBuffer = await getRawTransaction(unsigned_tx_hash_hex);
const signature_hex = await signWithFb(transactionBuffer);

// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

**Steps:**

1. Get the `unsigned_tx_hash_hex` from any of the Stake actions `action/stake`, `action/unstake`, `action/claim-rewards`
2. Pass it to the signer code explaind below
3. Once you have the signature proceed calling `action/prepare`