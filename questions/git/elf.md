---
title: "What is ELF?"
tags: [linux, elf, binary, executable]
difficulty: medium
---

ELF (Executable and Linkable Format) is the standard binary file format for executables, object code, shared libraries, and core dumps on Linux systems.

**Structure of an ELF file:**

```bash
# Inspect ELF headers
readelf -h /usr/bin/ls

# View section headers
readelf -S ./a.out

# View program headers
readelf -l ./a.out
```

An ELF file consists of:
- **ELF Header** — identifies the file type, architecture, entry point
- **Program Headers** — describe memory segments for execution
- **Section Headers** — describe sections for linking and debugging

```c
// Minimal ELF identifier bytes
unsigned char e_ident[16];
// e_ident[0..3] = 0x7f, 'E', 'L', 'F'
```
