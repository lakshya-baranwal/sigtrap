---
title: "Difference between git fork and git clone"
tags: [git, github, fork, clone]
difficulty: easy
---

Both fork and clone are used to copy a repository, but they serve different purposes.

- **Fork** creates a copy of a repository on GitHub under your own account. It is used to contribute to someone else's project.

- **Clone** creates a copy of a repository from GitHub to your local machine. It is used to work on the project locally.

## Example

Clone a repository using HTTPS:

```bash
git clone https://github.com/username/repo.git
```

Fork a repository:

```bash
# On GitHub UI
Click on the "Fork" button on the repository page.
```

Clone your fork:

```bash
git clone https://github.com/your-username/repo.git
```

Fork for collaboration, Clone for local development.
