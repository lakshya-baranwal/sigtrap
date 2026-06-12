---
title: "What is the Rule of Five in C++?"
tags: [cpp, rule-of-five, RAII, special-members]
difficulty: medium
---

The Rule of Five states that if a class defines any of the five special member functions, it should explicitly define all five to properly manage resources.

The five special members:
1. Destructor
2. Copy constructor
3. Copy assignment operator
4. Move constructor
5. Move assignment operator

```cpp
class Buffer {
    char* data;
    size_t size;
public:
    // Constructor
    Buffer(size_t n) : data(new char[n]), size(n) {}

    // 1. Destructor
    ~Buffer() { delete[] data; }

    // 2. Copy constructor
    Buffer(const Buffer& other) : data(new char[other.size]), size(other.size) {
        std::memcpy(data, other.data, size);
    }

    // 3. Copy assignment
    Buffer& operator=(const Buffer& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new char[size];
            std::memcpy(data, other.data, size);
        }
        return *this;
    }

    // 4. Move constructor
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }

    // 5. Move assignment
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};
```

If you don't need resource management, use `= default` or `= delete` explicitly.
