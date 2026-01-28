---
sidebar_position: 2
title: Introduction
---

# What is the Stakely Staking API

The Stakely Staking API is a B2B API suite that lets you integrate staking functionality into your product with minimal effort. It is built for non-custodial wallets, exchanges, fintech platforms, institutions, integrators, and custodians that want to offer staking without managing their own infrastructure.
The API is production-ready and supports multiple networks through a single, unified REST interface. It also enables flexible revenue-sharing models, making it suitable for different business setups.

All Stakely infrastructure is SOC 2 Type II and ISO 27001 certified and is subject to regular security audits.


:::info
The Stakely Staking API is an integration layer, not a dependency. It is designed to simplify and accelerate staking integrations, but partners can always use native blockchain methods to interact directly with Stakely validators and reach the same revenue-sharing agreements independently of the API.

All staking operations are fully on-chain. Even in the unlikely event that the API or Stakely infrastructure were to become unavailable, withdrawing funds would never be at risk, as staking and unstaking can always be performed through the blockchain’s native methods.
:::


## Key Features

* **Multi-network support**: Blockchains differ significantly in their staking mechanics, and integrating each network independently requires substantial technical effort. The Stakely Staking API supports multiple networks using consistent methods, abstracting protocol-level complexity and making multi-chain staking integrations much easier.

* **Transaction crafting**: The API prepares complete transaction payloads, so you only need to sign them. This significantly reduces the effort required to integrate staking for a new blockchain and keeps signing fully under your control.

* **Non-custodial by design**: Stakely never manages private keys. All transactions are signed by you using your preferred signing setup. You can sign locally, via a custodian like Fireblocks, hardware device, MPC wallet, or any other signing method. We only generate the transaction payloads. The documentation includes examples showing how to sign transactions using different signing approaches.

* **Backed by Stakely validator infrastructure**: Built on top of Stakely’s own validator infrastructure, with a proven track record since 2020. Stakely has historically secured over $1.5B in delegated assets, participated in more than 100 networks, and is trusted by a large number of foundations, liquid staking protocols, and institutional partners.



## Integration Overview

This section provides a simplified, high-level overview of the integration flow. For detailed implementation guidance or custom setups, please contact us.

* **Register**: Create an account and generate an API key at [https://app.stakely.io/staking-api](https://app.stakely.io/staking-api).

* **Integrate**: Use your preferred programming language to integrate the API and craft staking transactions. You can start developing and testing using the supported testnet networks.

* **Sign**: You are fully responsible for signing transaction payloads using your chosen signing method. Private keys and funds are never shared with Stakely.

* **Infrastructure**: Stakely operates and maintains the underlying blockchain infrastructure, so you do not need to manage validators or nodes.

* **Rewards and revenue share**: Staking rewards are calculated and distributed automatically by the blockchain. Revenue sharing is handled according to the private commercial agreement in place.


## Next Steps

The following sections walk through the different components of the API and how they fit together. If you have questions or need clarification on a specific integration, please reach out using the contact details provided in the footer.
