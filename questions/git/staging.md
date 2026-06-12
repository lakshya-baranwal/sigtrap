---
title: "What is staging in git?"
tags: [git, staging, index]
difficulty: easy
---

The staging area (also called the index) is a preparation zone between your working directory and the repository.

Files move through three states:
- **Working Directory** → where you edit files
- **Staging Area** → where you prepare commits
- **Repository** → where commits are stored

```bash
# Stage a specific file
git add filename.txt

# Stage all changes
git add .

# Check staging status
git status

# Unstage a file
git restore --staged filename.txt
```

Think of staging as curating exactly what goes into your next commit.
