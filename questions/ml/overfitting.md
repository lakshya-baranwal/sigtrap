---
title: "What is overfitting and how do you prevent it?"
tags: [ml, overfitting, regularization, dropout]
difficulty: medium
---

Overfitting occurs when a model learns the training data too well, including noise, resulting in poor generalization to new data.

**Prevention techniques:**

```python
# 1. Regularization — penalize large weights
from torch import nn

# L2 regularization (weight decay)
optimizer = torch.optim.Adam(model.parameters(), weight_decay=1e-4)

# L1 regularization
l1_loss = sum(p.abs().sum() for p in model.parameters())
loss = criterion(output, target) + 0.001 * l1_loss

# 2. Dropout — randomly zero activations during training
class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)
        self.dropout = nn.Dropout(p=0.5)  # 50% dropout rate
        self.fc2 = nn.Linear(256, 10)

# 3. Early stopping
best_val_loss = float('inf')
for epoch in range(max_epochs):
    train()
    val_loss = evaluate()
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        save_checkpoint()
    elif patience_exceeded:
        break  # stop before overfitting

# 4. Data augmentation
transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomCrop(32, padding=4),
    transforms.ColorJitter(brightness=0.2),
])
```
