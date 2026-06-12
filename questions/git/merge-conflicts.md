---
title: "What are merge conflicts?"
tags: [git, merge, conflicts]
difficulty: medium
---

A merge conflict occurs when two branches modify the same part of a file and Git cannot automatically determine which version to use.

Conflicts arise during:
- `git merge`
- `git rebase`
- `git cherry-pick`

**Conflict markers in a file:**

```bash
<<<<<<< HEAD
your changes here
=======
incoming changes here
>>>>>>> feature-branch
```

Resolve by editing the file to keep the desired changes, then:

```bash
git add resolved-file.txt
git commit -m "resolve merge conflict"
```
