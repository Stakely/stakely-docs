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

In order to use staking api related endpoints you need to include your **API KEY**.

:::tip

**Heads up!**
To obtain a valid API key required for authentication, please refer to the [Authentication > Auth](/staking-api/authentication#auth) section of the documentation.

:::

**Header:**

| Name        | Description | Example value | Required |
|-------------|-------------|---------------|----------|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network identifier | `mainnet` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to select the Sui network.

::::info
If you omit the header the API falls back to the default Sui network configured for your account.
::::

____

### List available networks

Use this helper endpoint to obtain the list of Sui staking networks currently enabled for your API key.

- Endpoint: <a href="/staking-api/api-reference#tag/sui/GET/api/v1/sui/native/networks" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/networks</code></a>
- Method: `GET`

Response payload fields:

| Field | Description |
|-------|-------------|
| `name` | Internal blockchain entry name |
| `type` | Blockchain type string (always `SUI`) |
| `chain_id` | Chain identifier |
| `is_default` | `true` when this network is used as fallback |

____

### Stake action

Craft an unsigned stake transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/sui/POST/api/v1/sui/native/action/stake" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/action/stake</code></a>
- Method: `POST`

#### Description

This endpoint crafts an unsigned stake transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/SuiStakeActionDto" target="_blank" rel="noopener noreferrer"><code>SuiStakeActionDto</code></a>

- `wallet_address` (required): Wallet address of the user that will perform the staking action.
- `validator_address` (optional): Validator address to stake to. If omitted, defaults to configured validator.
- `amount` (required): Amount of SUI to stake (minimum 1 SUI, up to 9 decimals).

#### Returned

<a href="/staking-api/api-reference#model/SuiStakeActionResponseDto" target="_blank" rel="noopener noreferrer"><code>SuiStakeActionResponseDto</code></a>

- `unsigned_tx_b64`: Unsigned transaction bytes encoded as base64.

____

### Unstake action

Craft an unsigned unstake transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/sui/POST/api/v1/sui/native/action/unstake" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/action/unstake</code></a>
- Method: `POST`

#### Description

This endpoint crafts an unsigned unstake transaction ready to be signed.

#### Request body parameters

<a href="/staking-api/api-reference#model/SuiUnstakeActionDto" target="_blank" rel="noopener noreferrer"><code>SuiUnstakeActionDto</code></a>

- `wallet_address` (required): Wallet address of the user that will perform the unstaking action.
- `staked_sui_object_id` (required): Object ID of the `StakedSui` object to withdraw.

#### Returned

<a href="/staking-api/api-reference#model/SuiStakeActionResponseDto" target="_blank" rel="noopener noreferrer"><code>SuiStakeActionResponseDto</code></a>

- `unsigned_tx_b64`: Unsigned transaction bytes encoded as base64.

____

### Prepare action

Gathers signatures and unsigned transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/sui/POST/api/v1/sui/native/action/prepare" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/action/prepare</code></a>
- Method: `POST`

#### Description

Prepare a signed transaction by combining the unsigned transaction bytes and signatures into a single payload.

#### Request body parameters

<a href="/staking-api/api-reference#model/SuiPrepareActionDto" target="_blank" rel="noopener noreferrer"><code>SuiPrepareActionDto</code></a>

- `unsigned_tx_b64`: Unsigned transaction bytes in base64.
- `signatures`: Array of base64-encoded signatures.

#### Returned

<a href="/staking-api/api-reference#model/SuiPrepareActionResponseDto" target="_blank" rel="noopener noreferrer"><code>SuiPrepareActionResponseDto</code></a>

____

### Broadcast action

Broadcast a signed transaction:

- Endpoint: <a href="/staking-api/api-reference#tag/sui/POST/api/v1/sui/native/action/broadcast" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/action/broadcast</code></a>
- Method: `POST`

#### Description

Broadcast a signed Sui transaction.

#### Request body parameters

<a href="/staking-api/api-reference#model/SuiBroadcastActionDto" target="_blank" rel="noopener noreferrer"><code>SuiBroadcastActionDto</code></a>

- `unsigned_tx_b64` (required): Unsigned transaction bytes encoded as base64.
- `signatures` (required): Array of base64-encoded signatures for the transaction.

#### Returned

<a href="/staking-api/api-reference#model/SuiBroadcastActionResponseDto" target="_blank" rel="noopener noreferrer"><code>SuiBroadcastActionResponseDto</code></a>

- `tx_digest`: Transaction digest of the broadcasted transaction.

____

### Stake balance

Get staked balance for the given address:

- Endpoint: <a href="/staking-api/api-reference#tag/sui/GET/api/v1/sui/native/stake-balance/&#123;address&#125;" target="_blank" rel="noopener noreferrer"><code>/api/v1/sui/native/stake-balance/&#123;address&#125;</code></a>
- Method: `GET`

#### Description

Get staked balance information for the given Sui wallet address.

#### Request parameters

Path params:

- `address`: Sui wallet address.

#### Returned

<a href="/staking-api/api-reference#model/SuiStakedBalanceResponseDto" target="_blank" rel="noopener noreferrer"><code>SuiStakedBalanceResponseDto</code></a>

- `wallet_address`: Wallet address that was queried.
- `total_mist`: Total staked balance in MIST.
- `total_sui`: Total staked balance in SUI.
- `staked_objects`: Array of `StakedSuiObjectDto`.
- `fungible_objects`: Array of `FungibleStakedSuiDto`.
