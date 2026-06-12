---
title: "What is virtual dispatch and the vtable?"
tags: [cpp, polymorphism, vtable, virtual, OOP]
difficulty: hard
---

Virtual dispatch enables runtime polymorphism in C++. Each class with virtual functions has a vtable (virtual function table) — an array of function pointers. Each object has a hidden vptr pointing to its class's vtable.

```cpp
class Animal {
public:
    virtual void speak() { std::cout << "..."; }
    virtual ~Animal() = default;  // always virtual destructor!
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Woof"; }
};

Animal* a = new Dog();
a->speak();  // calls Dog::speak() via vtable — runtime dispatch
```

```
Dog object in memory:
┌─────────────┐
│   vptr      │ ──→ Dog's vtable: [Dog::speak, Dog::~Dog]
├─────────────┤
│   ...data   │
└─────────────┘
```

Cost: one extra indirection per virtual call + prevents inlining. Use `final` to enable devirtualization optimization.
