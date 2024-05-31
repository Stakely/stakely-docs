---
sidebar_position: 5
---
# How to sign

Once you have completed the first action of the flow (as explained in the diagram), you will need to sign the unsigned transaction.

There are several ways to achieve this. We will explain a couple of them:

## Signing with private key

### Signing with Web3 JS using a Private Key:

This method involves the use of the Web3 JavaScript library, which allows developers to interact with the Ethreum virtual machine directly from a JavaScript application. To sign a transaction, a developer typically imports the SDK, creates a transaction object, and then uses a private key to sign this object. This signing process is crucial as it verifies the identity of the transaction initiator and ensures the transaction cannot be altered without the initiator's consent.

Complete with your own wallet private key or seed at `.env`

```
ETHEREUM_WALLET_PRIVATE_KEY=
ETHEREUM_RPC=
ETHEREUM_WALLET_ADDRESS=
EVM_CHAIN_ID=
```

```javascript
const { Common, Chain, Hardfork } = require('@ethereumjs/common')
const { Web3 } = require('web3');
const Transaction  = require('@ethereumjs/tx');
const { RLP } = require('@ethereumjs/rlp');

const ethUtil = require('ethereumjs-util');
const { ethers } = require("ethers");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './../.env') })

const accountFrom = {
  address: process.env.ETHEREUM_WALLET_ADDRESS,
  privateKey: process.env.ETHEREUM_WALLET_PRIVATE_KEY,
  rpcEndpoint: process.env.ETHEREUM_RPC,
  chainId: process.env.EVM_CHAIN_ID
};

const web3 = new Web3(ETHEREUM_RPC);
const common = new Common({ chain: accountFrom.chainId })

const signUnsignedTxWithPk = async ({serialized_tx_hex, raw_tx_hex_hash}) => {
  const serializedTxBytes = await web3.utils.hexToBytes(serialized_tx_hex);
  const rawTxHexHashWithoutPrefix = raw_tx_hex_hash.substring(2);

  const txObject  = Transaction.TransactionFactory.fromSerializedData(serializedTxBytes, { common });

  const txJson = txObject.toJSON();

  let num = BigInt(txJson.nonce);

  const nonceNormalized = num === 0n ? num : txJson.nonce;
  const params = [nonceNormalized, txJson.gasPrice, txJson.gasLimit, txJson.to, txJson.value, txJson.data];

  const rawTransaction = RLP.encode(params);

  const privateKeyBuffer = Buffer.from(accountFrom.privateKey, 'hex');

  const txHashBytes = Buffer.from(rawTxHexHashWithoutPrefix, 'hex');

  const signResult = ethUtil.ecsign(txHashBytes, privateKeyBuffer, Number(accountFrom.chainId));

  const rBuff = signResult.r;
  const sBuff = signResult.s;
  const r = rBuff.toString('hex');
  const s = sBuff.toString('hex');
  const v = signResult.v;

  return { r, s, v};
}
// Get serialized_tx_hex and raw_tx_hex_hash from stake action response (reference at doc models StakeActionResponseDTO)

const signature = await signUnsignedTxWithPk({serialized_tx_hex, raw_tx_hex_hash})
// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

1. Get the `serialized_tx_hex` and `raw_tx_hex_hash`  from any of the Stake actions
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
  const assetId = "ETH";
  const rawTxHexHashWithoutPrefix = rawTxHexHash.substring(2);

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
            "content": rawTxHexHashWithoutPrefix
          }
        ]
      }
    }
  };
  const fbTx = await fireblocks.createTransaction(tx);
  const result = await waitForTxCompletion(fbTx);
  const signature = result.signedMessages[0].signature;

  const v = 27 + signature.v;
  const r = '0x'+signature.r;
  const s = '0x'+signature.s;

  return { r, s, v};
}

// Get raw_tx_hex_hash from stake action response (reference at doc models StakeActionResponseDTO)


const signature_hex = await signWithFb(raw_tx_hex_hash);

// With the Signature you need to pass it to the /prepare endpoint
// Check api reference

```

**Steps:**

1. Get the `unsigned_tx_hash_hex` from any of the Stake actions
2. Pass it to the signer code explaind below
3. Once you have the signature proceed calling `action/prepare`