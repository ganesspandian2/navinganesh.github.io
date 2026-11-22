/**
 * parser.js — Simple, deterministic Markdown parser for portfolio.md
 * Parses the fixed schema defined in spec.md Section 6.5.
 * No external dependencies required.
 */

function parsePortfolioMarkdown(md) {
  const lines = md.split('\n');

  const data = {
    name: '',
    role: '',
    bio: '',
    contact: {},
    experience: [],
    skills: [],
    education: [],
  };

  let section = null;
  let currentExp = null;
  let currentSubProject = null;
  let currentSkillCat = null;
  let currentEdu = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) continue;

    // ── Top-level H1 sections ──────────────────────────────────────────────
    if (line.startsWith('# ')) {
      const title = line.slice(2).trim();
      if (title === 'Contact') { section = 'contact'; continue; }
      if (title === 'Experience') { section = 'experience'; continue; }
      if (title === 'Skills') { section = 'skills'; continue; }
      if (title === 'Education') { section = 'education'; continue; }
      // First H1 is the person's name
      data.name = title;
      section = 'header';
      continue;
    }

    // ── Header sub-items (## Role, ## Bio) ────────────────────────────────
    if (section === 'header' && line.startsWith('## ')) {
      const val = line.slice(3).trim();
      if (val.startsWith('Role:')) { data.role = val.slice(5).trim(); continue; }
      if (val.startsWith('Bio:')) { data.bio = val.slice(4).trim(); continue; }
      continue;
    }

    // ── Contact bullets ───────────────────────────────────────────────────
    if (section === 'contact' && line.startsWith('- ')) {
      const item = line.slice(2).trim();
      const colonIdx = item.indexOf(':');
      if (colonIdx !== -1) {
        const key = item.slice(0, colonIdx).trim().toLowerCase();
        // Handle URLs which contain colons (e.g. https://...)
        const value = item.slice(colonIdx + 1).trim();
        // For LinkedIn the value looks like "https://www.linkedin.com/..."
        data.contact[key] = value.startsWith('http') ? value : value;
      }
      continue;
    }

    // ── Experience: H2 = new role ─────────────────────────────────────────
    if (section === 'experience' && line.startsWith('## ')) {
      // Push previous subproject into previous experience
      if (currentSubProject && currentExp) {
        currentExp.subProjects.push(currentSubProject);
        currentSubProject = null;
      }
      if (currentExp) data.experience.push(currentExp);

      // Parse "Company — Title | Date Range"
      const content = line.slice(3).trim();
      const pipeIdx = content.indexOf(' | ');
      const dateRange = pipeIdx !== -1 ? content.slice(pipeIdx + 3).trim() : '';
      const companyRole = pipeIdx !== -1 ? content.slice(0, pipeIdx).trim() : content;
      const dashIdx = companyRole.indexOf(' — ');
      const company = dashIdx !== -1 ? companyRole.slice(0, dashIdx).trim() : companyRole;
      const role = dashIdx !== -1 ? companyRole.slice(dashIdx + 3).trim() : '';

      currentExp = { company, role, dateRange, subProjects: [], bullets: [] };
      continue;
    }

    // ── Experience: H3 = sub-project ─────────────────────────────────────
    if (section === 'experience' && line.startsWith('### ')) {
      if (currentSubProject && currentExp) {
        currentExp.subProjects.push(currentSubProject);
      }
      currentSubProject = { title: line.slice(4).trim(), bullets: [] };
      continue;
    }

    // ── Experience: bullets ───────────────────────────────────────────────
    if (section === 'experience' && line.startsWith('- ')) {
      const bullet = line.slice(2).trim();
      if (currentSubProject) {
        currentSubProject.bullets.push(bullet);
      } else if (currentExp) {
        currentExp.bullets.push(bullet);
      }
      continue;
    }

    // ── Skills: H2 = category ─────────────────────────────────────────────
    if (section === 'skills' && line.startsWith('## ')) {
      if (currentSkillCat) data.skills.push(currentSkillCat);
      currentSkillCat = { category: line.slice(3).trim(), items: [] };
      continue;
    }

    // ── Skills: bullets ───────────────────────────────────────────────────
    if (section === 'skills' && line.startsWith('- ') && currentSkillCat) {
      const raw_skill = line.slice(2).trim();
      // Split emoji from the rest — emoji can be multi-codepoint
      // Strategy: grab leading grapheme clusters that are emoji/symbols
      const match = raw_skill.match(/^([\u{1F300}-\u{1FFFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FEFF}☕🐍🗄️⚡🌱🌶️🎸🟢🚂⚛️🧩🏗️📐🤖🧠📋📊☁️📜🐳🔧📦]+\s*)/u;
      if (match) {
        const emoji = match[1].trim();
        const name = raw_skill.slice(match[0].length).trim();
        currentSkillCat.items.push({ emoji, name });
      } else {
        currentSkillCat.items.push({ emoji: '', name: raw_skill });
      }
      continue;
    }

    // ── Education: H2 = institution ───────────────────────────────────────
    if (section === 'education' && line.startsWith('## ')) {
      if (currentEdu) data.education.push(currentEdu);
      const content = line.slice(3).trim();
      const pipeIdx = content.indexOf(' | ');
      const dateRange = pipeIdx !== -1 ? content.slice(pipeIdx + 3).trim() : '';
      const instDeg = pipeIdx !== -1 ? content.slice(0, pipeIdx).trim() : content;
      const dashIdx = instDeg.indexOf(' — ');
      const institution = dashIdx !== -1 ? instDeg.slice(0, dashIdx).trim() : instDeg;
      const degree = dashIdx !== -1 ? instDeg.slice(dashIdx + 3).trim() : '';
      currentEdu = { institution, degree, dateRange, achievements: [] };
      continue;
    }

    // ── Education: bullets ────────────────────────────────────────────────
    if (section === 'education' && line.startsWith('- ') && currentEdu) {
      currentEdu.achievements.push(line.slice(2).trim());
      continue;
    }
  }

  // Flush remaining objects
  if (currentSubProject && currentExp) currentExp.subProjects.push(currentSubProject);
  if (currentExp) data.experience.push(currentExp);
  if (currentSkillCat) data.skills.push(currentSkillCat);
  if (currentEdu) data.education.push(currentEdu);

  return data;
}
