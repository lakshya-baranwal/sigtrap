/* ═══════════════════════════════════════════════════════════
   SIGTRAP — app.js
   Vanilla JavaScript application controller.
   No frameworks, no build tools.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── State ───
  let manifest = null;
  let activeTopic = null;
  let activeQuestion = null;
  
  // Caches
  const mdCache = {};        // slug → raw markdown
  // PART A, Item 3: Cache lowercased markdown alongside raw markdown
  const mdCacheLower = {};   // slug → lowercased raw markdown
  const contentCache = {};   // slug → rendered HTML
  
  // PART A, Item 3: Precomputed search index built once at initialization
  let searchIndex = [];      
  
  // PART A, Item 2: In-memory revision status cache (write-through cache)
  let statusMap = {};        

  // ─── DOM refs ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const topicNav = $('#topic-nav');
  const panelTitle = $('#panel-title');
  const panelCount = $('#panel-count');
  const questionList = $('#question-list');
  const answerEmpty = $('#answer-empty');
  const answerContent = $('#answer-content');
  const answerBody = $('#answer-body');
  const searchInput = $('#search-input');
  const searchResults = $('#search-results');
  const themeToggle = $('#theme-toggle');
  const randomBtn = $('#random-btn');

  // ─── Topic Icons (inline SVG) ───
  const TOPIC_ICONS = {
    git: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5v6l4 3V8L2 5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 8l4-3v6l-4 3V8z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M10 5l4 3v-2l-4-3V5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    linux: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 14c0-2 1-3 2-4s2-2 2-4c0 2 1 3 2 4s2 2 2 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="4" r="2.5" stroke="currentColor" stroke-width="1.3"/></svg>',
    coa: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.3"/><rect x="5" y="5" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" stroke-width="1.2"/></svg>',
    networking: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1.8" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="12" r="1.8" stroke="currentColor" stroke-width="1.2"/><circle cx="13" cy="12" r="1.8" stroke="currentColor" stroke-width="1.2"/><line x1="7" y1="4.5" x2="4" y2="10.5" stroke="currentColor" stroke-width="1.2"/><line x1="9" y1="4.5" x2="12" y2="10.5" stroke="currentColor" stroke-width="1.2"/><line x1="5" y1="12" x2="11" y2="12" stroke="currentColor" stroke-width="1.2"/></svg>',
    cpp: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><text x="8" y="12" text-anchor="middle" font-size="10" font-weight="700" font-family="monospace" fill="currentColor">C+</text></svg>',
    oops: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="2" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="10" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="10" width="5" height="4" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M8 6v2M4.5 8h7v2M4.5 10v-2" stroke="currentColor" stroke-width="1.2"/></svg>',
    python: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 2H6a3 3 0 0 0-3 3v2h2v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-2V2z" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="5" r="0.8" fill="currentColor"/><circle cx="11" cy="11" r="0.8" fill="currentColor"/></svg>',
    'backend-system-design': '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" stroke-width="1.2"/><line x1="2" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="4" r="0.8" fill="currentColor"/><circle cx="5" cy="8" r="0.8" fill="currentColor"/><circle cx="5" cy="12" r="0.8" fill="currentColor"/><line x1="8" y1="4" x2="11" y2="4" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="8" x2="11" y2="8" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="12" x2="11" y2="12" stroke="currentColor" stroke-width="1.2"/></svg>',
    databases: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="4" rx="5" ry="2" stroke="currentColor" stroke-width="1.2"/><path d="M3 4v4c0 1.1.9 2 5 2s5-.9 5-2V4M3 8v4c0 1.1.9 2 5 2s5-.9 5-2V8" stroke="currentColor" stroke-width="1.2"/></svg>',
    ml: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="4" r="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="12" r="1.5" stroke="currentColor" stroke-width="1.2"/><line x1="5.5" y1="7.5" x2="10.5" y2="4.5" stroke="currentColor" stroke-width="1.1"/><line x1="5.5" y1="8.5" x2="10.5" y2="11.5" stroke="currentColor" stroke-width="1.1"/></svg>',
    dl: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.8"/><rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.9" fill="var(--bg)"/><rect x="6" y="6" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.2" fill="var(--bg)"/></svg>',
    os: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><line x1="5" y1="14" x2="11" y2="14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" stroke-width="1.3"/></svg>',
    debugging: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="9" r="4" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="3" y1="6" x2="5" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="13" y1="6" x2="11" y2="7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="3" y1="12" x2="5" y2="11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="13" y1="12" x2="11" y2="11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
    quant: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14V2M2 14h12M4 11l3-5 3 2 4-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    general: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4l4 4-4 4M9 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'important-tips': '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5v2.5h4v-2.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" stroke="currentColor" stroke-width="1.2"/><path d="M6 15h4" stroke="currentColor" stroke-width="1.2"/></svg>',
  };

  // ─── Revision Status (PART A, Item 2: Write-Through Cache) ───
  const STATUS_CYCLE = ['none', 'revision', 'mastered'];
  const STATUS_KEY = 'sigtrap-revision';

  // Loads revision statuses once on initialization
  function initStatuses() {
    try {
      statusMap = JSON.parse(localStorage.getItem(STATUS_KEY)) || {};
    } catch {
      statusMap = {};
    }
  }

  // Writes cached values to localStorage only on changes
  function saveStatuses() {
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify(statusMap));
    } catch (e) {
      console.error('Failed to save statuses to localStorage:', e);
    }
  }

  function getStatus(key) {
    return statusMap[key] || 'none';
  }

  function cycleStatus(key) {
    const current = statusMap[key] || 'none';
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
    if (next === 'none') {
      delete statusMap[key];
    } else {
      statusMap[key] = next;
    }
    saveStatuses();
    return next;
  }

  // ─── Theme ───
  function initTheme() {
    const saved = localStorage.getItem('sigtrap-theme');
    const theme = saved || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateHljsTheme(theme);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sigtrap-theme', next);
    updateHljsTheme(next);
  }
  function updateHljsTheme(theme) {
    const link = document.getElementById('hljs-theme');
    if (link) {
      // PART A, Item 6: Swaps correctly between dark and light styles (intentional visual fix)
      link.href = theme === 'dark'
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }
  }

  // ─── Markdown Parser (vanilla, no deps) ───
  function parseMarkdown(md) {
    // Remove frontmatter
    let content = md.replace(/^---[\s\S]*?---\n*/, '');

    // Extract math blocks to prevent markdown parsing issues inside equations
    const mathBlocks = [];
    // 1. Display math: $$ ... $$
    content = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
      mathBlocks.push({ type: 'display', math });
      return `\n<!--MATH:${mathBlocks.length - 1}-->\n`;
    });
    // 2. Inline math: $ ... $
    content = content.replace(/\$([^$\n]+?)\$/g, (match, math) => {
      mathBlocks.push({ type: 'inline', math });
      return `<!--MATH:${mathBlocks.length - 1}-->`;
    });

    // Fenced code blocks
    content = content.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const l = lang || 'text';
      const escaped = escapeHtml(code.trimEnd());
      return `<!--CODE:${l}--><pre><code class="language-${l}">${escaped}</code></pre><!--/CODE-->`;
    });

    // Tables
    content = content.replace(/^(\|.+\|)\n(\|[-:\s|]+\|)\n((?:\|.+\|\n?)*)/gm, (_, header, sep, body) => {
      const headers = header.split('|').filter(c => c.trim()).map(c => `<th>${inlineMarkdown(c.trim())}</th>`).join('');
      const rows = body.trim().split('\n').map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${inlineMarkdown(c.trim())}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    // Block-level processing
    const lines = content.split('\n');
    let html = '';
    let i = 0;
    let inList = false;
    let listType = '';

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks (already processed)
      if (line.startsWith('<!--CODE:')) {
        if (inList) { html += `</${listType}>`; inList = false; }
        html += line + '\n';
        i++;
        continue;
      }
      if (line.startsWith('<!--/CODE-->')) {
        html += line + '\n';
        i++;
        continue;
      }
      if (line.startsWith('<!--MATH:')) {
        if (inList) { html += `</${listType}>`; inList = false; }
        html += line + '\n';
        i++;
        continue;
      }
      if (line.startsWith('<pre>') || line.startsWith('<table>') || line.startsWith('</')) {
        if (inList) { html += `</${listType}>`; inList = false; }
        html += line + '\n';
        i++;
        continue;
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        if (inList) { html += `</${listType}>`; inList = false; }
        const level = headingMatch[1].length;
        html += `<h${level}>${inlineMarkdown(headingMatch[2])}</h${level}>\n`;
        i++;
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        if (inList) { html += `</${listType}>`; inList = false; }
        let quote = '';
        while (i < lines.length && lines[i].startsWith('> ')) {
          quote += lines[i].substring(2) + ' ';
          i++;
        }
        html += `<blockquote><p>${inlineMarkdown(quote.trim())}</p></blockquote>\n`;
        continue;
      }

      // Unordered list
      if (line.match(/^[-*]\s+/)) {
        if (!inList || listType !== 'ul') {
          if (inList) html += `</${listType}>`;
          html += '<ul>';
          inList = true;
          listType = 'ul';
        }
        html += `<li>${inlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>\n`;
        i++;
        continue;
      }

      // Ordered list
      if (line.match(/^\d+\.\s+/)) {
        if (!inList || listType !== 'ol') {
          if (inList) html += `</${listType}>`;
          html += '<ol>';
          inList = true;
          listType = 'ol';
        }
        html += `<li>${inlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>\n`;
        i++;
        continue;
      }

      // Close list if not a list item
      if (inList && line.trim() === '') {
        html += `</${listType}>`;
        inList = false;
      }

      // Blank line
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Paragraph
      if (inList) { html += `</${listType}>`; inList = false; }
      let para = '';
      const startI = i;
      while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/^[-*#>]/) && !lines[i].match(/^\d+\./) && !lines[i].startsWith('<!--') && !lines[i].startsWith('<') && !lines[i].startsWith('|')) {
        para += lines[i] + ' ';
        i++;
      }
      if (para.trim()) {
        html += `<p>${inlineMarkdown(para.trim())}</p>\n`;
      } else if (i === startI) {
        // Fallback to safely advance index on unhandled lines starting with '<' or '|' (prevents infinite loop crashes)
        html += `<p>${inlineMarkdown(lines[i].trim())}</p>\n`;
        i++;
      }
      continue;
    }
    if (inList) html += `</${listType}>`;

    // Restore math blocks
    html = html.replace(/<!--MATH:(\d+)-->/g, (match, index) => {
      const block = mathBlocks[parseInt(index, 10)];
      if (block.type === 'display') {
        return `$$${block.math}$$`;
      } else {
        return `$${block.math}$`;
      }
    });

    return html;
  }

  function inlineMarkdown(text) {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return text;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ─── Render markdown → HTML with code block wrappers ───
  function renderMarkdown(md, title) {
    let html = parseMarkdown(md);

    // Wrap code blocks with header (language badge + copy button)
    html = html.replace(/<!--CODE:(\w+)--><pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre><!--\/CODE-->/g,
      (_, lang, langClass, code) => {
        const displayLang = lang === 'text' ? '' : lang;
        return `<div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-lang-badge">${displayLang}</span>
            <button class="code-copy-btn" onclick="window.__copyCode(this)">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M9 4V2.5A1.5 1.5 0 0 0 7.5 1H2.5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H4" stroke="currentColor" stroke-width="1.2"/></svg>
              Copy
            </button>
          </div>
          <pre><code class="language-${langClass}">${code}</code></pre>
        </div>`;
      }
    );

    // Prepend title as h1
    if (title) {
      html = `<h1>${escapeHtml(title)}</h1>\n` + html;
    }

    return html;
  }

  // ─── Copy code handler (global) ───
  window.__copyCode = function (btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    const code = wrapper.querySelector('pre code');
    const text = code.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="2,7 5,10 11,3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied!`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M9 4V2.5A1.5 1.5 0 0 0 7.5 1H2.5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H4" stroke="currentColor" stroke-width="1.2"/></svg> Copy`;
      }, 2000);
    });
  };

  // ─── Sidebar ───
  function renderSidebar() {
    if (!manifest) return;
    topicNav.innerHTML = '';
    manifest.topics.forEach(topic => {
      const btn = document.createElement('button');
      btn.className = 'topic-item';
      btn.dataset.topic = topic.key;
      btn.innerHTML = `
        <span class="topic-icon">${TOPIC_ICONS[topic.icon] || ''}</span>
        <span class="topic-label">${topic.label}</span>
      `;
      btn.addEventListener('click', () => selectTopic(topic.key));
      topicNav.appendChild(btn);
    });
  }

  // ─── Select Topic ───
  function selectTopic(key) {
    // PART A, Item 5: Avoid redundant rendering of active topic
    if (activeTopic && activeTopic.key === key) return;

    activeTopic = manifest.topics.find(t => t.key === key);
    if (!activeTopic) return;

    // Update sidebar active state
    topicNav.querySelectorAll('.topic-item').forEach(el => {
      el.classList.toggle('active', el.dataset.topic === key);
    });

    // Update panel header
    panelTitle.textContent = activeTopic.label;
    panelCount.textContent = `${activeTopic.questions.length} questions`;

    // Render question cards
    renderQuestionList();
  }

  // PART A, Item 5: Render list with DOM diffing rather than full innerHTML rebuilds
  function renderQuestionList() {
    if (!activeTopic) return;

    // Map existing cards by slug
    const currentCards = {};
    questionList.querySelectorAll('.question-card').forEach(card => {
      currentCards[card.dataset.slug] = card;
    });

    // Keep track of which slugs were kept
    const keptSlugs = new Set();

    activeTopic.questions.forEach(q => {
      const statusKey = `${activeTopic.key}/${q.slug}`;
      const status = getStatus(statusKey);
      keptSlugs.add(q.slug);

      let card = currentCards[q.slug];
      if (card) {
        // Update selection class in-place
        card.classList.toggle('selected', activeQuestion && activeQuestion.slug === q.slug);

        // Update status dot visual class and data key attribute in-place (Item 5)
        const dot = card.querySelector('.status-dot');
        if (dot) {
          dot.className = `status-dot dot-${status}`;
          dot.dataset.key = statusKey;
        }
      } else {
        // Construct new card elements only if they do not exist
        card = document.createElement('div');
        card.className = 'question-card';
        card.dataset.slug = q.slug;
        card.classList.toggle('selected', activeQuestion && activeQuestion.slug === q.slug);

        card.innerHTML = `
          <div class="question-card-left">
            <span class="status-dot dot-${status}" data-key="${statusKey}" title="Click to cycle status"></span>
            <span class="question-card-title">${escapeHtml(q.title)}</span>
          </div>
          <span class="question-card-chevron">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="4,2 8,6 4,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        `;
      }

      // Re-insert card in correct order
      questionList.appendChild(card);
    });

    // Remove any cards that are no longer part of the list
    Object.keys(currentCards).forEach(slug => {
      if (!keptSlugs.has(slug)) {
        currentCards[slug].remove();
      }
    });
  }

  // Helper to extract language names from class="language-xyz" in generated HTML (PART A, Item 4)
  function extractLanguagesFromHtml(html) {
    const langs = new Set();
    const regex = /class="language-(\w+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      langs.add(match[1]);
    }
    return Array.from(langs);
  }

  // ─── Select Question ───
  async function selectQuestion(q) {
    activeQuestion = q;
    const topicKey = activeTopic.key;
    const slug = q.slug;
    const cacheKey = `${topicKey}/${slug}`;

    // Highlight selected card in sidebar
    questionList.querySelectorAll('.question-card').forEach(el => {
      el.classList.toggle('selected', el.dataset.slug === slug);
    });

    // Show answer panel layout
    answerEmpty.hidden = true;
    answerContent.hidden = false;
    
    // PART B, Item 2: Single-column view switching on mobile
    $('.app-layout').classList.add('show-answer');

    // Load markdown content dynamically
    if (!contentCache[cacheKey]) {
      answerBody.innerHTML = '<p style="color:var(--text-muted);padding:20px;">Loading...</p>';
      try {
        let md;
        if (mdCache[cacheKey]) {
          md = mdCache[cacheKey];
        } else {
          const resp = await fetch(q.file);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          md = await resp.text();
          mdCache[cacheKey] = md;
          mdCacheLower[cacheKey] = md.toLowerCase();
        }
        contentCache[cacheKey] = renderMarkdown(md, q.title);
      } catch (err) {
        contentCache[cacheKey] = `<h1>${escapeHtml(q.title)}</h1><p style="color:var(--text-muted);">Failed to load content.</p>`;
      }
    }

    // PART A, Item 4: Synchronously load required highlight.js language scripts first (prevents flash of unstyled code)
    const neededLangs = extractLanguagesFromHtml(contentCache[cacheKey]);
    await Promise.all(neededLangs.map(lang => loadLanguageScript(lang)));

    answerBody.innerHTML = contentCache[cacheKey];

    // Render mathematical equations using KaTeX if available
    if (window.renderMathInElement) {
      renderMathInElement(answerBody, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError: false
      });
    }

    // Reset lazy observer
    highlightObserver.disconnect();

    // PART A, Item 4: Synchronously highlight code blocks in viewport; lazy observer for offscreen blocks
    const scrollContainerHeight = answerBody.clientHeight || window.innerHeight;
    answerBody.querySelectorAll('pre code').forEach(block => {
      const rect = block.getBoundingClientRect();
      const isVisible = rect.top < scrollContainerHeight + 100;
      
      if (isVisible) {
        if (window.hljs) {
          hljs.highlightElement(block);
          block.dataset.highlighted = 'true';
        }
      } else {
        highlightObserver.observe(block);
      }
    });
  }

  // PART B, Item 2: mobile back button view switcher
  function closeAnswerPanel() {
    $('.app-layout').classList.remove('show-answer');
  }

  // ─── Search Index Builder (PART A, Item 3) ───
  // Pre-computes search queries once at initialization
  function buildSearchIndex() {
    searchIndex = [];
    if (!manifest) return;
    manifest.topics.forEach(topic => {
      topic.questions.forEach(q => {
        searchIndex.push({
          topicKey: topic.key,
          topicLabel: topic.label,
          slug: q.slug,
          title: q.title,
          titleLower: q.title.toLowerCase(),
          tagsLower: (q.tags || []).map(t => t.toLowerCase()),
          questionRef: q
        });
      });
    });
  }

  // ─── Search ───
  let searchTimeout = null;
  let preloadingStarted = false;
  function initSearch() {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => performSearch(searchInput.value), 150);
    });

    searchInput.addEventListener('focus', () => {
      // PART A, Item 1: Lazy load markdown content in the background ONLY when user intends to search
      if (!preloadingStarted) {
        preloadingStarted = true;
        startLazyPreloading();
      }
      if (searchInput.value.trim()) performSearch(searchInput.value);
    });

    // Close search on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-center')) {
        searchResults.hidden = true;
      }
    });

    // ⌘K shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
      if (e.key === 'Escape') {
        searchResults.hidden = true;
        searchInput.blur();
      }
    });
  }

  function performSearch(query) {
    const queryClean = query.trim().toLowerCase();
    if (!queryClean || queryClean.length < 2) {
      searchResults.hidden = true;
      return;
    }

    const results = [];
    searchIndex.forEach(item => {
      const titleMatch = item.titleLower.includes(queryClean);
      const tagMatch = item.tagsLower.some(t => t.includes(queryClean));
      
      // PART A, Item 3: Content-matches only execute against already preloaded/cached entries
      const cacheKey = `${item.topicKey}/${item.slug}`;
      const cachedLower = mdCacheLower[cacheKey];
      const contentMatch = cachedLower && cachedLower.includes(queryClean);

      if (titleMatch || tagMatch || contentMatch) {
        let snippet = '';
        if (contentMatch) {
          const rawCached = mdCache[cacheKey];
          const idx = cachedLower.indexOf(queryClean);
          const start = Math.max(0, idx - 40);
          const end = Math.min(rawCached.length, idx + queryClean.length + 60);
          snippet = rawCached.substring(start, end).replace(/[#*`\n]/g, ' ').trim();
        }
        results.push({ 
          topicKey: item.topicKey,
          topicLabel: item.topicLabel,
          question: item.questionRef, 
          snippet, 
          titleMatch 
        });
      }
    });

    // Sort: Title matches rank higher
    results.sort((a, b) => (b.titleMatch ? 1 : 0) - (a.titleMatch ? 1 : 0));

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
    } else {
      searchResults.innerHTML = results.slice(0, 10).map(r => `
        <div class="search-result-item" data-topic="${r.topicKey}" data-slug="${r.question.slug}">
          <div class="search-result-topic">${r.topicLabel}</div>
          <div class="search-result-title">${highlightQuery(r.question.title, queryClean)}</div>
          ${r.snippet ? `<div class="search-result-snippet">${highlightQuery(escapeHtml(r.snippet), queryClean)}</div>` : ''}
        </div>
      `).join('');

      // Search results list clicks
      searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const topicKey = el.dataset.topic;
          const slug = el.dataset.slug;
          selectTopic(topicKey);
          const q = activeTopic.questions.find(q => q.slug === slug);
          if (q) selectQuestion(q);
          searchResults.hidden = true;
          searchInput.value = '';
        });
      });
    }

    searchResults.hidden = false;
  }

  function highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // ─── Random Question ───
  function triggerRandom() {
    if (!manifest) return;
    const allQuestions = [];
    manifest.topics.forEach(topic => {
      topic.questions.forEach(q => allQuestions.push({ topic, question: q }));
    });
    if (allQuestions.length === 0) return;
    const pick = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    selectTopic(pick.topic.key);
    selectQuestion(pick.question);
  }

  // PART A, Item 1: Throttled Lazy Preloading (Batches of 3, Idle-time)
  function startLazyPreloading() {
    if (!manifest) return;

    const queue = [];
    manifest.topics.forEach(topic => {
      topic.questions.forEach(q => {
        const key = `${topic.key}/${q.slug}`;
        if (!mdCache[key]) {
          queue.push({ key, file: q.file });
        }
      });
    });

    let index = 0;
    const BATCH_SIZE = 3;

    async function loadNextBatch() {
      if (index >= queue.length) return;

      const batch = queue.slice(index, index + BATCH_SIZE);
      index += BATCH_SIZE;

      // Fetch batch elements in parallel (max 3 concurrent)
      const promises = batch.map(async (item) => {
        try {
          const resp = await fetch(item.file);
          if (resp.ok) {
            const text = await resp.text();
            mdCache[item.key] = text;
            mdCacheLower[item.key] = text.toLowerCase();
          }
        } catch (err) {
          // Ignore preloading failures
        }
      });

      await Promise.all(promises);

      // Defer next preloading block using idle callback
      if (index < queue.length) {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => setTimeout(loadNextBatch, 500));
        } else {
          setTimeout(loadNextBatch, 1000);
        }
      }
    }

    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => loadNextBatch());
    } else {
      setTimeout(loadNextBatch, 500);
    }
  }

  // PART A, Item 4: Dynamic highlight.js Language Module Loader
  const loadedLanguages = new Set();
  function loadLanguageScript(lang) {
    const langMap = {
      'bash': 'bash',
      'sh': 'bash',
      'c': 'c',
      'cpp': 'cpp',
      'c++': 'cpp',
      'python': 'python',
      'py': 'python',
      'json': 'json',
      'yaml': 'yaml',
      'yml': 'yaml',
      'javascript': 'javascript',
      'js': 'javascript',
      'x86asm': 'x86asm',
      'asm': 'x86asm'
    };

    const cdnLang = langMap[lang.toLowerCase()];
    if (!cdnLang || loadedLanguages.has(cdnLang)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${cdnLang}.min.js`;
      script.defer = true;
      script.onload = () => {
        loadedLanguages.add(cdnLang);
        resolve();
      };
      script.onerror = () => {
        console.error(`Failed to load highlight.js language module: ${cdnLang}`);
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  // PART A, Item 4: IntersectionObserver for Lazy Syntax Highlighting
  let highlightObserver = null;
  function initHighlightObserver() {
    highlightObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const block = entry.target;
          if (!block.dataset.highlighted && window.hljs) {
            let lang = 'text';
            block.classList.forEach(className => {
              if (className.startsWith('language-')) {
                lang = className.substring(9);
              }
            });

            loadLanguageScript(lang).then(() => {
              if (window.hljs) {
                hljs.highlightElement(block);
                block.dataset.highlighted = 'true';
              }
            });
          }
          observer.unobserve(block);
        }
      });
    }, { root: answerBody, rootMargin: '50px' });
  }

  // ─── Initialize ───
  async function init() {
    initStatuses();
    initTheme();
    initHighlightObserver();
    initSearch();
    themeToggle.addEventListener('click', toggleTheme);
    randomBtn.addEventListener('click', triggerRandom);

    // PART A, Item 5: Delegated click handler for question cards and status dots
    questionList.addEventListener('click', (e) => {
      const dot = e.target.closest('.status-dot');
      if (dot) {
        e.stopPropagation();
        const statusKey = dot.dataset.key;
        const newStatus = cycleStatus(statusKey);
        dot.className = `status-dot dot-${newStatus}`;
        return;
      }

      const card = e.target.closest('.question-card');
      if (card) {
        const slug = card.dataset.slug;
        const q = activeTopic.questions.find(item => item.slug === slug);
        if (q) selectQuestion(q);
      }
    });

    // PART B, Item 2: Mobile Back Button Listener
    const backBtn = $('#back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', closeAnswerPanel);
    }

    try {
      const resp = await fetch('manifest.json');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      manifest = await resp.json();
    } catch (err) {
      panelTitle.textContent = 'Error loading manifest';
      panelCount.textContent = 'Start a local server: python3 -m http.server 8000';
      console.error('Failed to load manifest.json:', err);
      return;
    }

    buildSearchIndex();
    renderSidebar();

    // Select first topic by default
    if (manifest.topics.length > 0) {
      selectTopic(manifest.topics[0].key);
    }
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
