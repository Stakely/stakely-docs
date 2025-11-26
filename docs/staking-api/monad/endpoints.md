---
sidebar_position: 3
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

### Delegate action

Craft a delegate transaction:

- Endpoint: [`/api/v1/eth/monad/action/delegate`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/delegate)

#### Description

This endpoint will craft a delegate transaction ready to be signed. The transaction will delegate the specified amount to the validator.

#### Request body parameters

[`MonadStakeActionDto`](/staking-api/api-reference#model/monadstakeactiondto)

#### Returned

[`MonadActionResponseDto`](/staking-api/api-reference#model/monadactionresponsedto)

____

### Undelegate action

Craft an undelegate transaction:

- Endpoint: [`/api/v1/eth/monad/action/undelegate`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/undelegate)

#### Description

This endpoint will craft an undelegate transaction ready to be signed. The undelegated amount will be placed in a withdrawal slot and can be withdrawn after the withdrawal epoch.

#### Request body parameters

[`MonadUndelegateActionDto`](/staking-api/api-reference#model/monadundelegateactiondto)

#### Returned

[`MonadActionResponseDto`](/staking-api/api-reference#model/monadactionresponsedto)

____

### Withdraw action

Craft a withdraw transaction:

- Endpoint: [`/api/v1/eth/monad/action/withdraw`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/withdraw)

#### Description

Once the withdrawal is available (after the withdrawal epoch), you can claim it. This action will craft a withdraw transaction for the specified withdrawal slot.

#### Request body parameters

[`MonadWithdrawActionDto`](/staking-api/api-reference#model/monadwithdrawactiondto)

#### Returned

[`MonadActionResponseDto`](/staking-api/api-reference#model/monadactionresponsedto)

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: [`/api/v1/eth/monad/action/claim-rewards`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/claim-rewards)

#### Description

This endpoint will craft a claim rewards transaction ready to be signed. It allows you to claim accumulated staking rewards.

#### Request body parameters

[`MonadClaimRewardsActionDto`](/staking-api/api-reference#model/monadclaimrewardsactiondto)

#### Returned

[`MonadActionResponseDto`](/staking-api/api-reference#model/monadactionresponsedto)

____

### Compound action

Craft a compound rewards transaction:

- Endpoint: [`/api/v1/eth/monad/action/compound`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/compound)

#### Description

This endpoint will craft a compound rewards transaction ready to be signed. It automatically reinvests your accumulated rewards back into your stake position.

#### Request body parameters

[`MonadCompoundActionDto`](/staking-api/api-reference#model/monadcompoundactiondto)

#### Returned

[`MonadActionResponseDto`](/staking-api/api-reference#model/monadactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/eth/monad/action/prepare`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures (r, s, v) with the unsigned transaction hex string:

#### Request body parameters

[`EthPrepareActionDto`](/staking-api/api-reference#model/ethprepareactiondto)

#### Returned

[`EthPrepareActionResponseDto`](/staking-api/api-reference#model/ethprepareactionresponsedto)

____

### Broadcast action

Broadcast a signed transaction:

- Endpoint: [`/api/v1/eth/monad/action/broadcast`](/staking-api/api-reference#tag/eth-monad/post/api/v1/eth/monad/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will broadcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`EthBroadcastActionDto`](/staking-api/api-reference#model/ethbroadcastactiondto)

#### Returned

[`EthBroadcastActionResponseDto`](/staking-api/api-reference#model/ethbroadcastactionresponsedto)

____

### Stake balance

Get stake balance for the given address:

- Endpoint: [`/api/v1/eth/monad/stake-balance/{address}`](/staking-api/api-reference#tag/eth-monad/get/api/v1/eth/monad/stake-balance/{address})

#### Description

Get stake balance and rewards information for the given delegator address. All values are returned in ether units.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve stake balance from

#### Returned

[`GetStakeBalanceResponseDto`](/staking-api/api-reference#model/getstakebalanceresponsedto)

____

### Withdrawal requests

Get withdrawal requests for the given address:

- Endpoint: [`/api/v1/eth/monad/withdrawals/{address}`](/staking-api/api-reference#tag/eth-monad/get/api/v1/eth/monad/withdrawals/{address})

#### Description

Get withdrawal requests for the given delegator address. You can optionally filter by withdrawal ID range using query parameters. All values are returned in ether units.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve withdrawal requests from

#### Query parameters

[`MonadWithdrawalQueryDto`](/staking-api/api-reference#model/monadwithdrawalquerydto)

- `startWithdrawId` (optional): Start withdrawal ID in the range (0-255, defaults to 0)
- `endWithdrawId` (optional): End withdrawal ID in the range (0-255, defaults to 255)

#### Returned

[`GetWithdrawalRequestsResponseDto`](/staking-api/api-reference#model/getwithdrawalrequestsresponsedto)

____

### Withdrawal request

Get a single withdrawal request:

- Endpoint: [`/api/v1/eth/monad/withdrawal/{address}/{withdrawId}`](/staking-api/api-reference#tag/eth-monad/get/api/v1/eth/monad/withdrawal/{address}/{withdrawId})

#### Description

Get a single withdrawal request for the given delegator address and withdrawal slot ID. All values are returned in ether units.

#### Request parameters

[`MonadWithdrawalParamsDto`](/staking-api/api-reference#model/monadwithdrawalparamsdto)

- `address`: Delegator address
- `withdrawId`: Withdrawal slot identifier (0-255)

#### Returned

[`GetWithdrawalRequestResponseDto`](/staking-api/api-reference#model/getwithdrawalrequestresponsedto)

____

