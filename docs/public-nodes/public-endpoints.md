---
sidebar_position: 1
---

# Introduction

Stakely, as a leading infrastructure provider in the blockchain space, offers publicly accessible RPC, LCD, and JSON-RPC endpoints as a public good. Our mission is to support blockchain ecosystems by enhancing the development experience and facilitating user access to blockchain resources. These public endpoints are available for free use, although some may have rate limits applied to ensure fair usage among all users. For developers or organizations requiring more extensive access, customized services, and SLAs, we encourage you to reach out to us for a tailored service offering.

Our **load balanced endpoints** are designed to optimize reliability and performance. These endpoints distribute requests across multiple community nodes, ensuring that your applications remain responsive and robust. Here are the key features of our load balanced endpoints:
- **Node Health Monitoring**: Continuous monitoring of all the connected nodes to ensure uninterrupted service.
- **CORS Support**: Enables cross-origin requests, facilitating the development of web applications that interact with our endpoints.
- **Automatic Re-routing**: In the event of node failures, requests are automatically redirected to alternate providers to maintain service continuity.
- **Request Retrying**: Requests that time out after 10 seconds are automatically retried, enhancing reliability.
- **Intelligent Request Caching**: To improve performance and reduce latency, frequently requested data is intelligently cached.
- **Distributed Infrastructure**: Deployment across a distributed infrastructure ensures high scalability and availability.


## Supported Networks

Our public nodes support a variety of blockchain networks, offering both standard and load balanced endpoints to meet your development needs. Below is a regularly updated list of currently supported networks and their respective endpoints:

| Blockchain      | Endpoint type | Load Balanced? | URL | 
| --------------- | ------------ | ------------ | ------------ |
| Cosmos Hub Mainnet    |       RPC     |       ✅      |     https://cosmoshub-rpc.stakely.io   |
| Cosmos Hub Mainnet     |       RPC     |       ❌      |     https://cosmoshub-rpc-server-01.stakely.io   |
| Cosmos Hub Mainnet     |       LCD     |       ✅      |     https://cosmoshub-lcd.stakely.io   |
| Cosmos Hub Mainnet     |       LCD     |       ❌      |     https://cosmoshub-lcd-server-01.stakely.io   |
| Ethereum Holesky     |       JSON-RPC     |       ❌      |      https://holesky-checkpoint-sync.stakely.io   |

Please note that while these endpoints are continuously monitored for optimal performance, they are part of a free service, and as such, we cannot guarantee specific uptimes or request limits. If your needs surpass the capabilities of our complimentary offerings, we invite you to contact us.
