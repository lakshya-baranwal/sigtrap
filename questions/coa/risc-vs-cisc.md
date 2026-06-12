---
title: "What is the difference between RISC and CISC?"
tags: [coa, RISC, CISC, architecture, ISA]
difficulty: medium
---

| Property | RISC | CISC |
|----------|------|------|
| Instructions | Simple, fixed-length | Complex, variable-length |
| Execution | 1 cycle per instruction | Multiple cycles |
| Registers | Many | Fewer |
| Examples | ARM, MIPS, RISC-V | x86, x86-64 |
| Pipelining | Easier | Harder |
| Memory ops | Load/store only | Direct memory operands |

```asm
; RISC (ARM) — explicit load before operation
LDR R0, [R1]      ; load from memory
ADD R2, R0, R3    ; register-only ALU op
STR R2, [R4]      ; store to memory

; CISC (x86) — operation on memory directly
ADD EAX, [EBX]   ; memory operand in ALU instruction
```

Modern x86 processors decode CISC instructions into RISC-like micro-ops internally.
