---
title: "What is the TCP three-way handshake?"
tags: [networking, TCP, handshake, connection]
difficulty: medium
---

TCP establishes a reliable connection using a three-way handshake before any data is exchanged.

```
Client                    Server
  |                          |
  |------  SYN (seq=x)  ---->|  1. Client initiates
  |                          |
  |<-- SYN-ACK (seq=y,ack=x+1) |  2. Server acknowledges + sends its own SYN
  |                          |
  |------  ACK (ack=y+1) --->|  3. Client acknowledges
  |                          |
  |===== Data Transfer ======|
```

```bash
# Capture handshake with tcpdump
tcpdump -n 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0' -i eth0

# View TCP state machine
ss -tn state established
ss -tn state time-wait
```

Connection teardown uses a four-way FIN handshake. TIME_WAIT state (2×MSL) ensures delayed packets don't corrupt new connections on the same port.
