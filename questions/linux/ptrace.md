---
title: "What is ptrace?"
tags: [linux, ptrace, debugging, syscall]
difficulty: medium
---

`ptrace` is a Linux system call that allows one process (the tracer) to observe and control the execution of another process (the tracee). It is the foundation of debuggers like GDB and strace.

```c
#include <sys/ptrace.h>

// Attach to a running process
ptrace(PTRACE_ATTACH, pid, NULL, NULL);

// Read a word from the tracee's memory
long data = ptrace(PTRACE_PEEKDATA, pid, addr, NULL);

// Write a word to the tracee's memory
ptrace(PTRACE_POKEDATA, pid, addr, (void*)value);

// Resume execution
ptrace(PTRACE_CONT, pid, NULL, NULL);

// Single-step one instruction
ptrace(PTRACE_SINGLESTEP, pid, NULL, NULL);
```

Key ptrace requests:
- `PTRACE_ATTACH` — attach to a running process
- `PTRACE_PEEKDATA` / `PTRACE_POKEDATA` — read/write tracee memory
- `PTRACE_GETREGS` — read CPU registers
- `PTRACE_SETREGS` — modify CPU registers
- `PTRACE_SINGLESTEP` — execute one instruction and stop

ptrace is also used by seccomp filters and system call sandboxing tools.
