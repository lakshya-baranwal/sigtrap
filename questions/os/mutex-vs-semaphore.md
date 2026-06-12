---
title: "What is the difference between mutex and semaphore?"
tags: [os, mutex, semaphore, synchronization]
difficulty: medium
---

| Property | Mutex | Semaphore |
|----------|-------|-----------| 
| Ownership | Owned by one thread | No ownership concept |
| Value | Binary (locked/unlocked) | Integer counter (≥0) |
| Unlock | Only owner can unlock | Anyone can signal |
| Use case | Mutual exclusion | Resource counting, signaling |

```c
// Mutex — mutual exclusion
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&lock);
// critical section — only one thread at a time
pthread_mutex_unlock(&lock);

// Semaphore — resource counting
#include <semaphore.h>
sem_t sem;
sem_init(&sem, 0, 3);  // 3 resources available

// Consumer
sem_wait(&sem);    // decrement — blocks if 0
use_resource();
sem_post(&sem);    // increment — signal availability
```

Mutex variants:
- **Recursive mutex** — same thread can lock multiple times
- **Read-write lock** — multiple readers OR one writer
- **Spinlock** — busy-waits instead of sleeping (good for short waits)
