---
title: "What is git stash?"
tags: [git, stash, workflow]
difficulty: easy
---

`git stash` temporarily shelves uncommitted changes so you can switch context without committing incomplete work.

```bash
# Stash current changes
git stash

# Stash with a message
git stash push -m "work in progress: auth feature"

# List all stashes
git stash list

# Apply the latest stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Drop a stash
git stash drop stash@{0}
```

Useful when you need to pull latest changes or switch branches urgently.
