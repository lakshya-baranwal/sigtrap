---
title: "What happens when you type a URL in a browser?"
tags: [networking, DNS, TCP, TLS, HTTP, browser]
difficulty: medium
---

A full-stack journey from URL to rendered page:

```
1. URL Parsing
   Browser parses scheme, host, path, query, fragment

2. DNS Resolution
   Check: browser cache → OS cache → /etc/hosts → recursive resolver
   → Root nameserver → TLD nameserver → Authoritative nameserver
   Result: IP address

3. TCP Connection
   Three-way handshake to server IP:443

4. TLS Handshake
   ClientHello → ServerHello + Certificate → Key exchange → Finished
   Establishes encrypted session (TLS 1.3: 1 RTT)

5. HTTP Request
   GET /path HTTP/2
   Host: example.com
   Accept: text/html

6. Server Processing
   Route → Application logic → Database query → HTML generation

7. HTTP Response
   HTTP/2 200 OK
   Content-Type: text/html

8. Browser Rendering
   HTML parsing → DOM construction
   CSS parsing → CSSOM
   DOM + CSSOM → Render tree
   Layout → Paint → Composite
```

```bash
# Observe the full journey
curl -v --trace-time https://example.com
dig example.com +trace  # DNS resolution trace
openssl s_client -connect example.com:443  # TLS details
```
