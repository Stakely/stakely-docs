---
sidebar_position: 4
---

# Authentication

Welcome to the Authentication section of the Stakely Staking API documentation. This page outlines the necessary steps and protocols for securely interacting with our API, ensuring that your data remains safe and your transactions are securely processed.


## Auth Endpoints

Authentication endpoints are crucial components of any API that require user verification. These endpoints are designed to handle requests related to user authentication and security, ensuring that only authorized users can access specific functionalities of the system. Common tasks managed by authentication endpoints include logging in users, handling session tokens, and managing user authentication states.

---

- **Register** [`/api/v1/auth/email/register`](/staking-api/api-reference#tag/auth/post/api/v1/auth/email/register) Although you can register using your desired email and password, your account will need to be manually activated by us. Please contact us.
- **Login** [`/api/v1/auth/email/login`](/staking-api/api-reference#tag/auth/post/api/v1/auth/email/login) for access to the Staking API, once logged in you can retrieve JWT token.
- **Manage API Keys** [`/apikeys`](/staking-api/api-reference#tag/apikeys): This includes creating new API keys, listing all your existing keys, and deleting any keys that are no longer needed.

## Beta Stage Registration

As Stakely's Staking API is currently in the beta stage, registering to use our service requires manual whitelisting. If you wish to try our product, please reach out to us.


## Using the API Keys

To interact with the crafting and reporting aspects of our API, you must use the API keys obtained through the admin endpoints. The key must be included as an authorization header in your requests.


:::info
Authentication for these endpoints is based on JSON Web Tokens (JWT). Login endpoint returns a valid JWT.
:::


Once logged in with the user JWT JWT, you can create new API keys. The API key value is only returned upon creation. Be sure to copy and save the API key in a secure location. Afterwards, you can still manage, list, edit, and delete existing API keys.

Header user for API key authentication is `X-API-KEY`.

For examples and pre-created code snippets in various programming languages, which will help you integrate our services smoothly, please refer to our API schema available [here](https://stakely.io).


## Security and Verification

Ensuring the security of all transactions and data exchanges remains our top priority. To accomplish this, we have implemented a method where the signature of each HTTP response can be found in the header under the name "stakely-verification-signature". This signature is the SHA256 hash of the HTTP response body, signed using the Elliptic Curve Digital Signature Algorithm (ECDSA) with the SECP256k1 curve. To verify the integrity and authenticity of the data received, you must use the corresponding public key, which is readily accessible on the expandable bellow.
<details>
  <summary>**PUBLIC KEY**</summary>
  <div>
    <div>Copy this value fro signature verification:</div>
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