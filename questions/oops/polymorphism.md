---
title: "What is polymorphism and how does virtual dispatch work in C++?"
tags: [oops, polymorphism, vtable, virtual]
difficulty: medium
---

Polymorphism allows objects of different classes to be treated as objects of a common superclass. In C++, dynamic polymorphism is implemented using `virtual` functions and resolved at runtime via a virtual table (`vtable`).

### Example:
```cpp
class Animal {
public:
    virtual void make_sound() {
        std::cout << "Generic animal sound" << std::endl;
    }
};

class Dog : public Animal {
public:
    void make_sound() override {
        std::cout << "Woof!" << std::endl;
    }
};
```

When calling `make_sound()` on an `Animal*` pointing to a `Dog`, the program inspects the object's `vptr` (virtual pointer) to find the `Dog` class `vtable` and executes `Dog::make_sound()`.
