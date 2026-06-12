---
title: "What are git hooks?"
tags: [git, hooks, automation]
difficulty: medium
---

Git hooks are scripts that run automatically at specific points in the Git workflow.

Located in `.git/hooks/`, they can be written in any scripting language.

```bash
# Pre-commit hook example (.git/hooks/pre-commit)
#!/bin/bash
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Commit aborted."
  exit 1
fi
```

Common hooks:
- `pre-commit` — runs before a commit is created
- `commit-msg` — validates commit message format
- `pre-push` — runs before a push
- `post-merge` — runs after a merge
