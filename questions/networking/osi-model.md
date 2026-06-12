---
title: "What is the OSI model?"
tags: [networking, OSI, layers, protocols]
difficulty: easy
---

The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes how network communication is structured across 7 layers.

| Layer | Name | Protocol Examples | Unit |
|-------|------|-------------------|------|
| 7 | Application | HTTP, DNS, FTP, SMTP | Data |
| 6 | Presentation | TLS/SSL, JPEG, gzip | Data |
| 5 | Session | NetBIOS, RPC | Data |
| 4 | Transport | TCP, UDP | Segment |
| 3 | Network | IP, ICMP, OSPF | Packet |
| 2 | Data Link | Ethernet, Wi-Fi, ARP | Frame |
| 1 | Physical | Coax, Fiber, Radio | Bit |

```bash
# Inspect at various layers
ip addr show           # Layer 3 — IP addresses
ip link show           # Layer 2 — MAC addresses
ss -tunlp              # Layer 4 — TCP/UDP ports
curl -v https://...    # Layer 7 — HTTP headers
```

In practice, TCP/IP collapses this into 4 layers: Link, Internet, Transport, Application.
