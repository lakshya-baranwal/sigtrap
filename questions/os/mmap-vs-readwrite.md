---
title: "What is the difference between mmap and read/write?"
tags: [os, mmap, IO, file-access]
difficulty: hard
---

| Property | mmap | read/write |
|----------|------|-----------| 
| Interface | Memory access | System calls |
| Buffering | Kernel page cache | Buffer in userspace |
| Zero-copy | Yes (for file I/O) | No (kernel → user copy) |
| Random access | O(1) | Seek + read |
| Large files | Good | Good |
| Small random reads | Overhead | Lower overhead |

```c
// read/write approach
int fd = open("file.bin", O_RDONLY);
char buf[4096];
while (read(fd, buf, sizeof(buf)) > 0) {
    process(buf);
}

// mmap approach — file appears as memory
int fd = open("file.bin", O_RDONLY);
struct stat st;
fstat(fd, &st);
void* data = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
close(fd);
// Access file as if it's an array — kernel handles I/O
process_data((char*)data, st.st_size);
munmap(data, st.st_size);
```

mmap excels for: large random-access files, shared memory between processes (`MAP_SHARED`), and memory-mapped I/O.
