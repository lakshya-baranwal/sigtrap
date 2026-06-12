---
title: "What is an OS scheduler and how does CFS work?"
tags: [os, CFS, scheduler, vruntime]
difficulty: hard
---

The Completely Fair Scheduler (CFS) is Linux's default scheduler since kernel 2.6.23. It aims to give each runnable process a fair share of CPU time.

**Key concepts:**
- **vruntime** (virtual runtime) — tracks how much CPU time each process has received, weighted by priority
- **Red-black tree** — runnable tasks sorted by vruntime; always schedules the leftmost node (smallest vruntime)
- **nice values** — [-20, 19], lower = higher priority

```bash
# View task scheduler info
cat /proc/<pid>/sched

# Change process nice value
nice -n -10 ./program        # start with nice=-10 (higher priority)
renice -n 5 -p <pid>         # change running process

# View scheduler statistics
cat /proc/schedstat

# Perf sched — scheduler analysis
perf sched record ./program
perf sched latency
```

CFS achieves fairness by always running the task with the smallest vruntime. Lower nice value → slower vruntime accumulation → more CPU time.
