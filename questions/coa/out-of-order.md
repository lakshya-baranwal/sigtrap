---
title: "What is out-of-order execution?"
tags: [coa, OoO, CPU, performance]
difficulty: hard
---

Out-of-order (OoO) execution allows a CPU to execute instructions in a different order than the program order, as long as data dependencies are respected. This hides latency from cache misses and slow operations.

Key components:
- **Reorder Buffer (ROB)** — tracks in-flight instructions; commits in program order
- **Reservation Stations** — hold instructions waiting for operands
- **Register Renaming** — eliminates false dependencies (WAR, WAW hazards)

```asm
; Program order:
MOV RAX, [memory]  ; cache miss — long latency
ADD RBX, RCX       ; independent — can execute immediately
; CPU executes ADD first, then MOV result becomes available
```

Out-of-order execution is the source of speculative execution vulnerabilities like Spectre and Meltdown, which exploit the microarchitectural state left by speculatively executed instructions.
