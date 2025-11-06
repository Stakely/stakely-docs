---
sidebar_position: 4
---

import AppUrl from '@site/src/components/AppUrl';

# Authentication

This page outlines the necessary steps and protocols for securely interacting with our API, ensuring that your data remains safe and your transactions are securely processed.

## Auth

To use the Staking API, you must be registered with an account on <AppUrl />. If you don't have an account yet, you can <AppUrl path="/sign-up">register here</AppUrl>.

Once registered, <AppUrl path="/sign-in">login into your account</AppUrl>, you'll have access to all the products that Stakely offers, all using the same simplified account.

Manage your API keys in the Staking API dashboard at <AppUrl path="/staking-api" />. The dashboard provides a simple interface to create new keys, view existing keys, and delete keys you no longer need.

## Using the API Keys

To access the crafting and reporting endpoints, you must authenticate using API keys generated through the Staking API web app at <AppUrl />.

Include your API key in the `X-API-KEY` header with every request:
```http
X-API-KEY: your-api-key-here
```

For examples and pre-created code snippets in various programming languages, which will help you integrate our services smoothly, please refer to our API schema available [here](/staking-api/api-reference).

## Security and Verification

Ensuring the security of all transactions and data exchanges remains our top priority. To accomplish this, we have implemented a method where the signature of each HTTP response can be found in the header under the name `x-signature`. This signature is the SHA256 hash of the HTTP response body, signed using the Elliptic Curve Digital Signature Algorithm (ECDSA) with the SECP256k1 curve. To verify the integrity and authenticity of the data received, you must use the corresponding public key, which is readily accessible on the expandable bellow.
<details>
  <summary>**PUBLIC KEY**</summary>
  <div>
    <div>Copy this value for signature verification:</div>
    <br/>
    ```markup
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2TpKOJfmku7aEIrKaCMM
    xjA10UCixAryVsB+PIoLKTEsUiNfctwbeXcpQuPOit9H7by+ezgg/A4SCog/Dtc7
    fTp4Gnnq/adLNDllMeKoQCeIz/3N7TqItr+74NTAm6TkwR4lriIy/XiDpIak530f
    8ZXFnmQTz3Cffbio3A9DhgwC5OWjSgkYdU35Rti36OGM6pnPlipxm7KD/9ddjc+H
    vRY8o6kbp8Cy9QsXZqivHVvcFQ61gl8TMpgcziNgI+tDiof/SM6x6KGxuGT3s40J
    TZ0g98GKgynkRW22OPfK3vP1FZ0UmIRJ6tAWYTNntGjLM+vM1OOsGk+5BmEkxy/B
    HwIDAQAB
    -----END PUBLIC KEY-----
    ```
  </div>
</details>
This approach ensures that the data remains unaltered during transmission, thereby preserving the security and integrity of your interactions. While verification of the signature on the client side is optional, we encourage its implementation as an additional measure to further ensure the authenticity and integrity of the data received.

Here is an example code on how you can verify returned signature:

- Node.js Example:
  - Replace `publicKey` with the provided Staking API public key.
  - Replace `data` with the returned JSON payload at the request.
  - Replace `signature` with the returned signature string value located at `x-signature` header


```javascript
const crypto = require('crypto');

function verifySignature(publicKey, data, signature) {
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(data);
    return verifier.verify(publicKey, signature, 'base64');
}

// Example usage:
const publicKey = '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----';  // Your public key here
const receivedData = '{"data":"Example payload"}';  // JSON string as received from the server
const receivedSignature = 'received_signature_from_header';  // Signature received from the X-Signature header

const isValid = verifySignature(publicKey, receivedData, receivedSignature);
console.log('Is the signature valid?', isValid);

```