---
title: "What is the difference between git reset and git revert?"
tags: [git, reset, revert, undo]
difficulty: medium
---

Both undo changes, but they work differently:

| Command | Behavior | History |
|---------|----------|---------|
| `git reset` | Moves HEAD backward | Rewrites history |
| `git revert` | Creates a new undo commit | Preserves history |

```bash
# Reset to previous commit (destructive)
git reset --hard HEAD~1

# Revert a commit safely (safe for shared branches)
git revert abc1234
```

Use `reset` for local cleanup. Use `revert` for shared/remote branches.
