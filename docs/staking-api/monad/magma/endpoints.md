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
- <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer">Scalar API Docs</a>.
- <StakingOpenApiLink />
:::

## Authentication

In order to use staking api related endpoints you need to include your **API KEY**

:::tip

**Heads up!**
To obtain a valid API key required for authentication, please refer to the [Authentication > Auth](/staking-api/authentication#auth) section of the documentation.

:::

**Header:**

| Name | Description | Example value | Required |
|---|---|---|---|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network identifier | `143` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to select the Monad network (currently `143` for Monad Mainnet).

::::info
If you omit the header the API falls back to the default Monad network configured for your account.
::::

### List available networks

Use this helper endpoint to obtain the list of Monad Magma networks that are currently enabled for your API key.

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/networks</code></a>

Response payload fields:

| Field | Description |
|---|---|
| `name` | Internal blockchain entry name |
| `type` | Blockchain type string (always `ETHEREUM`) |
| `chain_id` | Chain identifier (currently `143`) |
| `is_default` | `true` when this network is used as fallback |

____

### Delegate action

Craft a Magma delegate transaction:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/action/delegate</code></a>

#### Description

This endpoint crafts a Magma delegate transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/MagmaStakeActionDto" target="_blank" rel="noopener noreferrer"><code>MagmaStakeActionDto</code></a>

- `address`: wallet address that performs the action
- `amount`: MON amount to delegate (minimum `100` MON)

#### Returned

<a href="/staking-api/api-reference#model/MonadActionResponseDto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Undelegate action

Craft a Magma undelegate transaction:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/action/undelegate</code></a>

#### Description

This endpoint crafts a Magma undelegate transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/MagmaUndelegateActionDto" target="_blank" rel="noopener noreferrer"><code>MagmaUndelegateActionDto</code></a>

- `address`: wallet address that performs the action
- `amount`: MON amount to undelegate

#### Returned

<a href="/staking-api/api-reference#model/MonadActionResponseDto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Withdraw action

Craft a Magma withdraw transaction:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/action/withdraw</code></a>

#### Description

This endpoint crafts a Magma withdraw transaction for a specific withdrawal request.

#### Request body parameters

<a href="/staking-api/api-reference#model/MagmaWithdrawActionDto" target="_blank" rel="noopener noreferrer"><code>MagmaWithdrawActionDto</code></a>

- `address`: wallet address that performs the action
- `request_id`: owner request ID to withdraw

#### Returned

<a href="/staking-api/api-reference#model/MonadActionResponseDto" target="_blank" rel="noopener noreferrer"><code>MonadActionResponseDto</code></a>

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/action/prepare</code></a>

#### Description

Prepare a signed transaction by gathering the provided signatures (`r`, `s`, `v`) with the unsigned transaction hex string.

#### Request body parameters

<a href="/staking-api/api-reference#model/EthPrepareActionDto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/EthPrepareActionResponseDto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/action/broadcast</code></a>

#### Description

Broadcast a signed Magma transaction.

#### Request body parameters

<a href="/staking-api/api-reference#model/EthBroadcastActionDto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/EthBroadcastActionResponseDto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionResponseDto</code></a>

____

### Balance

Get Magma staking balance for the given address:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/balance/&#123;address&#125;</code></a>

#### Description

Get current Magma balance values for a delegator address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve balance from.

#### Returned

<a href="/staking-api/api-reference#model/MagmaBalanceResponseDto" target="_blank" rel="noopener noreferrer"><code>MagmaBalanceResponseDto</code></a>

- `staked`: currently staked MON
- `unstaked`: pending unstaked MON
- `withdrawable`: withdrawable redeem request shares

____

### Withdrawal info

Get Magma withdrawal requests for the given address:

- Endpoint: <a href="/staking-api/api-reference" target="_blank" rel="noopener noreferrer"><code>/api/v1/monad/magma/withdrawal/&#123;address&#125;</code></a>

#### Description

Get current pending withdrawal information for a Magma address.

#### Request parameters

At url param you will need to pass the `address` you want to retrieve withdrawal info from.

#### Returned

<a href="/staking-api/api-reference#model/MagmaWithdrawalResponseDto" target="_blank" rel="noopener noreferrer"><code>MagmaWithdrawalResponseDto[]</code></a>

- `request_id`: current owner request ID
- `assets`: requested assets in MON
- `withdrawable_time`: unix timestamp for withdraw availability

____
