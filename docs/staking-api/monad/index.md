---
title: Monad
---

# Monad

This section covers Monad staking integrations using the Stakely Staking API. It includes Monad-specific notes, transaction signing examples, and the staking flows supported by Stakely.

## Useful links

- Stakely, Monad (MON) staking overview: https://stakely.io/staking/monad-staking 
- Official documentation: https://docs.monad.xyz

## What you will find in this section

- **Signing transactions**: how to sign Monad transactions returned by the crafting endpoints, with examples for common signing setups.  
- **Native staking**: end-to-end flows and endpoints for delegating, claiming rewards, and undelegating for native Monad staking.  

## Notes

- Monad integrations require specifying the correct `X-NETWORK` for the target network. The API provides a dedicated endpoint to list all available Monad networks and their corresponding `X-NETWORK` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
