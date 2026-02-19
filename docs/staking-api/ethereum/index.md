---
title: Ethereum
---

# Ethereum

This section covers Ethereum staking integrations using the Stakely Staking API. It includes Ethereum-specific notes, transaction signing examples, and the staking flows supported by Stakely.

## Useful links

- Stakely, Ethereum (ETH) staking overview: https://stakely.io/staking/ethereum-eth-staking  
- Ethereum staking basics: https://ethereum.org/staking/#what-is-staking

## What you will find in this section

- **Signing transactions**: how to sign Ethereum transactions returned by the crafting endpoints, with examples for common signing setups.  
- **StakeWise staking**: end-to-end flows and endpoints for delegating, claiming rewards, and undelegating on the liquid staking protocol StakeWise.  

## Notes

- Ethereum integrations require specifying the correct `X-NETWORK` for the target network. The API provides a dedicated endpoint to list all available Ethereum networks and their corresponding `X-NETWORK` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
