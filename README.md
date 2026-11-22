# Navin Ganesh Pandiyan — Portfolio Website

A zero-backend, static portfolio website powered by a live GitHub Gist as a Markdown-flat-file CMS.

## Project Structure

```
portfolio/
├── index.html      # Entry point — loads CDN React 18 + Babel + all scripts
├── styles.css      # All Light/Dark theme styles and responsive layout
├── app.jsx         # React components (Navbar, Hero, Experience, Skills, Education, Contact)
├── parser.js       # Lightweight Markdown parser (~120 lines) — no npm required
├── portfolio.md    # Local fallback Markdown content (mirrors the GitHub Gist)
├── .htaccess       # Cache-Control headers for Markdown files on Hostinger
├── Spec.md         # Original specification
└── README.md       # This file
```

- 🌙 **Dark / ☀️ Light mode** — auto-detects OS preference, persists in `localStorage`
- 📱 **Fully responsive** — tested at 375 px (mobile) and 1280 px (desktop)
- ⚡ **Zero build step** — no npm, no webpack, no Node.js; deploy as-is
- 🔄 **Live CMS** — update the GitHub Gist, site refreshes without re-deploying
- 🏷️ **Skill emojis** — every skill displays its emoji as specified
- ♿ **Accessible** — ARIA labels, semantic HTML, WCAG AA colour contrast
