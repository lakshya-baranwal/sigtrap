---
title: "How do you debug a deadlock?"
tags: [debugging, deadlock, threads, concurrency]
difficulty: hard
---

A deadlock occurs when threads wait circularly for resources held by each other.

```c
// Classic deadlock
pthread_mutex_t A, B;
// Thread 1: lock(A) then lock(B)
// Thread 2: lock(B) then lock(A) — DEADLOCK
```

```bash
# Attach GDB to hung process
gdb -p <pid>
(gdb) thread apply all bt  # backtrace all threads

# ThreadSanitizer
gcc -fsanitize=thread -g program.c -o program
./program
```

Prevention: always acquire locks in a consistent global order, or use `std::lock()` in C++ which acquires multiple locks atomically.
