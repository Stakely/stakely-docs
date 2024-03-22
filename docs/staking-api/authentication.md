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

For examples and pre-created code snippets in various programming languages, which will help you integrate our services smoothly, please refer to our API schema available [here](https://stakely.io).


## Security and Verification

Ensuring the security of all transactions and data exchanges remains our top priority. To accomplish this, each response from our API is accompanied by a verification field. This key addition is our method of guaranteeing that the data remains unaltered during transmission, thus preserving the integrity and security of your interactions.

We achieve this additional layer of security by utilizing the Elliptic Curve Digital Signature Algorithm (ECDSA) to sign the payloads on the backend with a private key. For those interested in verifying this security measure, the corresponding public key is readily accessible [here](https://stakely.io).

While verification on the client side is optional, we encourage implementing this step to further ensure the authenticity and integrity of the data received.

