---
sidebar_position: 1
---

# Introduction

Obol Portal is an innovative interface and backend solution developed by Stakely, enabling users to run Ethereum validators within an Obol Distributed Validator Technology (DVT) cluster. This service combines the reliability and security of Stakely's infrastructure with the robustness of Obol's DVT, offering a unique and efficient staking experience for Ethereum holders.

Stakely, a highly reputable staking infrastructure company, brings its expertise to this project. With over $1B of staked assets, more than 10,000 Ethereum validators, and partnerships with major protocols like Lido, Swell, and Stader, Stakely ensures top-tier service quality. Our SOC 2 and ISO 27001 certifications further underline our commitment to security and best practices.

The Obol Portal offers a non-custodial service, meaning users always retain control of their ETH. This documentation will guide you through the features, setup process, and operation of your validators through the Obol Portal.

## Features

1. **Non-Custodial Service**: Users maintain full control of their ETH at all times. Stakely nor Obol cannot access or control user funds.

2. **Smart Contracts**: 
   - Utilizes an Optimistic Withdrawal Recipient (OWR) smart contract for secure consensus layer rewards distribution and principal management.
   - Implements a Splitter contract for reward consensus and execution layer rewards distribution among users, Obol, and Stakely.
   - Both OWR and Splitter contracts are well-audited and immutable, ensuring security and transparency.

3. **Flexible Withdrawals and Rewards**: Users can exit their validators and claim rewards at their discretion.

4. **Comprehensive Dashboard**: Track validators status, balance, rewards, and Obol contribution points through a simple interface.

5. **Obol Contributions Program**: All users staking ETH through this interface are eligible for the Obol contributions program, earning points for their participation. This program allows you to earn access to future governance and ownership in the Obol Collective.

7. **Advanced Infrastructure**:
   - Leverages Obol DVT technology, distributing validator keys across different servers for improved reliability and reduced slashing risks.
   - Utilizes Obol Charon middleware and a diverse set of Ethereum execution and consensus clients to improve client diversity.
   - Operates across multiple server providers and countries to enhance network reliability.

8. **Transparent Fee Structure**: Offers a tiered fee structure based on the number of validators (see table below). Rewards distribution fees are managed by inmutable on-chain contracts.

9. **Ethereum Native Staking**: Supports staking in multiples of 32 ETH since it is native staking, interacting directly with the official Ethereum deposit contract. No pooling or restaking risks are involved.

10. **Testnet and Mainnet Availability**: 
    - Holesky Testnet: [holesky-obol-portal.stakely.io](https://holesky-obol-portal.stakely.io)
    - Ethereum Mainnet: [obol-portal.stakely.io](https://obol-portal.stakely.io)

### Fee Structure

:::info
This fee structure applies only to the rewards produced by the validators, the principal amount is always kept untouched and just accesible by the user.
:::

| Validator Group Size | User Share | Obol Share | Stakely Share |
|----------------------|------------|------------|---------------|
| 1                    | 93%        | 1%         | 6%            |
| 2                    | 93%        | 1%         | 6%            |
| 5                    | 94%        | 1%         | 5%            |
| 10                   | 94%        | 1%         | 5%            |
| 100                  | 95%        | 1%         | 4%            |
| 200                  | 95%        | 1%         | 4%            |
