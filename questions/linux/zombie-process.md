---
title: "What is a zombie process?"
tags: [linux, process, zombie, wait]
difficulty: medium
---

A zombie process is a process that has completed execution but still has an entry in the process table because its parent has not yet called `wait()` to read its exit status.

```bash
# See zombie processes
ps aux | grep 'Z'

# A zombie appears as:
# PID  PPID  STAT  CMD
# 1234 5678  Z     [defunct]
```

```c
// Parent must call wait() to reap children
#include <sys/wait.h>

pid_t pid = fork();
if (pid == 0) {
    exit(0);  // child exits
} else {
    wait(NULL);  // parent reaps — prevents zombie
}
```

If the parent exits before reaping, the zombie is reparented to `init` (PID 1), which reaps it automatically.
