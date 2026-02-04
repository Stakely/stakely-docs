---
title: Cosmos Hub
sidebar_position: 1
---

# Cosmos Hub

This section covers Cosmos Hub staking integrations using the Stakely Staking API. It includes Cosmos-specific notes, transaction signing examples, and the staking flows supported by Stakely.

## Useful links

- Stakely, Cosmos (ATOM) staking overview: https://stakely.io/staking/cosmos-atom-staking  
- Cosmos Hub delegator FAQ: https://hub.cosmos.network/main/delegators/delegator-faq  
- Cosmos SDK documentation: https://docs.cosmos.network/main  

## What you will find in this section

- **Signing transactions**: how to sign Cosmos transactions returned by the crafting endpoints, with examples for common signing setups.  
- **Native staking**: end-to-end flows and endpoints for delegating, redelegating, and undelegating on Cosmos Hub.  

## Notes

- Cosmos integrations require specifying the correct `chain_id` for the target network. The API provides a dedicated endpoint to list all available Cosmos networks and their corresponding `chain_id` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
