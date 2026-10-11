/**
 * Interactive Developer Cyber Terminal
 * Handles shell commands, interactive responses, and theme toggling.
 */
class CyberTerminal {
  constructor() {
    this.wrapper = document.getElementById('cyber-terminal');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.toggleBtn = document.getElementById('btn-terminal-toggle');
    this.closeBtn = document.getElementById('btn-terminal-close');
    this.minimizeBtn = document.getElementById('btn-terminal-minimize');
    this.commandHistory = [];
    this.historyIndex = -1;

    if (!this.input || !this.output) return;

    this.init();
  }

  init() {
    this.attachEvents();
    this.printGreeting();
  }

  attachEvents() {
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleTerminal());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.toggleTerminal(false));
    }
    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', () => this.toggleTerminal(false));
    }
  }

  toggleTerminal(forcedState) {
    if (!this.wrapper) return;
    const isVisible = forcedState !== undefined ? forcedState : !this.wrapper.classList.contains('active');
    this.wrapper.classList.toggle('active', isVisible);
    if (this.toggleBtn) this.toggleBtn.classList.toggle('active', isVisible);

    if (isVisible) {
      setTimeout(() => this.input.focus(), 150);
      if (window.soundEngine) window.soundEngine.playWarp();
    } else {
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  printGreeting() {
    this.appendLine(`<span class="term-dim">Type </span><span class="term-cyan">'help'</span><span class="term-dim"> to explore commands. Try </span><span class="term-magenta">'projects'</span><span class="term-dim">, </span><span class="term-gold">'certs'</span><span class="term-dim">, or </span><span class="term-green">'theme matrix'</span><span class="term-dim">.</span>`);
  }

  appendLine(html, className = '') {
    const div = document.createElement('div');
    div.className = `terminal-line ${className}`;
    div.innerHTML = html;
    this.output.appendChild(div);
    this.output.scrollTop = this.output.scrollHeight;
  }

  handleKeyDown(e) {
    if (window.soundEngine) window.soundEngine.playKeypress();

    if (e.key === 'Enter') {
      const command = this.input.value.trim();
      if (!command) return;

      this.commandHistory.push(command);
      this.historyIndex = this.commandHistory.length;

      this.appendLine(`<span class="term-prompt">kartik@dev-core:~$</span> <span class="term-cmd">${this.escapeHtml(command)}</span>`);
      this.input.value = '';

      this.executeCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.input.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.input.value = '';
      }
    }
  }

  executeCommand(rawCmd) {
    const parts = rawCmd.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'help':
        this.appendLine(`
<span class="term-accent">AVAILABLE SYSTEM COMMANDS:</span>
  <span class="term-cyan">projects</span>        - Inspect 2 flagship software projects + live links
  <span class="term-cyan">certs</span> / <span class="term-cyan">cert</span>    - Review 3 certified industry credentials + verify links
  <span class="term-cyan">skills</span>          - Display technical competencies matrix
  <span class="term-cyan">about</span>           - View developer identity & systems philosophy
  <span class="term-cyan">contact</span>         - Get email, GitHub, LinkedIn, social coordinates
  <span class="term-cyan">theme &lt;name&gt;</span>    - Set theme: <span class="term-cyan">cyber</span>, <span class="term-magenta">synthwave</span>, <span class="term-green">matrix</span>, <span class="term-gold">gold</span>
  <span class="term-cyan">sound &lt;on|off&gt;</span>  - Enable or mute synthesized cyber audio
  <span class="term-cyan">cat resume</span>     - Display condensed technical resume summary
  <span class="term-cyan">clear</span>           - Clear terminal buffer
  <span class="term-cyan">date</span>            - Display current system epoch timestamp
        `);
        break;

      case 'projects':
      case 'project':
        const prjs = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.projects : [];
        let prjHtml = '<span class="term-accent">FLAGSHIP SOFTWARE PROJECTS:</span>\n';
        prjs.forEach((p, idx) => {
          prjHtml += `\n<span class="term-gold">[0${idx + 1}] ${p.title}</span>\n`;
          prjHtml += `    <span class="term-dim">Category:</span> ${p.category} | <span class="term-dim">Status:</span> ${p.badge}\n`;
          prjHtml += `    <span class="term-dim">Tech:</span> ${p.tags.slice(0, 5).join(', ')}\n`;
          prjHtml += `    <span class="term-cyan">🔗 Live Demo:</span> <a href="${p.links.demo}" target="_blank" class="term-link">${p.links.demo}</a>\n`;
          prjHtml += `    <span class="term-magenta">💻 GitHub:</span> <a href="${p.links.github}" target="_blank" class="term-link">${p.links.github}</a>\n`;
        });
        this.appendLine(prjHtml);
        break;

      case 'certs':
      case 'cert':
      case 'certificates':
        const certs = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.certificates : [];
        let certHtml = '<span class="term-accent">ACCREDITED CLOUD & ENGINEERING CERTIFICATES:</span>\n';
        certs.forEach((c, idx) => {
          certHtml += `\n<span class="term-green">[0${idx + 1}] ${c.title}</span>\n`;
          certHtml += `    <span class="term-dim">Issuer:</span> ${c.issuer} | <span class="term-dim">Date:</span> ${c.issueDate}\n`;
          certHtml += `    <span class="term-dim">Credential ID:</span> <span class="term-gold">${c.credentialId}</span>\n`;
          certHtml += `    <span class="term-cyan">🔗 Verification Link:</span> <a href="${c.credentialUrl}" target="_blank" class="term-link">${c.credentialUrl}</a>\n`;
        });
        this.appendLine(certHtml);
        break;

      case 'skills':
        const skills = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.skills : [];
        let skillHtml = '<span class="term-accent">DEVELOPER COMPETENCY MATRIX:</span>\n';
        skills.forEach(cat => {
          skillHtml += `\n<span class="term-cyan">${cat.category}:</span>\n`;
          cat.items.forEach(it => {
            const bar = '█'.repeat(Math.round(it.level / 10)) + '░'.repeat(10 - Math.round(it.level / 10));
            skillHtml += `  ${it.name.padEnd(28)} [${bar}] ${it.level}%\n`;
          });
        });
        this.appendLine(skillHtml);
        break;

      case 'about':
        const dev = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.developer : {};
        this.appendLine(`
<span class="term-accent">${dev.name || 'Kartik Mewada'}</span> — <span class="term-cyan">${dev.title}</span>
<span class="term-dim">${dev.tagline}</span>
Location: ${dev.location}
Status: <span class="term-green">${dev.status}</span>
Availability: Open for high-scale distributed systems and architectural consulting.
        `);
        break;

      case 'contact':
        const soc = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.developer.social : {};
        this.appendLine(`
<span class="term-accent">COORDINATES & CHANNELS:</span>
Email:    <a href="${soc.email}" class="term-link">${soc.email ? soc.email.replace('mailto:', '') : 'kartikmewada7@gmail.com'}</a>
GitHub:   <a href="${soc.github}" target="_blank" class="term-link">${soc.github}</a>
LinkedIn: <a href="${soc.linkedin}" target="_blank" class="term-link">${soc.linkedin}</a>
        `);
        break;

      case 'theme':
        if (['cyber', 'synthwave', 'matrix', 'gold'].includes(arg)) {
          if (window.setGlobalTheme) window.setGlobalTheme(arg);
          this.appendLine(`<span class="term-green">✓ Active theme switched to '${arg}'.</span>`);
        } else {
          this.appendLine(`<span class="term-dim">Usage: theme [cyber | synthwave | matrix | gold]</span>`);
        }
        break;

      case 'sound':
        if (arg === 'on') {
          if (window.soundEngine && window.soundEngine.isMuted()) window.soundEngine.toggleMute();
          this.appendLine(`<span class="term-green">✓ Audio synthesizer unmuted.</span>`);
        } else if (arg === 'off') {
          if (window.soundEngine && !window.soundEngine.isMuted()) window.soundEngine.toggleMute();
          this.appendLine(`<span class="term-dim">✓ Audio synthesizer muted.</span>`);
        } else {
          this.appendLine(`<span class="term-dim">Usage: sound [on | off]</span>`);
        }
        break;

      case 'cat':
        if (arg === 'resume' || arg === 'resume.txt') {
          this.appendLine(`
<span class="term-accent">=== KARTIK MEWADA | RESUME OVERVIEW ===</span>
- Role: Software Developer & Cloud Engineer
- Languages: JavaScript, Python, C++, HTML, CSS, SQL
- Clouds: AWS, Google Cloud, Render, Railway, Cloudflare
- Projects:
  1. Foodie Express (Cloudflare Workers Food Delivery)
  2. AttendAI (Face Recognition Biometric Attendance System)
- Certifications:
  1. Deloitte Australia - Data Analytics Job Simulation (Forage)
  2. AWS Academy Graduate - Cloud Foundations (Credly)
  3. Python for Machine Learning (IIT Bombay Spoken Tutorial)
- Type 'projects' or 'certs' for live links!
          `);
        } else {
          this.appendLine(`<span class="term-dim">File not found. Try: cat resume</span>`);
        }
        break;

      case 'clear':
        this.output.innerHTML = '';
        this.printGreeting();
        break;

      case 'date':
        this.appendLine(`<span class="term-cyan">${new Date().toUTCString()}</span>`);
        break;

      case 'matrix':
        this.appendLine(`<span class="term-green">Wake up, Neo... The Matrix has you. Follow the white rabbit.</span>`);
        if (window.setGlobalTheme) window.setGlobalTheme('matrix');
        break;

      case 'sudo':
        this.appendLine(`<span class="term-magenta">Permission denied: You already possess root access in your imagination.</span>`);
        break;

      default:
        this.appendLine(`<span class="term-dim">Command not found: '${this.escapeHtml(cmd)}'. Type </span><span class="term-cyan">'help'</span><span class="term-dim"> for guidance.</span>`);
        break;
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

window.CyberTerminal = CyberTerminal;

