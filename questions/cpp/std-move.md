---
title: "What is std::move and when should you use it?"
tags: [cpp, move, performance, ownership]
difficulty: medium
---

`std::move` is a cast that converts an lvalue to an rvalue reference, enabling move semantics. It does not actually move anything — it just enables the move constructor/assignment to be called.

```cpp
std::vector<int> a = {1, 2, 3, 4, 5};

// Copy — expensive: allocates new memory, copies elements
std::vector<int> b = a;

// Move — cheap: transfers ownership of internal buffer
std::vector<int> c = std::move(a);
// a is now empty (valid but unspecified state)

// Use move in function arguments to avoid copying
void consume(std::vector<int> v) { /* ... */ }
consume(std::move(c));  // no copy — transfers ownership
```

Use `std::move`:
- When passing a local variable to a function that will outlive it
- In move constructors/assignments
- When returning a named local variable (though NRVO handles this automatically)

Do NOT use `std::move` on a return statement — it disables NRVO (Named Return Value Optimization).
