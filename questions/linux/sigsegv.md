---
title: "What causes SIGSEGV?"
tags: [linux, signals, segfault, memory]
difficulty: medium
---

SIGSEGV (Segmentation Fault, signal 11) is sent to a process when it attempts to access memory it is not permitted to access.

Common causes:
- Dereferencing a null or wild pointer
- Accessing freed memory (use-after-free)
- Stack overflow (infinite recursion)
- Writing to read-only memory
- Out-of-bounds array access

```c
// Classic null dereference
int *ptr = NULL;
*ptr = 42; // SIGSEGV

// Stack overflow
void recurse() { recurse(); } // SIGSEGV after stack exhaustion

// Use-after-free
int *p = malloc(4);
free(p);
*p = 10; // Undefined behavior → potential SIGSEGV
```

Debugging approach:

```bash
# Run under GDB
gdb ./program
(gdb) run
(gdb) bt   # backtrace after crash

# Check with AddressSanitizer
gcc -fsanitize=address -g program.c -o program
./program
```
