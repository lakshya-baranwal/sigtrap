---
title: "What is git cherry-pick?"
tags: [git, cherry-pick, commits]
difficulty: medium
---

`git cherry-pick` applies a specific commit from one branch onto another, without merging the entire branch.

```bash
# Apply a single commit by hash
git cherry-pick abc1234

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678

# Cherry-pick without committing
git cherry-pick --no-commit abc1234
```

Use cases:
- Backporting bug fixes to older releases
- Selectively applying hotfixes
- Moving commits from wrong branches
