/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// app.jsx — Navin Ganesh Pandiyan Portfolio
// Simple ReactJS (CDN Babel) — useState & useEffect only
// ============================================================

const { useState, useEffect } = React;

const GIST_URL =
  'https://gist.githubusercontent.com/ganesspandian2/82cae986cdc6f08cf83cb9355a6f287d/raw';
const LOCAL_MD = './portfolio.md';

// ── Theme helpers ────────────────────────────────────────────
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// ── Icons (inline SVG, no external deps) ─────────────────────
function IconEmail() {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
    React.createElement('rect', { x: 2, y: 4, width: 20, height: 16, rx: 2 }),
    React.createElement('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })
  );
}

function IconLinkedIn() {
  return React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true },
    React.createElement('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
    React.createElement('rect', { x: 2, y: 9, width: 4, height: 12 }),
    React.createElement('circle', { cx: 4, cy: 4, r: 2 })
  );
}

// ── Navbar ───────────────────────────────────────────────────
function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';
  return React.createElement('nav', { className: 'navbar', role: 'navigation', 'aria-label': 'Main navigation' },
    React.createElement('div', { className: 'navbar-inner' },
      React.createElement('span', { className: 'navbar-brand' }, 'Navin Ganesh Pandiyan'),
      React.createElement('div', { className: 'navbar-nav' },
        React.createElement('a', { href: '#experience' }, 'Experience'),
        React.createElement('a', { href: '#skills' }, 'Skills'),
        React.createElement('a', { href: '#education' }, 'Education'),
        React.createElement('a', { href: '#contact' }, 'Contact'),
        React.createElement('button', {
          className: 'theme-btn',
          onClick: onToggleTheme,
          'aria-label': 'Toggle color theme',
        },
          isDark ? '☀️' : '🌙',
          isDark ? ' Light' : ' Dark'
        )
      )
    )
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero({ data }) {
  return React.createElement('header', { className: 'hero' },
    React.createElement('span', { className: 'hero-eyebrow' }, 'Portfolio'),
    React.createElement('h1', null, data.name || 'Navin Ganesh Pandiyan'),
    React.createElement('p', { className: 'hero-role' }, data.role || 'Software Engineer II'),
    React.createElement('p', { className: 'hero-bio' }, data.bio),
    React.createElement('div', { className: 'hero-ctas' },
      React.createElement('a', {
        href: 'mailto:ganesspandian2@gmail.com',
        className: 'btn btn-primary',
        'aria-label': 'Send email to Navin',
      },
        React.createElement(IconEmail),
        ' Get in Touch'
      ),
      React.createElement('a', {
        href: 'https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'btn btn-outline',
        'aria-label': 'View LinkedIn profile',
      },
        React.createElement(IconLinkedIn),
        ' LinkedIn'
      )
    )
  );
}

// ── Experience Section ────────────────────────────────────────
function ExperienceCard({ exp }) {
  return React.createElement('article', { className: 'exp-card' },
    React.createElement('div', { className: 'exp-header' },
      React.createElement('div', null,
        React.createElement('div', { className: 'exp-company' }, exp.company),
        React.createElement('div', { className: 'exp-role' }, exp.role)
      ),
      React.createElement('span', { className: 'date-pill' }, exp.dateRange)
    ),

    // Top-level bullets (roles without sub-projects)
    exp.bullets && exp.bullets.length > 0 &&
      React.createElement('ul', { className: 'bullets', style: { marginTop: '.75rem' } },
        exp.bullets.map((b, i) => React.createElement('li', { key: i }, b))
      ),

    // Sub-projects
    exp.subProjects && exp.subProjects.map((sp, i) =>
      React.createElement('div', { className: 'sub-project', key: i },
        React.createElement('div', { className: 'sub-project-title' }, sp.title),
        React.createElement('ul', { className: 'bullets' },
          sp.bullets.map((b, j) => React.createElement('li', { key: j }, b))
        )
      )
    )
  );
}

function ExperienceSection({ experience }) {
  return React.createElement('section', { id: 'experience' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, '💼 Experience'),
      React.createElement('div', { className: 'timeline' },
        experience.map((exp, i) => React.createElement(ExperienceCard, { key: i, exp }))
      )
    )
  );
}

// ── Skills Section ────────────────────────────────────────────
function SkillsSection({ skills }) {
  return React.createElement('section', { id: 'skills' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, '🛠️ Skills'),
      React.createElement('div', { className: 'skills-grid' },
        skills.map((cat, i) =>
          React.createElement('div', { className: 'skill-card', key: i },
            React.createElement('div', { className: 'skill-category' }, cat.category),
            React.createElement('div', { className: 'skill-pills' },
              cat.items.map((skill, j) =>
                React.createElement('span', { className: 'skill-pill', key: j },
                  React.createElement('span', { className: 'skill-emoji', 'aria-hidden': true }, skill.emoji),
                  React.createElement('span', null, skill.name)
                )
              )
            )
          )
        )
      )
    )
  );
}

// ── Education Section ─────────────────────────────────────────
function EducationSection({ education }) {
  return React.createElement('section', { id: 'education' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, '🎓 Education'),
      React.createElement('div', null,
        education.map((edu, i) =>
          React.createElement('div', { className: 'edu-card', key: i },
            React.createElement('div', { className: 'edu-header' },
              React.createElement('div', null,
                React.createElement('div', { className: 'edu-institution' }, edu.institution),
                React.createElement('div', { className: 'edu-degree' }, edu.degree)
              ),
              React.createElement('span', { className: 'date-pill' }, edu.dateRange)
            ),
            edu.achievements && edu.achievements.length > 0 &&
              React.createElement('div', { className: 'edu-achievements' },
                React.createElement('h4', null, 'Achievements & Highlights'),
                React.createElement('ul', { className: 'bullets' },
                  edu.achievements.map((a, j) => React.createElement('li', { key: j }, a))
                )
              )
          )
        )
      )
    )
  );
}

// ── Contact Footer ────────────────────────────────────────────
function ContactFooter() {
  return React.createElement('footer', { id: 'contact', className: 'contact-footer' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', null, "Let's Connect"),
      React.createElement('p', null, "Open to opportunities, collaborations, and conversations."),
      React.createElement('div', { className: 'contact-links' },
        React.createElement('a', {
          href: 'mailto:ganesspandian2@gmail.com',
          className: 'contact-link',
          'aria-label': 'Email Navin Ganesh Pandiyan',
        },
          React.createElement(IconEmail),
          'ganesspandian2@gmail.com'
        ),
        React.createElement('a', {
          href: 'https://www.linkedin.com/in/navin-ganesh-pandiyan-496801174',
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'contact-link',
          'aria-label': 'Visit LinkedIn profile',
        },
          React.createElement(IconLinkedIn),
          'linkedin.com/in/navin-ganesh-pandiyan-496801174'
        )
      ),
      React.createElement('p', { className: 'copyright' }, '© 2026 Navin Ganesh Pandiyan')
    )
  );
}

// ── Root App ──────────────────────────────────────────────────
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme on mount & change
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Fetch Gist → fallback to local
  useEffect(() => {
    async function fetchMarkdown() {
      let text = null;

      // 1. Try GitHub Gist (cache-busted)
      try {
        const res = await fetch(GIST_URL + '?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          text = await res.text();
        }
      } catch (_) {
        // Network error — fall through to local
      }

      // 2. Fallback to local portfolio.md
      if (!text) {
        try {
          const res = await fetch(LOCAL_MD, { cache: 'no-store' });
          if (res.ok) {
            text = await res.text();
          }
        } catch (_) {
          // Both failed
        }
      }

      if (text) {
        try {
          const parsed = parsePortfolioMarkdown(text);
          setData(parsed);
          setError(null);
        } catch (parseErr) {
          setError('Failed to parse portfolio data. Please try refreshing.');
        }
      } else {
        setError('Unable to load portfolio content. Please check your internet connection and refresh.');
      }

      setLoading(false);
    }

    fetchMarkdown();
  }, []);

  function handleToggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  if (loading) {
    return React.createElement('div', { className: 'state-screen' },
      React.createElement('div', { className: 'spinner', 'aria-label': 'Loading' }),
      React.createElement('p', null, 'Loading portfolio…')
    );
  }

  if (error || !data) {
    return React.createElement('div', { className: 'state-screen' },
      React.createElement('p', { style: { fontSize: '2rem' } }, '⚠️'),
      React.createElement('p', null, error || 'Something went wrong.')
    );
  }

  return React.createElement(React.Fragment, null,
    React.createElement(Navbar, { theme, onToggleTheme: handleToggleTheme }),
    React.createElement('main', null,
      React.createElement(Hero, { data }),
      data.experience && data.experience.length > 0 &&
        React.createElement(ExperienceSection, { experience: data.experience }),
      data.skills && data.skills.length > 0 &&
        React.createElement(SkillsSection, { skills: data.skills }),
      data.education && data.education.length > 0 &&
        React.createElement(EducationSection, { education: data.education })
    ),
    React.createElement(ContactFooter)
  );
}

// ── Mount ─────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
