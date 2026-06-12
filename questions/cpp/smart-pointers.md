---
title: "What is the difference between unique_ptr, shared_ptr, and weak_ptr?"
tags: [cpp, smart-pointers, memory, ownership]
difficulty: medium
---

| Smart Pointer | Ownership | Reference Count | Use Case |
|--------------|-----------|----------------|---------|
| `unique_ptr` | Exclusive | None | Single owner |
| `shared_ptr` | Shared | Yes (atomic) | Multiple owners |
| `weak_ptr` | Non-owning | Observes shared | Break cycles |

```cpp
// unique_ptr — sole owner, zero overhead
auto p = std::make_unique<MyClass>(args);
auto q = std::move(p);  // transfer ownership — p is null

// shared_ptr — shared ownership via refcount
auto a = std::make_shared<MyClass>(args);
auto b = a;  // refcount = 2
// Destroyed when refcount reaches 0

// weak_ptr — observing without ownership
std::weak_ptr<MyClass> weak = a;
if (auto locked = weak.lock()) {  // only valid if still alive
    locked->method();
}

// Circular reference — use weak_ptr to break the cycle
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;  // weak — doesn't prevent deletion
};
```

Prefer `unique_ptr` by default. Use `shared_ptr` only when shared ownership is genuinely needed.
