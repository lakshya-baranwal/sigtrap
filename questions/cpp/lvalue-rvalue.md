---
title: "What are lvalue and rvalue references?"
tags: [cpp, lvalue, rvalue, move-semantics]
difficulty: hard
---

An lvalue refers to a named, persistent object. An rvalue refers to a temporary object (has no name, about to be destroyed).

```cpp
int x = 42;       // x is an lvalue
int& ref = x;     // lvalue reference

int&& rref = 42;  // rvalue reference — extends lifetime of temp
// int&& rref2 = x;  // ERROR — x is an lvalue

void process(std::string& s)  { /* copy */ }   // lvalue overload
void process(std::string&& s) { /* move */ }   // rvalue overload

std::string s = "hello";
process(s);              // calls lvalue overload
process("world");        // calls rvalue overload — no copy
process(std::move(s));   // cast to rvalue — calls move overload
// s is now in valid but unspecified state
```

Move semantics enable efficient transfer of resources (heap memory, file handles) from temporaries without copying.
