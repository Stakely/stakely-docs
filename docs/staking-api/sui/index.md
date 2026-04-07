---
title: Sui
---

# Sui

This section covers Sui staking integrations using the Stakely Staking API. It includes Sui-specific notes, transaction signing examples, and native staking flows supported by Stakely.

## Useful links

- Stakely, Sui (SUI) staking overview: https://stakely.io/staking/sui-staking
- Official documentation: https://docs.sui.io

## What you will find in this section

- **Signing transactions**: how to sign Sui transactions returned by the crafting endpoints, with examples for common signing setups.
- **Native staking**: end-to-end flows and endpoints for staking, unstaking, and querying staked balances on Sui.

## Notes

- Sui integrations require specifying the correct `X-NETWORK` for the target network. The API provides a dedicated endpoint to list all available Sui networks and their corresponding `X-NETWORK` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
- Sui staking responses may include values in both `SUI` and `MIST` units (`1 SUI = 1,000,000,000 MIST`).
