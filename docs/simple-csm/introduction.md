---
sidebar_position: 1
title: introduction
---

# Simple CSM Documentation

<br></br>

# Introduction

**Simple CSM** is a managed service built by **Stakely** on top of **Lido CSM (Community Staking Module)**. This documentation provides an overview of the product's inner workings. It assumes basic knowledge of **Lido** and **Ethereum** and avoids diving too deeply into technical concepts outside the scope of this guide.

<br></br>

### Key Concepts

Before diving in, let’s define some key terms:

- **Lido**: A liquid staking protocol built on Ethereum. It uses smart contracts to pool Ethereum from users and stake it in multiples of **32 ETH** in validators. This batching is required because Ethereum validators must have exactly **32 ETH** staked. Lido’s smart contracts are decentralized and governed by a **DAO** managed by **LDO token holders**.
- **Lido Modules**: Lido doesn’t run validators directly. Instead, it delegates this task to **node operators**, which can include staking companies, individuals (solo stakers), or groups of individuals and companies. Lido allocates a percentage of the stake to different types of node operators through three modules:
  - **Permissioned Module**: For staking companies.
  - **Simple DVT Module**: For groups of individuals and staking companies.
  - **CSM (Community Staking Module)**: A permissionless module where anyone can run validators by providing a bond.

- **Lido CSM**: This module is **completely permissionless**, allowing anyone to run validators for Lido. A bond ranging between **1.3 ETH** and **2.4 ETH** per validator is required as a guarantee of proper participation. This documentation will explore the inner workings of this module in detail.

With these concepts in mind, **Simple CSM by Stakely** enables users to leverage Stakely’s infrastructure to run validators for Lido. This setup allows users to earn **over x2** the rewards of standard staking, as they earn rewards from both the bond and the validator commissions.

<br></br>

## Flows

### Staking

This section explains the staking flow chronologically, from Stakely’s backend operations to user actions on the Lido protocol.

1. **Validator Pre-Generation**:
   - Stakely pre-generates a large number of validators. The private keys are securely stored and loaded into Stakely’s infrastructure, ensuring they’re ready to validate when activated. The public information, known as **deposit data**, is stored separately.

2. **Client Registration**:
   - A new client registers on the **Simple CSM platform** and purchases a subscription for a specific number of validators.
   - The client instantly receives the **deposit data** for the validators. It is just a formatted text that includes the public key and other parameters required for staking.
   - No further actions are required on the Stakely interface at this stage.

3. **Lido Interface Interaction**:
   - The client navigates to the **Lido CSM interface** (`csm.lido.fi`) and pastes the deposit data.
   - A transaction is performed, including the calculated bond:
     - **First validator**: **2.4 ETH** (or **1.5 ETH** with an early adopter badge).
     - **Subsequent validators**: **1.3 ETH**.
   - The bond can be paid in **ETH** or **stETH**, but it is always converted to **stETH** to start earning rewards immediately.

4. **ETH Deposit**:
   - Lido deposits **32 ETH** into the validators when enough ETH is available. This process can take hours or days, depending on the demand for staking on Lido. More details about the stake allocation mechanism available [here](https://operatorportal.lido.fi/modules/community-staking-module#block-4979446857e44503942bd80678465607).

<br></br>

### Exits

Exiting is the process of leaving the Ethereum validator set. In Simple CSM, this involves additional steps. Note that exiting is **irreversible**; to stake again, you must repeat the entire process.

1. **Initiate Exit via Stakely UI**:
   - Navigate to the **Simple CSM UI**, select the validators to exit, and confirm the request.
   - Stakely sends an **exit message** to the Beacon Chain, signed by the requested validators. Please note that this a manual process so it can take some hours or days if it is requested on a weekend.
   - **Important**: Do not cancel your subscription immediately, as the validator must remain active until the process is complete. Canceling early may result in a small loss of rewards.

2. **Queues**:
   - After the exit message is sent, the validator enters two queues sequentially:
     - **Exit Queue**: Waits for the validator to exit the active set.
     - **Withdrawal Queue**: Waits for the validator’s funds to become withdrawable.
   - The duration of these queues depends on the network exit demand and other factors that are out of the scope of this documentation.

3. **Finalize Exit on Lido**:
   - Once the validator is fully exited, you can remove your validator keys from the **Lido CSM UI** and claim your bond.

**Note**: In the upcoming Ethereum upgrade (codenamed **Petra**), Lido will support exits without relying on Stakely. However, the Stakely UI option will remain available.

<br></br>

## Rewards

Simple CSM enables users to earn **over 2x** the standard Ethereum staking APR. Here’s how it works:

1. **Bond Rewards**:
   - The bond (in ETH or stETH) is converted to **stETH**, earning standard Ethereum staking rewards. These rewards are distributed daily.

2. **Validator Commissions**:
   - By running validators for Lido, you earn additional rewards from validator commissions. These rewards are distributed monthly.

Rewards can be claimed anytime through the Lido CSM dashboard.

This dual-reward structure allows you to maximize returns on the same capital. For more details on Lido CSM rewards, refer to their [official documentation](https://docs.lido.fi/staking-modules/csm/rewards/).

<br></br>

## Payments and Private Data

Simple CSM supports two types of recurring payments:

- **Fiat via Stripe**:
  - Accepts credit cards, Apple Pay, Google Pay, and Link.
  - Personal data is managed by **Stripe**; Stakely does not store any personal information.

- **Crypto via Loop Crypto**:
  - Accepts a wide range of coins and stablecoins on the following networks: Ethereum, Optimism, BNB, Polygon, Base, and Arbitrum.
  - Personal data is also managed by **Stripe**; neither Stakely nor Loop Crypto stores any personal information.

<br></br>

## Stakely Ethereum Infrastructure

Stakely operates its **Simple CSM Ethereum validators** on a highly available and secure infrastructure. Key features include:

- **Proven Track Record**: Running since the inception of the Ethereum Beacon Chain, with over **10,000 active validators** across multiple protocols and clients.
- **Client Diversity**: A diversified mix of **consensus** and **execution clients** to maximize network resilience and client diversity.
- **Geographical Diversity**: Nodes deployed in underrepresented locations to enhance decentralization.
- **Certifications**: **SOC II Type 2** and **ISO 27001** certified, with slashing insurance provided.
- **Transparency**: Stakely reports non-private validator information to Lido for internal reporting, ensuring alignment with Lido’s transparency goals.
