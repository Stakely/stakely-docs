---
sidebar_position: 2
---
# Endpoints

import StakingOpenApiLink from '@site/src/components/StakingOpenApiLink';


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

:::tip

**Heads up!**
To obtain a valid API key required for authentication, please refer to the [Authentication > Auth](/staking-api/authentication#auth) section of the documentation.

:::

**Header:**

| Name        | Description | Example value | Required |
|-------------|-------------|---------------|----------|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network/chain identifier | `1` | ⚪ |

____

### X-NETWORK header

Set the `X-NETWORK` header to the Stakewise chain you want to target.

:::warning
Supported values: `1` (Ethereum Mainnet) and `560048` (Ethereum Hoodi).
:::

When omitted the API falls back to the default Stakewise network configured for your account.

### List available networks

Use this helper endpoint to discover which Stakewise networks are currently enabled for your API key.

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/networks</code></a>

Response payload fields:

| Field | Description |
|-------|-------------|
| `name` | Internal blockchain entry name |
| `type` | Blockchain type string (always `ETHEREUM`) |
| `chain_id` | Chain identifier such as `1` or `560048` |
| `is_default` | `true` when the network is used as fallback |

____
### Stake into stakewise vault

Craft a stake transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/POST/api/v1/ethereum/stakewise/action/stake" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/action/stake</code></a>

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/stakewisestakeactiondto" target="_blank" rel="noopener noreferrer"><code>StakewiseStakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakewisestakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseStakingActionResponseDto</code></a>

____

### Unstake action

Craft a unstake transaction

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/POST/api/v1/ethereum/stakewise/action/unstake" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/action/unstake</code></a>

#### Description

This endpoint will build an "enter exit queue" unstake transaction ready to be signed. The exited assets needs to mature for a given period before there are claimable

#### Request param

<a href="/staking-api/api-reference#model/stakewisestakeactiondto" target="_blank" rel="noopener noreferrer"><code>StakewiseStakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakewisestakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseStakingActionResponseDto</code></a>

____

### Withdraw action

Craft a withdraw transaction

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/POST/api/v1/ethereum/stakewise/action/withdraw" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/action/withdraw</code></a>

#### Description

Once the assets in queue are ready to be claimable you can claim them. This action will craft a withdraw transaction of the withdrawable assets.


<a href="/staking-api/api-reference#model/stakewisewithdrawactiondto" target="_blank" rel="noopener noreferrer"><code>StakewiseWithdrawActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/stakewisestakingactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseStakingActionResponseDto</code></a>

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/POST/api/v1/ethereum/stakewise/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/action/prepare</code></a>

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

<a href="/staking-api/api-reference#model/ethprepareactiondto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/ethprepareactionresponsedto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/POST/api/v1/ethereum/stakewise/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/action/broadcast</code></a>

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

<a href="/staking-api/api-reference#model/ethbroadcastactiondto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/ethbroadcastactionresponsedto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionResponseDto</code></a>

____

### Historic

Get stakewise actions history for the given address


- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/historic/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/historic/&#123;address&#125;</code></a>

#### Description

Get stakewise actions history for the given address. It will return all historic actions of different kind of actions.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of <a href="/staking-api/api-reference#model/stakewisegetactionresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseGetActionResponseDto</code></a>

____

### Stake balance

Get stakewise stake balance for the given address


- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/stake-balance/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/stake-balance/&#123;address&#125;</code></a>

#### Description

Get stakewise stake balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of <a href="/staking-api/api-reference#model/stakewisegetstakebalanceresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseGetStakeBalanceResponseDto</code></a>

____


### Exited balance

Get stakewise exited balance for the given address


- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/exited-balance/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/exited-balance/&#123;address&#125;</code></a>

#### Description

Get stakewise exited balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of <a href="/staking-api/api-reference#model/stakewisegetexitedbalanceresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseGetExitedBalanceResponseDto</code></a>

____


### Vault info

Get stakewise vault info such as APY and balance for the current time


- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/vault" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/vault</code></a>

#### Description

Get vault details, as current APY

#### Returned

Array of <a href="/staking-api/api-reference#model/stakewisegetvaultresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseGetVaultResponseDto</code></a>

____


### User Stats

Get user stats for stakewise vault for N days

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/GET/api/v1/ethereum/stakewise/stats/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/stats/&#123;address&#125;</code></a>

#### Description

Get vault details, as current APY

#### Returned

Array of <a href="/staking-api/api-reference#model/stakewisegetuserstatsresponsedto" target="_blank" rel="noopener noreferrer"><code>StakewiseGetUserStatsResponseDto</code></a>