---
title: "What is Amdahl's Law?"
tags: [coa, parallelism, performance, scaling]
difficulty: medium
---

Amdahl's Law predicts the theoretical maximum speedup when parallelizing a program.

```
Speedup = 1 / (S + (1 - S) / N)

Where:
  S = fraction of work that must be serial
  N = number of processors
```

If 20% of the work is serial:
- With 4 cores: speedup = 1 / (0.2 + 0.8/4) = 2.5×
- With ∞ cores: max speedup = 1/0.2 = 5×

```python
def amdahl_speedup(serial_fraction, num_processors):
    return 1 / (serial_fraction + (1 - serial_fraction) / num_processors)

# Even with 1000 CPUs, 10% serial → max 10x speedup
print(amdahl_speedup(0.1, 1000))  # ≈ 9.9
```

Implication: reducing the serial portion is more impactful than adding more cores.
