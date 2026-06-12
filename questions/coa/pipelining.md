---
title: "What is pipelining and what are pipeline hazards?"
tags: [coa, pipelining, hazards, CPU]
difficulty: hard
---

Pipelining overlaps the execution of multiple instructions by dividing instruction execution into stages (fetch, decode, execute, memory, writeback).

A 5-stage classic RISC pipeline:
```
IF → ID → EX → MEM → WB
```

**Pipeline Hazards:**

1. **Structural Hazard** — two instructions need the same hardware resource simultaneously
2. **Data Hazard** — an instruction depends on the result of a prior instruction not yet complete

```asm
ADD R1, R2, R3   ; writes R1
SUB R4, R1, R5   ; reads R1 — RAW hazard (Read After Write)
```

3. **Control Hazard** — caused by branch instructions; next instruction is unknown until branch resolves

Solutions:
- **Forwarding/Bypassing** — route result directly to dependent stage
- **Stalls/Bubbles** — insert NOPs into the pipeline
- **Branch Prediction** — speculatively execute predicted path
- **Out-of-order execution** — reorder non-dependent instructions
