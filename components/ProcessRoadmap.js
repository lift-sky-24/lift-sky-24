"use client";
/**
 * ProcessRoadmap
 * Snake-path layout: cards alternate row 1 (above path) / row 2 (below path).
 * SVG dashed road connects each card's centre dot left→right.
 * TiltCard on every card for 3D hover effect.
 * No step numbers — titles and descriptions only.
 */
import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform,
         useReducedMotion, useInView } from "framer-motion";

/* ─── Inline TiltCard (avoids dynamic import) ─────────────────────── */
function TiltCard({ children, className = "", style = {} }) {
  const ref    = useRef(null);
  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const spring = { type: "spring", stiffness: 300, damping: 30, mass: 0.5 };

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), spring);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), spring);
  const glareX  = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY  = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);
  const scale   = useSpring(1, { stiffness: 200, damping: 25 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: "900px",
        rotateX, rotateY, scale,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={onMove}
      onMouseEnter={() => scale.set(1.04)}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); scale.set(1); }}
    >
      {/* Glare overlay */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 2,
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Dot connector on the road path ──────────────────────────────── */
function RoadDot({ color = "#FC6E04" }) {
  return (
    <div style={{
      width: 14, height: 14, borderRadius: "50%",
      background: color,
      border: "3px solid #fff",
      boxShadow: `0 0 0 2px ${color}`,
      flexShrink: 0,
      zIndex: 2,
      position: "relative",
    }} />
  );
}

/* ─── Single step card ─────────────────────────────────────────────── */
const CARD_COLORS = [
  { accent: "#FC6E04", bg: "rgba(252,110,4,0.06)",  border: "rgba(252,110,4,0.20)" },
  { accent: "#6557ff", bg: "rgba(101,87,255,0.06)", border: "rgba(101,87,255,0.20)" },
  { accent: "#FC6E04", bg: "rgba(252,110,4,0.06)",  border: "rgba(252,110,4,0.20)" },
  { accent: "#6557ff", bg: "rgba(101,87,255,0.06)", border: "rgba(101,87,255,0.20)" },
  { accent: "#FC6E04", bg: "rgba(252,110,4,0.06)",  border: "rgba(252,110,4,0.20)" },
];

function StepCard({ step, index, reduced }) {
  const c = CARD_COLORS[index % CARD_COLORS.length];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        className="process-road-card"
        style={{
          background: "#fff",
          border: `1.5px solid ${c.border}`,
          borderRadius: 20,
          padding: "24px 22px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          minHeight: 140,
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${c.accent}, transparent)`,
          borderRadius: "20px 20px 0 0",
        }} />

        {/* Step label pill */}
        <span style={{
          display: "inline-block",
          fontSize: 9, fontWeight: 900, letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: c.accent,
          background: c.bg,
          border: `1px solid ${c.border}`,
          padding: "3px 10px",
          borderRadius: 99,
          marginBottom: 12,
        }}>
          Step {String(index + 1).padStart(2, "0")}
        </span>

        <h3 style={{
          margin: 0,
          fontSize: 15, fontWeight: 800,
          color: "#10111a", lineHeight: 1.2,
          marginBottom: 8,
        }}>
          {step.t}
        </h3>
        <p style={{
          margin: 0,
          fontSize: 13, lineHeight: 1.65,
          color: "#64748b",
        }}>
          {step.d}
        </p>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Animated SVG road path ───────────────────────────────────────── */
function RoadPath({ reduced }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [len,  setLen]  = useState(0);

  useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength?.() ?? 0);
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "80px", overflow: "visible", display: "block" }}
    >
      {/* Road shadow / fill */}
      <path
        d="M 0 40 Q 125 40 200 40 Q 300 40 500 40 Q 700 40 800 40 Q 875 40 1000 40"
        fill="none"
        stroke="rgba(16,17,26,0.06)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* Dashed centre line */}
      <path
        d="M 0 40 Q 125 40 200 40 Q 300 40 500 40 Q 700 40 800 40 Q 875 40 1000 40"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinecap="round"
      />
      {/* Animated orange fill */}
      {len > 0 && !reduced && (
        <motion.path
          d="M 0 40 Q 125 40 200 40 Q 300 40 500 40 Q 700 40 800 40 Q 875 40 1000 40"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={len}
          initial={{ strokeDashoffset: len }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
        />
      )}
      <defs>
        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#FF8A1F" />
          <stop offset="50%"  stopColor="#FC6E04" />
          <stop offset="100%" stopColor="#6557ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Main export ──────────────────────────────────────────────────── */
export default function ProcessRoadmap({ items = [] }) {
  const reduced = useReducedMotion();

  // Split items: odd-indexed cards go top row, even go bottom (snake feel)
  // Layout: 5 cards in a row on desktop, with road path between them
  // On mobile: single column, road path hidden

  return (
    <div className="process-roadmap-wrap">
      {/* ── Desktop: road layout ─────────────────────────────────────── */}
      <div className="process-road-desktop">
        {/* Cards row — all in one line */}
        <div className="process-road-cards">
          {items.map((step, i) => (
            <div key={step.t} className="process-road-slot">
              {/* Connector dot at bottom of card column */}
              <div className="process-road-card-wrap">
                <StepCard step={step} index={i} reduced={reduced} />
              </div>
              {/* Dot on the road */}
              <div className="process-road-dot-row">
                <RoadDot color={i % 2 === 0 ? "#FC6E04" : "#6557ff"} />
              </div>
            </div>
          ))}
        </div>

        {/* SVG road running below the dots */}
        <div className="process-road-line">
          <RoadPath reduced={reduced} />
        </div>
      </div>

      {/* ── Mobile: simple vertical stack ────────────────────────────── */}
      <div className="process-road-mobile">
        {items.map((step, i) => (
          <div key={step.t} className="process-road-mobile-item">
            {/* Vertical connector (not last) */}
            {i < items.length - 1 && (
              <div className="process-road-vline" aria-hidden="true">
                <div className="process-road-vline-dot" style={{ background: i % 2 === 0 ? "#FC6E04" : "#6557ff" }} />
                <div className="process-road-vline-track" />
                <div className="process-road-vline-dot" style={{ background: (i + 1) % 2 === 0 ? "#FC6E04" : "#6557ff" }} />
              </div>
            )}
            <StepCard step={step} index={i} reduced={reduced} />
          </div>
        ))}
      </div>
    </div>
  );
}
