---
title: "What is Valgrind Memcheck?"
tags: [debugging, valgrind, memory-leak, profiling]
difficulty: medium
---

Valgrind Memcheck tracks every memory operation to detect leaks, invalid accesses, and uninitialized reads — without recompilation.

```bash
valgrind --leak-check=full --show-leak-kinds=all \
         --track-origins=yes ./program

# LEAK SUMMARY:
#    definitely lost: 24 bytes in 1 blocks
#    still reachable: 1,024 bytes in 1 blocks
```

**ASan vs Valgrind:**
- ASan: ~2× slowdown, compile-time, better for CI
- Valgrind: ~10-50× slowdown, no recompile needed, detects subtler issues
