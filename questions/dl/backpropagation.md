---
title: "What is backpropagation?"
tags: [ml, backprop, neural-networks, gradients]
difficulty: hard
---

Backpropagation computes gradients of the loss with respect to all parameters using the chain rule of calculus. It enables efficient training of neural networks.

```python
# Forward pass — compute activations
z1 = W1 @ x + b1     # pre-activation
a1 = relu(z1)         # activation
z2 = W2 @ a1 + b2
loss = cross_entropy(z2, y)

# Backward pass — chain rule
dL/dz2 = softmax(z2) - y_one_hot
dL/dW2 = dL/dz2 @ a1.T
dL/db2 = dL/dz2
dL/da1 = W2.T @ dL/dz2
dL/dz1 = dL/da1 * relu_derivative(z1)
dL/dW1 = dL/dz1 @ x.T
```

```python
# Modern frameworks handle this automatically
import torch
loss = criterion(output, target)
loss.backward()   # computes all gradients
optimizer.step()  # updates parameters
optimizer.zero_grad()
```

Backprop requires storing intermediate activations during the forward pass — a key source of GPU memory consumption.
