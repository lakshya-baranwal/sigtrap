---
title: "What is the attention mechanism?"
tags: [ml, attention, transformer, self-attention]
difficulty: hard
---

Attention allows a model to selectively focus on different parts of the input when producing each part of the output. It is the foundation of Transformer models.

```python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: queries  (batch, heads, seq_len, d_k)
    K: keys     (batch, heads, seq_len, d_k)
    V: values   (batch, heads, seq_len, d_v)
    """
    d_k = Q.shape[-1]
    
    # Compute attention scores
    scores = Q @ K.transpose(-2, -1) / (d_k ** 0.5)
    
    # Apply mask (for causal/padding)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Softmax to get attention weights
    weights = F.softmax(scores, dim=-1)
    
    # Weighted sum of values
    return weights @ V, weights
```

Self-attention: Q, K, V all come from the same sequence — each token attends to all others.

Multi-head attention runs h parallel attention heads with different learned projections, capturing different relationship types.
