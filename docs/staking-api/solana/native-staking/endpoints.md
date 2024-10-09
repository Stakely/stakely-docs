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

____

### Create nonce account action

Craft a create nonce account transaction:

- Endpoint: [`/api/v1/solana/action/create-nonce-account`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/create-nonce-account)

#### Description

This endpoint will craft a create nonce account transaction ready to be signed. Creating a nonce account is an important step for durable transactions in Solana, especially useful for complex operations like staking.

#### Request body parameters

[`CreateNonceAccountActionDto`](/staking-api/api-reference#model/createnonceaccountactiondto)

#### Returned

[`SolanaStakingActionResponseDto`](/staking-api/api-reference#model/solanastakingactionresponsedto)

____


### Stake action

Craft a stake transaction:

- Endpoint: [`/api/v1/solana/action/stake`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/stake)

#### Description

This endpoint will craft a stake transaction ready to be signed. 

The stake action combines these steps into a single transaction, simplifying the process for users. When you initiate a stake action through the Staking API, it will craft a transaction that creates the stake account, funds it, and delegates to our validator in one go.

#### Request body parameters

[`SolanaStakeActionDto`](/staking-api/api-reference#model/solanastakeactiondto)

#### Returned

[`SolanaStakingActionResponseDto`](/staking-api/api-reference#model/solanastakingactionresponsedto)

____

### Unstake action (deactivate)

Craft an unstake transaction:

- Endpoint: [`/api/v1/solana/action/ustake`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/unstake)

#### Description

This endpoint will craft an unstake transaction ready to be signed.

The unstake action through the Staking API initiates this process by creating a transaction that deactivates your stake account. It's important to note that this doesn't immediately return your tokens - you'll need to wait for the cooldown period and then perform a separate withdrawal action.

#### Request body parameters

[`SolanaUnstakeActionDto`](/staking-api/api-reference#model/solanaunstakeactiondto)

#### Returned

[`SolanaStakingActionResponseDto`](/staking-api/api-reference#model/solanastakingactionresponsedto)

____

### Withdraw deactivated stake action

Craft a claim rewards transaction:

- Endpoint: [`/api/v1/solana/action/withdraw`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/withdraw)

#### Description

This endpoint will craft a withdraw deactivated stake transaction ready to be signed.

After your stake has been fully deactivated, you can withdraw the tokens back to your main wallet. This process is called withdrawing deactivated stake. Here's an overview of the withdraw action.


The withdraw action through the Staking API creates a transaction that performs this withdrawal. While it's possible to partially withdraw funds in multiple transactions, the most common approach is to fully withdraw the entire balance in a single transaction.

#### Request body parameters

[`SolanaWithdrawActionDto`](/staking-api/api-reference#model/solanawithdrawactiondto)

#### Returned

[`SolanaStakingActionResponseDto`](/staking-api/api-reference#model/solanastakingactionresponsedto)

____

### Prepare action

Gathers signature and unsigned tx:

- Endpoint: [`/api/v1/solana/action/prepare`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/prepare)

#### Description

Prepare a signed transaction by gathering the provided signatures with the unsigned transaction hex string:

#### Request body parameters

[`SolanaPrepareActionDto`](/staking-api/api-reference#model/solanaprepareactiondto)

#### Returned

[`SolanaPrepareActionResponseDto`](/staking-api/api-reference#model/solanaprepareactionresponsedto)

____

### Broadcast action

Broadcast a signed transaction

- Endpoint: [`/api/v1/solana/action/broadcast`](/staking-api/api-reference#tag/solana/post/api/v1/solana/action/broadcast)

#### Description

Broadcast a signed transaction. Usually you will brodcast the signed transaction returned in `prepare` previous step:

#### Request body parameters

[`SolanaBroadcastActionDto`](/staking-api/api-reference#model/solanabroadcastactiondto)

#### Returned

[`SolanaBroadcastActionResponseDto`](/staking-api/api-reference#model/solanabroadcastactionresponsedto)
