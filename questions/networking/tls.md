---
title: "What is TLS and how does the handshake work?"
tags: [networking, TLS, security, encryption, HTTPS]
difficulty: hard
---

TLS (Transport Layer Security) encrypts communication, authenticates servers (and optionally clients), and ensures data integrity.

**TLS 1.3 Handshake (1-RTT):**

```
Client                              Server
  |                                    |
  |--- ClientHello (TLS version,   --->|
  |    cipher suites, key share)       |
  |                                    |
  |<-- ServerHello (cipher chosen, ----|
  |    key share, Certificate,         |
  |    CertificateVerify, Finished)    |
  |                                    |
  |--- Finished -----------------------|
  |                                    |
  |=== Encrypted Application Data ====>|
```

```bash
# Inspect TLS connection
openssl s_client -connect example.com:443 -tls1_3

# Check certificate details
openssl x509 -in cert.pem -text -noout

# Test TLS configuration
curl --tlsv1.3 https://example.com
```

TLS 1.3 uses ECDHE for key exchange (forward secrecy), removed RSA key exchange and weak cipher suites present in TLS 1.2.
