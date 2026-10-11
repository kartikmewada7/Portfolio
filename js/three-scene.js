/**
 * 3D Interactive Cyber Core & Particle Field Engine (Three.js)
 * Implements interactive 3D core, orbiting tech nodes, starfield particles,
 * mouse parallax, scroll camera dynamics, and interactive viewport controls.
 */
class HeroThreeScene {
  constructor() {
    this.container = document.getElementById('hero-3d-wrapper');
    this.canvas = document.getElementById('three-hero-canvas');
    if (!this.container || !this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // 3D Objects
    this.coreGroup = null;
    this.innerKnot = null;
    this.outerPoly = null;
    this.ring1 = null;
    this.ring2 = null;
    this.quantumCore = null;
    this.particles = null;
    this.particlePositions = null;
    this.particleCount = 2200;
    this.floatingBadges = [];

    // Lighting
    this.pointLightCyan = null;
    this.pointLightMagenta = null;
    this.centerCoreLight = null;

    // Interaction & Animation State
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;
    this.autoRotate = true;
    this.wireframeMode = false;
    this.isInspectMode = false;
    this.clock = new THREE.Clock();

    // Theme Palettes
    this.themes = {
      cyber: {
        primary: 0x00f0ff,
        secondary: 0xb537f2,
        accent: 0x00ff88,
        knot: 0x00e5ff
      },
      synthwave: {
        primary: 0xff007f,
        secondary: 0x7928ca,
        accent: 0x00f0ff,
        knot: 0xff2a85
      },
      matrix: {
        primary: 0x00ff66,
        secondary: 0x008f39,
        accent: 0x39ff14,
        knot: 0x00ff88
      },
      gold: {
        primary: 0xffb703,
        secondary: 0xfb8500,
        accent: 0x219ebc,
        knot: 0xffcc00
      }
    };
    this.currentTheme = 'cyber';

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene & Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070913, 0.016);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 11);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // 4. OrbitControls
    if (window.THREE && window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.enableZoom = false; // enabled in inspect mode
      this.controls.enablePan = false;
      this.controls.maxDistance = 20;
      this.controls.minDistance = 5;
      this.controls.autoRotate = false;
    }

    // 5. Lights
    this.setupLights();

    // 6. Build 3D Holographic Core
    this.buildCyberCore();

    // 7. Build Particle Universe
    this.buildParticleField();

    // 8. Build Floating Tech Data Badges
    this.buildFloatingTechBadges();

    // 9. Event Listeners
    this.attachEvents();

    // 10. Start Loop
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x0e172a, 1.2);
    this.scene.add(ambientLight);

    // Primary Cyan light
    this.pointLightCyan = new THREE.PointLight(this.themes[this.currentTheme].primary, 3.5, 30);
    this.pointLightCyan.position.set(5, 5, 6);
    this.scene.add(this.pointLightCyan);

    // Secondary Magenta light
    this.pointLightMagenta = new THREE.PointLight(this.themes[this.currentTheme].secondary, 3.2, 30);
    this.pointLightMagenta.position.set(-6, -4, 4);
    this.scene.add(this.pointLightMagenta);

    // Inner pulsating quantum core light
    this.centerCoreLight = new THREE.PointLight(this.themes[this.currentTheme].accent, 2.5, 12);
    this.centerCoreLight.position.set(0, 0, 0);
    this.scene.add(this.centerCoreLight);

    // Directional rim light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 10, 10);
    this.scene.add(dirLight);
  }

  buildCyberCore() {
    this.coreGroup = new THREE.Group();

    const t = this.themes[this.currentTheme];

    // Inner Torus Knot - The Quantum Reactor
    const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.38, 120, 24, 2, 3);
    this.knotMaterial = new THREE.MeshStandardMaterial({
      color: t.knot,
      metalness: 0.85,
      roughness: 0.22,
      emissive: 0x051b33,
      wireframe: this.wireframeMode
    });
    this.innerKnot = new THREE.Mesh(knotGeo, this.knotMaterial);
    this.coreGroup.add(this.innerKnot);

    // Outer Shimmering Polyhedron (Icosahedron)
    const polyGeo = new THREE.IcosahedronGeometry(2.6, 1);
    this.polyMaterial = new THREE.MeshBasicMaterial({
      color: t.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.outerPoly = new THREE.Mesh(polyGeo, this.polyMaterial);
    this.coreGroup.add(this.outerPoly);

    // Gyroscope Ring 1
    const ring1Geo = new THREE.TorusGeometry(3.5, 0.045, 16, 120);
    this.ring1Mat = new THREE.MeshStandardMaterial({
      color: t.primary,
      metalness: 0.9,
      roughness: 0.1,
      emissive: t.primary,
      emissiveIntensity: 0.3
    });
    this.ring1 = new THREE.Mesh(ring1Geo, this.ring1Mat);
    this.ring1.rotation.x = Math.PI / 3;
    this.coreGroup.add(this.ring1);

    // Gyroscope Ring 2
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.035, 16, 120);
    this.ring2Mat = new THREE.MeshStandardMaterial({
      color: t.secondary,
      metalness: 0.9,
      roughness: 0.1,
      emissive: t.secondary,
      emissiveIntensity: 0.3
    });
    this.ring2 = new THREE.Mesh(ring2Geo, this.ring2Mat);
    this.ring2.rotation.y = Math.PI / 4;
    this.coreGroup.add(this.ring2);

    // Inner Glowing Quantum Sphere
    const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
    this.sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });
    this.quantumCore = new THREE.Mesh(sphereGeo, this.sphereMat);
    this.coreGroup.add(this.quantumCore);

    this.scene.add(this.coreGroup);
  }

  // Generates a soft glowing circular particle texture in-memory with HTML5 canvas
  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(181, 55, 242, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  buildParticleField() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const color1 = new THREE.Color(this.themes[this.currentTheme].primary);
    const color2 = new THREE.Color(this.themes[this.currentTheme].secondary);
    const color3 = new THREE.Color(this.themes[this.currentTheme].accent);

    for (let i = 0; i < this.particleCount; i++) {
      // Cylindrical/spherical cluster distribution
      const radius = 4 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);

      // Color interpolation
      const choice = Math.random();
      const c = choice < 0.45 ? color1 : choice < 0.85 ? color2 : color3;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.particlePositions = positions;

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: this.createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  // Orbiting 3D Tech Data Holograms
  buildFloatingTechBadges() {
    const techs = [
      { name: 'JavaScript', icon: 'JS', color: 0xf7df1e },
      { name: 'Python', icon: 'PY', color: 0x3776ab },
      { name: 'C++', icon: 'C++', color: 0x00599c },
      { name: 'SQL', icon: 'SQL', color: 0x336791 },
      { name: 'AWS Cloud', icon: 'AWS', color: 0xff9900 },
      { name: 'Cloudflare', icon: 'CF', color: 0xf38020 }
    ];

    techs.forEach((t, index) => {
      const angle = (index / techs.length) * Math.PI * 2;
      const orbitRadius = 4.8 + (index % 2) * 0.8;

      // Small 3D Holographic Cube
      const geo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
      const mat = new THREE.MeshStandardMaterial({
        color: t.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: t.color,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.85
      });
      const mesh = new THREE.Mesh(geo, mat);

      mesh.userData = {
        name: t.name,
        orbitRadius: orbitRadius,
        speed: 0.25 + (index % 3) * 0.1,
        angle: angle,
        yOffset: (index % 2 === 0 ? 1 : -1) * (1.2 + (index % 3) * 0.4)
      };

      mesh.position.set(
        Math.cos(angle) * orbitRadius,
        mesh.userData.yOffset,
        Math.sin(angle) * orbitRadius
      );

      this.floatingBadges.push(mesh);
      this.coreGroup.add(mesh);
    });
  }

  attachEvents() {
    // Window Resize
    window.addEventListener('resize', () => this.onResize());

    // Mouse Parallax
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Scroll Dynamics
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    // Inspect mode toggle button
    const inspectBtn = document.getElementById('btn-3d-inspect');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => this.toggleInspectMode());
    }

    // Auto rotate toggle
    const rotateBtn = document.getElementById('btn-3d-rotate');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.autoRotate = !this.autoRotate;
        rotateBtn.classList.toggle('active', this.autoRotate);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    // Wireframe toggle
    const wireframeBtn = document.getElementById('btn-3d-wireframe');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        this.wireframeMode = !this.wireframeMode;
        if (this.knotMaterial) this.knotMaterial.wireframe = this.wireframeMode;
        wireframeBtn.classList.toggle('active', this.wireframeMode);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    // Reset Camera
    const resetBtn = document.getElementById('btn-3d-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.controls) this.controls.reset();
        this.camera.position.set(0, 0, 11);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    // Pause on hidden tab
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.clock.stop();
      } else {
        this.clock.start();
      }
    });
  }

  toggleInspectMode() {
    this.isInspectMode = !this.isInspectMode;
    const inspectBtn = document.getElementById('btn-3d-inspect');
    const badge = document.getElementById('hero-3d-badge');

    if (this.controls) {
      this.controls.enableZoom = this.isInspectMode;
      this.controls.enablePan = this.isInspectMode;
    }

    if (inspectBtn) inspectBtn.classList.toggle('active', this.isInspectMode);
    if (badge) {
      badge.textContent = this.isInspectMode ? '3D Orbit Mode: Drag & Scroll to Zoom' : '3D Interactive Viewport';
    }

    if (window.soundEngine) window.soundEngine.playWarp();
  }

  setTheme(themeName) {
    if (!this.themes[themeName]) return;
    this.currentTheme = themeName;
    const t = this.themes[themeName];

    if (this.pointLightCyan) this.pointLightCyan.color.setHex(t.primary);
    if (this.pointLightMagenta) this.pointLightMagenta.color.setHex(t.secondary);
    if (this.centerCoreLight) this.centerCoreLight.color.setHex(t.accent);

    if (this.knotMaterial) this.knotMaterial.color.setHex(t.knot);
    if (this.polyMaterial) this.polyMaterial.color.setHex(t.primary);
    if (this.ring1Mat) this.ring1Mat.color.setHex(t.primary);
    if (this.ring2Mat) this.ring2Mat.color.setHex(t.secondary);

    // Update particle colors
    if (this.particles && this.particles.geometry.attributes.color) {
      const colors = this.particles.geometry.attributes.color.array;
      const c1 = new THREE.Color(t.primary);
      const c2 = new THREE.Color(t.secondary);
      const c3 = new THREE.Color(t.accent);

      for (let i = 0; i < this.particleCount; i++) {
        const choice = Math.random();
        const c = choice < 0.45 ? c1 : choice < 0.85 ? c2 : c3;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      this.particles.geometry.attributes.color.needsUpdate = true;
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Mouse Lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Core Rotation
    if (this.coreGroup && this.autoRotate) {
      this.coreGroup.rotation.y += delta * 0.35;
      this.coreGroup.rotation.x += delta * 0.15;
    }

    if (this.innerKnot) {
      this.innerKnot.rotation.y += delta * 0.45;
      this.innerKnot.rotation.z += delta * 0.25;
    }

    if (this.outerPoly) {
      this.outerPoly.rotation.y -= delta * 0.2;
      this.outerPoly.rotation.x += delta * 0.1;
    }

    if (this.ring1) {
      this.ring1.rotation.z += delta * 0.35;
    }
    if (this.ring2) {
      this.ring2.rotation.x += delta * 0.4;
    }

    // Inner Quantum Sphere Pulse
    if (this.quantumCore) {
      const scale = 0.55 + Math.sin(elapsedTime * 4.5) * 0.08;
      this.quantumCore.scale.set(scale, scale, scale);
    }
    if (this.centerCoreLight) {
      this.centerCoreLight.intensity = 2.2 + Math.sin(elapsedTime * 5) * 1.0;
    }

    // Floating Tech Badges Orbit
    this.floatingBadges.forEach((badge) => {
      badge.userData.angle += delta * badge.userData.speed * (this.autoRotate ? 1 : 0.2);
      const r = badge.userData.orbitRadius;
      badge.position.x = Math.cos(badge.userData.angle) * r;
      badge.position.z = Math.sin(badge.userData.angle) * r;
      badge.position.y = badge.userData.yOffset + Math.sin(elapsedTime * 2 + badge.userData.angle) * 0.3;
      badge.rotation.x += delta * 0.8;
      badge.rotation.y += delta * 1.2;
    });

    // Particle field slow drift & mouse ripple
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04;
      this.particles.rotation.x = this.mouseY * 0.15;
      this.particles.rotation.z = this.mouseX * 0.15;
    }

    // OrbitControls or Mouse Parallax Camera lerp
    if (this.controls && this.isInspectMode) {
      this.controls.update();
    } else {
      // Parallax effect only when not dragging in inspect mode
      const targetCamX = this.mouseX * 1.8;
      const targetCamY = this.mouseY * 1.2 - (this.scrollY * 0.0035);
      this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.HeroThreeScene = HeroThreeScene;

