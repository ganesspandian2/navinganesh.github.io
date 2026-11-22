# Portfolio Website Specification (`Spec.md`)

**Owner:** Navin Ganesh Pandiyan

**Target Audience for This Document:** Autonomous AI Coding Agent

**Document Purpose:** Complete, implementation-ready technical and content specification for designing, building, and deploying Navin Ganesh Pandiyan's personal portfolio website using a public GitHub Gist (`portfolio.md`) as a live, zero-backend Markdown database.

## 1. Agent Execution Directives

Follow these rules strictly when implementing this specification:

1. **Zero Hallucination:** Use only the personal details, experience bullets, skills, and education records defined in **Section 6 (Content & Data Specification)** (or dynamically loaded from the owner's GitHub Gist). Do not invent projects, metrics, testimonials, or social links.
2. **Strict Contact Privacy:** Display **ONLY** the Email and LinkedIn contact details specified in Section 6.1. **Do NOT include any phone number** (even if found elsewhere) and do not add placeholder links for GitHub, X/Twitter, Instagram, or a backend contact form.
3. **Simple ReactJS Only:** Write clean, beginner-friendly, functional ReactJS code using basic hooks (`useState`, `useEffect`). Do **not** use TypeScript, Redux, Next.js, Tailwind CSS build pipelines, GraphQL, or complex state/routing libraries.
4. **GitHub Gist Markdown-as-Database:** All portfolio content (Contact, Experience, Skills, Education) is stored in the owner's public GitHub Gist (`https://gist.github.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d`). At runtime, the React app must fetch the versionless Raw Gist URL (`https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw`) and fall back to `./portfolio.md` if the remote fetch fails.
5. **Static-Only Architecture:** The site must run purely in the browser as static files (`HTML`, `CSS`, `JavaScript`/`ReactJS`, `Markdown`) so it can be stored in **Google Drive** and deployed to **Hostinger Free Plan** (`public_html/`) without any Node.js server or database.
6. **Dual Theme Support:** Both **Dark Mode** and **Light (White) Mode** must be implemented as first-class themes and enabled by default via system preference detection with a manual toggle.
7. **Mandatory Skill Emojis:** Every skill item in **all** Skills subsections (both Programming/Scripting Languages and all other Skills subsections) must render an emoji alongside the skill name.

## 2. Tech Stack & Constraints

| Layer | Allowed / Required Technology | Constraints |
| ----- | ----- | ----- |
| **Markup** | HTML5 (`index.html`) | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), responsive viewport meta tag, SEO meta tags |
| **Styling** | CSS3 (`styles.css`) | CSS Custom Properties (variables) for Light/White & Dark themes, Flexbox & CSS Grid, responsive media queries; no CSS preprocessors (SASS/LESS) |
| **Logic & UI** | Simple ReactJS (React 18) + Vanilla JS | Functional components, `useState`, `useEffect` only; keep component tree flat and readable |
| **Data Layer (Live Flat-File CMS)** | Public GitHub Gist (`portfolio.md`) + Lightweight JS Parser (`parser.js`) | Primary fetch from `https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw` with fallback to local `./portfolio.md`; parsed into JS objects by a simple, deterministic parser |
| **Build Approach** | Zero-build CDN React 18 + Babel Standalone *(Recommended)* | Allows deploying directly to Hostinger `public_html/` and backing up in Google Drive without `node_modules` |

### Recommended Zero-Build ReactJS & Gist Setup

* Load React 18, ReactDOM 18, and `@babel/standalone` via official CDN `<script>` tags in `index.html`.
* Keep the Markdown parser (`parser.js`) small (~50–80 lines of plain JavaScript) and tailored to the exact heading/bullet structure of `portfolio.md` (Section 6.5) so no heavy external Markdown AST libraries are needed.
* **Why GitHub Gist Raw URL:** Unlike Google Drive download links (which block browser `fetch()` via CORS), `gist.githubusercontent.com` supports CORS for public Gists. Using `/raw` without a commit hash always serves the latest saved version of the Gist.

## 3. Infrastructure & Deployment Specification

### 3.1 Google Drive Storage & Live Update Workflow

All source code, the local fallback `portfolio.md`, and documentation must live in a single, self-contained project folder suitable for direct backup in **Google Drive** (e.g., `My Drive/Navin_Portfolio_Website/`):

```text
Navin_Portfolio_Website/
├── Spec.md                  # This specification file
├── README.md                # Setup, Gist editing, and Hostinger upload instructions
├── portfolio.md             # Local fallback Markdown copy (mirrors the GitHub Gist)
├── parser.js                # Simple JS parser converting Markdown into structured JS data
├── index.html               # Entry HTML file (loads styles.css, React CDNs, parser.js, app.jsx)
├── styles.css               # All Light/White & Dark mode styles and responsive rules
├── app.jsx                  # Simple ReactJS components, Gist fetch + fallback, and theme toggle
└── .htaccess                # Hostinger cache-control headers for local fallback .md files
```

**Owner Content-Update Workflow (Zero Re-upload Needed):**

1. Open the public GitHub Gist: `https://gist.github.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d`.
2. Click **Edit**, add/update any skill (with emoji), experience bullet, or section following the Section 6.5 format, and click **Update public gist**.
3. Wait ~1–5 minutes for GitHub's raw CDN cache to refresh, then reload the portfolio site in the browser—no Hostinger re-upload or component restart is required.
4. *(Optional)* Periodically copy the updated Gist text into `portfolio.md` in Google Drive so your local backup stays in sync.

### 3.2 Hostinger Free Plan Hosting Requirements

The website will be hosted on **Hostinger (Free Plan)** using static file hosting:

1. **Entry Point:** `index.html` must sit at the root of the project so it can be uploaded directly into Hostinger's `public_html/` directory via File Manager or FTP.
2. **Relative Paths Only:** All internal references (`./styles.css`, `./parser.js`, `./app.jsx`, `./portfolio.md`) must use relative paths so the site works cleanly on any Hostinger subdomain or custom domain.
3. **Cache Busting:**
   * Fetch the raw Gist URL with a cache-busting query param and `cache: 'no-store'`: `fetch('https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw?t=' + Date.now(), { cache: 'no-store' })`.
   * Include a `.htaccess` rule setting `Cache-Control: no-cache, no-store, must-revalidate` for `.md` files.
4. **No Server-Side Dependencies:** No PHP, Node.js runtime, `.env` secrets, or custom backend API calls are permitted.
5. **Fast Initial Load:** Minimize external requests; rely only on system fonts (or a single lightweight Google Font like `Inter` with system fallbacks) and React 18 production UMD scripts.

## 4. Theme & Visual Design System

### 4.1 Dark Mode & White (Light) Mode Behavior

* **Default Behavior:** On initial load, detect the visitor's OS/browser preference using `window.matchMedia('(prefers-color-scheme: dark)')`. If `localStorage.getItem('theme')` exists, honor the saved user choice (`'light'` or `'dark'`).
* **Theme Toggle Control:** Place an accessible toggle button in the top navigation bar (e.g., `☀️ Light` / `🌙 Dark` or icon button with `aria-label="Toggle color theme"`) that switches `[data-theme="light"]` and `[data-theme="dark"]` on `document.documentElement` and persists the selection to `localStorage`.

### 4.2 Color Palette (CSS Custom Properties)

| Token | White (Light) Mode (`[data-theme="light"]`) | Dark Mode (`[data-theme="dark"]`) | Usage |
| ----- | ----- | ----- | ----- |
| `--bg-primary` | `#FFFFFF` | `#0F172A` | Main page background |
| `--bg-secondary` | `#F8FAFC` | `#1E293B` | Cards, section containers, navbar |
| `--bg-badge` | `#EFF6FF` | `#1E3A5F` | Skill badges & date pills |
| `--text-primary` | `#0F172A` | `#F8FAFC` | Headings and primary body text |
| `--text-secondary` | `#475569` | `#94A3B8` | Subtitles, dates, secondary text |
| `--accent` | `#2563EB` | `#38BDF8` | Links, active highlights, accents |
| `--border` | `#E2E8F0` | `#334155` | Card borders and subtle dividers |

All text and background combinations must maintain a minimum **WCAG AA contrast ratio of 4.5:1**.

### 4.3 Layout & Typography

* **Font Family:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Container Width:** Max-width `1000px` centered with `1.5rem` horizontal padding.
* **Responsive Breakpoints:**
  * Desktop (`>= 768px`): Multi-column grids for Skills cards; horizontal header navigation.
  * Mobile (`< 768px`): Single-column stacked layout; compact navigation links; touch-friendly tap targets (`>= 44px`).

## 5. Page Architecture & Component Breakdown

Implement the following simple ReactJS components inside `app.jsx`:

1. **`<App />` (Root Data Loader):**
   * Uses `useState` (`data`, `loading`, `error`, `theme`) and `useEffect`.
   * Fetches `https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw?t=${Date.now()}` with `{ cache: 'no-store' }`. If that request fails or returns non-OK, falls back to `fetch('./portfolio.md', { cache: 'no-store' })`.
   * Passes the Markdown text to `parsePortfolioMarkdown(markdownText)` from `parser.js` and distributes parsed sections to child components.
   * Displays a clean loading indicator while fetching and a friendly error state if both remote and local fetches fail.
2. **`<Navbar />`**:
   * Displays brand/name (`Navin Ganesh Pandiyan`) on the left.
   * Smooth-scroll navigation links: `Experience`, `Skills`, `Education`, `Contact`.
   * Theme Toggle button (`Light` / `Dark`) on the right.
3. **`<Hero />`**:
   * Full Name: **Navin Ganesh Pandiyan**
   * Role Title: **Software Engineer II**
   * Bio text loaded from the Gist/Markdown.
   * Primary CTA buttons linking **only** to Email (`mailto:ganesspandian2@gmail.com`) and LinkedIn (`https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174`).
4. **`<ExperienceSection />`**:
   * Renders a clean vertical timeline or stacked card list of all roles parsed from the Gist/Markdown.
   * Each card displays: Company Name, Role Title, Date Range badge, optional Project sub-headings (for Software Engineer II), and bullet points.
5. **`<SkillsSection />`**:
   * Renders all 7 skill categories parsed from the Gist/Markdown in a responsive grid.
   * Each category card has a category title and a flex-wrap list of skill pills/chips.
   * **Rule:** Every skill pill renders the emoji and skill name parsed from the Gist/Markdown (e.g., `<span className="skill-emoji">{skill.emoji}</span> <span>{skill.name}</span>`).
6. **`<EducationSection />`**:
   * Displays degree, institution, years, CGPA, and hackathon/competition achievements parsed from the Gist/Markdown.
7. **`<ContactFooter />`**:
   * Displays **only** the two allowed contact channels (Email and LinkedIn) with clear clickable links and copyright notice (`© 2026 Navin Ganesh Pandiyan`).

## 6. Content & Data Specification (From Resume)

The content below is stored in the public GitHub Gist (`https://gist.github.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d`) and mirrored in the local fallback `portfolio.md`.

### 6.1 Contact Details (Strictly Limited to 2 Items)

| Field | Value | Link / Behavior |
| ----- | ----- | ----- |
| **Email** | `ganesspandian2@gmail.com` | `mailto:ganesspandian2@gmail.com` |
| **LinkedIn** | `linkedin.com/in/navin-ganesh-pandiyan-496801174` | `https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174` (`target="_blank" rel="noopener noreferrer"`) |

> **DO NOT DISPLAY:** Phone number (`+91 7200352566`) or any other contact information.

### 6.2 Professional Experience

#### Role 1: Athenahealth Inc. — Software Engineer II

* **Duration:** `JULY 2024 – PRESENT`
* **Sub-project A: Web App Performance Optimisations**
  * Built a dedicated Model Context Protocol (MCP) server exposing core application APIs to agentic AI environments, designing endpoints for automated retrieval of change-freeze windows and other metrics.
  * Optimized application performance, reducing report generation time to 300 ms by implementing strategic caching and asynchronous processing.
  * Built Flask webhook endpoints to consume real-time events from the external service.
  * Designed a decoupled backend utilizing AWS SQS message queue, migrating long-running data calculations to background queues.
  * Eliminated redundant database processing and server errors by ensuring asynchronous execution, preventing duplicate queries when users prematurely refreshed loading pages.
  * Created interactive Swagger UI documentation to facilitate seamless API consumption.
* **Sub-project B: Project: Data ingestion for analytics and prediction**
  * Engineered a high-throughput data ingestion pipeline using Python, seamlessly consuming and processing over 10,000 system metrics per minute from Kafka streams into a ClickHouse database for real-time analysis.
  * Designed ClickHouse database schemas and partitions, capable of running fast analytical queries in 1M+ data rows and high-volume, real-time writes.
  * Automated database infrastructure provisioning using Infrastructure as Code (IaC), writing custom AWS CloudFormation templates to programmatically deploy and configure ClickHouse on AWS.

#### Role 2: Athenahealth Inc. — Software Engineer

* **Duration:** `JULY 2022 – JULY 2024`
* **Highlights:**
  * Engineered a full-stack incident management web application using Flask to streamline business-critical reporting processes.
  * Streamlined operations by automating data processing across user metrics to automatically generate System/DB Change Freeze and availability reports.
  * Designed scalable database schemas using AWS RDS and developed backend REST APIs featuring OKTA-integrated JWT authentication and seamless CRUD operations.
  * Architected cloud infrastructure by containerizing the application with Docker, utilizing AWS CloudFormation to build an AWS Application Load Balancer, and orchestrating deployment on AWS EC2 utilizing AWS ECR.
  * Automated build and deployment workflows by establishing Jenkins CI/CD pipelines and publishing reusable Python packages to JFrog Artifactory.

#### Role 3: Athenahealth Inc. — Software Engineering Intern

* **Duration:** `JANUARY 2022 – JULY 2022`
* **Highlights:**
  * Engineered a web application using Spring Boot for the internal customer support team to manage customer data deletion requests.
  * Designed database schemas and models in PostgreSQL and implemented backend APIs featuring authentication and CRUD operations.
  * Containerized the application with Docker and deployed it on AWS EC2 using AWS ECR.

### 6.3 Skills Section (With Mandatory Emojis)

Every skill in every subsection must display its emoji alongside its name:

| Subsection | Skills (Emoji + Name) |
| ----- | ----- |
| **Programming and Scripting Languages** | ☕ Java, 🐍 Python, 🗄️ SQL, ⚡ JavaScript |
| **Frameworks and Libraries** | 🌱 Spring Boot, 🌶️ Flask, ⚡ FastAPI, 🎸 Django, 🟢 NodeJS, 🚂 ExpressJS, ⚛️ ReactJS |
| **Technical Design** | 🧩 Design Patterns, 🏗️ Object-Oriented System Design and Database Design, 📐 System Design |
| **Agentic AI Coding** | 🤖 Claude Code, 🧠 Codex, 📋 Specs Driven Development |
| **Monitoring Tools** | 📊 Grafana Synthetic Monitoring |
| **Cloud** | ☁️ AWS (EC2, ECR, RDS, SQS), 📜 Infrastructure as Code: AWS CloudFormation |
| **DevOps** | 🐳 Docker, 🔧 Jenkins CI/CD Pipeline, 📦 JFrog |

### 6.4 Education & Achievements

* **Institution:** Sri Krishna College of Technology
* **Degree:** B.Tech in Computer Science
* **Duration:** `2018 – 2022`
* **Achievements & Highlights:**
  * Scored CGPA of 7.9 in B.Tech in Computer Science.
  * Ranked in the top 10% of participants in the Virtusa CodeLite hackathon and secured an internship at Virtusa.
  * Placed in the top 300 ideas at Hack the Crisis by Garage48.
  * Won first place in a chess competition.

### 6.5 Exact `portfolio.md` Schema (For `parser.js`)

The GitHub Gist and local fallback `portfolio.md` follow this predictable Markdown schema so `parser.js` can parse them reliably:

```markdown
# Navin Ganesh Pandiyan
## Role: Software Engineer II
## Bio: Software Engineer II at Athenahealth Inc. specializing in backend performance optimization, high-throughput Kafka and ClickHouse data pipelines, agentic AI (MCP) integrations, and AWS cloud architecture.

# Contact
- Email: ganesspandian2@gmail.com
- LinkedIn: https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174

# Experience
## Athenahealth Inc. — Software Engineer II | JULY 2024 – PRESENT
### Web App Performance Optimisations
- Built a dedicated Model Context Protocol (MCP) server exposing core application APIs to agentic AI environments, designing endpoints for automated retrieval of change-freeze windows and other metrics.
...
### Project: Data ingestion for analytics and prediction
- Engineered a high-throughput data ingestion pipeline using Python, seamlessly consuming and processing over 10,000 system metrics per minute from Kafka streams into a ClickHouse database for real-time analysis.
...

# Skills
## Programming and Scripting Languages
- ☕ Java
- 🐍 Python
- 🗄️ SQL
- ⚡ JavaScript
...

# Education
## Sri Krishna College of Technology — B.Tech in Computer Science | 2018 – 2022
- Scored CGPA of 7.9 in B.Tech in Computer Science.
...
```

## 7. Acceptance Criteria & Verification Checklist

Before considering the implementation complete, the coding agent must verify all items below:

* [ ] **Tech Stack Compliance:** Built with HTML5, CSS3, JavaScript, and simple functional ReactJS (`useState`/`useEffect` only); no backend server required.
* [ ] **Live GitHub Gist Integration:** `app.jsx` fetches `https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw` (with cache-busting query param and `./portfolio.md` fallback) and `parser.js` accurately parses all sections.
* [ ] **Contact Constraint:** Only `ganesspandian2@gmail.com` and `linkedin.com/in/navin-ganesh-pandiyan-496801174` appear on the page; no phone number is present anywhere in HTML, JS, or `portfolio.md`.
* [ ] **Theme Functionality:** Both White (Light) Mode and Dark Mode render cleanly with readable contrast, auto-detect system preference on first visit, and persist manual toggle state in `localStorage`.
* [ ] **Skills Emoji Coverage:** Every single skill in Programming and Scripting Languages and all 6 other Skills subsections displays an emoji next to its name.
* [ ] **Complete Resume Content:** All 3 Athenahealth Inc. roles (including both Software Engineer II sub-projects), all 7 Skills categories, and the Education section with all 4 achievements are rendered accurately.
* [ ] **Deployment Readiness:** All internal file paths are relative (`./`), `.htaccess` prevents stale `.md` caching, files are organized cleanly for Google Drive backup, and the root folder can be uploaded directly to Hostinger Free Plan `public_html/`.
* [ ] **Responsive Design:** Layout renders without horizontal overflow on both mobile (`375px`) and desktop (`1280px`) viewports.