---
title: "What is undefined behavior in C++?"
tags: [cpp, undefined-behavior, safety, sanitizers]
difficulty: medium
---

Undefined behavior (UB) means the standard places no constraint on program behavior. Compilers exploit UB for optimization, making it dangerous and hard to debug.

```cpp
// Signed integer overflow
int x = INT_MAX;
++x;  // UB — compiler may assume this never happens

// Strict aliasing violation
float f = 3.14f;
int* p = reinterpret_cast<int*>(&f);  // UB — aliasing rules
// Use memcpy or std::bit_cast<int>(f) instead

// Dangling reference
int& dangling() {
    int local = 42;
    return local;  // UB — returns reference to destroyed object
}

// Iterator invalidation
std::vector<int> v = {1, 2, 3};
auto it = v.begin();
v.push_back(4);  // may reallocate — it is now dangling
*it;  // UB
```

```bash
# Detect UB
clang++ -fsanitize=undefined,address -g program.cpp -o program
```
