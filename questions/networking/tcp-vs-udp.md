---
title: "What is the difference between TCP and UDP?"
tags: [networking, TCP, UDP, transport]
difficulty: easy
---

| Property | TCP | UDP |
|----------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best-effort |
| Ordering | In-order delivery | No ordering |
| Flow control | Yes | No |
| Congestion control | Yes | No |
| Overhead | Higher | Lower |
| Use cases | HTTP, SSH, FTP | DNS, VoIP, games, streaming |

```python
# TCP socket
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('example.com', 80))

# UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(b'data', ('8.8.8.8', 53))
```

TCP's reliability mechanisms (ACKs, retransmission, flow control) add latency. Real-time applications build their own reliability on top of UDP.
