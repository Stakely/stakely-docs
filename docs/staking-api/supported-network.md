---
sidebar_position: 3
---

# Supported Networks

This page provides a comprehensive list of the blockchain networks currently supported by Stakely's Staking API. Our goal is to facilitate a wide range of staking operations across various blockchain ecosystems. Please note that this list is updated regularly to reflect new additions and updates to our supported networks.

## Currently Supported Networks

| Blockchain      | Crafting API | Reporting API |
| --------------- | ------------ | ------------ |
| Cosmos Hub      |       ✅     |       ❌      |
| Celestia        |       ✅     |       ❌      |
| Ethereum (native) |       ✅     |       ❌      |
| Ethereum mainnet (Stakewise) |    ✅  |       ❌      |
| Ethereum hoodi (Stakewise) |    ✅  |       ❌      |
| Monad |    ✅  |       ❌      |
| Solana          |    ✅        |       ❌      |
| Injective       |       ❌     |       ❌      |
| Sui             |       ❌     |       ❌      |

## Discovering Available Networks

For each staking protocol, the API provides a dedicated endpoint to list all available networks that are enabled for your account. This is particularly useful when you need to know which networks you can use with the `X-NETWORK` header.

Each protocol's endpoints documentation includes:
- A section explaining the [`X-NETWORK` header](/staking-api/cosmos/native-staking/endpoints#x-network-header) usage
- A [networks discovery endpoint](/staking-api/cosmos/native-staking/endpoints#list-available-networks) that returns all available networks for that protocol

Available network endpoints:
- **Cosmos**: [`GET /api/v1/cosmos/native/networks`](/staking-api/cosmos/native-staking/endpoints#list-available-networks) - See [X-NETWORK header documentation](/staking-api/cosmos/native-staking/endpoints#x-network-header)
- **Solana**: [`GET /api/v1/solana/native/networks`](/staking-api/solana/native-staking/endpoints#list-available-networks) - See [X-NETWORK header documentation](/staking-api/solana/native-staking/endpoints#x-network-header)
- **Ethereum StakeWise**: [`GET /api/v1/ethereum/stakewise/networks`](/staking-api/ethereum/stakewise-staking/endpoints#list-available-networks) - See [X-NETWORK header documentation](/staking-api/ethereum/stakewise-staking/endpoints#x-network-header)
- **Monad**: [`GET /api/v1/monad/native/networks`](/staking-api/monad/endpoints#list-available-networks) - See [X-NETWORK header documentation](/staking-api/monad/endpoints#x-network-header)

Each networks endpoint returns an array of network objects containing:
- `name`: Internal blockchain entry name
- `type`: Blockchain type string (e.g., `COSMOS`, `SOLANA`, `ETHEREUM`)
- `chain_id`: Network identifier (e.g., `cosmoshub-4`, `mainnet-beta`, `1`)
- `is_default`: Boolean indicating if this network is used as fallback when `X-NETWORK` header is omitted

## Requesting Support for New Networks

We are always looking to broaden our support to meet the needs of our users. If there is a network you wish to see supported by our Staking API that is not listed here, please do not hesitate to contact us.
