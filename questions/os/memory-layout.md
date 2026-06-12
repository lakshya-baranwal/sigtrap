---
title: "What is virtual memory layout of a Linux process?"
tags: [os, memory-layout, virtual-memory, ASLR]
difficulty: hard
---

A Linux process has a well-defined virtual address space layout:

```
High addresses (kernel space — not accessible from user space)
0xFFFFFFFFFFFFFFFF
  ↑ kernel
0xFFFF800000000000
─────────────────── user/kernel boundary ───────────────────
0x00007FFFFFFFFFFF
  ↑ stack (grows downward)
  ↑ memory-mapped files, shared libs (mmap region)
  ↑ heap (grows upward via brk/mmap)
  ↑ BSS (uninitialized globals)
  ↑ data (initialized globals)
  ↑ text (code, read-only)
0x0000000000400000
```

```bash
# View full memory map of a process
cat /proc/self/maps
# 00400000-00401000 r-xp  /bin/program   (text)
# 00601000-00602000 rw-p  /bin/program   (data)
# 00a15000-00a36000 rw-p  [heap]
# 7fff0000-7fff2000 rw-p  [stack]

# Check process memory usage
pmap -x <pid>
```

ASLR (Address Space Layout Randomization) randomizes base addresses of stack, heap, and libraries to mitigate exploitation.
