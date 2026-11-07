'use client';

import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const ORANGE = 0xff6a1a;
const ORANGE_LIGHT = 0xff853d;
const AMBER = 0xffb067;

const RINGS = [
  { radius: 2.3, tilt: [1.25, 0.15], speed: 0.45, opacity: 0.55 },
  { radius: 3.0, tilt: [0.45, 0.9], speed: -0.32, opacity: 0.4 },
  { radius: 3.65, tilt: [1.0, -0.7], speed: 0.2, opacity: 0.28 },
];

/** Soft white radial sprite, tinted later through material.color. */
function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/*
  Owns the canvas, render loop, resize and full cleanup.
  Reduced-motion is read here directly (not via props), so a change in the user's
  setting never tears down and rebuilds the whole WebGL context.
*/
function OrbitalScene({ pointerRef, onUnavailable, onReady }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;

    const disposables = [];
    const track = (obj) => {
      disposables.push(obj);
      return obj;
    };

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      onUnavailable();
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 9.5);

    /* Environment reflections make the metal read as metal. */
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envRT = pmrem.fromScene(room, 0.04);
    scene.environment = envRT.texture;
    if (typeof room.dispose === 'function') room.dispose();

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const key = new THREE.PointLight(ORANGE_LIGHT, 60, 20, 2);
    key.position.set(4, 3, 6);
    const rim = new THREE.PointLight(0xffffff, 25, 20, 2);
    rim.position.set(-5, -2, 4);
    scene.add(key, rim);

    const glowTex = track(createGlowTexture());
    const root = new THREE.Group();
    scene.add(root);

    /* Metallic core + wireframe shell */
    const coreGroup = new THREE.Group();
    const coreMat = track(
      new THREE.MeshStandardMaterial({
        color: ORANGE,
        metalness: 1,
        roughness: 0.26,
        flatShading: true,
        emissive: 0x8a2a00,
        emissiveIntensity: 0.4,
      })
    );
    const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(1.35, 1)), coreMat);

    const shellSrc = new THREE.IcosahedronGeometry(1.62, 1);
    const shellGeo = track(new THREE.EdgesGeometry(shellSrc));
    shellSrc.dispose();
    const shell = new THREE.LineSegments(
      shellGeo,
      track(new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.5 }))
    );
    coreGroup.add(core, shell);
    root.add(coreGroup);

    /* Energy glow behind the core */
    const glowMat = track(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: ORANGE,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    const glow = new THREE.Sprite(glowMat);
    glow.scale.setScalar(5.4);
    glow.position.z = -0.6;
    root.add(glow);

    /* Orbital rings with a glowing node riding each one */
    const nodeGeo = track(new THREE.SphereGeometry(0.07, 12, 12));
    const nodeMat = track(new THREE.MeshBasicMaterial({ color: 0xffe2cc }));
    const haloMat = track(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: ORANGE,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );

    const rings = RINGS.map((cfg) => {
      const tiltGroup = new THREE.Group();
      tiltGroup.rotation.set(cfg.tilt[0], cfg.tilt[1], 0);
      const spin = new THREE.Group();

      const ring = new THREE.Mesh(
        track(new THREE.TorusGeometry(cfg.radius, 0.014, 8, isMobile ? 96 : 180)),
        track(
          new THREE.MeshBasicMaterial({
            color: ORANGE_LIGHT,
            transparent: true,
            opacity: cfg.opacity,
          })
        )
      );
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(cfg.radius, 0, 0);
      const halo = new THREE.Sprite(haloMat);
      halo.position.copy(node.position);
      halo.scale.setScalar(0.7);

      spin.add(ring, node, halo);
      tiltGroup.add(spin);
      root.add(tiltGroup);
      return { spin, speed: cfg.speed };
    });

    /* Particles (fewer on mobile) */
    const count = isMobile ? 180 : 650;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 2.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = track(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      track(
        new THREE.PointsMaterial({
          map: glowTex,
          color: ORANGE_LIGHT,
          size: isMobile ? 0.12 : 0.1,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        })
      )
    );
    root.add(particles);

    /* Render */
    const smooth = { x: 0, y: 0 };
    const draw = (t) => {
      const p = pointerRef.current;
      smooth.x += (p.x - smooth.x) * 0.06;
      smooth.y += (p.y - smooth.y) * 0.06;

      coreGroup.rotation.y = t * 0.35;
      coreGroup.rotation.x = t * 0.18;
      shell.rotation.y = -t * 0.2;
      shell.rotation.z = t * 0.1;
      rings.forEach((r) => {
        r.spin.rotation.z = t * r.speed;
      });
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      glowMat.opacity = 0.75 + Math.sin(t * 1.6) * 0.12;

      root.rotation.y = smooth.x * 0.45;
      root.rotation.x = smooth.y * 0.3;

      renderer.render(scene, camera);
    };

    /*
      Loop control. Time is accumulated frame by frame (capped), so pausing while the
      tab is hidden or the hero is off-screen never makes the animation jump on resume.
    */
    let elapsed = 0.6;
    let last = 0;
    let raf = 0;
    let running = false;
    let inView = true;

    const tick = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(elapsed);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (inView && !document.hidden && !reduced) start();
      else stop();
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); // this clears the canvas...
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw(elapsed); // ...so always redraw, even when the loop is paused
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);

    const onMotionChange = (e) => {
      reduced = e.matches;
      sync();
    };
    const onLost = (e) => {
      e.preventDefault();
      stop();
    };
    const onRestored = () => {
      draw(elapsed);
      sync();
    };

    motionQuery.addEventListener('change', onMotionChange);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    document.addEventListener('visibilitychange', sync);

    resize();
    sync();
    onReady();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', sync);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);

      disposables.forEach((d) => d.dispose && d.dispose());
      scene.environment = null;
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (typeof renderer.forceContextLoss === 'function') renderer.forceContextLoss();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, [pointerRef, onUnavailable, onReady]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default memo(OrbitalScene);
