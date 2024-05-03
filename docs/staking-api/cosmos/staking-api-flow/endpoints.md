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

### Stake action

Craft a stake transaction:

- Endpoint: [`/api/v1/cosmos/action/stake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakeActionDto`](/staking-api/api-reference#model/stakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Unstake action

Craft an unstake transaction:

- Endpoint: [`/api/v1/cosmos/action/ustake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/unstake)

#### Description

This endpoint will craft an unstake transaction ready to be signed.

#### Request body parameters

[`UnstakeActionDto`](/staking-api/api-reference#model/unstakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: [`/api/v1/cosmos/action/claim-rewards`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/claim-rewards)

#### Description

This endpoint will craft a claim rewards transaction ready to be signed.

#### Request body parameters

[`ClaimRewardsActionDto`](/staking-api/api-reference#model/claimrewardsactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/cosmos/action/prepare`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`ClaimRewardsActionDto`](/staking-api/api-reference#model/prepareactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/preparectionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/cosmos/action/prepare`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`PrepareActionDto`](/staking-api/api-reference#model/prepareactiondto)

#### Returned

[`PrepareActionResponseDto`](/staking-api/api-reference#model/preparectionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/cosmos/action/broadcast`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signted transaction returned in `prepare` previous step:

#### Request body parameters

[`BroadcastActionDto`](/staking-api/api-reference#model/brodacastactiondto)

#### Returned

[`BroadcastActionResponseDto`](/staking-api/api-reference#model/broadcastctionresponsedto)