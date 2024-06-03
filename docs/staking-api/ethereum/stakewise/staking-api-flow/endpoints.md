---
sidebar_position: 2
---
# Endpoints



## API Usage
Once you already have access to the staking api with a validated user and existing apikeys you can start using the Staking API.

### API Reference docs

:::tip

You can check the **Staking API Reference** here:
- Rendered [doc page](/staking-api/api-reference).
- [Staking OpenApi](https://dev-staking-api.stakely.io/docs)
:::

## Authentication

In order to use staking api related endpoints you need to include your **API KEY**

**Header:**

| Name      | Description | Example value | Required
| --------------- | ------------ | ------------ |------------ |
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |

____

### Stake into stakewise vault

Craft a stake transaction:

- Endpoint: [`/api/v1/eth/stakewise/action/stake​`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Unstake action

Craft a unstake transaction

- Endpoint: [`/api/v1/eth/stakewise/action/unstake​`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/action/unstake)

#### Description

This endpoint will build an "enter exit queue" unstake transaction ready to be signed. The exited assets needs to mature for a given period before there are claimable

#### Request param

[`StakewiseStakeActionDto`](/staking-api/api-reference#model/stakewisestakeactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Withdraw action

Craft a withdraw transaction

- Endpoint: [`/api/v1/eth/stakewise/action/withdraw`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/action/withdraw)

#### Description

Once the assets in queue are ready to be claimable you can claim them. This action will craft a withdraw transaction of the withdrawable assets.


[`StakewiseWithdrawActionDto`](/staking-api/api-reference#model/stakewisewithdrawactiondto)

#### Returned

[`StakewiseStakingActionResponseDto`](/staking-api/api-reference#model/stakewisestakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/eth/stakewise/action/prepare`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`EthPrepareActionDto`](/staking-api/api-reference#model/ethprepareactiondto)

#### Returned

[`EthPrepareActionResponseDto`](/staking-api/api-reference#model/ethprepareactionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/eth/stakewise/action/broadcast`](/staking-api/api-reference#tag/eth-stakewise/post/api/v1/eth/stakewise/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signted transaction returned in `prepare` previous step:

#### Request body parameters

[`EthBroadcastActionDto`](/staking-api/api-reference#model/ethbroadcastactiondto)

#### Returned

[`EthBroadcastActionResponseDto`](/staking-api/api-reference#model/ethbroadcastactionresponsedto)

____

### Historic

Get stakewise actions history for the given address


- Endpoint: [`/api/v1/eth/stakewise/historic/{address}​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/historic/{address})

#### Description

Get stakewise actions history for the given address. It will return all historic actions of different kind of actions.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetActionResponseDto`](/staking-api/api-reference#model/stakewisegetactionresponsedto)

____

### Stake balance

Get stakewise stake balance for the given address


- Endpoint: [`/api/v1/eth/stakewise/stake-balance/{address}​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/stake-balance/{address})

#### Description

Get stakewise stake balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetStakeBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetstakebalanceresponsedto)

____


### Exited balance

Get stakewise exited balance for the given address


- Endpoint: [`/api/v1/eth/stakewise/exited-balance/{address}​​`](/staking-api/api-reference#tag/eth-stakewise/get/api/v1/eth/stakewise/exited-balance/{address})

#### Description

Get stakewise exited balance for the given address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve actions from

#### Returned

Array of [`StakewiseGetExitedBalanceResponseDto`](/staking-api/api-reference#model/stakewisegetexitedbalanceresponsedto)

