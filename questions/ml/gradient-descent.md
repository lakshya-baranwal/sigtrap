---
title: "What is gradient descent and its variants?"
tags: [ml, optimization, SGD, Adam]
difficulty: medium
---

Gradient descent iteratively updates parameters in the direction of the negative gradient to minimize a loss function.

```python
# Vanilla (Batch) Gradient Descent
# Uses ALL training examples per update
for epoch in range(epochs):
    gradient = compute_gradient(X, y, theta)
    theta -= learning_rate * gradient

# Stochastic Gradient Descent (SGD)
# Uses ONE example per update — noisy but fast
for epoch in range(epochs):
    for x_i, y_i in zip(X, y):
        gradient = compute_gradient(x_i, y_i, theta)
        theta -= learning_rate * gradient

# Mini-batch SGD — standard in deep learning
for epoch in range(epochs):
    for batch in get_batches(X, y, batch_size=32):
        gradient = compute_gradient(batch, theta)
        theta -= learning_rate * gradient
```

**Optimizers:**

| Optimizer | Key Property |
|-----------|-------------|
| SGD + Momentum | Accumulates velocity |
| AdaGrad | Per-parameter learning rates, decreasing |
| RMSProp | Exponential moving average of gradients² |
| Adam | Momentum + RMSProp + bias correction |

Adam is the default choice for most deep learning tasks.
