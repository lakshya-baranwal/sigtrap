---
title: "What is a context switch?"
tags: [os, context-switch, scheduler, performance]
difficulty: medium
---

A context switch is the process of saving the state of a running process/thread and restoring the state of another, allowing the CPU to switch between tasks.

**What gets saved/restored:**
- CPU registers (general purpose, flags, instruction pointer)
- Program counter
- Stack pointer
- Memory management registers (page table base)
- FPU/SIMD state (lazy save on x86)

```c
// Simplified context switch pseudocode
void context_switch(struct task* prev, struct task* next) {
    // Save prev's state
    prev->regs.rsp = current_rsp();
    prev->regs.rip = current_rip();
    // ... save other registers

    // Switch page tables
    write_cr3(next->page_table_base);

    // Restore next's state
    load_registers(&next->regs);
    // Execution continues in next's context
}
```

```bash
# Measure context switch overhead
perf stat -e context-switches ./program

# View context switches per process
pidstat -w 1
```

Context switch cost: ~1-10 microseconds on modern hardware. Thread switches within the same process are cheaper (no page table switch).
