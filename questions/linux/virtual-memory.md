---
title: "What is the Linux virtual memory system?"
tags: [linux, memory, virtual-memory, paging]
difficulty: hard
---

Linux uses virtual memory to give each process the illusion of having exclusive access to the entire address space.

Key components:
- **Virtual Address Space** — each process gets its own 64-bit address space
- **Page Table** — maps virtual addresses to physical frames
- **TLB** (Translation Lookaside Buffer) — hardware cache of recent translations
- **Demand Paging** — pages are loaded only when accessed

```bash
# View process memory map
cat /proc/self/maps

# View memory statistics
cat /proc/meminfo

# Check page size
getconf PAGE_SIZE  # typically 4096 bytes
```

Memory regions in a process:
- Text segment (code, read-only)
- Data segment (globals, BSS)
- Heap (grows upward via brk/mmap)
- Stack (grows downward)
- Memory-mapped files and shared libraries
