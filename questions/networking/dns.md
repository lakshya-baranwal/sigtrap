---
title: "What is DNS and how does resolution work?"
tags: [networking, DNS, nameserver, resolution]
difficulty: medium
---

DNS (Domain Name System) translates human-readable hostnames to IP addresses.

**Record types:**

| Type | Purpose | Example |
|------|---------|---------|
| A | IPv4 address | example.com → 93.184.216.34 |
| AAAA | IPv6 address | example.com → 2606:2800::1 |
| CNAME | Alias | www → example.com |
| MX | Mail server | @ → mail.example.com |
| TXT | Arbitrary text | SPF, DKIM records |
| NS | Nameserver | example.com → ns1.example.com |

```bash
# Query specific record types
dig example.com A
dig example.com MX
dig example.com TXT

# Trace full DNS resolution
dig +trace example.com

# Check DNS propagation
nslookup example.com 8.8.8.8  # query Google DNS
nslookup example.com 1.1.1.1  # query Cloudflare

# Flush local DNS cache (Linux)
systemd-resolve --flush-caches
```

DNS over HTTPS (DoH) and DNS over TLS (DoT) encrypt DNS queries, preventing eavesdropping by ISPs.
