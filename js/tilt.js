/**
 * 3D Card Tilt & Holographic Glare Engine
 * Real-time 3D perspective physics with multi-layer depth offset
 */
class TiltEngine {
  constructor() {
    this.cards = [];
    this.maxRotation = 14; // degrees
    this.perspective = 1100; // px
  }

  init() {
    this.cards = document.querySelectorAll('[data-tilt]');
    this.cards.forEach(card => this.attachEvents(card));
  }

  attachEvents(card) {
    let bounds;
    let isHovered = false;

    // Create dynamic glare element if not already present
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    const onMouseEnter = () => {
      isHovered = true;
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.12s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease';
      if (window.soundEngine) window.soundEngine.playHover();
    };

    const onMouseMove = (e) => {
      if (!isHovered) return;
      bounds = bounds || card.getBoundingClientRect();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normalizedX = (mouseX / bounds.width) * 2 - 1; // -1 to 1
      const normalizedY = (mouseY / bounds.height) * 2 - 1; // -1 to 1

      const rotateY = normalizedX * this.maxRotation;
      const rotateX = -normalizedY * this.maxRotation;

      card.style.transform = `perspective(${this.perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Move dynamic glare
      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, var(--glare-color, rgba(0, 240, 255, 0.2)), transparent 60%)`;
      glare.style.opacity = '1';
    };

    const onMouseLeave = () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease';
      card.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.opacity = '0';
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  }
}

window.tiltEngine = new TiltEngine();

