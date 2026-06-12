---
title: "What is the difference between a process and a thread?"
tags: [linux, process, thread, concurrency]
difficulty: easy
---

| Property | Process | Thread |
|----------|---------|--------|
| Memory | Separate address space | Shared address space |
| Creation | Expensive (fork) | Cheaper (pthread_create) |
| Communication | IPC (pipes, sockets) | Shared memory |
| Failure isolation | Crashes don't affect others | One crash can kill all |
| Context switch | Heavy | Lighter |

```c
// Creating a process
pid_t pid = fork();
if (pid == 0) {
    // child process
    execv("/bin/ls", args);
}

// Creating a thread
#include <pthread.h>
pthread_t tid;
pthread_create(&tid, NULL, thread_function, NULL);
pthread_join(tid, NULL);
```

Processes provide strong isolation. Threads provide fast communication but require synchronization.
