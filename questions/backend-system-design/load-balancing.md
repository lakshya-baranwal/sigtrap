---
title: "What is a Load Balancer and what algorithms are used?"
tags: [backend, system-design, scaling, load-balancing]
difficulty: medium
---

A load balancer distributes incoming network traffic across a group of backend servers to ensure high availability and reliability.

### Common Load Balancing Algorithms:
- **Round Robin**: Requests are distributed sequentially.
- **Least Connections**: Directs traffic to the server with the fewest active connections.
- **IP Hash**: Derives a hash from the client's IP to assign a server, ensuring the same client reaches the same server (session persistence).
- **Consistent Hashing**: Used in distributed caching to minimize keys remapped when servers scale up or down.
