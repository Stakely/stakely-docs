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
- Rendered [doc page](/staking-api/api-reference).
- <StakingOpenApiLink />
:::

## Authentication

In order to use staking api related endpoints you need to include your **API KEY**

:::tip

**Heads up!**
To obtain a valid API key required for authentication, please refer to the [Authentication > Auth](/staking-api/authentication#auth) section of the documentation.

:::

**Header:**

| Name      | Description | Example value | Required
| --------------- | ------------ | ------------ |------------ |
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |

____

### Chain ID param

The chain id param is required for all the endpoints.

:::warning

Supported chains for stakewise staking are:

- `1` for Ethereum Mainnet
- `560048` for Ethereum Hoodi
:::

____
### Stake into stakewise vault

Craft a stake transaction:

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/action/stake​`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/{chainId}/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Unstake action

Craft a unstake transaction

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/action/unstake​`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/{chainId}/action/unstake)

#### Description

This endpoint will build an "enter exit queue" unstake transaction ready to be signed. The exited assets needs to mature for a given period before there are claimable

#### Request param

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Withdraw action

Craft a withdraw transaction

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/action/withdraw`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/{chainId}/action/withdraw)

#### Description

Once the assets in queue are ready to be claimable you can claim them. This action will craft a withdraw transaction of the withdrawable assets.


[`StakewiseWithdrawActionDto`](/staking-api/api-reference#model/stakewisewithdrawactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/action/prepare`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/{chainId}/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`EthPrepareActionDto`](/staking-api/api-reference#model/ethprepareactiondto)

#### Returned

[`EthPrepareActionResponseDto`](/staking-api/api-reference#model/ethprepareactionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/action/broadcast`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/{chainId}/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`EthBroadcastActionDto`](/staking-api/api-reference#model/ethbroadcastactiondto)

#### Returned

[`EthBroadcastActionResponseDto`](/staking-api/api-reference#model/ethbroadcastactionresponsedto)

____

### Historic

Get stakewise actions history for the given address


- Endpoint: [`/api/v1/eth/stakewise/{chainId}/historic/{address}​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/{chainId}/historic/{address})

#### Description

Get stakewise actions history for the given address. It will return all historic actions of different kind of actions.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetActionResponseDto`](/staking-api/api-reference#model/stakewisegetactionresponsedto)

____

### Stake balance

Get stakewise stake balance for the given address


- Endpoint: [`/api/v1/eth/stakewise/{chainId}/stake-balance/{address}​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/{chainId}/stake-balance/{address})

#### Description

Get stakewise stake balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetStakeBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetstakebalanceresponsedto)

____


### Exited balance

Get stakewise exited balance for the given address


- Endpoint: [`/api/v1/eth/stakewise/{chainId}/exited-balance/{address}​​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/{chainId}/exited-balance/{address})

#### Description

Get stakewise exited balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetExitedBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetexitedbalanceresponsedto)

____


### Vault info

Get stakewise vault info such as APY and balance for the current time


- Endpoint: [`/api/v1/eth/stakewise/{chainId}/vault​​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/{chainId}/vault)

#### Description

Get vault details, as current APY

#### Returned

Array of [`StakewiseGetVaultResponseDto`](/staking-api/api-reference#model/stakewisegetvaultresponsedto)

____


### User Stats

Get user stats for stakewise vault for N days

- Endpoint: [`/api/v1/eth/stakewise/{chainId}/stats/{address}`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/{chainId}/stats/{address})

#### Description

Get vault details, as current APY

#### Returned

Array of [`StakewiseGetUserStatsResponseDto`](/staking-api/api-reference#model/stakewisegetuserstatsresponsedto)