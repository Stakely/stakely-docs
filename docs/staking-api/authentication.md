---
sidebar_position: 3
---

# Authentication

Welcome to the Authentication section of the Stakely Staking API documentation. This page outlines the necessary steps and protocols for securely interacting with our API, ensuring that your data remains safe and your transactions are securely processed.


## Admin Endpoints

The admin endpoints play a crucial role in the management and operation of your API keys. These endpoints allow you to:

- **Register** for access to the Staking API.
- **Login** to manage your account and access API functionalities.
- **Manage API Keys**: This includes creating new API keys, listing all your existing keys, and deleting any keys that are no longer needed.


## Beta Stage Registration

As Stakely's Staking API is currently in the beta stage, registering to use our service requires manual whitelisting. If you wish to try our product, please reach out to us. 


## Using the API Keys

To interact with the crafting and reporting aspects of our API, you must use the API keys obtained through the admin endpoints. The key must be included as an authorization header in your requests.

Once logged in with JWT, you can create new API keys. The API key value is only returned upon creation. Be sure to copy and save the API key in a secure location. Afterwards, you can still manage, list, edit, and delete existing API keys.

Header user for API key authentication is `X-API-KEY`.

For examples and pre-created code snippets in various programming languages, which will help you integrate our services smoothly, please refer to our API schema available [here](https://stakely.io).


## Security and Verification

Ensuring the security of all transactions and data exchanges remains our top priority. To accomplish this, we have implemented a method where the signature of each HTTP response can be found in the header under the name "stakely-verification-signature". This signature is the SHA256 hash of the HTTP response body, signed using the Elliptic Curve Digital Signature Algorithm (ECDSA) with the SECP256k1 curve. To verify the integrity and authenticity of the data received, you must use the corresponding public key, which is readily accessible [here](https://stakely.io).

This approach ensures that the data remains unaltered during transmission, thereby preserving the security and integrity of your interactions. While verification of the signature on the client side is optional, we encourage its implementation as an additional measure to further ensure the authenticity and integrity of the data received.

Here is an example code on how you can verify returned signature:

- Node.js Example:
  - Replace `publicKey` with the provided staking api public key.
  - Replace `data` with the returned json payload at the request.
  - Replace `signature` with the returned signature string value located at `X-signature` header


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