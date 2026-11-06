/**
 * Three.js 3D Background & Interactive Objects
 * Monotone + Cool Cyan / Electric Blue Aesthetic
 */

(function () {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090e, 0.035);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLightCyan = new THREE.PointLight(0x00f0ff, 2.5, 30);
  pointLightCyan.position.set(5, 5, 5);
  scene.add(pointLightCyan);

  const pointLightBlue = new THREE.PointLight(0x3b82f6, 3, 30);
  pointLightBlue.position.set(-5, -4, 4);
  scene.add(pointLightBlue);

  // Group for main floating 3D hero structure
  const heroGroup = new THREE.Group();
  scene.add(heroGroup);

  // 1. Core Polyhedron (Icosahedron with wireframe + inner crystal)
  const coreGeometry = new THREE.IcosahedronGeometry(2.0, 1);

  // Outer wireframe with glowing cyan
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const coreWireframe = new THREE.Mesh(coreGeometry, wireframeMaterial);
  heroGroup.add(coreWireframe);

  // Inner solid metallic facets (dark slate reflecting cyan/blue lights)
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.2,
    flatShading: true,
    transparent: true,
    opacity: 0.85
  });
  const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1), innerMat);
  heroGroup.add(innerCore);

  // Outer Orbiting Rings / Torus
  const ringGeometry1 = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.5
  });
  const ring1 = new THREE.Mesh(ringGeometry1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  heroGroup.add(ring1);

  const ringGeometry2 = new THREE.TorusGeometry(3.6, 0.015, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.3
  });
  const ring2 = new THREE.Mesh(ringGeometry2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 5;
  heroGroup.add(ring2);

  // 2. Floating Star Particles Cloud
  const particleCount = 1400;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0x00f0ff), // Cyan
    new THREE.Color(0x38bdf8), // Light Blue
    new THREE.Color(0x818cf8), // Indigo
    new THREE.Color(0xffffff)  // Pure White
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 26;
    positions[i3 + 1] = (Math.random() - 0.5) * 26;
    positions[i3 + 2] = (Math.random() - 0.5) * 22;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Create subtle circular texture for particles
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 16;
  particleCanvas.height = 16;
  const ctx = particleCanvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.7)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Position hero group slightly offset for desktop
  function adjustHeroPosition() {
    if (window.innerWidth > 960) {
      heroGroup.position.set(2.4, 0, 0);
    } else {
      heroGroup.position.set(0, 1.2, -1);
    }
  }
  adjustHeroPosition();

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll Interaction
  let scrollProgress = 0;
  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    adjustHeroPosition();
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Hero Object Continuous Rotations
    heroGroup.rotation.y = elapsedTime * 0.18 + mouseX * 0.3;
    heroGroup.rotation.x = elapsedTime * 0.12 - mouseY * 0.2;

    ring1.rotation.z = elapsedTime * 0.25;
    ring2.rotation.z = -elapsedTime * 0.2;

    // Parallax & Floating effect
    heroGroup.position.y = (window.innerWidth > 960 ? 0 : 1.2) + Math.sin(elapsedTime * 0.8) * 0.15;

    // Dynamic scroll transformation:
    // As user scrolls, the hero object moves back and shifts to create dynamic perspective
    const scrollOffset = scrollProgress * 5;
    heroGroup.position.z = -scrollOffset * 1.5;
    heroGroup.rotation.z = scrollProgress * Math.PI * 1.5;

    // Particle subtle drift & responsiveness
    particleSystem.rotation.y = elapsedTime * 0.03 + mouseX * 0.1;
    particleSystem.rotation.x = -mouseY * 0.05;

    // Dynamic point lights orbit
    pointLightCyan.position.x = Math.sin(elapsedTime * 0.7) * 5 + mouseX * 2;
    pointLightCyan.position.y = Math.cos(elapsedTime * 0.5) * 4;
    pointLightBlue.position.x = -Math.sin(elapsedTime * 0.6) * 5;
    pointLightBlue.position.z = Math.cos(elapsedTime * 0.8) * 4;

    renderer.render(scene, camera);
  }

  animate();
})();
