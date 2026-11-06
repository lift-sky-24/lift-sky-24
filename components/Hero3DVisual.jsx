'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { BrainCircuit, Globe, Smartphone, TrendingUp } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const ORANGE = 0xff6a1a;
const ORANGE_LIGHT = 0xff853d;
const AMBER = 0xffb067;

const RINGS = [
  { radius: 2.3, tilt: [1.25, 0.15], speed: 0.45, opacity: 0.55 },
  { radius: 3.0, tilt: [0.45, 0.9], speed: -0.32, opacity: 0.4 },
  { radius: 3.65, tilt: [1.0, -0.7], speed: 0.2, opacity: 0.28 },
];

const SERVICE_CARDS = [
  {
    id: 'web',
    title: 'Web Development',
    caption: 'Fast, scalable websites',
    Icon: Globe,
    position: 'left-0 top-[9%]',
    depth: 16,
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    caption: 'Smarter automation',
    Icon: BrainCircuit,
    position: 'right-0 top-[23%]',
    depth: 24,
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    caption: 'iOS & Android',
    Icon: Smartphone,
    position: 'left-[2%] bottom-[13%]',
    depth: 22,
  },
  {
    id: 'seo',
    title: 'Digital Growth / SEO',
    caption: 'Rank. Reach. Grow.',
    Icon: TrendingUp,
    position: 'right-[1%] bottom-[2%]',
    depth: 14,
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Three.js scene                                                            */
/* -------------------------------------------------------------------------- */

const OrbitalScene = memo(function OrbitalScene({ reduced, pointerRef, onUnavailable }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const disposables = [];
    const track = (obj) => { disposables.push(obj); return obj; };

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

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envRT = pmrem.fromScene(room, 0.04);
    scene.environment = envRT.texture;
    if (typeof room.dispose === 'function') room.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const key = new THREE.PointLight(ORANGE_LIGHT, 60, 20, 2);
    key.position.set(4, 3, 6);
    const rim = new THREE.PointLight(0xffffff, 25, 20, 2);
    rim.position.set(-5, -2, 4);
    scene.add(key, rim);

    const glowTex = track(createGlowTexture());
    const root = new THREE.Group();
    scene.add(root);

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

    const smooth = { x: 0, y: 0 };
    const draw = (t) => {
      const p = pointerRef.current;
      smooth.x += (p.x - smooth.x) * 0.06;
      smooth.y += (p.y - smooth.y) * 0.06;

      coreGroup.rotation.y = t * 0.35;
      coreGroup.rotation.x = t * 0.18;
      shell.rotation.y = -t * 0.2;
      shell.rotation.z = t * 0.1;
      rings.forEach((r) => { r.spin.rotation.z = t * r.speed; });
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      glowMat.opacity = 0.75 + Math.sin(t * 1.6) * 0.12;

      root.rotation.y = smooth.x * 0.45;
      root.rotation.x = smooth.y * 0.3;

      renderer.render(scene, camera);
    };

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;
    let inView = true;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      draw(clock.getElapsedTime());
    };
    const start = () => { if (running || reduced) return; running = true; raf = requestAnimationFrame(tick); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const sync = () => { if (inView && !document.hidden) start(); else stop(); };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduced) draw(0.6);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const io = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; sync(); },
      { threshold: 0.01 }
    );
    io.observe(mount);

    const onLost = (e) => { e.preventDefault(); stop(); };
    canvas.addEventListener('webglcontextlost', onLost);
    document.addEventListener('visibilitychange', sync);

    resize();
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      canvas.removeEventListener('webglcontextlost', onLost);
      disposables.forEach((d) => d.dispose && d.dispose());
      scene.environment = null;
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (typeof renderer.forceContextLoss === 'function') renderer.forceContextLoss();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, [reduced, pointerRef, onUnavailable]);

  return <div ref={mountRef} className="absolute inset-0" />;
});

/* -------------------------------------------------------------------------- */
/*  Floating glass cards                                                      */
/* -------------------------------------------------------------------------- */

function ServiceCard({ item, index, sx, sy, reduced }) {
  const { Icon, title, caption, position, depth } = item;
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);

  return (
    <motion.li
      style={{ x, y }}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.7 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute select-none ${position}`}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5 + index * 0.7, delay: index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#FF6A1A] to-[#FF853D] text-white shadow-[0_0_20px_rgba(255,106,26,0.45)] sm:h-9 sm:w-9">
          <Icon aria-hidden="true" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
        </span>
        <span className="block leading-tight">
          <span className="block text-[12px] font-semibold text-white sm:text-sm">{title}</span>
          <span className="mt-0.5 hidden text-xs text-[#A1A1AA] sm:block">{caption}</span>
        </span>
      </motion.div>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

function Hero3DVisual({ className = '' }) {
  const reduced = Boolean(useReducedMotion());
  const [unavailable, setUnavailable] = useState(false);
  const handleUnavailable = useCallback(() => setUnavailable(true), []);

  const pointerRef = useRef({ x: 0, y: 0 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return undefined;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, mx, my]);

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[600px] ${className}`}>
      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.28),transparent_68%)] blur-2xl" />

      {/* 3D scene */}
      <motion.div
        role="img"
        aria-label="Animated 3D orange technology core surrounded by orbital rings"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {unavailable ? (
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
            <div className="absolute h-[78%] w-[78%] rounded-full border border-[#FF853D]/30" />
            <div className="absolute h-[58%] w-[58%] rounded-full border border-[#FF853D]/40" />
            <div className="h-[34%] w-[34%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFB067,#FF6A1A_45%,#7a2200_100%)] shadow-[0_0_120px_rgba(255,106,26,0.55)]" />
          </div>
        ) : (
          <OrbitalScene reduced={reduced} pointerRef={pointerRef} onUnavailable={handleUnavailable} />
        )}
      </motion.div>

      {/* Floating glass cards */}
      <ul aria-label="LiftSky24 services" className="pointer-events-none absolute inset-0 m-0 list-none p-0">
        {SERVICE_CARDS.map((item, i) => (
          <ServiceCard key={item.id} item={item} index={i} sx={sx} sy={sy} reduced={reduced} />
        ))}
      </ul>
    </div>
  );
}

export default memo(Hero3DVisual);
