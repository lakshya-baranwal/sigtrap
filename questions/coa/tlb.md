---
title: "What is a TLB and why does it matter for performance?"
tags: [coa, TLB, memory, performance]
difficulty: medium
---

The TLB (Translation Lookaside Buffer) is a small, fast hardware cache inside the MMU that stores recent virtual-to-physical address translations.

Without TLB: every memory access requires walking the page table (multiple memory accesses).
With TLB hit: translation completes in 1 cycle.

```bash
# TLB performance matters for:
# - Large working sets (thrash the TLB)
# - Context switches (flush TLB on most architectures)
# - Large pages (hugepages reduce TLB pressure)

# Enable hugepages on Linux
echo 1024 > /proc/sys/vm/nr_hugepages

# Use mmap with MAP_HUGETLB
mmap(NULL, size, PROT_READ|PROT_WRITE,
     MAP_PRIVATE|MAP_ANONYMOUS|MAP_HUGETLB, -1, 0);
```

x86-64 uses Process Context Identifiers (PCID) to avoid full TLB flushes on context switches in modern kernels.
