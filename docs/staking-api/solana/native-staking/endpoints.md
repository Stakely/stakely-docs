---
sidebar_position: 2
---

import StakingOpenApiLink from '@site/src/components/StakingOpenApiLink';

# Endpoints

## API Usage
Once you already have access to the Staking API with a validated user and existing apikeys you can start using this service.

### API Reference docs

:::tip

You can check the **Staking API Reference** here:
- Rendered <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer">doc page</a>.
- <StakingOpenApiLink />
:::

## Authentication

In order to use staking api related endpoints you need to include your **API KEY**

**Header:**

| Name        | Description | Example value | Required |
|-------------|-------------|---------------|----------|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network/cluster identifier | `mainnet-beta` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to select the Solana cluster to operate on (e.g., `mainnet-beta`, `devnet`).

::::info
Supported values match the RPC cluster identifier that Solana exposes (the `cluster` argument in web3). If you omit the header the API falls back to the default Solana network configured for your account.
::::

::::tip
Currently supported values: `mainnet-beta` and `devnet`. Contact [admin@stakely.io](mailto:admin@stakely.io) if you need another cluster enabled.
::::

### List available networks

Need to know which Solana clusters are enabled for your API key? Ask the API directly.

- Endpoint: <a href="/staking-api/api-reference#tag/solana/get/api/v1/solana/native/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/networks</code></a>

Each item in the response includes:

| Field | Description |
|-------|-------------|
| `name` | Internal descriptor for the Solana blockchain entry |
| `type` | Blockchain type string (always `SOLANA`) |
| `chain_id` | Cluster identifier such as `mainnet-beta` or `devnet` |
| `is_default` | `true` when the cluster is used as fallback |

____

### Create nonce account action

Craft a create nonce account transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/create-nonce-account" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/create-nonce-account</code></a>

#### Description

This endpoint will craft a create nonce account transaction ready to be signed. Creating a nonce account is an important step for durable transactions in Solana, especially useful for complex operations like staking.

#### Request body parameters

<a href="/staking-api/api-reference#model/createnonceaccountactiondto" target="_blank" rel="noopener noreferrer"><code>CreateNonceAccountActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanastakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaStakingActionResponseDto</code></a>

____


### Stake action

Craft a stake transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/stake" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/stake</code></a>

#### Description

This endpoint will craft a stake transaction ready to be signed. 

The stake action combines these steps into a single transaction, simplifying the process for users. When you initiate a stake action through the Staking API, it will craft a transaction that creates the stake account, funds it, and delegates to our validator in one go.

#### Request body parameters

<a href="/staking-api/api-reference#model/solanastakeactiondto" target="_blank" rel="noopener noreferrer"><code>SolanaStakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanastakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaStakingActionResponseDto</code></a>

____

### Unstake action (deactivate)

Craft an unstake transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/unstake" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/unstake</code></a>

#### Description

This endpoint will craft an unstake transaction ready to be signed.

The unstake action through the Staking API initiates this process by creating a transaction that deactivates your stake account. It's important to note that this doesn't immediately return your tokens - you'll need to wait for the cooldown period and then perform a separate withdrawal action.

#### Request body parameters

<a href="/staking-api/api-reference#model/solanaunstakeactiondto" target="_blank" rel="noopener noreferrer"><code>SolanaUnstakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanastakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaStakingActionResponseDto</code></a>

____

### Withdraw deactivated stake action

Craft a claim rewards transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/withdraw" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/withdraw</code></a>

#### Description

This endpoint will craft a withdraw deactivated stake transaction ready to be signed.

After your stake has been fully deactivated, you can withdraw the tokens back to your main wallet. This process is called withdrawing deactivated stake. Here's an overview of the withdraw action.


The withdraw action through the Staking API creates a transaction that performs this withdrawal. While it's possible to partially withdraw funds in multiple transactions, the most common approach is to fully withdraw the entire balance in a single transaction.

#### Request body parameters

<a href="/staking-api/api-reference#model/solanawithdrawactiondto" target="_blank" rel="noopener noreferrer"><code>SolanaWithdrawActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanastakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaStakingActionResponseDto</code></a>

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/prepare</code></a>

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

<a href="/staking-api/api-reference#model/solanaprepareactiondto" target="_blank" rel="noopener noreferrer"><code>SolanaPrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanaprepareactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: <a href="/staking-api/api-reference#tag/solana/post/api/v1/solana/native/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/solana/native/action/broadcast</code></a>

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

<a href="/staking-api/api-reference#model/solanabroadcastactiondto" target="_blank" rel="noopener noreferrer"><code>SolanaBroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/solanabroadcastactionresponsedto" target="_blank" rel="noopener noreferrer"><code>SolanaBroadcastActionResponseDto</code></a>
