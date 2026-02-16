---
title: Solana
---

# Solana

This section covers Solana staking integrations using the Stakely Staking API. It includes Solana-specific notes, transaction signing examples, and the staking flows supported by Stakely.

## Useful links

- Stakely, Solana (SOL) staking overview: https://stakely.io/staking/solana-staking 
- Solana staking basics: https://solana.com/staking
- Solana documentation: https://solana.com/docs/references/staking
- Solana Learn: https://solana.com/learn/what-is-staking

## What you will find in this section

- **Signing transactions**: how to sign Solana transactions returned by the crafting endpoints, with examples for common signing setups.  
- **Native staking**: end-to-end flows and endpoints for delegating, claiming rewards, and undelegating for native Solana staking.  

## Notes

- Solana integrations require specifying the correct `X-NETWORK` for the target network. The API provides a dedicated endpoint to list all available Solana networks and their corresponding `X-NETWORK` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
