---
title: "What is a pull request?"
tags: [git, github, pull-request, code-review]
difficulty: easy
---

A pull request (PR) is a mechanism to propose changes from one branch to another, typically from a feature branch to `main`.

It enables:
- Code review before merging
- Discussion and inline comments
- CI/CD pipeline integration
- Approval workflows

```bash
# Create a branch and push it
git checkout -b feature/new-thing
git push origin feature/new-thing

# Then open a PR on GitHub from feature/new-thing → main
```

PRs are the standard collaboration mechanism in open-source and team workflows.
