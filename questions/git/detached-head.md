---
title: "What is a detached HEAD state?"
tags: [git, head, branches]
difficulty: easy
---

A detached HEAD occurs when HEAD points directly to a commit instead of a branch reference.

```bash
# Enter detached HEAD by checking out a commit
git checkout abc1234

# HEAD is now detached
git status
# HEAD detached at abc1234

# Create a branch to save work
git checkout -b recovery-branch
```

Any commits made in detached HEAD state will be lost (garbage collected) unless you create a branch to preserve them.
