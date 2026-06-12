---
title: "What are Linux signals?"
tags: [linux, signals, IPC, SIGINT, SIGKILL]
difficulty: medium
---

Signals are asynchronous notifications sent to processes to notify them of events.

Common signals:

| Signal | Number | Default Action | Description |
|--------|--------|---------------|-------------|
| SIGINT | 2 | Terminate | Ctrl+C |
| SIGTERM | 15 | Terminate | Graceful shutdown |
| SIGKILL | 9 | Terminate | Force kill (uncatchable) |
| SIGSEGV | 11 | Core dump | Segmentation fault |
| SIGCHLD | 17 | Ignore | Child stopped/exited |
| SIGUSR1 | 10 | Terminate | User-defined signal 1 |

```c
#include <signal.h>

// Install a signal handler
void handler(int sig) {
    write(1, "Caught signal\n", 14);
}

signal(SIGINT, handler);

// Block signals temporarily
sigset_t mask;
sigemptyset(&mask);
sigaddset(&mask, SIGINT);
sigprocmask(SIG_BLOCK, &mask, NULL);
```

SIGKILL and SIGSTOP cannot be caught, blocked, or ignored.
