---
title: "What is the difference between GDB and strace?"
tags: [debugging, GDB, strace, tools]
difficulty: easy
---

| Tool | What it observes | Level |
|------|-----------------|-------|
| GDB | Source code, variables, registers, memory, stack | User-space |
| strace | System calls and signals | Kernel interface |
| ltrace | Library calls | Library interface |
| perf | CPU performance counters | Hardware / kernel |

```bash
# GDB — inspect program state
gdb ./program
(gdb) break main
(gdb) run
(gdb) backtrace     # call stack
(gdb) print var     # print variable
(gdb) info regs     # register values

# strace — trace system calls
strace ./program                      # trace all syscalls
strace -e trace=read,write ./program  # filter calls
strace -p 1234                        # attach to running PID
strace -c ./program                   # summary with counts/times
```
