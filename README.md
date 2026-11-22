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

## How to Update Your Portfolio Content

**Zero re-upload workflow — update content in seconds:**

1. Open your public GitHub Gist: <https://gist.github.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d>
2. Click **Edit**.
3. Add or update skills (with emoji), experience bullets, or education details following the Markdown schema below.
4. Click **Update public gist**.
5. Wait **1–5 minutes** for GitHub's CDN cache to refresh.
6. Reload your live site — no Hostinger re-upload needed.
7. *(Optional)* Paste the updated Gist text into `portfolio.md` to keep your local backup in sync.

## Markdown Schema (GitHub Gist & portfolio.md)

```markdown
# Navin Ganesh Pandiyan
## Role: Software Engineer II
## Bio: Your one-line professional summary here.

# Contact
- Email: ganesspandian2@gmail.com
- LinkedIn: https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174

# Experience
## Company Name — Role Title | DATE RANGE
### Sub-Project Title (optional)
- Bullet point describing your work
- Another bullet point

# Skills
## Category Name
- 🔥 Skill Name
- ⚡ Another Skill

# Education
## Institution — Degree | YEAR – YEAR
- Achievement or highlight
```

> **Important:** Keep emoji immediately at the start of each skill bullet (e.g., `- 🐍 Python`). The parser reads the leading emoji as the icon.

## Hostinger Deployment

1. Download or zip the entire `portfolio/` folder.
2. Log in to Hostinger → **File Manager** → navigate to `public_html/`.
3. Upload all files to `public_html/` (not inside a subfolder).
4. Visit your domain — the site should load instantly.

> The site uses only CDN scripts, system fonts (Inter via Google Fonts), and static files. No PHP, Node.js, or database configuration is required.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic tags, SEO meta) |
| Styling | CSS3 (Custom Properties, Flexbox, Grid, responsive breakpoints) |
| Logic | React 18 (CDN UMD) + Babel Standalone — `useState` & `useEffect` only |
| Data | GitHub Gist (live) → `./portfolio.md` (fallback) |
| Parser | Custom ~120-line vanilla JS Markdown parser (`parser.js`) |
| Hosting | Hostinger Free Plan (static `public_html/`) |

## Features

- 🌙 **Dark / ☀️ Light mode** — auto-detects OS preference, persists in `localStorage`
- 📱 **Fully responsive** — tested at 375 px (mobile) and 1280 px (desktop)
- ⚡ **Zero build step** — no npm, no webpack, no Node.js; deploy as-is
- 🔄 **Live CMS** — update the GitHub Gist, site refreshes without re-deploying
- 🏷️ **Skill emojis** — every skill displays its emoji as specified
- ♿ **Accessible** — ARIA labels, semantic HTML, WCAG AA colour contrast
