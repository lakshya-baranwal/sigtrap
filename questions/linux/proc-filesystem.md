---
title: "What is the /proc filesystem?"
tags: [linux, proc, virtual-filesystem, kernel]
difficulty: medium
---

`/proc` is a virtual filesystem that exposes kernel and process information as files. It does not exist on disk — the kernel generates its contents dynamically.

```bash
# Current process info
cat /proc/self/status
cat /proc/self/maps      # memory mappings
cat /proc/self/fd/       # open file descriptors
cat /proc/self/cmdline   # command line arguments

# System info
cat /proc/cpuinfo        # CPU details
cat /proc/meminfo        # memory stats
cat /proc/uptime         # system uptime
cat /proc/version        # kernel version

# Specific process
cat /proc/1234/status    # process 1234 status
ls /proc/1234/fd/        # open fds of process 1234
```

`/proc` is essential for system monitoring tools like `top`, `ps`, and `htop`.
