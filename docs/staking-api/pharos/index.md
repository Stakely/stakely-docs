---
sidebar_position: 1
title: Pharos
---

# Pharos

This section covers Pharos native staking integrations using the Stakely Staking API. It includes Pharos-specific notes, transaction signing examples, and the native delegation flows supported by Stakely.

## Useful links

- [Pharos delegation documentation](https://silken-muskox-24e.notion.site/Pharos-Delegation-Documentation-3078ec314f7580319e13d4b623e59548) (protocol overview and delegation concepts)
- Pharos RPC (example): `https://rpc.pharos.xyz`

## What you will find in this section

- **Signing transactions**: how to sign Pharos (EVM) transactions returned by the crafting endpoints, with examples for common signing setups.
- **Native staking**: end-to-end flows and endpoints for delegating, undelegating, withdrawing after the unlock window, claiming rewards, and compounding on Pharos.

## Notes

- Pharos integrations require specifying the correct `X-NETWORK` for the target network (typically the chain ID, e.g. `1672` for Pharos mainnet). The API provides a dedicated endpoint to list all available Pharos networks and their corresponding `X-NETWORK` values.
- All staking operations are executed on-chain. Stakely prepares the transaction payloads, while signing is performed by your application using your preferred signing method.
- After undelegation, the protocol enforces a **withdraw window of 84 epochs** (`DEFAULT_WITHDRAW_WINDOW`) before principal can be withdrawn; use the stake balance endpoint to inspect `pendingUnstake` and `pendingWithdrawStake`.
