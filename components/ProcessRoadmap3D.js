"use client";

/**
 * ProcessRoadmap3D — Three.js layer for the process roadmap.
 * Loaded ONLY via next/dynamic({ ssr: false }) from ProcessRoadmap.js.
 * Requires: three@0.169.0, @react-three/fiber@8.17.10
 *
 * What it does (all desktop xl+ only):
 *  - Idle float animation on card inner elements (JS → inline style.transform)
 *  - Hover tilt + lift on the hovered card
 *  - Twin planes (rounded-rect meshes) drifting behind each card
 *  - Traveling orb along the wave road
 *  - Comet trail behind the orb
 *  - Ping rings when a milestone is reached
 *  - Particle field across the whole section
 *
 * Architecture:
 *  - ProcessRoadmap owns the card DOM; this file only moves them.
 *  - storeRef.current: { progress, activeIndex, hover, pointer, cardEls[] }
 *  - All animations run in useFrame; no React state is touched per frame.
 */

import { useCallback, useEffect, useRef, useState, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Vector3,
  CubicBezierCurve3,
  CurvePath,
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  CanvasTexture,
  Sprite,
  SpriteMaterial,
  AdditiveBlending,
  SRGBColorSpace,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  Color,
} from "three";

/* ─── helpers ─────────────────────────────────────────────────────── */

const MS_Y  = [60, 140, 60, 140, 60];  // milestone centerY in 200px wave row

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** Rounded-rectangle Shape (Three.js) */
function roundedRectShape(w, h, r) {
  const s = new Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  s.closePath();
  return s;
}

/** Radial glow CanvasTexture (64x64) */
function makeGlowTexture(color = "#FC6E04") {
  const sz = 64;
  const c = document.createElement("canvas");
  c.width = c.height = sz;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
  g.addColorStop(0, color.replace("#", "rgba(").replace(/(..)(..)(..)/, "$1,$2,$3") + ", 1)");
  // simpler approach:
  g.addColorStop(0,   color + "ff");
  g.addColorStop(0.4, color + "88");
  g.addColorStop(1,   color + "00");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, sz, sz);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/** Build CurvePath from the SVG wave, scaled to real pixel width */
function buildCurvePath(roadWidth, row2Top, row2H) {
  // SVG coords are in a 1000×200 viewBox; scale x by roadWidth/1000, y by row2H/200 + row2Top
  const sx = roadWidth / 1000;
  const sy = row2H / 200;
  const tx = (x) => x * sx;
  const ty = (y) => row2Top + y * sy;

  const cp = new CurvePath();
  const segs = [
    [[0,100],[60,100],[50,60],[100,60]],
    [[100,60],[150,60],[250,140],[300,140]],
    [[300,140],[350,140],[450,60],[500,60]],
    [[500,60],[550,60],[650,140],[700,140]],
    [[700,140],[750,140],[850,60],[900,60]],
    [[900,60],[950,60],[940,100],[1000,100]],
  ];
  segs.forEach(([p0,p1,p2,p3]) => {
    cp.add(new CubicBezierCurve3(
      new Vector3(tx(p0[0]), -ty(p0[1]), 0),
      new Vector3(tx(p1[0]), -ty(p1[1]), 0),
      new Vector3(tx(p2[0]), -ty(p2[1]), 0),
      new Vector3(tx(p3[0]), -ty(p3[1]), 0),
    ));
  });
  return cp;
}

/* ─── Layout measurement ──────────────────────────────────────────── */
function measureLayout(olEl) {
  if (!olEl) return null;
  const olRect = olEl.getBoundingClientRect();
  // find row2 (the wave row) — heuristic: the SVG inside the li[aria-hidden]
  const waveSVG = olEl.querySelector("svg[aria-hidden]");
  let row2Top = 0, row2H = 200, roadWidth = olRect.width;
  if (waveSVG) {
    const svgRect = waveSVG.getBoundingClientRect();
    row2Top = svgRect.top - olRect.top;
    row2H   = svgRect.height;
    roadWidth = svgRect.width;
  }
  // card inner elements (data-step-card)
  const cards = [];
  for (let i = 0; i < 5; i++) {
    const el = olEl.querySelector(`[data-step-card="${i}"]`);
    if (el) {
      const r = el.getBoundingClientRect();
      cards.push({
        x: r.left - olRect.left + r.width / 2,
        y: r.top  - olRect.top  + r.height / 2,
        w: r.width, h: r.height,
        el,
      });
    } else {
      cards.push(null);
    }
  }
  return { olW: olRect.width, olH: olRect.height, row2Top, row2H, roadWidth, cards };
}

/* ─── THREE scene ─────────────────────────────────────────────────── */
function Scene({ storeRef, olRef }) {
  const { size, invalidate } = useThree();
  const layoutRef  = useRef(null);
  const glowTexRef = useRef(null);
  const amberTexRef= useRef(null);

  /* Card animation state (per card) */
  const cardState = useRef(
    Array.from({ length: 5 }, () => ({
      // idle float
      idleX: 0, idleY: 0, idleRz: 0,
      // hover
      hoverY: 0, hoverScale: 1, hoverRx: 0, hoverRy: 0, hoverTz: 0,
      // composite
      curX: 0, curY: 0, curRz: 0, curScale: 1, curRx: 0, curRy: 0, curTz: 0,
    }))
  );

  /* Twin plane meshes */
  const twinsRef   = useRef([]);
  const twinMatsRef= useRef([]);
  const glowSpritesRef = useRef([]);

  /* Orb */
  const orbRef   = useRef(null);
  const orbMatRef= useRef(null);
  const haloRef  = useRef(null);
  const smoothP  = useRef(0);

  /* Trail ring buffer */
  const TRAIL_LEN = 18;
  const trailRef  = useRef([]);
  const trailMatRef = useRef([]);

  /* Ping rings */
  const pingRef   = useRef([]);
  const lastMsRef = useRef(-1);

  /* Particles */
  const particlesRef = useRef(null);
  const particleData = useRef(null);

  /* Pointer for particles */
  const pointerRef = useRef({ x: 0, y: 0 });

  // DOM to world: x right, y up
  const domToWorld = useCallback((dx, dy) => {
    const lay = layoutRef.current;
    if (!lay) return new Vector3();
    return new Vector3(dx - lay.olW / 2, -(dy - lay.olH / 2), 0);
  }, []);

  /* ── Setup (measure + build objects) ── */
  useEffect(() => {
    glowTexRef.current  = makeGlowTexture("#FC6E04");
    amberTexRef.current = makeGlowTexture("#FFC247");

    const lay = measureLayout(olRef.current);
    layoutRef.current = lay;
    if (!lay) return;

    // ── Twin planes ──
    const CARD_COLORS = ["#FC6E04","#0C1322","#FC6E04","#0C1322","#FC6E04"];
    twinsRef.current = [];
    twinMatsRef.current = [];
    glowSpritesRef.current = [];

    lay.cards.forEach((c, i) => {
      if (!c) { twinsRef.current.push(null); twinMatsRef.current.push(null); glowSpritesRef.current.push(null); return; }
      const geo = new ShapeGeometry(roundedRectShape(c.w + 16, c.h + 16, 22));
      const mat = new MeshBasicMaterial({
        color: new Color(CARD_COLORS[i]),
        transparent: true,
        opacity: 0.10,
        depthWrite: false,
      });
      const mesh = new Mesh(geo, mat);
      const wp   = domToWorld(c.x, c.y);
      mesh.position.set(wp.x, wp.y, -40);
      // scene.add handled in the component return
      twinsRef.current.push(mesh);
      twinMatsRef.current.push(mat);

      // Glow sprite
      const sm = new SpriteMaterial({
        map: glowTexRef.current,
        color: new Color("#FC6E04"),
        transparent: true, opacity: 0, depthWrite: false,
        blending: AdditiveBlending,
      });
      const sp = new Sprite(sm);
      sp.position.set(wp.x, wp.y, -60);
      sp.scale.setScalar(Math.max(c.w, c.h) * 1.8);
      glowSpritesRef.current.push(sp);
    });

    // ── Orb ──
    const curve = buildCurvePath(lay.roadWidth, lay.row2Top, lay.row2H);
    if (curve.curves.length) {
      const orbGeo = roundedRectShape(0, 0, 9); // using Shape for a circle approximation
      // Actually use a simple mesh — no CircleGeometry available via named imports easily
      // Use ShapeGeometry with a circle path
      const cShape = new Shape();
      cShape.absarc(0, 0, 9, 0, Math.PI * 2, false);
      const cGeo = new ShapeGeometry(cShape, 16);
      const cMat = new MeshBasicMaterial({ color: new Color("#FFC247"), transparent: true, opacity: 1, depthWrite: false });
      orbRef.current = { mesh: new Mesh(cGeo, cMat), curve };
      orbMatRef.current = cMat;

      // Halo sprite
      const halMat = new SpriteMaterial({
        map: glowTexRef.current,
        color: new Color("#FC6E04"),
        transparent: true, opacity: 0.7, depthWrite: false,
        blending: AdditiveBlending,
      });
      const halSprite = new Sprite(halMat);
      halSprite.scale.setScalar(56);
      haloRef.current = halSprite;
    }

    // ── Trail ──
    trailRef.current = [];
    trailMatRef.current = [];
    for (let i = 0; i < TRAIL_LEN; i++) {
      const r = 9 * (1 - i / TRAIL_LEN);
      const s = new Shape();
      s.absarc(0, 0, Math.max(1, r), 0, Math.PI * 2, false);
      const g = new ShapeGeometry(s, 8);
      const m = new SpriteMaterial({
        map: glowTexRef.current,
        color: new Color(i < TRAIL_LEN / 2 ? "#FC6E04" : "#FFC247"),
        transparent: true,
        opacity: (1 - i / TRAIL_LEN) * 0.5,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      const sp = new Sprite(m);
      sp.scale.setScalar(28 * (1 - i / TRAIL_LEN));
      sp.position.set(-9999, -9999, -10);
      trailRef.current.push(sp);
      trailMatRef.current.push(m);
    }

    // ── Particles ──
    const N = 60;
    const pos  = new Float32Array(N * 3);
    const vel  = new Float32Array(N * 2);
    const sizes= new Float32Array(N);
    const cols = new Float32Array(N * 3);
    const PCOLS = ["#FC6E04","#FF8A1F","#FFC247","#0C1322","#E04F00"];
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * lay.olW;
      pos[i*3+1] = (Math.random() - 0.5) * lay.olH;
      pos[i*3+2] = -30;
      vel[i*2]   = (Math.random() - 0.5) * 0.3;
      vel[i*2+1] = 0.2 + Math.random() * 0.5;
      sizes[i]   = 2 + Math.random() * 2;
      const pc   = new Color(PCOLS[i % PCOLS.length]);
      cols[i*3] = pc.r; cols[i*3+1] = pc.g; cols[i*3+2] = pc.b;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("color", new BufferAttribute(cols, 3));
    geo.setAttribute("size", new BufferAttribute(sizes, 1));
    const pMat = new PointsMaterial({
      vertexColors: true,
      size: 3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    particlesRef.current = new Points(geo, pMat);
    particleData.current = { pos, vel, sizes, N };

    // pointer listener on the ol
    const onMove = (e) => {
      const r = olRef.current?.getBoundingClientRect();
      if (!r) return;
      pointerRef.current = {
        x: ((e.clientX - r.left) / r.width)  * 2 - 1,
        y: ((e.clientY - r.top)  / r.height)  * 2 - 1,
      };
    };
    olRef.current?.addEventListener("pointermove", onMove, { passive: true });

    // ResizeObserver — re-measure on resize
    let roTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(roTimer);
      roTimer = setTimeout(() => {
        layoutRef.current = measureLayout(olRef.current);
      }, 120);
    });
    if (olRef.current) ro.observe(olRef.current);

    return () => {
      olRef.current?.removeEventListener("pointermove", onMove);
      ro.disconnect();
      clearTimeout(roTimer);
      // dispose
      twinsRef.current.forEach((m) => { if (m) { m.geometry.dispose(); m.material.dispose(); } });
      trailRef.current.forEach((s) => { s.material.dispose(); });
      glowSpritesRef.current.forEach((s) => { if (s) s.material.dispose(); });
      haloRef.current?.material.dispose();
      orbRef.current?.mesh.material.dispose();
      orbRef.current?.mesh.geometry.dispose();
      particlesRef.current?.geometry.dispose();
      particlesRef.current?.material.dispose();
      glowTexRef.current?.dispose();
      amberTexRef.current?.dispose();
    };
  }, [olRef, domToWorld]);

  /* ── Frame loop ── */
  useFrame(({ clock }, delta) => {
    const t   = clock.getElapsedTime();
    const d   = Math.min(delta, 0.05);
    const lay = layoutRef.current;
    const st  = storeRef.current;
    if (!lay) return;

    /* ── Card idle float + hover ── */
    const hov = st.hover;
    for (let i = 0; i < 5; i++) {
      const c   = lay.cards[i];
      const cs  = cardState.current[i];
      const el  = st.cardEls?.[i];
      if (!c || !el) continue;

      const isHovered = hov === i;

      // idle
      const targetIdleX  = 0;
      const targetIdleY  = Math.sin(t * 0.8 + i * 1.3) * 5;
      const targetIdleRz = Math.sin(t * 0.6 + i) * 0.35;

      cs.idleX  = lerp(cs.idleX,  targetIdleX,  d * 3);
      cs.idleY  = lerp(cs.idleY,  targetIdleY,  d * 3);
      cs.idleRz = lerp(cs.idleRz, targetIdleRz, d * 3);

      // hover
      const targetHY     = isHovered ? -8  : 0;
      const targetHTz    = isHovered ? 36  : 0;
      const targetHS     = isHovered ? 1.03 : (hov !== -1 ? 0.985 : 1);
      const targetHRx    = isHovered ? -st.pointer.y * 8  : 0;
      const targetHRy    = isHovered ?  st.pointer.x * 10 : 0;

      const damp = isHovered ? d * 8 : d * 5;
      cs.hoverY     = lerp(cs.hoverY,     targetHY,  damp);
      cs.hoverTz    = lerp(cs.hoverTz,    targetHTz, damp);
      cs.hoverScale = lerp(cs.hoverScale, targetHS,  damp);
      cs.hoverRx    = lerp(cs.hoverRx,    targetHRx, damp);
      cs.hoverRy    = lerp(cs.hoverRy,    targetHRy, damp);

      // compose and write to DOM
      const finalY     = Math.round((cs.idleY + cs.hoverY) * 2) / 2;
      const finalX     = Math.round(cs.idleX * 2) / 2;
      const finalRz    = cs.idleRz;
      const finalScale = cs.hoverScale;
      const finalRx    = cs.hoverRx;
      const finalRy    = cs.hoverRy;
      const finalTz    = cs.hoverTz;

      if (isHovered) {
        el.style.willChange = "transform";
        el.style.transform =
          `perspective(900px) translate3d(${finalX}px,${finalY}px,${finalTz}px) rotateX(${finalRx}deg) rotateY(${finalRy}deg) scale(${finalScale})`;
      } else {
        el.style.willChange = "";
        el.style.transform =
          `translate(${finalX}px,${finalY}px) rotate(${finalRz}deg) scale(${finalScale})`;
      }

      /* ── Twin plane ── */
      const twin     = twinsRef.current[i];
      const twinMat  = twinMatsRef.current[i];
      const glowSpr  = glowSpritesRef.current[i];
      if (!twin || !twinMat) continue;

      const wp       = domToWorld(c.x, c.y);
      const twinAmpX = (Math.sin(t * 0.8 + i * 1.3 + 0.4) * 5) * 1.6;
      const twinAmpY = (Math.sin(t * 0.7 + i * 1.1 + 0.6) * 5) * 1.6;

      twin.position.x = wp.x + (isHovered ? -st.pointer.x * 14 : twinAmpX);
      twin.position.y = wp.y + (isHovered ? -st.pointer.y * 14 : twinAmpY);
      twin.rotation.z = isHovered
        ? lerp(twin.rotation.z, st.pointer.x * (4 * Math.PI / 180), d * 6)
        : lerp(twin.rotation.z, 0, d * 2);
      twin.scale.setScalar(isHovered ? lerp(twin.scale.x, 1.08, d * 6) : lerp(twin.scale.x, 1, d * 3));

      const targetTwinOp = hov === -1 ? 0.10 : (isHovered ? 0.24 : 0.06);
      twinMat.opacity = lerp(twinMat.opacity, targetTwinOp, d * 6);

      if (glowSpr) {
        glowSpr.position.set(twin.position.x, twin.position.y, -65);
        const targetGlowOp = isHovered ? 0.35 : 0;
        glowSpr.material.opacity = lerp(glowSpr.material.opacity, targetGlowOp, d * 6);
      }
    }

    /* ── Orb + trail ── */
    if (orbRef.current) {
      const { mesh, curve } = orbRef.current;
      smoothP.current = lerp(smoothP.current, st.progress, d * 1.5);
      const p   = clamp(smoothP.current, 0.001, 0.999);
      const pt  = curve.getPointAt(p);
      mesh.position.set(pt.x, pt.y, 5);
      haloRef.current.position.set(pt.x, pt.y, 3);

      const vis = st.progress > 0.01 && st.progress < 0.99;
      const ts  = vis ? 1 : 0;
      mesh.scale.setScalar(lerp(mesh.scale.x, ts, d * 4));
      haloRef.current.scale.setScalar(lerp(haloRef.current.scale.x, ts * 56, d * 4));

      // trail ring buffer
      if (vis && trailRef.current.length) {
        for (let k = TRAIL_LEN - 1; k > 0; k--) {
          const prev = trailRef.current[k - 1];
          const cur  = trailRef.current[k];
          cur.position.copy(prev.position);
        }
        trailRef.current[0].position.copy(mesh.position);
        trailRef.current[0].position.z = 3;
      }
    }

    /* ── Ping rings ── */
    const ai = st.activeIndex;
    if (ai > lastMsRef.current && ai >= 0 && ai < 5 && lay.cards[ai]) {
      lastMsRef.current = ai;
      const c  = lay.cards[ai];
      const wp = domToWorld(c.x, c.y);
      // Find milestone position (approx at the milestone y)
      const msY = lay.row2Top + (MS_Y[ai] ?? 60);
      const msWY = -(msY - lay.olH / 2);
      const msWX = wp.x;

      // spawn ping ring
      const cShape = new Shape();
      cShape.absarc(0, 0, 28, 0, Math.PI * 2, false);
      const cShape2 = new Shape();
      cShape2.absarc(0, 0, 22, 0, Math.PI * 2, false);
      cShape.holes.push(cShape2);
      const rGeo = new ShapeGeometry(cShape, 24);
      const rMat = new MeshBasicMaterial({
        color: new Color("#FC6E04"),
        transparent: true, opacity: 0.8,
        depthWrite: false,
      });
      const rMesh = new Mesh(rGeo, rMat);
      rMesh.position.set(msWX, msWY, 8);
      pingRef.current.push({ mesh: rMesh, t: 0, mat: rMat });
    }

    // animate ping rings
    pingRef.current = pingRef.current.filter((p) => {
      p.t += d;
      const frac = p.t / 0.7;
      p.mesh.scale.setScalar(1 + frac * 1.6);
      p.mat.opacity = (1 - frac) * 0.8;
      if (frac >= 1) {
        p.mesh.geometry.dispose();
        p.mat.dispose();
        return false;
      }
      return true;
    });

    /* ── Particles ── */
    if (particlesRef.current && particleData.current) {
      const { pos, vel, N } = particleData.current;
      const ptr = pointerRef.current;
      for (let i = 0; i < N; i++) {
        pos[i*3]   += vel[i*2]   + Math.sin(t * 0.4 + i) * 0.1;
        pos[i*3+1] += vel[i*2+1];
        // pointer parallax
        pos[i*3]   += ptr.x * 0.02 * (i % 3 + 1);
        pos[i*3+1] += ptr.y * 0.01 * (i % 2 + 1);

        const hw = lay.olW / 2, hh = lay.olH / 2;
        if (pos[i*3+1] >  hh) { pos[i*3+1] = -hh; pos[i*3] = (Math.random() - 0.5) * lay.olW; }
        if (pos[i*3+1] < -hh) pos[i*3+1] =  hh;
        if (pos[i*3]   >  hw) pos[i*3]    = -hw;
        if (pos[i*3]   < -hw) pos[i*3]    =  hw;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  /* ── Render scene graph declaratively ── */
  return (
    <>
      {/* Twin planes */}
      {twinsRef.current.map((mesh, i) => mesh ? <primitive key={`twin${i}`} object={mesh} /> : null)}
      {/* Glow sprites */}
      {glowSpritesRef.current.map((sp, i) => sp ? <primitive key={`glow${i}`} object={sp} /> : null)}
      {/* Orb */}
      {orbRef.current && <primitive object={orbRef.current.mesh} />}
      {haloRef.current && <primitive object={haloRef.current} />}
      {/* Trail */}
      {trailRef.current.map((sp, i) => <primitive key={`trail${i}`} object={sp} />)}
      {/* Ping rings */}
      {pingRef.current.map((p, i) => <primitive key={`ping${i}`} object={p.mesh} />)}
      {/* Particles */}
      {particlesRef.current && <primitive object={particlesRef.current} />}
    </>
  );
}

/* ─── Error boundary ─────────────────────────────────────────────── */
class ErrBound extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

/* ─── ProcessRoadmap3D (the exported root) ───────────────────────── */
export default function ProcessRoadmap3D({ storeRef, olRef }) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    if (olRef.current) io.observe(olRef.current);

    const onHidden = () => setInView(!document.hidden);
    document.addEventListener("visibilitychange", onHidden);

    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onHidden); };
  }, [olRef]);

  return (
    <ErrBound>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={inView ? "always" : "never"}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <Scene storeRef={storeRef} olRef={olRef} />
      </Canvas>
    </ErrBound>
  );
}
