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

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/ethereum/stakewise/networks</code></a>

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

- Endpoint: [`/api/v1/ethereum/stakewise/action/stake​`](/staking-api/api-reference#tag/ethereumstakewise/post/api/v1/ethereum/stakewise/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Unstake action

Craft a unstake transaction

- Endpoint: [`/api/v1/ethereum/stakewise/action/unstake​`](/staking-api/api-reference#tag/ethereumstakewise/post/api/v1/ethereum/stakewise/action/unstake)

#### Description

This endpoint will build an "enter exit queue" unstake transaction ready to be signed. The exited assets needs to mature for a given period before there are claimable

#### Request param

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Withdraw action

Craft a withdraw transaction

- Endpoint: [`/api/v1/ethereum/stakewise/action/withdraw`](/staking-api/api-reference#tag/ethereumstakewise/post/api/v1/ethereum/stakewise/action/withdraw)

#### Description

Once the assets in queue are ready to be claimable you can claim them. This action will craft a withdraw transaction of the withdrawable assets.


[`StakewiseWithdrawActionDto`](/staking-api/api-reference#model/stakewisewithdrawactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/ethereum/stakewise/action/prepare`](/staking-api/api-reference#tag/ethereumstakewise/post/api/v1/ethereum/stakewise/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`EthPrepareActionDto`](/staking-api/api-reference#model/ethprepareactiondto)

#### Returned

[`EthPrepareActionResponseDto`](/staking-api/api-reference#model/ethprepareactionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/ethereum/stakewise/action/broadcast`](/staking-api/api-reference#tag/ethereumstakewise/post/api/v1/ethereum/stakewise/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`EthBroadcastActionDto`](/staking-api/api-reference#model/ethbroadcastactiondto)

#### Returned

[`EthBroadcastActionResponseDto`](/staking-api/api-reference#model/ethbroadcastactionresponsedto)

____

### Historic

Get stakewise actions history for the given address


- Endpoint: [`/api/v1/ethereum/stakewise/historic/{address}​`](/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/historic/{address})

#### Description

Get stakewise actions history for the given address. It will return all historic actions of different kind of actions.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetActionResponseDto`](/staking-api/api-reference#model/stakewisegetactionresponsedto)

____

### Stake balance

Get stakewise stake balance for the given address


- Endpoint: [`/api/v1/ethereum/stakewise/stake-balance/{address}​`](/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/stake-balance/{address})

#### Description

Get stakewise stake balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetStakeBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetstakebalanceresponsedto)

____


### Exited balance

Get stakewise exited balance for the given address


- Endpoint: [`/api/v1/ethereum/stakewise/exited-balance/{address}​​`](/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/exited-balance/{address})

#### Description

Get stakewise exited balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetExitedBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetexitedbalanceresponsedto)

____


### Vault info

Get stakewise vault info such as APY and balance for the current time


- Endpoint: [`/api/v1/ethereum/stakewise/vault​​`](/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/vault)

#### Description

Get vault details, as current APY

#### Returned

Array of [`StakewiseGetVaultResponseDto`](/staking-api/api-reference#model/stakewisegetvaultresponsedto)

____


### User Stats

Get user stats for stakewise vault for N days

- Endpoint: [`/api/v1/ethereum/stakewise/stats/{address}`](/staking-api/api-reference#tag/ethereumstakewise/get/api/v1/ethereum/stakewise/stats/{address})

#### Description

Get vault details, as current APY

#### Returned

Array of [`StakewiseGetUserStatsResponseDto`](/staking-api/api-reference#model/stakewisegetuserstatsresponsedto)