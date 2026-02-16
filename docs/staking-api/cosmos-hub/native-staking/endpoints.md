---
sidebar_position: 1
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
| `X-NETWORK` | Blockchain network/chain identifier | `cosmoshub-4` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to tell the API which Cosmos network should process the request (e.g., `cosmoshub-4`, `juno-1`).

::::info
`X-NETWORK` accepts the same identifier exposed as `chain_id` in the [Cosmos Chain Registry](https://github.com/cosmos/chain-registry). When the header is omitted the default Cosmos network configured for your account will be used.
::::

::::tip
Need support for another network? Reach out at [admin@stakely.io](mailto:admin@stakely.io).
::::

### List available networks

If you are unsure which Cosmos networks are enabled for your account you can ask the API directly.

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/GET/api/v1/cosmos/native/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/networks</code></a>
Each object in the response includes:

| Field | Description |
|-------|-------------|
| `name` | Internal name of the blockchain entry |
| `type` | Blockchain type string (always `COSMOS`) |
| `chain_id` | Chain identifier, same as the Cosmos Chain Registry `chain_id` |
| `is_default` | `true` when this network is used as fallback |

____

### Stake action

Craft a stake transaction:

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/POST/api/v1/cosmos/native/action/stake" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/action/stake</code></a>

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/stakeactiondto" target="_blank" rel="noopener noreferrer"><code>StakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakingActionResponseDto</code></a>

____

### Unstake action

Craft an unstake transaction:

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/POST/api/v1/cosmos/native/action/unstake" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/action/unstake</code></a>

#### Description

This endpoint will craft an unstake transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/unstakeactiondto" target="_blank" rel="noopener noreferrer"><code>UnstakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakingActionResponseDto</code></a>

____

### Claim rewards action

Craft a claim rewards transaction:

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/POST/api/v1/cosmos/native/action/claim-rewards" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/action/claim-rewards</code></a>

#### Description

This endpoint will craft a claim rewards transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/claimrewardsactiondto" target="_blank" rel="noopener noreferrer"><code>ClaimRewardsActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakingActionResponseDto</code></a>

____

### Prepare action

Gathers signature and unsigned tx:

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/POST/api/v1/cosmos/native/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/action/prepare</code></a>

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

<a href="/staking-api/api-reference#model/prepareactiondto" target="_blank" rel="noopener noreferrer"><code>PrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/preparectionresponsedto" target="_blank" rel="noopener noreferrer"><code>PrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction

 - Endpoint: <a href="/staking-api/api-reference#tag/cosmoshub/POST/api/v1/cosmos/native/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/cosmos/native/action/broadcast</code></a>

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

<a href="/staking-api/api-reference#model/brodacastactiondto" target="_blank" rel="noopener noreferrer"><code>BroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/broadcastctionresponsedto" target="_blank" rel="noopener noreferrer"><code>BroadcastActionResponseDto</code></a>
