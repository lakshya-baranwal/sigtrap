---
title: "What is RAII?"
tags: [cpp, RAII, resource-management, exceptions]
difficulty: medium
---

RAII (Resource Acquisition Is Initialization) ties resource lifetimes to object lifetimes. Resources are acquired in constructors and released in destructors, ensuring cleanup even when exceptions occur.

```cpp
// BAD — manual resource management
void bad() {
    FILE* f = fopen("file.txt", "r");
    do_something();  // if this throws, f is never closed
    fclose(f);
}

// GOOD — RAII wrapper
class FileHandle {
    FILE* file;
public:
    FileHandle(const char* path, const char* mode)
        : file(fopen(path, mode)) {
        if (!file) throw std::runtime_error("Cannot open file");
    }
    ~FileHandle() { if (file) fclose(file); }
    FILE* get() { return file; }

    // Delete copy, allow move
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};

void good() {
    FileHandle f("file.txt", "r");
    do_something();  // exception safe — destructor runs
}
```

Standard RAII types: `std::unique_ptr`, `std::lock_guard`, `std::ifstream`.
