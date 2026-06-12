# SIGTRAP

> **Pause. Inspect. Understand.**

A minimalist, documentation-style static website for developers preparing for systems, Linux, C++, networking, ML, and low-level engineering interviews. Built with zero frameworks — just HTML, CSS, and vanilla JavaScript.

Inspired by the aesthetics of Linear, Vercel, Raycast, and Notion.

---

## Features

- **Three-column layout** — Topics sidebar, question list, documentation-style answer panel
- **Markdown-driven content** — One file per question with YAML frontmatter
- **Syntax highlighting** — Code blocks with language badge + copy button (via highlight.js)
- **Revision tracking** — Client-side only (localStorage), cycle through: Not Reviewed → Needs Revision → Mastered
- **Global search** — Instant search across titles, tags, and content (⌘K / Ctrl+K shortcut)
- **Random Question** — Jump to any question across all topics
- **Light/Dark theme** — Persisted in localStorage
- **Zero build tools** — No React, no Tailwind, no bundlers
- **GitHub Pages ready** — Deploy with zero config

---

## Folder Structure

```
sigtrap/
├── index.html              # Main HTML file
├── styles.css              # All styles (vanilla CSS)
├── app.js                  # Application logic (vanilla JS)
├── manifest.json           # Auto-generated question index
├── generate_manifest.py    # Script to rebuild manifest.json
├── README.md
└── questions/              # One folder per topic
    ├── git/
    │   ├── fork-vs-clone.md
    │   ├── merge-conflicts.md
    │   └── ...
    ├── linux/
    │   ├── ptrace.md
    │   └── ...
    ├── coa/
    ├── networking/
    ├── cpp/
    ├── ml/
    ├── os/
    └── debugging/
```

---

## How to Add a New Question

### 1. Create a Markdown file

Create a new `.md` file in the appropriate topic folder:

```bash
questions/<topic>/<slug>.md
```

Example: `questions/linux/epoll.md`

### 2. Add YAML frontmatter

Every question file must start with YAML frontmatter:

```yaml
---
title: "What is epoll?"
tags: [linux, epoll, io-multiplexing, event-driven]
difficulty: medium
---
```

Fields:
- **title** (required) — The question text displayed in the sidebar
- **tags** (required) — Array of lowercase tags for search
- **difficulty** (required) — One of: `easy`, `medium`, `hard`

### 3. Write the answer body

Write the answer in standard Markdown below the frontmatter. Supported features:
- Headings (`## Example`)
- Paragraphs, bold, italic, inline code
- Fenced code blocks with language (` ```bash `)
- Unordered and ordered lists
- Tables
- Blockquotes

### 4. Regenerate the manifest

```bash
python3 generate_manifest.py
```

This scans `questions/` and outputs `manifest.json`.

### 5. Commit and push

```bash
git add questions/<topic>/<slug>.md manifest.json
git commit -m "Add question: <title>"
git push
```

---

## Revision Status

Revision status is **personal and client-side only**. It is stored in your browser's `localStorage` and is **never** committed to the repository.

- **Gray dot** — Not Reviewed (default)
- **Orange dot** — Needs Revision
- **Green dot** — Mastered

Click the colored dot next to any question to cycle through statuses. Your progress persists across sessions in the same browser.

---

## Running Locally

### Option 1: Local HTTP server (recommended)

```bash
cd sigtrap/
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

> **Note:** `fetch()` does not work with `file://` protocol due to CORS restrictions. A local server is required.

### Option 2: VS Code Live Server

Install the "Live Server" extension and right-click `index.html` → Open with Live Server.

---

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Select the `main` branch and `/ (root)` folder
5. Click **Save**

Your site will be live at `https://<username>.github.io/<repo>/` within a few minutes.

No build step required. GitHub Pages serves the static files directly.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS (custom properties, flexbox) |
| Logic | Vanilla JavaScript (ES2020) |
| Fonts | Inter (Google Fonts) |
| Syntax highlighting | highlight.js (CDN) |
| Content | Markdown with YAML frontmatter |
| Manifest | Python 3 script |
| Storage | localStorage (revision status, theme) |

---

## License

MIT — Made with ♥ for learning.
