---
title: "What is a breakpoint and how does it work at the hardware level?"
tags: [debugging, breakpoint, INT3, GDB]
difficulty: hard
---

A breakpoint pauses program execution at a specific location. At the hardware level, x86 uses the `INT 3` instruction (opcode `0xCC`).

**Software breakpoints:**

```c
// GDB replaces the instruction byte with 0xCC (INT 3)
// When executed, the CPU raises SIGTRAP
// GDB catches SIGTRAP, restores original byte, pauses execution
original_byte = ptrace(PTRACE_PEEKDATA, pid, addr);
ptrace(PTRACE_POKEDATA, pid, addr, 0xCC);  // set breakpoint
ptrace(PTRACE_POKEDATA, pid, addr, original_byte);  // restore
```

**Hardware breakpoints** use debug registers (DR0–DR3 on x86), limited to 4 simultaneous breakpoints.

```bash
break main           # break at function
break file.c:42      # break at line
watch variable       # hardware watchpoint on write
info breakpoints     # list all breakpoints
delete 2             # delete breakpoint 2
```
