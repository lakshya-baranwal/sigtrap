# SIGTRAP

> **Pause. Inspect. Understand.**

A minimalist, documentation-style static website for developers preparing for systems, Linux, C++, networking, OS, databases, ML/DL, and low-level engineering interviews. Built with zero frameworks — just HTML, CSS, and vanilla JavaScript.

Live at: **https://sigtrap.vercel.app/**

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

---

## Folder Structure

```
sigtrap/
├── index.html              
├── styles.css              
├── app.js                  
├── manifest.json         
├── generate_manifest.py    
├── README.md
└── questions/              
    ├── backend-system-design/
    ├── coa/
    ├── cpp/
    ├── databases/
    ├── debugging/
    ├── dl/
    ├── general/
    ├── git/
    ├── important-tips/
    ├── linux/
    ├── ml/
    ├── networking/
    ├── oops/
    ├── os/
    ├── python/
    └── quant/
```

---

## Revision Status

Revision status is **personal and client-side only**. It is stored in your browser's `localStorage` and is **never** committed to the repository.

- **Gray dot** — Not Reviewed (default)
- **Orange dot** — Needs Revision
- **Green dot** — Mastered

Click the colored dot next to any question to cycle through statuses. Your progress persists across sessions in the same browser.

---

## How to Add a New Question

### 1. Locate or Create the Correct Topic Directory

All questions are stored in Markdown files under the `questions/` directory, organized by topic subfolders:

- **Git & GitHub:** `questions/git/`
- **Linux:** `questions/linux/`
- **COA:** `questions/coa/`
- **Networking:** `questions/networking/`
- **C++:** `questions/cpp/`
- **OOPs:** `questions/oops/`
- **Python:** `questions/python/`
- **Backend & System Design:** `questions/backend-system-design/`
- **Databases:** `questions/databases/`
- **ML:** `questions/ml/`
- **DL:** `questions/dl/`
- **OS:** `questions/os/`
- **Debugging:** `questions/debugging/`
- **Quant:** `questions/quant/`
- **General:** `questions/general/`
- **Important Tips:** `questions/important-tips/`

### 2. Create the Markdown File

Create a new file in the appropriate topic directory using a URL-friendly, kebab-case filename ending with `.md` (e.g., `query-optimization.md`).

### 3. Add Valid YAML Frontmatter

At the very top of your Markdown file, define the frontmatter metadata block between `---` delimiters.

> **Note:** The project uses a custom, lightweight Python frontmatter parser. Follow the spacing and syntax below exactly to ensure it parses successfully.

```yaml
---
title: "Your Question Title Here"
tags: [databases, optimization, sql]
difficulty: medium
---
```

- **title** (required) — Wrap the title in double quotes
- **tags** (required) — Array of lowercase tags inside square brackets `[...]`, separated by commas
- **difficulty** (required) — One of: `easy`, `medium`, `hard`

### 4. Write the Content

Below the frontmatter, write the answer using standard Markdown. Supported features:
- Headings (`## Example`)
- Paragraphs, bold, italic, inline code
- Fenced code blocks with language (` ```bash `)
- Unordered and ordered lists
- Tables
- Blockquotes

### 5. Regenerate the Manifest

The frontend relies on `manifest.json` to load the sidebar navigation and list questions. Once your Markdown file is saved, run the generator script from the project root:

```bash
python3 generate_manifest.py
```

This script scans the `questions/` directories, validates the YAML frontmatter, and outputs the updated `manifest.json`.

### 6. Commit and Push

```bash
git add questions/<topic>/<slug>.md manifest.json
git commit -m "Add question: <title>"
git push
```

### Adding a Brand New Topic (Optional)

If your question doesn't fit any existing topic:

1. Create a new directory under `questions/` (e.g., `questions/rust/`).
2. Open `generate_manifest.py` and:
   - Add the new topic key, label, and icon identifier to `TOPIC_META`.
   - Insert the topic key into the desired position in the `TOPIC_ORDER` list.
3. Add your Markdown file to the new directory.
4. Run `python3 generate_manifest.py` to rebuild the manifest.

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

## Contributing

Contributions are welcome! To add or improve content:

1. **Fork** the repository and clone it locally.
2. Follow the steps in [How to Add a New Question](#how-to-add-a-new-question) to add or edit question files.
3. Keep answers concise, accurate, and interview-focused. Prefer clear examples and diagrams (in Markdown/ASCII) where helpful.
4. Test your changes locally using a local HTTP server (see [Running Locally](#running-locally)).
5. Submit a **pull request** with a clear description of the question(s) added or changed.

### Contribution Guidelines

- One question per Markdown file, named with a descriptive `kebab-case` slug.
- Frontmatter (`title`, `tags`, `difficulty`) is mandatory and must follow the existing format.
- Avoid duplicating existing questions — check the topic folder first.
- Use proper Markdown formatting (headings, code blocks with language hints, tables) for readability.
- Keep tone neutral and explanations beginner-friendly where possible, while still being technically precise.
- Do not commit generated/build artifacts other than `manifest.json`.

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
