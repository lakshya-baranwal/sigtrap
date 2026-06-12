---
title: "What is virtual memory and how does paging work?"
tags: [coa, virtual-memory, paging, TLB]
difficulty: hard
---

Virtual memory provides each process with an isolated address space, mapped to physical memory (or disk) by the OS using paging.

**Paging mechanics:**
- Virtual address = Virtual Page Number (VPN) + Page Offset
- Page table maps VPN → Physical Frame Number (PFN)
- TLB caches recent VPN→PFN translations

```
Virtual Address (48-bit x86-64):
┌──────────┬──────────┬──────────┬──────────┬────────────┐
│  PML4    │  PDPT    │   PD     │   PT     │   Offset   │
│  9 bits  │  9 bits  │  9 bits  │  9 bits  │  12 bits   │
└──────────┴──────────┴──────────┴──────────┴────────────┘
```

```bash
# Inspect page tables (Linux)
cat /proc/self/maps

# TLB flush happens on context switch
# Page fault handler: do_page_fault() in kernel
```

On a TLB miss, the hardware page table walker traverses the multi-level page table. On a page fault (page not in memory), the kernel loads the page from disk (demand paging).
