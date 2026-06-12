---
title: "What is a core dump?"
tags: [debugging, core-dump, crash, GDB]
difficulty: medium
---

A core dump is a snapshot of a process's memory at the moment it crashed. It captures registers, stack, heap, and all mapped memory segments.

```bash
# Enable core dumps
ulimit -c unlimited
echo '/tmp/core.%e.%p' > /proc/sys/kernel/core_pattern

# Analyze core dump with GDB
gdb ./program core.12345
(gdb) backtrace          # where did it crash?
(gdb) info locals        # local variables at crash
(gdb) frame 2            # switch to stack frame 2
```

Core dumps require debug symbols (`-g` flag) for useful output.
