"use client";

/**
 * ProcessRoadmap — "How We Work"
 *
 * Image 2 reference layout:
 *   - One continuous SVG wave road across full width
 *   - 5 numbered markers sitting ON the wave at alternating high/low points
 *   - Cards alternating above (odd steps) / below (even steps) the road
 *   - Dotted vertical connectors between each card and its marker
 *   - START pill at left end, GO LIVE at right end
 *
 * Desktop (≥768px): full wave layout
 * Mobile (<768px):  vertical timeline on the left
 *
 * Geometry:
 *   viewBox 0 0 1000 160  (wave row height = 160px)
 *   Marker positions (in SVG coords, x% = left position):
 *     Step 0 (Discuss):  x=100, y=30  → left 10%, high
 *     Step 1 (Design):   x=300, y=130 → left 30%, low
 *     Step 2 (Develop):  x=500, y=30  → left 50%, high
 *     Step 3 (Deliver):  x=700, y=130 → left 70%, low
 *     Step 4 (Support):  x=900, y=30  → left 90%, high
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  MessageCircle, PenTool, Code2, Rocket, Headphones,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   SHARED GEOMETRY — single source of truth for SVG + marker/card positions
   viewBox: 0 0 1000 160
────────────────────────────────────────────────────────────────── */
const VB_W = 1000;   // SVG viewBox width
const VB_H = 160;    // SVG viewBox height (wave area)

// Marker positions in SVG coordinate space
// x: 0–1000 (maps to left %), y: 0–160 (maps to top px inside wave row)
const MARKERS = [
  { x: 100, y: 30  },  // Step 01 — high
  { x: 300, y: 130 },  // Step 02 — low
  { x: 500, y: 30  },  // Step 03 — high
  { x: 700, y: 130 },  // Step 04 — low
  { x: 900, y: 30  },  // Step 05 — high
];

// Smooth wave path through all 5 marker points
const WAVE_D = `
  M -20 80
  C 20 80, 60 30, 100 30
  C 140 30, 180 130, 300 130
  C 380 130, 420 30, 500 30
  C 580 30, 620 130, 700 130
  C 780 130, 840 30, 900 30
  C 940 30, 980 80, 1020 80
`;

// Icons per step index
const STEP_ICONS = [MessageCircle, PenTool, Code2, Rocket, Headphones];

/* ──────────────────────────────────────────────────────────────────
   SCROLL PROGRESS
────────────────────────────────────────────────────────────────── */
function useRoadProgress(ref, reduced) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const [activeIndex, setActiveIndex] = useState(reduced ? 4 : -1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(-1, Math.min(4,
      [0,1,2,3,4].filter((i) => v >= i / 5 + 0.04).length - 1
    ));
    setActiveIndex((p) => (p !== next ? next : p));
  });

  return { scrollYProgress, activeIndex };
}

/* ──────────────────────────────────────────────────────────────────
   STEP CARD
────────────────────────────────────────────────────────────────── */
function StepCard({ step, index, isTop, reduced, storeRef }) {
  const Icon = STEP_ICONS[index];
  const n    = String(index + 1).padStart(2, "0");
  const innerRef = useRef(null);

  useEffect(() => {
    if (storeRef?.current && innerRef.current) {
      if (!storeRef.current.cardEls) storeRef.current.cardEls = [];
      storeRef.current.cardEls[index] = innerRef.current;
    }
    return () => { if (storeRef?.current?.cardEls) storeRef.current.cardEls[index] = null; };
  }, [storeRef, index]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: isTop ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={innerRef}
        data-roadmap-card={index}
        className="prm-card bg-white rounded-2xl p-5 min-w-0"
        style={{
          border: "1px solid #EAE5DF",
          boxShadow: "0 4px 24px rgba(12,19,34,0.07)",
        }}
        onPointerEnter={() => { if (storeRef?.current) storeRef.current.hover = index; }}
        onPointerMove={(e) => {
          if (!storeRef?.current || storeRef.current.hover !== index) return;
          const r = e.currentTarget.getBoundingClientRect();
          storeRef.current.pointer = {
            x: ((e.clientX - r.left) / r.width)  * 2 - 1,
            y: ((e.clientY - r.top)  / r.height) * 2 - 1,
          };
        }}
        onPointerLeave={() => {
          if (storeRef?.current) { storeRef.current.hover = -1; storeRef.current.pointer = { x: 0, y: 0 }; }
        }}
      >
        {/* Icon + pill row */}
        <div className="flex flex-nowrap items-center gap-2 mb-3">
          <span
            className="prm-icon-box grid place-items-center rounded-xl shrink-0 transition-all duration-300"
            style={{ width: 36, height: 36, background: "#FFF0E4", color: "#C2410C" }}
          >
            <Icon size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <span
            className="whitespace-nowrap shrink-0 text-[10px] font-extrabold tracking-[0.12em] rounded-full px-2.5 py-1 uppercase"
            style={{ background: "#FFF0E4", border: "1px solid rgba(252,110,4,0.25)", color: "#C2410C" }}
          >
            STEP {n}
          </span>
        </div>

        <h3 className="font-extrabold leading-tight tracking-tight mb-1.5 break-words"
          style={{ fontSize: 20, color: "#0C1322" }}>
          {step.t}
        </h3>
        <p className="text-sm leading-relaxed break-words" style={{ color: "#6B6B70" }}>
          {step.d}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   DESKTOP WAVE SECTION
   Uses position:relative container + SVG road + absolute markers
────────────────────────────────────────────────────────────────── */
function DesktopRoadmap({ steps, scrollYProgress, activeIndex, reduced, storeRef }) {
  // The wave row height in CSS pixels (must match waveRowHeight below)
  const WAVE_H = 160;
  // Card zone heights
  const CARD_ZONE = 200;  // px reserved above and below the wave

  const clipPath = useTransform(
    scrollYProgress, [0, 1],
    [`inset(0 100% 0 0)`, `inset(0 0% 0 0)`]
  );

  return (
    <div
      className="hidden md:block relative w-full select-none"
      style={{ height: CARD_ZONE + WAVE_H + CARD_ZONE }}
    >
      {/* ── Subtle orange radial bg decoration ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(252,110,4,0.04) 0%, transparent 70%)" }} />

      {/* ── SVG wave road ── */}
      <div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: CARD_ZONE, height: WAVE_H }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: WAVE_H, display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="prm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#FF8A1F" />
              <stop offset="55%"  stopColor="#FC6E04" />
              <stop offset="100%" stopColor="#E04F00" />
            </linearGradient>
          </defs>
          {/* Thick light track */}
          <path
            d={WAVE_D} fill="none"
            stroke="#EAE5DF" strokeWidth="44"
            strokeLinecap="round" strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Subtle shadow under track */}
          <path
            d={WAVE_D} fill="none"
            stroke="rgba(12,19,34,0.06)" strokeWidth="44"
            strokeLinecap="round" strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Ghost dotted center line */}
          <path
            d={WAVE_D} fill="none"
            stroke="#FC6E04" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 10"
            opacity="0.30"
            vectorEffect="non-scaling-stroke"
          />
          {/* Scroll-progress dotted line */}
          <motion.path
            d={WAVE_D} fill="none"
            stroke="#FC6E04" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 10"
            style={{ clipPath: reduced ? undefined : clipPath }}
            opacity="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ── Markers + cards + connectors ── */}
      {MARKERS.map((m, i) => {
        const isTop    = m.y < VB_H / 2;   // high points → card above road
        const isActive = activeIndex >= i;
        const isPulse  = activeIndex === i;

        // Marker center in CSS space:
        // left = m.x / VB_W * 100%
        // top  = CARD_ZONE + (m.y / VB_H * WAVE_H)
        const markerLeft  = `${(m.x / VB_W) * 100}%`;
        const markerTop   = CARD_ZONE + (m.y / VB_H) * WAVE_H;

        // Card: centered on same left, positioned above or below marker
        const CONNECTOR_H = 44;   // connector line height in px
        // marker radius = 27px (54/2), so card edge starts at ± (27 + CONNECTOR_H)
        const CARD_BOTTOM_ABOVE = markerTop - 27 - CONNECTOR_H;  // bottom of card zone above
        const CARD_TOP_BELOW    = markerTop + 27 + CONNECTOR_H;  // top of card zone below

        return (
          <div key={steps[i]?.t ?? i}>
            {/* Marker — positioned on the road */}
            <motion.div
              data-roadmap-milestone={i}
              aria-hidden="true"
              className="absolute z-20 flex items-center justify-center"
              style={{
                left: markerLeft,
                top:  markerTop,
                transform: "translate(-50%, -50%)",
                width: 54, height: 54,
              }}
              initial={reduced ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.55 }}
              animate={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.55 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Pulse ring */}
              {isPulse && !reduced && (
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(252,110,4,0.25)", animationDuration: "1.8s" }}
                />
              )}
              {/* Glow */}
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(252,110,4,0.15)", transform: "scale(1.4)", filter: "blur(6px)" }}
              />
              {/* Circle */}
              <div
                className="relative flex items-center justify-center rounded-full font-extrabold text-sm z-10 transition-all duration-500"
                style={{
                  width: 54, height: 54,
                  background: "linear-gradient(135deg,#FF8A1F,#FC6E04 55%,#E04F00)",
                  border: "4px solid #fff",
                  boxShadow: "0 8px 24px rgba(252,110,4,0.40)",
                  color: "#0C1322",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>

            {/* Connector line */}
            <motion.div
              data-roadmap-connector={i}
              aria-hidden="true"
              className="absolute z-10 pointer-events-none"
              style={{
                left:             markerLeft,
                transform:        "translateX(-50%)",
                top:              isTop ? CARD_BOTTOM_ABOVE : markerTop + 27,
                height:           CONNECTOR_H,
                width:            2,
                background:       "repeating-linear-gradient(to bottom, #FC6E04 0px, #FC6E04 4px, transparent 4px, transparent 10px)",
                opacity:          0.65,
                transformOrigin:  isTop ? "bottom" : "top",
              }}
              initial={reduced ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
            />

            {/* Card — for upper cards: bottom-anchored via top = CARD_BOTTOM_ABOVE - cardH */}
            {/* We use a flex column + self-end trick: absolute, bottom = container height - CARD_BOTTOM_ABOVE */}
            <div
              className="absolute z-10"
              style={{
                left:      markerLeft,
                transform: "translateX(-50%)",
                ...(isTop
                  ? { bottom: CARD_ZONE + WAVE_H + CARD_ZONE - CARD_BOTTOM_ABOVE }
                  : { top: CARD_TOP_BELOW }),
                width:     220,
              }}
            >
              <StepCard
                step={steps[i]}
                index={i}
                isTop={isTop}
                reduced={reduced}
                storeRef={storeRef}
              />
            </div>
          </div>
        );
      })}

      {/* ── START pill ── */}
      <div
        aria-hidden="true"
        className="absolute z-20 pointer-events-none"
        style={{ left: 8, top: CARD_ZONE + (80 / VB_H) * WAVE_H + 36 }}
      >
        <span
          className="text-[11px] font-extrabold tracking-[0.12em] uppercase rounded-full px-4 py-2 select-none whitespace-nowrap"
          style={{ background: "#0C1322", color: "#fff" }}
        >
          START
        </span>
      </div>

      {/* ── GO LIVE pill ── */}
      <div
        aria-hidden="true"
        className="absolute z-20 pointer-events-none"
        style={{ right: 8, top: CARD_ZONE + (80 / VB_H) * WAVE_H + 36 }}
      >
        <span
          className="text-[11px] font-extrabold tracking-[0.12em] uppercase rounded-full px-4 py-2 select-none whitespace-nowrap"
          style={{ background: "#FFC247", color: "#0C1322" }}
        >
          GO LIVE ✳
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MOBILE VERTICAL TIMELINE
────────────────────────────────────────────────────────────────── */
function MobileRoadmap({ steps, scrollYProgress, activeIndex, reduced, storeRef }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="md:hidden relative pl-14 pr-2 flex flex-col gap-6">
      {/* Vertical road line */}
      <div
        aria-hidden
        className="absolute left-[22px] top-2 bottom-2 w-[3px]"
        style={{
          background: "repeating-linear-gradient(to bottom, #EAE5DF 0px, #EAE5DF 4px, transparent 4px, transparent 10px)",
        }}
      />
      {/* Progress overlay */}
      <motion.div
        aria-hidden
        className="absolute left-[22px] top-2 w-[3px] pointer-events-none"
        style={{
          bottom: "0.5rem",
          scaleY: reduced ? 1 : scaleY,
          transformOrigin: "top",
          background: "repeating-linear-gradient(to bottom, #FC6E04 0px, #FC6E04 4px, transparent 4px, transparent 10px)",
        }}
      />

      {/* START label */}
      <div className="flex items-center gap-3 mb-1">
        <span
          className="text-[10px] font-extrabold tracking-[0.12em] uppercase rounded-full px-3 py-1.5 whitespace-nowrap"
          style={{ background: "#0C1322", color: "#fff" }}
        >
          START
        </span>
      </div>

      {steps.map((step, i) => {
        const isActive = activeIndex >= i;
        const isPulse  = activeIndex === i;

        return (
          <motion.div
            key={step.t}
            className="relative flex items-start gap-4"
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Milestone */}
            <div
              aria-hidden
              className="absolute -left-[41px] top-4 flex items-center justify-center"
              style={{ width: 36, height: 36 }}
            >
              {isPulse && !reduced && (
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(252,110,4,0.25)", animationDuration: "1.8s" }} />
              )}
              <div
                className="relative flex items-center justify-center rounded-full font-extrabold text-[11px] z-10 transition-all duration-500"
                style={{
                  width: 36, height: 36,
                  background: "linear-gradient(135deg,#FF8A1F,#FC6E04 55%,#E04F00)",
                  border: "3px solid #fff",
                  boxShadow: "0 4px 14px rgba(252,110,4,0.35)",
                  color: "#0C1322",
                  opacity: isActive ? 1 : 0.55,
                  transform: `scale(${isActive ? 1 : 0.85})`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Card */}
            <StepCard step={step} index={i} isTop={true} reduced={reduced} storeRef={storeRef} />
          </motion.div>
        );
      })}

      {/* GO LIVE label */}
      <div className="flex items-center gap-3 mt-1">
        <span
          className="text-[10px] font-extrabold tracking-[0.12em] uppercase rounded-full px-3 py-1.5 whitespace-nowrap"
          style={{ background: "#FFC247", color: "#0C1322" }}
        >
          GO LIVE ✳
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────────────── */
export default function ProcessRoadmap({ items = [] }) {
  const reduced  = useReducedMotion();
  const ref      = useRef(null);
  const storeRef = useRef({ progress: 0, activeIndex: -1, hover: -1, pointer: { x: 0, y: 0 } });
  const [Scene3D, setScene3D]       = useState(null);
  const [is3DActive, setIs3DActive] = useState(false);

  const { scrollYProgress, activeIndex } = useRoadProgress(ref, reduced);

  /* Sync store */
  useEffect(() => {
    const u = scrollYProgress.on("change", (v) => { storeRef.current.progress = v; });
    return u;
  }, [scrollYProgress]);
  useEffect(() => { storeRef.current.activeIndex = activeIndex; }, [activeIndex]);

  /* 3D eligibility */
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const unmount3D = () => { setScene3D(null); setIs3DActive(false); };
    const check = () => {
      const mq = window.matchMedia("(min-width:1024px) and (hover:hover) and (pointer:fine)");
      if (!mq.matches) { unmount3D(); return; }
      if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) { unmount3D(); return; }
      if (navigator.connection?.saveData)             { unmount3D(); return; }
      if ((navigator.hardwareConcurrency ?? 8) <= 4) { unmount3D(); return; }
      if ((navigator.deviceMemory        ?? 8) <= 4) { unmount3D(); return; }
      try {
        const cv = document.createElement("canvas");
        if (!cv.getContext("webgl2") && !cv.getContext("webgl")) { unmount3D(); return; }
      } catch { unmount3D(); return; }
      const io = new IntersectionObserver(([e]) => {
        if (cancelled || !e.isIntersecting) return;
        io.disconnect();
        import("@/components/ProcessRoadmap3D")
          .then((mod) => { if (!cancelled) { setScene3D(() => mod.default); setIs3DActive(true); } })
          .catch(() => {});
      }, { rootMargin: "300px" });
      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    };
    const cleanup = check();
    const mql = window.matchMedia("(min-width:1024px) and (hover:hover) and (pointer:fine)");
    mql.addEventListener?.("change", check);
    return () => { cancelled = true; cleanup?.(); mql.removeEventListener?.("change", check); };
  }, [reduced]);

  const steps = items.slice(0, 5);

  return (
    <div ref={ref} className="relative w-full overflow-visible" data-roadmap>
      {/* Hover + transition styles */}
      <style>{`
        .prm-card {
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
        }
        @media (hover: hover) {
          .prm-card:hover {
            transform: translateY(-5px);
            border-color: rgba(252,110,4,0.35) !important;
            box-shadow: 0 18px 40px rgba(12,19,34,0.10) !important;
          }
          .prm-card:hover .prm-icon-box {
            background: linear-gradient(110deg,#FF8A1F,#FC6E04 55%,#E04F00) !important;
            color: #0C1322 !important;
          }
          .prm-card:active { transform: scale(0.98); }
        }
      `}</style>

      <DesktopRoadmap
        steps={steps}
        scrollYProgress={scrollYProgress}
        activeIndex={activeIndex}
        reduced={reduced}
        storeRef={storeRef}
      />

      <MobileRoadmap
        steps={steps}
        scrollYProgress={scrollYProgress}
        activeIndex={activeIndex}
        reduced={reduced}
        storeRef={storeRef}
      />

      {/* Three.js overlay */}
      {Scene3D && (
        <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block" aria-hidden="true">
          <Scene3D storeRef={storeRef} olRef={ref} />
        </div>
      )}
    </div>
  );
}
