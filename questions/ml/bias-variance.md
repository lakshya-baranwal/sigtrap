---
title: "What is the bias-variance tradeoff?"
tags: [ml, bias, variance, overfitting, underfitting]
difficulty: medium
---

The bias-variance tradeoff describes the tension between two sources of model error that make it impossible to simultaneously minimize both.

- **Bias** — error from incorrect assumptions in the model (underfitting)
- **Variance** — error from sensitivity to fluctuations in training data (overfitting)

```
Total Error = Bias² + Variance + Irreducible Noise

High Bias (Underfitting):
  - Simple model, ignores patterns
  - High training error, high test error
  - Example: linear model on non-linear data

High Variance (Overfitting):
  - Complex model, memorizes noise
  - Low training error, high test error
  - Example: deep tree with no regularization
```

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge

# Low degree = high bias
# High degree = high variance
# Regularization (Ridge) reduces variance at cost of some bias
model = Pipeline([
    ('poly', PolynomialFeatures(degree=5)),
    ('ridge', Ridge(alpha=1.0))  # alpha controls bias-variance
])
```

The sweet spot: sufficient model complexity + regularization to balance both.
