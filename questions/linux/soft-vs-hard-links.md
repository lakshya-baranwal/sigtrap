---
title: "What is the difference between soft links and hard links?"
tags: [linux, filesystem, links, symlink]
difficulty: easy
---

| Property | Hard Link | Soft (Symbolic) Link |
|----------|-----------|---------------------|
| Points to | Inode | File path |
| Works across filesystems | No | Yes |
| Works for directories | No | Yes |
| Survives original deletion | Yes | No (dangling link) |
| Has own inode | No | Yes |

```bash
# Create a hard link
ln original.txt hardlink.txt

# Create a symbolic link
ln -s /path/to/original.txt symlink.txt

# Check link type
ls -la
# lrwxrwxrwx = symbolic link
# -rw-r--r-- 2 = hard link (link count = 2)
```
