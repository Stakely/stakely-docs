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

| Name        | Description | Example value | Required |
|-------------|-------------|---------------|----------|
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |
| `X-NETWORK` | Blockchain network/chain identifier | `cosmoshub-4` | ⚪ |

### X-NETWORK header

Use the `X-NETWORK` header to tell the API which Cosmos network should process the request (e.g., `cosmoshub-4`, `juno-1`).

::::info
`X-NETWORK` accepts the same identifier exposed as `chain_id` in the [Cosmos Chain Registry](https://github.com/cosmos/chain-registry). When the header is omitted the default Cosmos network configured for your account will be used.
::::

::::tip
Need support for another network? Reach out at [admin@stakely.io](mailto:admin@stakely.io).
::::

### List available networks

If you are unsure which Cosmos networks are enabled for your account you can ask the API directly.

- Endpoint: [`/api/v1/cosmos/native/networks`](/staking-api/api-reference#tag/cosmos/get/api/v1/cosmos/native/networks)

Each object in the response includes:

| Field | Description |
|-------|-------------|
| `name` | Internal name of the blockchain entry |
| `type` | Blockchain type string (always `COSMOS`) |
| `chain_id` | Chain identifier, same as the Cosmos Chain Registry `chain_id` |
| `is_default` | `true` when this network is used as fallback |

____

### Stake action

Craft a stake transaction:

- Endpoint: [`/api/v1/cosmos/native/action/stake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/native/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed.

#### Request body parameters

[`StakeActionDto`](/staking-api/api-reference#model/stakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Unstake action

Craft an unstake transaction:

- Endpoint: [`/api/v1/cosmos/native/action/unstake`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/native/action/unstake)

#### Description

This endpoint will craft an unstake transaction ready to be signed.

#### Request body parameters

[`UnstakeActionDto`](/staking-api/api-reference#model/unstakeactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Claim rewards action

Craft a claim rewards transaction:

- Endpoint: [`/api/v1/cosmos/native/action/claim-rewards`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/native/action/claim-rewards)

#### Description

This endpoint will craft a claim rewards transaction ready to be signed.

#### Request body parameters

[`ClaimRewardsActionDto`](/staking-api/api-reference#model/claimrewardsactiondto)

#### Returned

[`StakingActionResponseDto`](/staking-api/api-reference#model/stakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/cosmos/native/action/prepare`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/native/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`PrepareActionDto`](/staking-api/api-reference#model/prepareactiondto)

#### Returned

[`PrepareActionResponseDto`](/staking-api/api-reference#model/preparectionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/cosmos/native/action/broadcast`](/staking-api/api-reference#tag/cosmos/post/api/v1/cosmos/native/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`BroadcastActionDto`](/staking-api/api-reference#model/brodacastactiondto)

#### Returned

[`BroadcastActionResponseDto`](/staking-api/api-reference#model/broadcastctionresponsedto)