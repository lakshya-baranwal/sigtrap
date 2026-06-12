---
title: "What is template metaprogramming?"
tags: [cpp, templates, metaprogramming, constexpr]
difficulty: hard
---

Template metaprogramming (TMP) uses C++ templates to perform computations at compile time, generating specialized code and enabling zero-cost abstractions.

```cpp
// Compile-time factorial
template<int N>
struct Factorial {
    static constexpr int value = N * Factorial<N-1>::value;
};
template<>
struct Factorial<0> {
    static constexpr int value = 1;
};

static_assert(Factorial<10>::value == 3628800);

// Modern approach: constexpr functions (C++14)
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Type traits
#include <type_traits>
template<typename T>
void process(T val) {
    if constexpr (std::is_integral_v<T>) {
        // integer path — compiled only for integral types
    } else if constexpr (std::is_floating_point_v<T>) {
        // float path
    }
}
```
