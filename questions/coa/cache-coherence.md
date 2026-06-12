---
title: "What is cache coherence?"
tags: [coa, cache, MESI, multiprocessor]
difficulty: hard
---

Cache coherence is the consistency of shared resource data across multiple caches in a multi-processor system. When multiple CPUs cache the same memory location and one modifies it, all caches must reflect the updated value.

**MESI Protocol** — the most common coherence protocol:

| State | Meaning |
|-------|---------|
| Modified | Cache has the only copy; dirty |
| Exclusive | Cache has the only copy; clean |
| Shared | Multiple caches hold the same clean copy |
| Invalid | Cache line is stale; must refetch |

```c
// False sharing example — two threads modifying
// different variables that share a cache line
struct {
    int a;  // thread 1 uses this
    int b;  // thread 2 uses this
} shared;  // a and b likely share a 64-byte cache line

// Fix: pad to separate cache lines
struct {
    int a;
    char pad[60];
    int b;
} padded;
```

Cache coherence is managed by hardware; cache consistency (memory ordering) is enforced by memory barriers and the memory model.
