---
title: "What is AddressSanitizer and how does it work?"
tags: [debugging, ASan, memory, sanitizer]
difficulty: medium
---

AddressSanitizer (ASan) is a fast memory error detector built into GCC and Clang. It detects use-after-free, heap/stack/global buffer overflows, and use of uninitialized memory.

```bash
# Compile with ASan
gcc -fsanitize=address -g -O1 program.c -o program
./program
# ERROR: AddressSanitizer: heap-buffer-overflow on address 0x...
```

**How it works:**
- Instruments every memory access at compile time
- Maintains shadow memory — 1 byte of shadow tracks 8 bytes of real memory
- Poisons red zones around allocations and freed memory

```c
int *arr = malloc(10 * sizeof(int));
arr[10] = 1;  // heap-buffer-overflow — ASan catches this
free(arr);
arr[0] = 1;   // use-after-free — ASan catches this
```

Overhead: ~2× memory, ~1.5-2× slowdown — practical for development and CI.
