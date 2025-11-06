---
sidebar_position: 2
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

**Header:**

| Name      | Description | Example value | Required
| --------------- | ------------ | ------------ |------------ |
| `X-API-KEY` | Your api key value | `<API_KEY_VALUE>` | ✅ |

____

### New validator action

New Validator (deposit-data):

- Endpoint: [`/api/v1/eth/native/action/new-validator`](/staking-api/api-reference#tag/eth-native/post/api/v1/eth/native/action/new-validator)

#### Description

This endpoint will get a fresh new publickey and build a valid signed deposit data

#### Request body parameters

[`NewValidatorActionDto`](/staking-api/api-reference#model/newvalidatoractiondto)

#### Returned

[`NewValidatorActionResponseDto`](/staking-api/api-reference#model/newvalidatoractionresponsedto)

____

### Get exit message action

Get encrypted exit message for the given validator

- Endpoint: [`/api/v1/eth/native/action/exit-message/{public_key}​`](/staking-api/api-reference#tag/eth-native/get/api/v1/eth/native/action/exit-message/{public_key})

#### Description

This endpoint will build an exit signed message for the given validator. PGP encrypts the message for extra security

#### Request param

At url param you will need to pass the targeted `public_key` to be exited

#### Returned

[`ExitMessageActionResponseDto`](/staking-api/api-reference#tag/eth-native/post/v1/eth/native/validators)

____

### Get Validators

Gets existing validators created by previously `new-validator` endpoint

- Endpoint: [`/api/v1/eth/native/validators​`](/staking-api/api-reference#tag/eth-native/get/api/v1/eth/native/validators)

#### Description

This endpoint will get all existing validators data, and with existing beacon chain data (if validator has been deposited)

#### Request Query parameters

If you want you are able to filter validators by passing some of the next query params. All query params are *optional* and you are free to combine them if needed:

| Param | Value | Description |
| --------------- | ------------ | ------------ |
| **public_key**   |  `0x801b6d828105ccd8df0f3b3d45d4e799632657c313d15a5a1bac50104e3d4b850187b12e631090ee36809a1f722563e7` | Validator public key hex value |
| **withdrawal_address**   |  `0x90d2af5efde4c61cefa11d3548d044dcae768fdc` | Withdrawal credential address|
| **status**   |  One of -> Enum : [`pending`, `deposited`, `active_online`, `active_offline`, `exiting_online`, `exited`, `exiting_offline`, `slashed`, `slashing_online`, `slashing_offline`] | Beacon chain validator status |


#### Returned

[`ValidatorResponseDto`](/staking-api/api-reference#model/validatorresponsedto)
