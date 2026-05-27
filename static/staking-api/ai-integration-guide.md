---
sidebar_position: 4
title: AI Integration Guide
---

# AI Integration Guide

Use this guide when you or an AI coding agent need to integrate the Stakely Staking API. The safe path is simple: craft the transaction with Stakely, sign it in your own environment, prepare it, then broadcast it.

:::important
The OpenAPI schema is the source of truth for exact request and response schemas: https://staking-api.stakely.io/openapi.json
:::

## Recommended integration flow

1. **Choose the product correctly**: for programmatic staking integrations, use the Staking API. Do not use Public Nodes, Obol Portal, or Simple CSM docs unless your task is specifically about those products.
2. **Select the blockchain and network**: call the relevant `/networks` endpoint or set the `X-NETWORK` header explicitly.
3. **Craft the transaction**: call the network-specific `action/*` endpoint, such as `stake`, `delegate`, `unstake`, `undelegate`, `withdraw`, `claim-rewards`, or `compound`.
4. **Sign outside Stakely**: sign the returned unsigned payload with your wallet, backend signer, custodian, MPC wallet, or hardware signer.
5. **Prepare the transaction**: send the unsigned payload and signature data to the network-specific `action/prepare` endpoint.
6. **Broadcast**: use the network-specific `action/broadcast` endpoint or your own RPC flow when appropriate.

## What an AI should ask before generating code

Before generating code, give the AI these details:

| Needed detail | Why it matters |
| --- | --- |
| Blockchain and network | Endpoints, payloads, and `X-NETWORK` values differ per chain. |
| Action | Staking, unstaking, withdrawing, claiming rewards, compounding, and balance queries use different endpoints. |
| Signing method | EVM, Cosmos, Solana, Sui, Fireblocks, MPC, and wallet signing flows require different code. |
| Language and runtime | Node.js, TypeScript, Python, browser, backend, and serverless setups handle secrets differently. |
| Broadcast strategy | You can usually broadcast with Stakely, but some integrations may prefer their own RPC. |
| Security requirements | Response signature verification and custody constraints may affect implementation. |

## Recommended environment variables

```bash
STAKELY_API_KEY=
STAKELY_API_BASE_URL=https://staking-api.stakely.io
STAKELY_OPENAPI_URL=https://staking-api.stakely.io/openapi.json
STAKELY_NETWORK=
```

Add signer-specific variables only in the environment that performs signing. For example:

```bash
# EVM signer example
EVM_PRIVATE_KEY=

# Solana signer example
SOLANA_PRIVATE_KEY=

# Sui signer example
SUI_PRIVATE_KEY=

# Fireblocks example
FIREBLOCKS_API_SECRET=
FIREBLOCKS_API_KEY=
FIREBLOCKS_BASE_URL=
FIREBLOCKS_VAULT_ID=
```

:::warning
Do not expose production API keys or private keys in browser bundles, public repositories, logs, prompts, screenshots, or support tickets.
:::

## Required headers

Every authenticated request must include:

```http
X-API-KEY: <STAKELY_API_KEY>
```

Use `X-NETWORK` when you need to target a specific chain/network explicitly:

```http
X-NETWORK: <network-or-chain-id>
```

If `X-NETWORK` is omitted, the API may use the default network configured for your API key. For deterministic integrations, discover available values with the chain-specific `/networks` endpoint and send the header explicitly.

## Example prompt for an AI coding agent

```text
Build a Stakely Staking API integration.

Use the OpenAPI schema as the source of truth:
https://staking-api.stakely.io/openapi.json

Target blockchain: <Cosmos Hub | Ethereum StakeWise | Monad | Pharos | Solana | Sui>
Network/X-NETWORK: <value or ask me to choose after calling the networks endpoint>
Action: <stake/delegate | unstake/undelegate | withdraw | claim rewards | compound | balance query>
Signing method: <browser wallet | backend private-key signer | Fireblocks | MPC | hardware wallet>
Language/runtime: <Node.js/TypeScript/Python/etc.>
Broadcast strategy: <Stakely broadcast endpoint or own RPC>

Rules:
- Include X-API-KEY in every request.
- Include X-NETWORK when targeting a specific network.
- Never send private keys, seed phrases, or signer secrets to Stakely.
- Sign the transaction outside Stakely.
- Use the OpenAPI schema for exact DTO names and field names.
```

## Signing differences by family

| Family | Applies to | Signing note |
| --- | --- | --- |
| EVM | Ethereum StakeWise, Monad, Pharos | Sign the unsigned transaction with an EVM signer. Prepare commonly uses signature parts such as `r`, `s`, and `v`; verify exact DTOs in OpenAPI. |
| Cosmos | Cosmos Hub and similar Cosmos SDK integrations | Sign with a Cosmos SDK-compatible signer, wallet, custodian, or MPC flow. |
| Solana | Solana native staking | Sign the crafted Solana transaction payload with `@solana/web3.js`, wallet adapter, custodian, MPC, or hardware signer. |
| Sui | Sui native staking | Sign `unsigned_tx_b64` with a Sui-compatible signer and send base64 signatures to prepare. |

## Security best practices

- Keep custody boundaries clear: Stakely crafts transactions; your system signs them.
- Never send private keys, mnemonics, seed phrases, or raw custody credentials to Stakely or to an AI tool.
- Store API keys in secret managers or protected server-side environment variables.
- Prefer testnets for first integrations.
- Validate network selection before signing mainnet transactions.
- Review generated code against the OpenAPI schema before running it with real funds.
- Consider verifying the `x-signature` response header for high-assurance integrations.

## References

- Staking API introduction: /staking-api/introduction
- Authentication: /staking-api/authentication
- Supported networks: /staking-api/supported-networks
- API Reference: /staking-api/api-reference
- OpenAPI schema: https://staking-api.stakely.io/openapi.json
- Full AI context: /staking-api/llms-full.txt
