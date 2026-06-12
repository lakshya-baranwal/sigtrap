---
title: "What is the difference between CNN and RNN?"
tags: [ml, CNN, RNN, architectures]
difficulty: medium
---

| Property | CNN | RNN |
|----------|-----|-----|
| Structure | Spatial/local patterns | Sequential dependencies |
| Parallelizable | Yes | No (sequential) |
| Memory | No explicit state | Hidden state |
| Best for | Images, audio spectrograms | Text, time series |
| Gradient issues | Vanishing (depth) | Vanishing (length) |

```python
import torch.nn as nn

# CNN — local receptive fields, parameter sharing
class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)

# RNN — processes sequence step by step
class SimpleRNN(nn.Module):
    def __init__(self, input_size, hidden_size):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)

    def forward(self, x):
        output, (h_n, c_n) = self.lstm(x)
        return output
```

Modern NLP has largely replaced RNNs with Transformers (parallel + attention), while CNNs remain dominant for image tasks.
