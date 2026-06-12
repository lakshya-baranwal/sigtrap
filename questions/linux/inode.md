---
title: "What is an inode?"
tags: [linux, filesystem, inode]
difficulty: medium
---

An inode (index node) is a data structure on a filesystem that stores metadata about a file — everything except its name and actual data.

Inode contains:
- File size
- Owner (UID, GID)
- Permissions
- Timestamps (atime, mtime, ctime)
- Number of hard links
- Pointers to data blocks

```bash
# View inode of a file
ls -i filename

# Get detailed inode info
stat filename

# Find file by inode number
find / -inum 12345

# Check inode usage
df -i
```

A directory is just a mapping of filenames to inode numbers. Hard links share the same inode; symbolic links have their own inode pointing to a path.
