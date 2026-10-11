/**
 * Main Application Logic - Kartik Mewada Portfolio
 * Renders projects, certificates, skills, modals, theme switcher,
 * cursor, and interactive toast notifications.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize config
  const config = window.PORTFOLIO_CONFIG || {};

  // 1. Initialize UI Renderers
  renderHeroData(config);
  renderProjects(config.projects || []);
  renderCertificates(config.certificates || []);
  renderSkills(config.skills || []);

  // 2. Initialize 3D Engine & Tilt
  if (window.HeroThreeScene) {
    window.heroThreeInstance = new window.HeroThreeScene();
  }
  if (window.tiltEngine) {
    window.tiltEngine.init();
  }

  // 3. Initialize Terminal
  if (window.CyberTerminal) {
    window.cyberTerminalInstance = new window.CyberTerminal();
  }

  // 4. Setup Global UI Handlers
  setupThemeSwitcher();
  setupAudioToggle();
  setupCustomCursor();
  setupMobileNav();
  setupContactForm();
  setupModals();
  setupStatsCounter();
  setupInteractiveButtons();
});

// Render Hero Content & Stats
function renderHeroData(config) {
  const dev = config.developer || {};

  const nameEl = document.getElementById('dev-name');
  if (nameEl) nameEl.textContent = dev.name || 'Kartik Mewada';

  const titleEl = document.getElementById('dev-title');
  if (titleEl) titleEl.textContent = dev.title || 'Software Developer & Cloud Engineer';

  const taglineEl = document.getElementById('dev-tagline');
  if (taglineEl) taglineEl.textContent = dev.tagline || '';

  const locationEl = document.getElementById('dev-location');
  if (locationEl) locationEl.textContent = dev.location || 'India • Worldwide / Remote';

  // Social Links in Hero & Footer
  const githubLinks = document.querySelectorAll('.link-github');
  githubLinks.forEach(el => el.href = dev.social?.github || 'https://github.com/kartikmewada7');

  const linkedinLinks = document.querySelectorAll('.link-linkedin');
  linkedinLinks.forEach(el => el.href = dev.social?.linkedin || 'https://in.linkedin.com/in/kartik-mewada-6a8077331');

  const emailLinks = document.querySelectorAll('.link-email');
  emailLinks.forEach(el => el.href = dev.social?.email || 'mailto:kartikmewada7@gmail.com');

  // Stats Grid
  const statsContainer = document.getElementById('hero-stats-grid');
  if (statsContainer && dev.stats) {
    statsContainer.innerHTML = dev.stats.map(s => `
      <div class="stat-card" data-tilt>
        <div class="stat-value"><span class="stat-num" data-target="${parseFloat(s.value)}">${s.value}</span>${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }
}

// Render 2 Real High-Impact Projects with Link Buttons
function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = projects.map((p, index) => {
    const isEven = index % 2 === 1;
    return `
      <article class="project-card ${isEven ? 'project-reverse' : ''}" data-tilt data-project-id="${p.id}">
        <!-- 3D Card Ambient Corner Lights -->
        <div class="card-glow-top"></div>
        <div class="card-corner tl"></div>
        <div class="card-corner tr"></div>
        <div class="card-corner bl"></div>
        <div class="card-corner br"></div>

        <!-- Project Visual Preview Mockup -->
        <div class="project-visual tilt-depth">
          <div class="project-screen-frame">
            <div class="screen-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="screen-title">${p.title}</span>
              <span class="screen-badge">${p.badge}</span>
            </div>
            <div class="screen-canvas-preview" id="preview-${p.id}">
              ${renderProjectSvgMock(p.id)}
            </div>
          </div>
        </div>

        <!-- Project Details -->
        <div class="project-info tilt-depth">
          <div class="project-meta">
            <span class="project-index">FEATURED PROJECT 0${index + 1}</span>
            <span class="project-category-tag">${p.category}</span>
          </div>

          <h3 class="project-title">${p.title}</h3>
          <p class="project-subtitle">${p.subtitle}</p>
          <p class="project-desc">${p.description}</p>

          <!-- Key Metrics -->
          <div class="project-metrics">
            ${p.metrics.map(m => `
              <div class="metric-chip">
                <span class="metric-val">${m.value}</span>
                <span class="metric-lbl">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <!-- Tech Tags -->
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <!-- PROMINENT INTERACTIVE LINK BUTTONS -->
          <div class="project-actions">
            <a href="${p.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow link-btn">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>Live Demo</span>
              <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>

            <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary link-btn">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>Source Code</span>
            </a>

            <button type="button" class="btn btn-glass btn-details" data-modal-target="modal-project" data-project-idx="${index}">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>Architecture Specs</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Render dynamic animated SVG mocks for projects
function renderProjectSvgMock(projectId) {
  if (projectId === 'project-foodie-express') {
    return `
      <svg class="mock-svg" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="280" fill="#090d1f"/>
        <!-- Background Grid -->
        <defs>
          <pattern id="grid-food" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,183,3,0.06)" stroke-width="1"/>
          </pattern>
          <linearGradient id="grad-food-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff9900"/>
            <stop offset="100%" stop-color="#ff007f"/>
          </linearGradient>
        </defs>
        <rect width="500" height="280" fill="url(#grid-food)" />

        <!-- App Nav Header Mock -->
        <rect x="20" y="16" width="460" height="36" rx="6" fill="#0f152d" stroke="rgba(255,255,255,0.08)"/>
        <text x="36" y="38" fill="#ffb703" font-size="12" font-weight="bold" font-family="sans-serif">🍕 Foodie Express</text>
        <rect x="180" y="24" width="160" height="20" rx="10" fill="#070a16" stroke="rgba(255,255,255,0.06)"/>
        <text x="195" y="38" fill="#64748b" font-size="9" font-family="sans-serif">🔍 Search dishes or restaurants...</text>
        <rect x="390" y="22" width="76" height="24" rx="12" fill="rgba(255,183,3,0.18)" stroke="#ffb703"/>
        <text x="428" y="38" text-anchor="middle" fill="#ffb703" font-size="10" font-weight="bold" font-family="sans-serif">🛒 Cart (3)</text>

        <!-- Food Item Card 1: Burger -->
        <rect x="20" y="66" width="142" height="135" rx="8" fill="#0e142c" stroke="rgba(0,240,255,0.2)"/>
        <circle cx="91" cy="104" r="26" fill="rgba(255,153,0,0.15)" stroke="#ff9900" stroke-width="1.5"/>
        <text x="91" y="112" text-anchor="middle" font-size="24">🍔</text>
        <text x="91" y="146" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Smash Burger</text>
        <text x="91" y="162" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="bold" font-family="monospace">$8.99</text>
        <rect x="46" y="174" width="90" height="18" rx="4" fill="#00f0ff" />
        <text x="91" y="186" text-anchor="middle" fill="#040814" font-size="9" font-weight="bold" font-family="sans-serif">+ Add Order</text>

        <!-- Food Item Card 2: Pizza -->
        <rect x="178" y="66" width="142" height="135" rx="8" fill="#0e142c" stroke="rgba(255,0,127,0.2)"/>
        <circle cx="249" cy="104" r="26" fill="rgba(255,0,127,0.15)" stroke="#ff007f" stroke-width="1.5"/>
        <text x="249" y="112" text-anchor="middle" font-size="24">🍕</text>
        <text x="249" y="146" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Woodfired Pizza</text>
        <text x="249" y="162" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="bold" font-family="monospace">$14.50</text>
        <rect x="204" y="174" width="90" height="18" rx="4" fill="#ff007f" />
        <text x="249" y="186" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold" font-family="sans-serif">+ Add Order</text>

        <!-- Food Item Card 3: Wok Noodles -->
        <rect x="336" y="66" width="144" height="135" rx="8" fill="#0e142c" stroke="rgba(0,255,136,0.2)"/>
        <circle cx="408" cy="104" r="26" fill="rgba(0,255,136,0.15)" stroke="#00ff88" stroke-width="1.5"/>
        <text x="408" y="112" text-anchor="middle" font-size="24">🍜</text>
        <text x="408" y="146" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Tokyo Ramen</text>
        <text x="408" y="162" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="bold" font-family="monospace">$11.20</text>
        <rect x="363" y="174" width="90" height="18" rx="4" fill="#00ff88" />
        <text x="408" y="186" text-anchor="middle" fill="#040814" font-size="9" font-weight="bold" font-family="sans-serif">+ Add Order</text>

        <!-- Bottom Cloudflare Delivery Status Ribbon -->
        <rect x="20" y="214" width="460" height="52" rx="6" fill="#0b1024" stroke="rgba(0,240,255,0.3)"/>
        <circle cx="42" cy="240" r="12" fill="#00f0ff" fill-opacity="0.2"/>
        <circle cx="42" cy="240" r="5" fill="#00f0ff"/>
        <text x="64" y="236" fill="#fff" font-size="11" font-weight="bold" font-family="sans-serif">⚡ Cloudflare Workers Edge Delivery</text>
        <text x="64" y="252" fill="#94a3b8" font-size="9" font-family="sans-serif">Global Edge Routing • Sub-50ms Response • Zero Cold Starts</text>
        <rect x="375" y="226" width="90" height="26" rx="4" fill="#1b254b" stroke="#00f0ff"/>
        <text x="420" y="243" text-anchor="middle" fill="#00f0ff" font-size="10" font-family="monospace">STATUS: ACTIVE</text>
      </svg>
    `;
  } else {
    // AttendAI - Face Recognition Attendance System
    return `
      <svg class="mock-svg" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="280" fill="#060914"/>
        <defs>
          <linearGradient id="grad-ai-scan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00f0ff"/>
            <stop offset="100%" stop-color="#00ff88"/>
          </linearGradient>
        </defs>

        <!-- Left AI Viewfinder Scanner -->
        <rect x="20" y="18" width="220" height="244" rx="8" fill="#0c1126" stroke="rgba(0,240,255,0.3)"/>
        <!-- Camera Viewfinder Overlay -->
        <path d="M 35 35 L 55 35 M 35 35 L 35 55" stroke="#00f0ff" stroke-width="2.5" fill="none"/>
        <path d="M 225 35 L 205 35 M 225 35 L 225 55" stroke="#00f0ff" stroke-width="2.5" fill="none"/>
        <path d="M 35 245 L 55 245 M 35 245 L 35 225" stroke="#00f0ff" stroke-width="2.5" fill="none"/>
        <path d="M 225 245 L 205 245 M 225 245 L 225 225" stroke="#00f0ff" stroke-width="2.5" fill="none"/>

        <!-- Facial Detection Bounding Box -->
        <rect x="65" y="60" width="130" height="135" rx="6" fill="rgba(0,240,255,0.06)" stroke="#00ff88" stroke-width="2" stroke-dasharray="6 3"/>
        <!-- Face Silhouette -->
        <circle cx="130" cy="110" r="32" fill="rgba(0,255,136,0.18)" stroke="#00ff88" stroke-width="1.5"/>
        <path d="M 98 165 C 98 145, 162 145, 162 165" fill="rgba(0,255,136,0.25)"/>
        <circle cx="120" cy="106" r="3" fill="#00ff88"/>
        <circle cx="140" cy="106" r="3" fill="#00ff88"/>
        <path d="M 124 124 Q 130 128 136 124" stroke="#00ff88" stroke-width="1.5" fill="none"/>

        <!-- Scan line -->
        <line x1="68" y1="120" x2="192" y2="120" stroke="#00f0ff" stroke-width="2" opacity="0.8"/>
        <rect x="68" y="172" width="124" height="18" rx="3" fill="#092520" stroke="#00ff88"/>
        <text x="130" y="184" text-anchor="middle" fill="#00ff88" font-size="9" font-weight="bold" font-family="monospace">CONFIDENCE: 99.8%</text>

        <!-- Right Side: Real-Time Attendance Log -->
        <rect x="254" y="18" width="226" height="244" rx="8" fill="#0c1126" stroke="rgba(255,255,255,0.08)"/>
        <rect x="254" y="18" width="226" height="34" rx="8" fill="#121936"/>
        <text x="270" y="39" fill="#00f0ff" font-size="11" font-weight="bold" font-family="sans-serif">📋 Live Attendance Ledger</text>
        <circle cx="460" cy="35" r="4" fill="#00ff88"/>

        <!-- Log Row 1 -->
        <rect x="264" y="62" width="206" height="42" rx="4" fill="#070a16" stroke="rgba(0,255,136,0.25)"/>
        <text x="274" y="78" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Kartik Mewada</text>
        <text x="274" y="93" fill="#64748b" font-size="8" font-family="monospace">ID: #4092 • 09:14:02 AM</text>
        <rect x="418" y="72" width="44" height="20" rx="3" fill="rgba(0,255,136,0.2)"/>
        <text x="440" y="85" text-anchor="middle" fill="#00ff88" font-size="8" font-weight="bold" font-family="monospace">PRESENT</text>

        <!-- Log Row 2 -->
        <rect x="264" y="112" width="206" height="42" rx="4" fill="#070a16" stroke="rgba(255,255,255,0.05)"/>
        <text x="274" y="128" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Alex Chen</text>
        <text x="274" y="143" fill="#64748b" font-size="8" font-family="monospace">ID: #3911 • 09:12:30 AM</text>
        <rect x="418" y="122" width="44" height="20" rx="3" fill="rgba(0,255,136,0.2)"/>
        <text x="440" y="135" text-anchor="middle" fill="#00ff88" font-size="8" font-weight="bold" font-family="monospace">PRESENT</text>

        <!-- Log Row 3 -->
        <rect x="264" y="162" width="206" height="42" rx="4" fill="#070a16" stroke="rgba(255,255,255,0.05)"/>
        <text x="274" y="178" fill="#fff" font-size="10" font-weight="bold" font-family="sans-serif">Sophia Verma</text>
        <text x="274" y="193" fill="#64748b" font-size="8" font-family="monospace">ID: #2844 • 09:09:15 AM</text>
        <rect x="418" y="172" width="44" height="20" rx="3" fill="rgba(0,255,136,0.2)"/>
        <text x="440" y="185" text-anchor="middle" fill="#00ff88" font-size="8" font-weight="bold" font-family="monospace">PRESENT</text>

        <!-- Railway Status Bar -->
        <rect x="264" y="214" width="206" height="34" rx="4" fill="#1b1233" stroke="rgba(181,55,242,0.4)"/>
        <text x="276" y="235" fill="#d8b4fe" font-size="9" font-family="monospace">⚡ Railway Cloud • SQL Synced</text>
      </svg>
    `;
  }
}

// Render 3 Industry Accredited Certificates with Link Buttons
function renderCertificates(certs) {
  const container = document.getElementById('certificates-grid');
  if (!container) return;

  container.innerHTML = certs.map((c, index) => {
    return `
      <div class="cert-card cert-${c.badgeColor}" data-tilt data-cert-id="${c.id}">
        <!-- Hologram Ribbon & Corner Accent -->
        <div class="cert-hologram-strip"></div>
        <div class="card-glow-top"></div>

        <div class="cert-header tilt-depth">
          <div class="cert-icon-wrapper">
            ${renderIssuerBadgeSvg(c.issuerBadgeSvg)}
          </div>
          <div class="cert-status-badge">
            <span class="status-indicator"></span>
            <span>${c.status}</span>
          </div>
        </div>

        <div class="cert-body tilt-depth">
          <span class="cert-issuer">${c.issuer}</span>
          <h3 class="cert-title">${c.title}</h3>
          <p class="cert-desc">${c.description}</p>

          <!-- Credential Key Details -->
          <div class="cert-cred-info">
            <div class="cred-row">
              <span class="cred-label">Status:</span>
              <span class="cred-val">${c.issueDate}</span>
            </div>
            <div class="cred-row">
              <span class="cred-label">Verified Link:</span>
              <span class="cred-val cred-id-code">${c.shortUrlLabel || 'Official Registry'}</span>
            </div>
          </div>

          <!-- Verified Skills Tags -->
          <div class="cert-skills-wrap">
            ${c.skills.slice(0, 4).map(s => `<span class="cert-skill-tag">${s}</span>`).join('')}
            ${c.skills.length > 4 ? `<span class="cert-skill-tag more">+${c.skills.length - 4} more</span>` : ''}
          </div>
        </div>

        <!-- PROMINENT CERTIFICATE LINK BUTTONS -->
        <div class="cert-footer tilt-depth">
          <a href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary cert-link-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>Verify Credential</span>
            <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>

          <button type="button" class="btn btn-secondary btn-cert-modal" data-modal-target="modal-cert" data-cert-idx="${index}">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>View Certificate</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Render crisp official-style SVG badges for certificates
function renderIssuerBadgeSvg(type) {
  if (type === 'deloitte') {
    return `
      <svg class="issuer-svg" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="rgba(134,188,37,0.12)" stroke="#86bc25" stroke-width="2"/>
        <text x="27" y="35" text-anchor="middle" fill="#ffffff" font-weight="800" font-size="11" font-family="sans-serif">Deloitte</text>
        <circle cx="48" cy="33" r="3.2" fill="#86bc25"/>
      </svg>
    `;
  } else if (type === 'aws') {
    return `
      <svg class="issuer-svg" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,4 54,18 54,42 30,56 6,42 6,18" fill="rgba(255,153,0,0.15)" stroke="#ff9900" stroke-width="2.5"/>
        <text x="30" y="27" text-anchor="middle" fill="#ff9900" font-weight="900" font-size="12" font-family="sans-serif">AWS</text>
        <text x="30" y="38" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="7" font-family="sans-serif">ACADEMY</text>
      </svg>
    `;
  } else {
    // Python / Spoken Tutorial IIT Bombay
    return `
      <svg class="issuer-svg" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="26" fill="rgba(56,114,166,0.15)" stroke="#3872a6" stroke-width="2.2"/>
        <path d="M 28 15 L 34 15 C 38 15 41 18 41 22 L 41 28 L 34 28 C 30 28 27 25 27 21 Z" fill="#3872a6"/>
        <circle cx="31" cy="19" r="1.5" fill="#fff"/>
        <path d="M 32 45 L 26 45 C 22 45 19 42 19 38 L 19 32 L 26 32 C 30 32 33 35 33 39 Z" fill="#ffde57"/>
        <circle cx="29" cy="41" r="1.5" fill="#000"/>
        <text x="30" y="54" text-anchor="middle" fill="#00f0ff" font-weight="bold" font-size="6" font-family="sans-serif">IIT BOMBAY</text>
      </svg>
    `;
  }
}

// Render Skills Matrix with Animated Progress Bars
function renderSkills(categories) {
  const container = document.getElementById('skills-matrix-grid');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-card" data-tilt>
      <div class="card-glow-top"></div>
      <h3 class="skill-cat-title">${cat.category}</h3>
      <div class="skill-items-list">
        ${cat.items.map(it => `
          <div class="skill-item">
            <div class="skill-item-header">
              <span class="skill-name"><span class="skill-emoji">${it.icon}</span> ${it.name}</span>
              <span class="skill-pct">${it.level}%</span>
            </div>
            <div class="skill-track">
              <div class="skill-bar" style="width: ${it.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Theme Switcher Engine
function setupThemeSwitcher() {
  const themeButtons = document.querySelectorAll('[data-theme-btn]');

  window.setGlobalTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('portfolio_theme', themeName);

    // Sync active button state
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeBtn === themeName);
    });

    // Notify Three.js scene
    if (window.heroThreeInstance && window.heroThreeInstance.setTheme) {
      window.heroThreeInstance.setTheme(themeName);
    }
  };

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeBtn;
      window.setGlobalTheme(theme);
      if (window.soundEngine) window.soundEngine.playClick();
      showToast(`Theme switched to ${theme.toUpperCase()}`);
    });
  });

  // Restore saved theme
  const savedTheme = localStorage.getItem('portfolio_theme') || 'cyber';
  window.setGlobalTheme(savedTheme);
}

// Audio Engine Toggle
function setupAudioToggle() {
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (!audioBtn) return;

  const updateAudioUI = (isMuted) => {
    audioBtn.classList.toggle('muted', isMuted);
    audioBtn.setAttribute('title', isMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX');
  };

  if (window.soundEngine) {
    updateAudioUI(window.soundEngine.isMuted());
  }

  audioBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      const isMuted = window.soundEngine.toggleMute();
      updateAudioUI(isMuted);
      if (!isMuted) {
        window.soundEngine.playClick();
        showToast('🔊 Cyber Sound Effects Enabled');
      } else {
        showToast('🔇 Audio Muted');
      }
    }
  });
}

// Interactive Custom Neon Cursor
function setupCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Enlarge ring on interactive elements
  const hoverTargets = 'a, button, input, textarea, [data-tilt], .btn, .nav-link, .stat-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('cursor-expanded');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('cursor-expanded');
    }
  });
}

// Modals Setup (Project specs modal & Certificate diploma modal)
function setupModals() {
  const projectModal = document.getElementById('modal-project');
  const certModal = document.getElementById('modal-cert');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const config = window.PORTFOLIO_CONFIG || {};

  // Open Project Modal
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-details');
    if (btn) {
      const idx = parseInt(btn.dataset.projectIdx, 10);
      const prj = config.projects[idx];
      if (prj && projectModal) {
        populateProjectModal(prj);
        openModal(projectModal);
      }
    }
  });

  // Open Certificate Modal
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-cert-modal');
    if (btn) {
      const idx = parseInt(btn.dataset.certIdx, 10);
      const cert = config.certificates[idx];
      if (cert && certModal) {
        populateCertModal(cert);
        openModal(certModal);
      }
    }
  });

  // Close modals
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeAllModals();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modalEl) {
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.soundEngine) window.soundEngine.playWarp();
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
  if (window.soundEngine) window.soundEngine.playClick();
}

function populateProjectModal(p) {
  document.getElementById('modal-prj-title').textContent = p.title;
  document.getElementById('modal-prj-subtitle').textContent = p.subtitle;
  document.getElementById('modal-prj-desc').textContent = p.description;

  // Metrics
  const metricsEl = document.getElementById('modal-prj-metrics');
  if (metricsEl) {
    metricsEl.innerHTML = p.metrics.map(m => `
      <div class="modal-metric-card">
        <span class="m-val">${m.value}</span>
        <span class="m-lbl">${m.label}</span>
      </div>
    `).join('');
  }

  // Architecture Specs List
  const archEl = document.getElementById('modal-prj-arch');
  if (archEl && p.architecture) {
    archEl.innerHTML = p.architecture.map(item => `
      <li class="arch-item">
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${item}</span>
      </li>
    `).join('');
  }

  // Tags
  const tagsEl = document.getElementById('modal-prj-tags');
  if (tagsEl) {
    tagsEl.innerHTML = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  // Link Buttons inside modal
  const demoBtn = document.getElementById('modal-prj-demo-link');
  if (demoBtn) demoBtn.href = p.links.demo;

  const githubBtn = document.getElementById('modal-prj-github-link');
  if (githubBtn) githubBtn.href = p.links.github;
}

function populateCertModal(c) {
  document.getElementById('modal-cert-title').textContent = c.title;
  document.getElementById('modal-cert-issuer').textContent = c.issuer;
  document.getElementById('modal-cert-id').textContent = c.credentialId;
  document.getElementById('modal-cert-date').textContent = `${c.issueDate} • ${c.expiryDate || 'No Expiration'}`;
  document.getElementById('modal-cert-desc').textContent = c.description;

  const skillsEl = document.getElementById('modal-cert-skills');
  if (skillsEl) {
    skillsEl.innerHTML = c.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('');
  }

  const verifyBtn = document.getElementById('modal-cert-verify-link');
  if (verifyBtn) {
    verifyBtn.href = c.credentialUrl;
  }
}

// Stats Counter
function setupStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num');
  if (!statNumbers.length) return;

  let counted = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(num => {
          const target = parseFloat(num.dataset.target);
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1600;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              num.textContent = isDecimal ? target.toFixed(2) : Math.round(target);
              clearInterval(timer);
            } else {
              num.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('hero-stats-grid');
  if (statsSection) observer.observe(statsSection);
}

// Mobile Nav Toggle
function setupMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-links-menu');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('mobile-open');
    toggle.classList.toggle('active', isOpen);
    if (window.soundEngine) window.soundEngine.playClick();
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      toggle.classList.remove('active');
    });
  });
}

// Contact Form with Interactive Feedback
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('btn-copy-email');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = window.PORTFOLIO_CONFIG?.developer?.email || 'kartikmewada7@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill in all required fields.');
        return;
      }

      // Simulate sending with high-tech response
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Packet...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();
        showToast('⚡ Message transmitted successfully! Kartik will reply soon.');
        if (window.soundEngine) window.soundEngine.playWarp();
      }, 900);
    });
  }
}

// Interactive button click sounds
function setupInteractiveButtons() {
  document.querySelectorAll('.btn, .nav-link, .link-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.playHover();
    });
  });
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('active');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}
