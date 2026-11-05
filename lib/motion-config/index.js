/**
 * LiftSky24 — Central Motion Config
 * All animation values live here. Change "intensity" to tone up/down globally.
 * intensity: "subtle" | "medium" | "extreme"
 */

export const MOTION = {
  intensity: "extreme", // change this to dial everything up/down

  // ── Durations (seconds) ────────────────────────────────────────────
  dur: {
    xs:   0.2,
    sm:   0.35,
    md:   0.55,
    lg:   0.75,
    xl:   1.0,
    xxl:  1.4,
  },

  // ── GSAP Easings ───────────────────────────────────────────────────
  ease: {
    out:        "power2.out",
    inOut:      "power2.inOut",
    elastic:    "elastic.out(1, 0.5)",
    back:       "back.out(1.7)",
    expo:       "expo.out",
    soft:       "power1.inOut",
    circ:       "circ.out",
  },

  // ── Framer Motion Spring Presets ──────────────────────────────────
  spring: {
    gentle:   { type: "spring", stiffness: 120, damping: 20, mass: 1 },
    snappy:   { type: "spring", stiffness: 260, damping: 22, mass: 0.8 },
    bouncy:   { type: "spring", stiffness: 400, damping: 25, mass: 0.9 },
    elastic:  { type: "spring", stiffness: 180, damping: 12, mass: 1.1 },
    tilt:     { type: "spring", stiffness: 300, damping: 30, mass: 0.5 },
  },

  // ── Framer Motion Tween Presets ───────────────────────────────────
  tween: {
    fast:   { type: "tween", duration: 0.2, ease: "easeOut" },
    mid:    { type: "tween", duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    slow:   { type: "tween", duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    expo:   { type: "tween", duration: 0.6,  ease: [0.19, 1, 0.22, 1] },
  },

  // ── Stagger values (seconds) ──────────────────────────────────────
  stagger: {
    tight:  0.04,
    normal: 0.07,
    loose:  0.12,
    wide:   0.18,
  },

  // ── Scroll reveal defaults ────────────────────────────────────────
  reveal: {
    y:       40,       // px translateY start
    opacity: 0,
    scale:   0.96,
    rotate:  1.5,      // deg
    duration: 0.65,
    ease:    [0.16, 1, 0.3, 1],
  },

  // ── Tilt card ─────────────────────────────────────────────────────
  tilt: {
    maxDeg:      10,   // max tilt degrees
    perspective: 900,  // px
    glareOpacity: 0.12,
    scale:        1.025,
  },

  // ── Magnetic button ───────────────────────────────────────────────
  magnetic: {
    strength:   0.35,  // 0–1 pull intensity
    radius:     80,    // px — activation radius
    returnEase: "elastic.out(1, 0.4)",
    returnDur:  0.7,
  },

  // ── Custom cursor ─────────────────────────────────────────────────
  cursor: {
    dotSize:     8,    // px
    ringSize:    36,   // px
    ringLag:     0.12, // lerp speed (lower = more lag)
    expandScale: 2.2,  // ring scale on hover
    glowSize:    60,   // px on button hover
  },

  // ── Lenis smooth scroll ───────────────────────────────────────────
  lenis: {
    lerp:       0.08,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  },

  // ── Parallax depths ───────────────────────────────────────────────
  parallax: {
    hero:   0.25,   // fraction of scroll to move
    medium: 0.12,
    slow:   0.06,
  },

  // ── AOS global init ───────────────────────────────────────────────
  aos: {
    duration:  650,
    once:      true,
    offset:    80,
    easing:    "ease-out-cubic",
  },

  // ── Gradient orb colors (from theme) ─────────────────────────────
  // These match the design tokens — do not change
  orb: {
    purple: "#6557ff",
    pink:   "#ff4fa3",
    orange: "#ff6338",
    cyan:   "#35d9ff",
  },

  // ── Text reveal (GSAP split) ─────────────────────────────────────
  textReveal: {
    y:       "105%",
    duration: 0.75,
    stagger:  0.045,
    ease:    "power3.out",
  },

  // ── Scroll progress bar ──────────────────────────────────────────
  progressBar: {
    height: 3,         // px
    gradient: "linear-gradient(90deg,#6557ff,#ff4fa3,#ff6338)",
    zIndex: 200,
  },
};

/** Helper — returns reduced values when prefers-reduced-motion */
export function getMotion(reducedMotion = false) {
  if (!reducedMotion) return MOTION;
  return {
    ...MOTION,
    dur:     { xs:0, sm:0, md:0, lg:0, xl:0, xxl:0 },
    stagger: { tight:0, normal:0, loose:0, wide:0 },
    reveal:  { ...MOTION.reveal, y:0, opacity:1, scale:1, rotate:0, duration:0 },
    tilt:    { ...MOTION.tilt, maxDeg:0, glareOpacity:0, scale:1 },
    magnetic:{ ...MOTION.magnetic, strength:0 },
    lenis:   { ...MOTION.lenis, lerp:1 },
    parallax:{ hero:0, medium:0, slow:0 },
    textReveal: { ...MOTION.textReveal, y:0, duration:0, stagger:0 },
  };
}
