---
title: "What is git bisect?"
tags: [git, bisect, debugging]
difficulty: medium
---

`git bisect` performs a binary search through commit history to find the commit that introduced a bug.

```bash
# Start bisect session
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good v1.0.0

# Git checks out midpoint — test and mark
git bisect good   # or: git bisect bad

# Repeat until the culprit commit is found
git bisect reset  # exit bisect mode
```

Efficient for large histories — finds the bad commit in O(log n) steps.
