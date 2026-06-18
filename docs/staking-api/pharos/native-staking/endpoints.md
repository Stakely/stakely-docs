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

| Name        | Description | Example value | Required |
|-------------|-------------|---------------|----------|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network identifier | `1672` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to select the Pharos network. For Pharos mainnet, the chain ID is typically **`1672`** (confirm with the networks endpoint below).

::::info
If you omit the header the API falls back to the default Pharos network configured for your account.
::::

::::tip
Need another Pharos environment exposed? Let us know at [admin@stakely.io](mailto:admin@stakely.io).
::::

### List available networks

Use this helper endpoint to obtain the list of Pharos staking networks that are currently enabled for your API key.

 - Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/GET/api/v1/pharos/native/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/networks</code></a>

Response payload: array of <a href="/staking-api/api-reference#model/NetworkResponseDto" target="_blank" rel="noopener noreferrer"><code>NetworkResponseDto</code></a>

| Field | Description |
|-------|-------------|
| `name` | Internal blockchain entry name |
| `type` | Blockchain type string (typically `ETHEREUM`) |
| `chain_id` | Chain identifier to use as `X-NETWORK` |
| `is_default` | `true` when this network is used as fallback |

____

### Delegate action

Craft a delegate transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/delegate" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/delegate</code></a>

#### Description

This endpoint crafts a delegate transaction ready to be signed. The transaction delegates the specified `amount` (native token, 18 decimals) from `address` to the validator pool.

#### Request body parameters

<a href="/staking-api/api-reference#model/PharosDelegateActionDto" target="_blank" rel="noopener noreferrer"><code>PharosDelegateActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/PharosActionResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosActionResponseDto</code></a>

____

### Undelegate action

Craft an undelegate transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/undelegate" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/undelegate</code></a>

#### Description

This endpoint crafts an undelegate transaction ready to be signed. It exits the delegator’s effective stake for the given `address`. Principal becomes withdrawable only after the protocol **84-epoch** withdraw window.

#### Request body parameters

<a href="/staking-api/api-reference#model/PharosUndelegateActionDto" target="_blank" rel="noopener noreferrer"><code>PharosUndelegateActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/PharosActionResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosActionResponseDto</code></a>

____

### Withdraw action

Craft a withdraw (`claimStake`) transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/withdraw" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/withdraw</code></a>

#### Description

Once principal has passed the unlock period, this action crafts a transaction to withdraw completed unstake back to the wallet. If nothing is withdrawable or funds are still locked, the API returns a validation error.

#### Request body parameters

<a href="/staking-api/api-reference#model/PharosWithdrawActionDto" target="_blank" rel="noopener noreferrer"><code>PharosWithdrawActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/PharosActionResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosActionResponseDto</code></a>

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/claim-rewards" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/claim-rewards</code></a>

#### Description

This endpoint crafts a claim rewards transaction ready to be signed. It transfers accumulated staking rewards for the delegator `address`.

#### Request body parameters

<a href="/staking-api/api-reference#model/PharosClaimRewardsActionDto" target="_blank" rel="noopener noreferrer"><code>PharosClaimRewardsActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/PharosActionResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosActionResponseDto</code></a>

____

### Compound rewards action

Craft a compound rewards transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/compound-rewards" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/compound-rewards</code></a>

#### Description

This endpoint crafts a compound rewards transaction ready to be signed. It reinvests claimable rewards into the active stake for the delegator `address`.

#### Request body parameters

<a href="/staking-api/api-reference#model/PharosCompoundRewardsActionDto" target="_blank" rel="noopener noreferrer"><code>PharosCompoundRewardsActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/PharosActionResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosActionResponseDto</code></a>

____

### Prepare action

After signing `raw_tx_hex_hash`, call the Pharos prepare endpoint:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/prepare</code></a>

#### Description

Prepare a signed transaction by combining the provided signatures (`r`, `s`, `v`) with the unsigned transaction hex from the crafting response.

#### Request body parameters

<a href="/staking-api/api-reference#model/EthPrepareActionDto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/EthPrepareActionResponseDto" target="_blank" rel="noopener noreferrer"><code>EthPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast the signed transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/POST/api/v1/pharos/native/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/action/broadcast</code></a>

#### Description

Broadcast a signed transaction. Typically you broadcast the hex returned from the prepare step.

#### Request body parameters

<a href="/staking-api/api-reference#model/EthBroadcastActionDto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionDto</code></a>

#### Returned

<a href="/staking-api/api-reference#model/EthBroadcastActionResponseDto" target="_blank" rel="noopener noreferrer"><code>EthBroadcastActionResponseDto</code></a>

____

### Stake balance

Get stake balance for the given address:

- Endpoint: <a href="/staking-api/api-reference#tag/ethereumpharos/GET/api/v1/pharos/native/stake-balance/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/pharos/native/stake-balance/&#123;address&#125;</code></a>

#### Description

Returns a breakdown of stake and rewards for the delegator. All numeric fields are **decimal strings** in native token units (18 decimals).

#### Request parameters

Path parameter: `address` — delegator EVM address to query.

#### Returned

<a href="/staking-api/api-reference#model/PharosStakeBalanceResponseDto" target="_blank" rel="noopener noreferrer"><code>PharosStakeBalanceResponseDto</code></a>

| Field | Description |
|-------|-------------|
| `pendingStake` | Pending stake (activation), decimal string |
| `stake` | Active stake (including eligible pending activation), decimal string |
| `pendingUnstake` | Amount in undelegation / lock period (**84 epochs** by default), decimal string |
| `pendingWithdrawStake` | Amount withdrawable after unlock epoch, decimal string |
| `rewards` | Claimable rewards, decimal string |

____
