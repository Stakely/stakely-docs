---
sidebar_position: 3
---
# How to sign

Once you have completed the first action of the flow (as explained in the diagram), you will need to sign the unsigned transaction.

There are several ways to achieve this. We will explain a couple of them:

## Signing with private key

### Signing with Cosmos SDK JS using a Private Key:

This method involves the use of the Cosmos SDK JavaScript library, which allows developers to interact with the Cosmos blockchain directly from a JavaScript application. To sign a transaction, a developer typically imports the SDK, creates a transaction object, and then uses a private key to sign this object. This signing process is crucial as it verifies the identity of the transaction initiator and ensures the transaction cannot be altered without the initiator's consent.

Complete with your own wallet private key or seed at `.env`

```
COSMOS_WALLET_SEED=
COSMOS_WALLET_PRIVATE_KEY=
COSMOS_RPC=
COSMOS_WALLET_ADDRESS=

```

```javascript
const { fromHex,toHex, bech32 } = require("@cosmjs/encoding");
const { TxRaw, SignDoc } = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, makeSignDoc, Registry, decodeTxRaw } = require('@cosmjs/proto-signing')
const { decodeSignature,pubkeyToAddress, pubkeyToRawAddress } = require("@cosmjs/amino");

const accountFrom = {
  seed: process.env.COSMOS_WALLET_SEED,
  privateKey: process.env.COSMOS_WALLET_PRIVATE_KEY,
  rpcEndpoint: process.env.COSMOS_RPC,
  address: process.env.COSMOS_WALLET_ADDRESS};

const signUnsignedTxWithPk = async ({unsigned_tx_hex, tx_auth_info_hex}) => {
  const unsignedTxBytes = fromHex(unsigned_tx_hex);

  const authInfoBytes = fromHex(tx_auth_info_hex);

  // Deserialize the transaction bytes to a TxRaw object
  const unsignedTx = TxRaw.decode(unsignedTxBytes);
  const toJson = TxRaw
  let myWallet;
  const mmemonic = accountFrom.seed ? true : false;

  if (mmemonic) {
    myWallet = await DirectSecp256k1HdWallet.fromMnemonic(accountFrom.seed, { prefix })
  } else {
    myWallet = await DirectSecp256k1Wallet.fromKey(accountFrom.privateKey, prefix);
  }
  // Create a SigningStargateClient
  const client = await SigningStargateClient.connectWithSigner(accountFrom.rpcEndpoint, myWallet);
  // ###############
  const [firstAccount] = await myWallet.getAccounts();
  firstAccount


  const { accountNumber, sequence } = await client.getSequence(firstAccount.address);

  const chainId = await client.getChainId();

  const signDoc = makeSignDoc(unsignedTx.bodyBytes, authInfoBytes, chainId, accountNumber);

  const { signed, signature } = await myWallet.signDirect(firstAccount.address, signDoc);

  const decodedSignature = decodeSignature(signature)

  const signature_hex= toHex(decodedSignature.signature)

  return signature_hex;
}
// Get unsigned_tx_hex and tx_auth_info_hex from stake action response (reference at doc models StakeActionResponseDTO)

const signature_hex = await signUnsignedTxWithPk({unsigned_tx_hex, tx_auth_info_hex })
// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

1. Get the `unsigned_tx_hex` and `tx_auth_info_hex`  from any of the Stake actions `action/stake`, `action/unstake`, `action/claim-rewards`
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

const { FireblocksSDK, TransactionOperation, PeerType, TransactionStatus } =  require("fireblocks-sdk")

const apiSecret = process.env.FIREBLOCKS_API_SECRET;
const apiKey = process.env.FIREBLOCKS_API_KEY;
const baseUrl = process.env.FIREBLOCKS_BASE_URL;
const vaultId = process.env.FIREBLOCKS_VAULT_ID;

const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

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

const signWithFb = async (unsigned_tx_hash_hex) => {
  const assetId = "ATOM";

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
            "content": unsigned_tx_hash_hex
          }
        ]
      }
    }
  };
  const fbTx = await fireblocks.createTransaction(tx);
  const result = await waitForTxCompletion(fbTx);
  const signature = result.signedMessages[0].signature;
  return signature.fullSig;
}

// Get unsigned_tx_hash_hex from stake action response (reference at doc models StakeActionResponseDTO)

const signature_hex = await signWithFb(unsigned_tx_hash_hex);

// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

**Steps:**

1. Get the `unsigned_tx_hash_hex` from any of the Stake actions `action/stake`, `action/unstake`, `action/claim-rewards`
2. Pass it to the signer code explaind below
3. Once you have the signature proceed calling `action/prepare`