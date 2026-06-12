---
title: "What is a race condition?"
tags: [debugging, race-condition, threads, atomic]
difficulty: medium
---

A race condition occurs when program behavior depends on non-deterministic thread interleaving.

```c
// Unsafe — data race on counter
int counter = 0;
void* increment(void* arg) {
    for (int i = 0; i < 1000000; i++)
        counter++;  // NOT atomic: read-modify-write race
    return NULL;
}

// Safe — atomic operation
atomic_int counter = 0;
void* increment(void* arg) {
    for (int i = 0; i < 1000000; i++)
        atomic_fetch_add(&counter, 1);
    return NULL;
}
```

```bash
# Detect with ThreadSanitizer
gcc -fsanitize=thread -g program.c -lpthread -o program
./program
# TSan: WARNING: data race on counter
```
