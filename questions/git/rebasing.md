---
title: "What is rebasing in git?"
tags: [git, rebase, history]
difficulty: medium
---

Rebasing moves or combines commits from one branch onto another base commit. It rewrites commit history to create a linear sequence.

```bash
# Rebase feature branch onto main
git checkout feature-branch
git rebase main

# Interactive rebase — squash/edit commits
git rebase -i HEAD~3
```

**Merge vs Rebase:**
- `merge` preserves history with a merge commit
- `rebase` creates a clean, linear history

> Never rebase on shared public branches — it rewrites history and causes conflicts for others.
