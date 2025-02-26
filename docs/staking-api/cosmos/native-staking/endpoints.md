---
sidebar_position: 3
---

import StakingOpenApiLink from '@site/src/components/StakingOpenApiLink';

# Endpoints

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

**Header:**

| Name      | Description | Example value | Required
| --------------- | ------------ | ------------ |------------ |
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |

### ChainId

The chainId is the id of the chain you want to stake/unstake/claim rewards.

:::info
ChainId is a string that identifies the blockchain network. It is used to specify the destination of the transaction.
:::

For example, if you want to stake/unstake/claim rewards on Cosmos Hub, you need to use the chainId `cosmoshub-4`.

You can find the list of chainIds for each chain in the [Cosmos Chain Registry](https://github.com/cosmos/chain-registry). Select the directory of the chain you want to use and look for the `chain_id` field value.

If you pass a wrong chainId or the chain is not yet supported, the endpoint will return a 404 error with the message `Blockchain not found`.

:::tip

If you need us to enable/support a new chain, please contact us at [admin@stakely.io](mailto:admin@stakely.io).

:::

____

### Stake action

Craft a stake transaction:

- Endpoint: [`/api/v1/cosmos/{chainId}/action/stake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/{chainId}/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakeActionDto`](/staking-api/api-reference#model/stakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Unstake action

Craft an unstake transaction:

- Endpoint: [`/api/v1/cosmos/{chainId}/action/unstake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/{chainId}/action/unstake)

#### Description

This endpoint will craft an unstake transaction ready to be signed.

#### Request body parameters

[`UnstakeActionDto`](/staking-api/api-reference#model/unstakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: [`/api/v1/cosmos/{chainId}/action/claim-rewards`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/{chainId}/action/claim-rewards)

#### Description

This endpoint will craft a claim rewards transaction ready to be signed.

#### Request body parameters

[`ClaimRewardsActionDto`](/staking-api/api-reference#model/claimrewardsactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/cosmos/{chainId}/action/prepare`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/{chainId}/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`PrepareActionDto`](/staking-api/api-reference#model/prepareactiondto)

#### Returned

[`PrepareActionResponseDto`](/staking-api/api-reference#model/preparectionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/cosmos/{chainId}/action/broadcast`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/{chainId}/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`BroadcastActionDto`](/staking-api/api-reference#model/brodacastactiondto)

#### Returned

[`BroadcastActionResponseDto`](/staking-api/api-reference#model/broadcastctionresponsedto)