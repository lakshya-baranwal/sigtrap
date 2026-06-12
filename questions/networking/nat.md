---
title: "What is NAT?"
tags: [networking, NAT, routing, firewall]
difficulty: medium
---

NAT (Network Address Translation) allows multiple devices on a private network to share a single public IP address.

```
Private Network          NAT Router          Internet
192.168.1.10:5000  →   203.0.113.1:40001  →  93.184.216.34:80
192.168.1.11:5000  →   203.0.113.1:40002  →  93.184.216.34:80
```

The router maintains a translation table mapping (private IP, port) to (public IP, port).

```bash
# View NAT table on Linux (nftables)
nft list table ip nat

# iptables MASQUERADE (dynamic NAT)
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Port forwarding (DNAT)
iptables -t nat -A PREROUTING -p tcp --dport 80 \
  -j DNAT --to-destination 192.168.1.10:8080
```

NAT breaks end-to-end connectivity and complicates protocols that embed IP addresses in payloads (FTP, SIP). STUN/TURN/ICE work around NAT for WebRTC.
