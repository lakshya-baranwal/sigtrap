---
title: "What is the Vanishing Gradient Problem and how is it resolved?"
tags: [dl, deep-learning, training, backprop]
difficulty: medium
---

In deep neural networks, gradients are backpropagated from the output layer to the input layer. When using activation functions like sigmoid or tanh, the gradients can become extremely small, preventing weight updates in early layers.

### Common Solutions:
1. **ReLU Activation**: Using non-saturating activations like ReLU ($f(x) = \max(0, x)$) where the derivative is 1 for positive inputs.
2. **Residual Connections**: Skip connections (like in ResNet) allow gradients to flow directly back without attenuation.
3. **Batch Normalization**: Normalizes inputs to each layer, keeping activations in a stable range.
4. **Proper Initialization**: Xavier/He initialization prevents activations from starting too small or too large.
