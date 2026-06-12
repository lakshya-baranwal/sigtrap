---
title: "What are memory barriers and why are they needed?"
tags: [coa, memory-barriers, concurrency, ordering]
difficulty: hard
---

Memory barriers (fences) are CPU instructions that enforce ordering constraints on memory operations. Modern CPUs and compilers reorder memory accesses for performance — barriers prevent incorrect reordering.

Types on x86:
- `mfence` — full memory barrier (load + store)
- `sfence` — store barrier
- `lfence` — load barrier

```c
#include <stdatomic.h>

// C11 atomic operations with memory ordering
atomic_int flag = 0;
int data = 0;

// Thread 1 (producer)
data = 42;
atomic_store_explicit(&flag, 1, memory_order_release);
// release barrier: all stores before this are visible

// Thread 2 (consumer)
while (!atomic_load_explicit(&flag, memory_order_acquire));
// acquire barrier: all loads after this see stores before release
printf("%d\n", data);  // guaranteed to print 42
```

Without memory barriers, the CPU may reorder `data = 42` after the flag store, causing the consumer to read stale data.
