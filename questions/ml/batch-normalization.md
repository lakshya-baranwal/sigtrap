---
title: "What is batch normalization?"
tags: [ml, batch-norm, training, deep-learning]
difficulty: medium
---

Batch normalization normalizes activations within a mini-batch to have zero mean and unit variance, then applies learnable scale (γ) and shift (β) parameters.

```python
# Before BatchNorm: activations can have arbitrary scale
# After BatchNorm: stable distributions throughout training

class BatchNorm(nn.Module):
    def __init__(self, num_features, eps=1e-5, momentum=0.1):
        super().__init__()
        self.gamma = nn.Parameter(torch.ones(num_features))
        self.beta = nn.Parameter(torch.zeros(num_features))

    def forward(self, x):
        mean = x.mean(dim=0)
        var = x.var(dim=0, unbiased=False)
        x_norm = (x - mean) / (var + self.eps).sqrt()
        return self.gamma * x_norm + self.beta

# In PyTorch:
model = nn.Sequential(
    nn.Linear(256, 512),
    nn.BatchNorm1d(512),
    nn.ReLU(),
)
```

Benefits: allows higher learning rates, reduces sensitivity to initialization, provides mild regularization, stabilizes training of deep networks.

BatchNorm behaves differently at train vs eval time (uses running statistics at inference).
