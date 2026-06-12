---
title: "What is the difference between preemptive and cooperative scheduling?"
tags: [os, scheduling, CFS, preemptive]
difficulty: medium
---

| Property | Preemptive | Cooperative |
|----------|-----------|-------------|
| Control | OS forcibly switches | Process voluntarily yields |
| Fairness | Guaranteed | Process-dependent |
| Response time | Bounded | Unbounded |
| Used in | Linux, Windows, macOS | Early Windows, coroutines |

Linux uses **CFS** (Completely Fair Scheduler) — a preemptive, priority-based scheduler using a red-black tree ordered by virtual runtime.

```bash
# View scheduling policy
chrt -p <pid>

# Set real-time scheduling (SCHED_FIFO)
chrt -f -p 50 <pid>

# View process priorities
ps -eo pid,ni,pri,cmd | head -20

# Linux scheduler tuning
cat /proc/sys/kernel/sched_latency_ns
cat /proc/sys/kernel/sched_min_granularity_ns
```

Real-time scheduling classes: SCHED_FIFO (pure priority), SCHED_RR (round-robin among same priority), SCHED_DEADLINE (EDF-based).
