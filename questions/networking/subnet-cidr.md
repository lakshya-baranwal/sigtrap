---
title: "What is a subnet and CIDR notation?"
tags: [networking, subnet, CIDR, IP]
difficulty: medium
---

CIDR (Classless Inter-Domain Routing) notation specifies IP address ranges using a prefix length.

```
192.168.1.0/24

Network address:  192.168.1.0
Subnet mask:      255.255.255.0  (/24 = 24 bits set)
Host range:       192.168.1.1 — 192.168.1.254
Broadcast:        192.168.1.255
Total hosts:      254 (2^8 - 2)
```

```bash
# Calculate subnet info
ipcalc 10.0.0.0/16
# Network:   10.0.0.0
# Netmask:   255.255.0.0
# Broadcast: 10.0.255.255
# HostMin:   10.0.0.1
# HostMax:   10.0.255.254
# Hosts:     65534

# View routing table
ip route show
# default via 192.168.1.1 dev eth0
# 192.168.1.0/24 dev eth0 proto kernel
```

Private address ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
