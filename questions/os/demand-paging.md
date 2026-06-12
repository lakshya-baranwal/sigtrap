---
title: "What is demand paging and page faults?"
tags: [os, paging, page-fault, memory]
difficulty: hard
---

Demand paging loads pages into memory only when they are first accessed, rather than loading the entire process upfront.

**Page fault types:**

| Type | Cause | Resolution |
|------|-------|-----------| 
| Minor | Page present in memory but not mapped | Update page table |
| Major | Page not in memory (on disk) | Read from disk |
| Invalid | Access violation (SIGSEGV) | Kill process |

```c
// mmap creates mapping but doesn't load data
void* ptr = mmap(NULL, size, PROT_READ,
                 MAP_PRIVATE, fd, 0);
// No I/O yet — page table entries are empty

// First access → page fault → kernel loads page from disk
char c = ((char*)ptr)[0];  // triggers major page fault

// Prefault pages to avoid future faults
mlock(ptr, size);  // locks pages in RAM, prevents swapping
```

```bash
# Count page faults for a process
/usr/bin/time -v ./program 2>&1 | grep "page faults"
# Major (requiring I/O): 42
# Minor (reclaiming a frame): 1520
```
