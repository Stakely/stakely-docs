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
| `X-NETWORK` | Blockchain network identifier | `143` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to select the Monad network (currently `143` for Monad Mainnet).

::::info
If you omit the header the API falls back to the default Monad network configured for your account.
::::

::::tip
Need another Monad environment exposed? Let us know at [admin@stakely.io](mailto:admin@stakely.io).
::::

### List available networks

Use this helper endpoint to obtain the list of Monad staking networks that are currently enabled for your API key.

 - Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/GET/api/v1/monad/native/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/networks</code></a>

Response payload fields:

| Field | Description |
|-------|-------------|
| `name` | Internal blockchain entry name |
| `type` | Blockchain type string (always `ETHEREUM`) |
| `chain_id` | Chain identifier (currently `143`) |
| `is_default` | `true` when this network is used as fallback |

____

### Delegate action

Craft a delegate transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/delegate" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/delegate</code></a>

#### Description

This endpoint will craft a delegate transaction ready to be signed. The transaction will delegate the specified amount to the validator.

#### Request body parameters

<a href="/staking-api/api-reference#model/monadstakeactiondto" target="_blank" rel="noopener noreferrer"><code>MonadStakeActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/monadactionresponsedto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Undelegate action

Craft an undelegate transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/undelegate" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/undelegate</code></a>

#### Description

This endpoint will craft an undelegate transaction ready to be signed. The undelegated amount will be placed in a withdrawal slot and can be withdrawn after the withdrawal epoch.

#### Request body parameters

<a href="/staking-api/api-reference#model/monadundelegateactiondto" target="_blank" rel="noopener noreferrer"><code>MonadUndelegateActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/monadactionresponsedto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Withdraw action

Craft a withdraw transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/withdraw" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/withdraw</code></a>

#### Description

Once the withdrawal is available (after the withdrawal epoch), you can claim it. This action will craft a withdraw transaction for the specified withdrawal slot.

#### Request body parameters

<a href="/staking-api/api-reference#model/monadwithdrawactiondto" target="_blank" rel="noopener noreferrer"><code>MonadWithdrawActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/monadactionresponsedto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/claim-rewards" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/claim-rewards</code></a>

#### Description

This endpoint will craft a claim rewards transaction ready to be signed. It allows you to claim accumulated staking rewards.

#### Request body parameters

<a href="/staking-api/api-reference#model/monadclaimrewardsactiondto" target="_blank" rel="noopener noreferrer"><code>MonadClaimRewardsActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/monadactionresponsedto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Compound action

Craft a compound rewards transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/compound" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/compound</code></a>

#### Description

This endpoint will craft a compound rewards transaction ready to be signed. It automatically reinvests your accumulated rewards back into your stake position.

#### Request body parameters

<a href="/staking-api/api-reference#model/monadcompoundactiondto" target="_blank" rel="noopener noreferrer"><code>MonadCompoundActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/monadactionresponsedto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/prepare</code></a>

#### Description

Prepare a signed transaction by gathering the provided signatures (r, s, v) with the unsigned transaction hex string:

#### Request body parameters

<a href="/staking-api/api-reference#model/ethprepareactiondto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/ethprepareactionresponsedto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/POST/api/v1/monad/native/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/action/broadcast</code></a>

#### Description

Broadcast a signed transaction. Usually you will broadcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

<a href="/staking-api/api-reference#model/ethbroadcastactiondto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/ethbroadcastactionresponsedto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionResponseDto</code></a>

____

### Stake balance

Get stake balance for the given address:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/GET/api/v1/monad/native/stake-balance/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/stake-balance/&#123;address&#125;</code></a>

#### Description

Get stake balance and rewards information for the given delegator address. All values are returned in ether units.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve stake balance from

#### Returned

<a href="/staking-api/api-reference#model/getstakebalanceresponsedto" target="_blank" rel="noopener noreferrer"><code>GetStakeBalanceResponseDto</code></a>

____

### Withdrawal requests

Get withdrawal requests for the given address:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/GET/api/v1/monad/native/withdrawals/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/withdrawals/&#123;address&#125;</code></a>

#### Description

Get withdrawal requests for the given delegator address. You can optionally filter by withdrawal ID range using query parameters. All values are returned in ether units.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve withdrawal requests from

#### Query parameters

<a href="/staking-api/api-reference#model/monadwithdrawalquerydto" target="_blank" rel="noopener noreferrer"><code>MonadWithdrawalQueryDto</code></a>

- `startWithdrawId` (optional): Start withdrawal ID in the range (0-255, defaults to 0)
- `endWithdrawId` (optional): End withdrawal ID in the range (0-255, defaults to 255)

#### Returned

<a href="/staking-api/api-reference#model/getwithdrawalrequestsresponsedto" target="_blank" rel="noopener noreferrer"><code>GetWithdrawalRequestsResponseDto</code></a>

____

### Withdrawal request

Get a single withdrawal request:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereummonad/GET/api/v1/monad/native/withdrawal/&#123;address&#125;/&#123;withdrawId&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/native/withdrawal/&#123;address&#125;/&#123;withdrawId&#125;</code></a>

#### Description

Get a single withdrawal request for the given delegator address and withdrawal slot ID. All values are returned in ether units.

#### Request parameters

<a href="/staking-api/api-reference#model/monadwithdrawalparamsdto" target="_blank" rel="noopener noreferrer"><code>MonadWithdrawalParamsDto</code></a>

- `address`: Delegator address
- `withdrawId`: Withdrawal slot identifier (0-255)

#### Returned

<a href="/staking-api/api-reference#model/getwithdrawalrequestresponsedto" target="_blank" rel="noopener noreferrer"><code>GetWithdrawalRequestResponseDto</code></a>

____

