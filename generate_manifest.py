#!/usr/bin/env python3
"""
generate_manifest.py — Scans questions/ recursively, parses YAML frontmatter,
and outputs manifest.json mapping each topic to its questions.

Usage:
    python3 generate_manifest.py

The manifest is consumed by the SIGTRAP frontend to build the sidebar
and question list without any build tools or backend.
"""

import json
import os
import re
import sys

QUESTIONS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "questions")
OUTPUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "manifest.json")

# Topic display names and ordering
TOPIC_META = {
    "git":                   {"label": "Git & GitHub",             "icon": "git"},
    "linux":                 {"label": "Linux",                    "icon": "linux"},
    "coa":                   {"label": "COA",                      "icon": "coa"},
    "networking":            {"label": "Networking",               "icon": "networking"},
    "cpp":                   {"label": "C++",                      "icon": "cpp"},
    "oops":                  {"label": "OOPs",                     "icon": "oops"},
    "python":                {"label": "Python",                   "icon": "python"},
    "backend-system-design": {"label": "Backend & System Design",  "icon": "backend-system-design"},
    "databases":             {"label": "Databases",                "icon": "databases"},
    "ml":                    {"label": "ML",                       "icon": "ml"},
    "dl":                    {"label": "DL",                       "icon": "dl"},
    "os":                    {"label": "OS",                       "icon": "os"},
    "debugging":             {"label": "Debugging",                "icon": "debugging"},
    "quant":                 {"label": "Quant",                    "icon": "quant"},
    "general":               {"label": "General",                  "icon": "general"},
    "important-tips":        {"label": "Important Tips",           "icon": "important-tips"},
}

TOPIC_ORDER = [
    "git",
    "linux",
    "coa",
    "networking",
    "cpp",
    "oops",
    "python",
    "backend-system-design",
    "databases",
    "ml",
    "dl",
    "os",
    "debugging",
    "quant",
    "general",
    "important-tips"
]


def parse_frontmatter(filepath):
    """Parse YAML frontmatter from a markdown file (simple parser, no PyYAML needed)."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Check for frontmatter delimiters
    if not content.startswith("---"):
        return None

    end = content.find("---", 3)
    if end == -1:
        return None

    fm_block = content[3:end].strip()
    meta = {}

    for line in fm_block.split("\n"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue

        match = re.match(r'^(\w+)\s*:\s*(.+)$', line)
        if match:
            key = match.group(1)
            value = match.group(2).strip()

            # Parse arrays: [item1, item2, ...]
            if value.startswith("[") and value.endswith("]"):
                items = value[1:-1].split(",")
                value = [item.strip().strip('"').strip("'") for item in items if item.strip()]

            # Strip surrounding quotes
            elif value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]

            meta[key] = value

    return meta


def scan_questions():
    """Scan the questions directory and build the manifest structure."""
    manifest = {"topics": []}

    for topic_key in TOPIC_ORDER:
        topic_dir = os.path.join(QUESTIONS_DIR, topic_key)
        if not os.path.isdir(topic_dir):
            continue

        meta = TOPIC_META.get(topic_key, {"label": topic_key.title(), "icon": topic_key})
        questions = []

        for filename in sorted(os.listdir(topic_dir)):
            if not filename.endswith(".md"):
                continue

            filepath = os.path.join(topic_dir, filename)
            frontmatter = parse_frontmatter(filepath)

            if frontmatter is None:
                print(f"Skipping {filepath} — no valid frontmatter", file=sys.stderr)
                continue

            slug = filename[:-3]  # remove .md
            questions.append({
                "slug": slug,
                "title": frontmatter.get("title", slug.replace("-", " ").title()),
                "tags": frontmatter.get("tags", []),
                "difficulty": frontmatter.get("difficulty", "medium"),
                "file": f"questions/{topic_key}/{filename}",
            })

        manifest["topics"].append({
            "key": topic_key,
            "label": meta["label"],
            "icon": meta["icon"],
            "questions": questions,
        })

    return manifest


def main():
    print("Scanning questions/ directory...")
    manifest = scan_questions()

    total = sum(len(t["questions"]) for t in manifest["topics"])
    print(f"Found {total} questions across {len(manifest['topics'])} topics")

    for topic in manifest["topics"]:
        print(f"   {topic['label']}: {len(topic['questions'])} questions")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\nmanifest.json written to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
