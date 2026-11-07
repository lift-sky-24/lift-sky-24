"use client";

/**
 * ProcessRoadmap — "How We Work" winding road.
 *
 * Three layouts from one DOM:
 *   xl (≥1280px)  : wave grid — cards above/below a smooth SVG wave
 *   sm–xl (640-1279px) : zigzag vertical road
 *   <640px        : single-side vertical road
 *
 * Three.js layer (ProcessRoadmap3D) loaded lazily, desktop-only, progressive.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  MessageCircle,
  PenTool,
  Code2,
  Rocket,
  Headphones,
} from "lucide-react";

/* ─── Per-step icon map (by 0-based index) ───────────────────────── */
const STEP_ICONS = [MessageCircle, PenTool, Code2, Rocket, Headphones];

/* ─── Shared mutable store — ProcessRoadmap3D reads this ref ──────── */
// Passed as a prop so the 3D layer never needs React state
function makeStore() {
  return { progress: 0, activeIndex: -1, hover: -1, pointer: { x: 0, y: 0 } };
}

/* ─── 3D layer — loaded lazily, desktop only ─────────────────────── */
// Null component used while checking eligibility or if ineligible
const Null3D = () => null;

/* ─── Wave path shared between SVG and 3D curve ─────────────────── */
const WAVE_D =
  "M0 100 C60 100,50 60,100 60 S250 140,300 140 S450 60,500 60 S650 140,700 140 S850 60,900 60 S940 100,1000 100";

/* Milestone placements in the 200px-tall wave row */
// [colIndex, yOffset from top of row-2]  yOffset = milestone centerY - milestoneR
const MS_Y  = [60, 140, 60, 140, 60];   // high / low / high / low / high
const MS_MT = [33, 113, 33, 113, 33];   // margin-top inside 200px row

/* ─── Milestone component ────────────────────────────────────────── */
function Milestone({ index, active, pulse, reduced }) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center"
      style={{ width: 54, height: 54 }}
    >
      {/* Pulse ring — only on most-recently-reached milestone */}
      {pulse && !reduced && (
        <span
          className="absolute inset-0 rounded-full animate-ping motion-reduce:hidden"
          style={{ background: "rgba(252,110,4,0.30)", animationDuration: "1.6s" }}
        />
      )}
      <div
        className="relative z-10 flex items-center justify-center rounded-full font-extrabold text-sm transition-all duration-500"
        style={{
          width: 54,
          height: 54,
          background: "linear-gradient(110deg,#FF8A1F,#FC6E04 55%,#E04F00)",
          border: "5px solid #fff",
          boxShadow: "0 10px 24px rgba(252,110,4,.35)",
          color: "#0C1322",
          opacity: active ? 1 : 0.55,
          transform: `scale(${active ? 1 : 0.85})`,
        }}
      >
        {n}
      </div>
    </div>
  );
}

/* Tablet/mobile 44px variant */
function MilestoneSmall({ index, active, pulse, reduced, size = 44 }) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center shrink-0 z-10"
      style={{ width: size, height: size }}
    >
      {pulse && !reduced && (
        <span
          className="absolute inset-0 rounded-full animate-ping motion-reduce:hidden"
          style={{ background: "rgba(252,110,4,0.30)", animationDuration: "1.6s" }}
        />
      )}
      <div
        className="relative flex items-center justify-center rounded-full font-extrabold text-xs transition-all duration-500"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(110deg,#FF8A1F,#FC6E04 55%,#E04F00)",
          border: "4px solid #fff",
          boxShadow: "0 8px 18px rgba(252,110,4,.30)",
          color: "#0C1322",
          opacity: active ? 1 : 0.55,
          transform: `scale(${active ? 1 : 0.85})`,
        }}
      >
        {n}
      </div>
    </div>
  );
}

/* ─── Step card ──────────────────────────────────────────────────── */
function StepCard({ step, index, reduced, storeRef, is3DActive }) {
  const Icon = STEP_ICONS[index];
  const innerRef = useRef(null);

  /* Expose inner element to the 3D layer via the store */
  useEffect(() => {
    if (storeRef?.current && innerRef.current) {
      if (!storeRef.current.cardEls) storeRef.current.cardEls = [];
      storeRef.current.cardEls[index] = innerRef.current;
    }
    return () => {
      if (storeRef?.current?.cardEls) storeRef.current.cardEls[index] = null;
    };
  }, [storeRef, index]);

  const n = String(index + 1).padStart(2, "0");

  return (
    /* OUTER: Framer Motion entrance only */
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* INNER: the visible card — 3D layer writes inline transform here */}
      <div
        ref={innerRef}
        data-step-card={index}
        className="prm-card bg-white rounded-[22px] p-5 relative overflow-hidden"
        style={{
          border: "1px solid var(--color-border)",
          boxShadow: "0 10px 30px -12px rgba(252,110,4,0.18)",
        }}
        /* pointer handlers write only to the store, never setState */
        onPointerEnter={() => {
          if (storeRef?.current) storeRef.current.hover = index;
        }}
        onPointerMove={(e) => {
          if (!storeRef?.current || storeRef.current.hover !== index) return;
          const r = e.currentTarget.getBoundingClientRect();
          storeRef.current.pointer = {
            x: ((e.clientX - r.left) / r.width) * 2 - 1,
            y: ((e.clientY - r.top)  / r.height) * 2 - 1,
          };
        }}
        onPointerLeave={() => {
          if (storeRef?.current) { storeRef.current.hover = -1; storeRef.current.pointer = { x: 0, y: 0 }; }
        }}
      >
        {/* Top row: icon + pill */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="prm-icon-box grid place-items-center rounded-xl shrink-0 transition-all duration-300"
            style={{ width: 40, height: 40, background: "#FFF0E4", color: "#C2410C" }}
          >
            <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
          </span>
          <span
            className="text-[11px] font-extrabold tracking-[0.1em] rounded-full px-2.5 py-1 uppercase"
            style={{
              background: "#FFF0E4",
              border: "1px solid rgba(252,110,4,0.25)",
              color: "#C2410C",
            }}
          >
            STEP {n}
          </span>
        </div>

        <h3
          className="font-extrabold leading-tight tracking-tight mb-2"
          style={{ fontSize: 22, color: "#0C1322" }}
        >
          {step.t}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {step.d}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Label pills ────────────────────────────────────────────────── */
function StartPill() {
  return (
    <span
      aria-hidden="true"
      className="text-xs font-extrabold tracking-[0.1em] uppercase rounded-full px-4 py-2 select-none"
      style={{ background: "#0C1322", color: "#fff" }}
    >
      START
    </span>
  );
}
function GoLivePill() {
  return (
    <span
      aria-hidden="true"
      className="text-xs font-extrabold tracking-[0.1em] uppercase rounded-full px-4 py-2 select-none"
      style={{ background: "#FFC247", color: "#0C1322" }}
    >
      GO LIVE ✳
    </span>
  );
}

/* ─── Scroll progress hook ───────────────────────────────────────── */
function useRoadProgress(olRef, reduced) {
  const { scrollYProgress } = useScroll({
    target: olRef,
    offset: ["start 75%", "end 45%"],
  });
  const [activeIndex, setActiveIndex] = useState(reduced ? 4 : -1);
  const progressRef = useRef(reduced ? 1 : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    // 5 thresholds: 0/5+0.05, 1/5+0.05 ...
    const next = [0, 1, 2, 3, 4].filter((i) => v >= i / 5 + 0.05).length - 1;
    setActiveIndex((prev) => {
      const clamped = Math.max(-1, Math.min(4, next));
      return clamped !== prev ? clamped : prev;
    });
  });

  return { scrollYProgress, activeIndex, progressRef };
}

/* ─── Desktop wave SVG ───────────────────────────────────────────── */
function WaveSVG({ scrollYProgress, reduced }) {
  const clipWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );
  const clipStyle = useTransform(clipWidth, (w) =>
    reduced ? "none" : `inset(0 ${100 - parseFloat(w)}% 0 0)`
  );

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className="h-[200px] w-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="prm-road-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#FF8A1F" />
          <stop offset="55%"  stopColor="#FC6E04" />
          <stop offset="100%" stopColor="#E04F00" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path
        d={WAVE_D}
        fill="none"
        stroke="#ECE8DF"
        strokeWidth="34"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Ghost dashed route */}
      <path
        d={WAVE_D}
        fill="none"
        stroke="#FC6E04"
        strokeWidth="5"
        strokeDasharray="1 13"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.25"
      />
      {/* Progress route — clip reveals left to right */}
      <motion.g style={{ clipPath: clipStyle }}>
        <path
          d={WAVE_D}
          fill="none"
          stroke="url(#prm-road-grad)"
          strokeWidth="5"
          strokeDasharray="1 13"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </svg>
  );
}

/* ─── Tablet vertical road ───────────────────────────────────────── */
function TabletRoad({ scrollYProgress, reduced }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <>
      {/* Ghost dotted line */}
      <div
        aria-hidden="true"
        className="absolute top-6 bottom-6 hidden sm:block xl:hidden"
        style={{
          left: "calc(50% - 11px)",
          width: 22,
          backgroundImage:
            "linear-gradient(to bottom, #ECE8DF 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />
      {/* Center dotted orange line */}
      <div
        aria-hidden="true"
        className="absolute top-6 bottom-6 hidden sm:flex xl:hidden flex-col items-center"
        style={{ left: "calc(50% - 2px)", width: 4 }}
      >
        <div
          style={{
            width: 4,
            height: "100%",
            backgroundImage:
              "radial-gradient(circle, #FC6E04 1.5px, transparent 2px)",
            backgroundSize: "4px 14px",
            opacity: 0.35,
          }}
        />
      </div>
      {/* Progress overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute top-6 hidden sm:block xl:hidden pointer-events-none"
        style={{
          left: "calc(50% - 2px)",
          width: 4,
          bottom: "1.5rem",
          scaleY: reduced ? 1 : scaleY,
          transformOrigin: "top",
          backgroundImage:
            "radial-gradient(circle, #FC6E04 1.5px, transparent 2px)",
          backgroundSize: "4px 14px",
        }}
      />
    </>
  );
}

/* ─── Mobile vertical road ───────────────────────────────────────── */
function MobileRoad({ scrollYProgress, reduced }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute top-5 bottom-8 sm:hidden"
        style={{
          left: 17,   /* center of 36px milestone */
          width: 3,
          backgroundImage:
            "radial-gradient(circle, #ECE8DF 1.5px, transparent 2px)",
          backgroundSize: "3px 14px",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-5 sm:hidden pointer-events-none"
        style={{
          left: 17,
          width: 3,
          bottom: "2rem",
          scaleY: reduced ? 1 : scaleY,
          transformOrigin: "top",
          backgroundImage:
            "radial-gradient(circle, #FC6E04 1.5px, transparent 2px)",
          backgroundSize: "3px 14px",
        }}
      />
    </>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function ProcessRoadmap({ items = [] }) {
  const reduced  = useReducedMotion();
  const olRef    = useRef(null);
  const storeRef = useRef(makeStore());
  const [Scene3D, setScene3D] = useState(null);
  const [is3DActive, setIs3DActive] = useState(false);

  const { scrollYProgress, activeIndex, progressRef } = useRoadProgress(olRef, reduced);

  /* Keep store in sync with progress & activeIndex */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      storeRef.current.progress = v;
    });
    return unsub;
  }, [scrollYProgress]);
  useEffect(() => {
    storeRef.current.activeIndex = activeIndex;
  }, [activeIndex]);

  /* ── 3D eligibility check + lazy load ── */
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;

    const check = () => {
      const mq = window.matchMedia(
        "(min-width: 1280px) and (hover: hover) and (pointer: fine)"
      );
      if (!mq.matches) { unmount3D(); return; }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { unmount3D(); return; }
      if (navigator.connection?.saveData) { unmount3D(); return; }
      if ((navigator.hardwareConcurrency ?? 8) <= 4) { unmount3D(); return; }
      if ((navigator.deviceMemory ?? 8) <= 4)         { unmount3D(); return; }

      // WebGL check
      try {
        const cv = document.createElement("canvas");
        const gl = cv.getContext("webgl2") || cv.getContext("webgl");
        if (!gl) { unmount3D(); return; }
      } catch { unmount3D(); return; }

      // Only mount after the section is near the viewport
      const io = new IntersectionObserver(
        ([entry]) => {
          if (cancelled) return;
          if (entry.isIntersecting) {
            io.disconnect();
            dynamic(() => import("@/components/ProcessRoadmap3D"), { ssr: false, loading: () => null })
              .then((mod) => {
                if (!cancelled) { setScene3D(() => mod.default); setIs3DActive(true); }
              })
              .catch(() => {});
          }
        },
        { rootMargin: "300px" }
      );
      if (olRef.current) io.observe(olRef.current);
      return () => io.disconnect();
    };

    const unmount3D = () => { setScene3D(null); setIs3DActive(false); };

    const cleanup = check();
    const mql = window.matchMedia("(min-width: 1280px) and (hover: hover) and (pointer: fine)");
    const onMql = () => check();
    mql.addEventListener?.("change", onMql);

    return () => {
      cancelled = true;
      cleanup?.();
      mql.removeEventListener?.("change", onMql);
    };
  }, [reduced]);

  const steps = items.slice(0, 5);

  return (
    <div className="relative">
      {/* Global card hover CSS — disabled when 3D is active via data-3d attribute */}
      <style>{`
        @media (hover: hover) {
          ol:not([data-3d="on"]) .prm-card:hover {
            transform: translateY(-6px);
            border-color: rgba(252,110,4,.35) !important;
            box-shadow: 0 22px 45px rgba(12,19,34,.10) !important;
          }
          ol:not([data-3d="on"]) .prm-card:hover .prm-icon-box {
            background: linear-gradient(110deg,#FF8A1F,#FC6E04 55%,#E04F00) !important;
            color: #0C1322 !important;
          }
          ol:not([data-3d="on"]) .prm-card:active {
            transform: scale(0.99);
          }
          ol[data-3d="on"] .prm-card:hover {
            border-color: rgba(252,110,4,.35) !important;
            box-shadow: 0 22px 45px rgba(12,19,34,.10) !important;
          }
          ol[data-3d="on"] .prm-card:hover .prm-icon-box {
            background: linear-gradient(110deg,#FF8A1F,#FC6E04 55%,#E04F00) !important;
            color: #0C1322 !important;
          }
        }
        .prm-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        /* Tablet milestone: 44px */
        @media (min-width: 640px) and (max-width: 1279px) {
          .prm-ms-wrap { width: 44px; height: 44px; }
        }
        /* Mobile milestone: 36px */
        @media (max-width: 639px) {
          .prm-ms-wrap { width: 36px; height: 36px; }
        }
        /* xl card font-size */
        @media (min-width: 1280px) {
          .prm-title { font-size: 22px !important; }
        }
        @media (max-width: 639px) {
          .prm-card { padding: 1rem !important; }
          .prm-title { font-size: 19px !important; }
        }
      `}</style>

      {/*
       * ═══════════════════════════════════════════════════════════
       * SINGLE OL — one DOM, three CSS layouts
       * ═══════════════════════════════════════════════════════════
       */}
      <ol
        ref={olRef}
        role="list"
        data-3d={is3DActive ? "on" : undefined}
        /* DESKTOP xl: CSS grid wave */
        className="relative list-none m-0 p-0 xl:grid xl:grid-cols-5"
        style={{ gridTemplateRows: "auto 200px auto" }}
      >
        {/* ── Desktop wave road SVG — spans all 5 cols in row 2 ── */}
        <li
          aria-hidden="true"
          className="hidden xl:block pointer-events-none z-0"
          style={{ gridColumn: "1 / span 5", gridRow: 2 }}
        >
          <WaveSVG scrollYProgress={scrollYProgress} reduced={reduced} />
        </li>

        {/* ── Desktop start/end pills in row 2 ── */}
        <li
          aria-hidden="true"
          className="hidden xl:flex items-end justify-start pb-3 pl-1 pointer-events-none z-10"
          style={{ gridColumn: 1, gridRow: 2 }}
        >
          <StartPill />
        </li>
        <li
          aria-hidden="true"
          className="hidden xl:flex items-end justify-end pb-3 pr-1 pointer-events-none z-10"
          style={{ gridColumn: 5, gridRow: 2 }}
        >
          <GoLivePill />
        </li>

        {/* ── Tablet/mobile road lines ── */}
        <li aria-hidden="true" className="xl:hidden" style={{ display: "contents" }}>
          <TabletRoad scrollYProgress={scrollYProgress} reduced={reduced} />
          <MobileRoad scrollYProgress={scrollYProgress} reduced={reduced} />
        </li>

        {/* ── Tablet start/end pills ── */}
        <li
          aria-hidden="true"
          className="hidden sm:flex xl:hidden justify-center mb-2"
        >
          <StartPill />
        </li>

        {/* ── Mobile start pill ── */}
        <li
          aria-hidden="true"
          className="flex sm:hidden mb-2"
          style={{ paddingLeft: 0 }}
        >
          <StartPill />
        </li>

        {/* ══════════════════════════════════════════════════════
            5 step items
        ══════════════════════════════════════════════════════ */}
        {steps.map((step, i) => {
          const isTop    = i % 2 === 0;   // steps 1,3,5 are "high" (row 1)
          const isActive = activeIndex >= i;
          const isPulse  = activeIndex === i;
          const colStart = i + 1;

          return (
            <li
              key={step.t}
              role="listitem"
              /* xl: dissolve li into grid items */
              className="xl:contents"
            >
              {/* ─── Card ─── */}
              {/* xl placement */}
              <div
                className={[
                  "xl:px-2 xl:self-end",
                  isTop
                    ? "xl:row-start-1 xl:self-end"
                    : "xl:row-start-3 xl:self-start",
                  `xl:col-start-${colStart}`,
                ].join(" ")}
              >
                {/* TABLET: grid row — card | milestone | empty (or reverse) */}
                <div
                  className={[
                    "sm:grid sm:items-center sm:gap-0 xl:block",
                    isTop
                      ? "sm:grid-cols-[1fr_56px_1fr]"
                      : "sm:grid-cols-[1fr_56px_1fr]",
                  ].join(" ")}
                >
                  {/* Card column */}
                  <div
                    className={[
                      "xl:block",
                      isTop
                        ? "sm:col-start-1 sm:pr-4"
                        : "sm:col-start-3 sm:pl-4",
                    ].join(" ")}
                  >
                    {/* MOBILE layout: inline grid [36px | card] */}
                    <div className="grid grid-cols-[44px_1fr] gap-x-3 items-start sm:block">
                      {/* Mobile milestone (col 1) */}
                      <div className="sm:hidden mt-1">
                        <MilestoneSmall
                          index={i}
                          active={isActive}
                          pulse={isPulse}
                          reduced={reduced}
                          size={36}
                        />
                      </div>

                      {/* Card body (col 2 on mobile, full-width on sm+) */}
                      <StepCard
                        step={step}
                        index={i}
                        reduced={reduced}
                        storeRef={storeRef}
                        is3DActive={is3DActive}
                      />
                    </div>
                  </div>

                  {/* Tablet milestone column (center) */}
                  <div className="hidden sm:flex xl:hidden items-center justify-center sm:col-start-2">
                    {/* Connector left */}
                    {isTop && (
                      <div
                        aria-hidden="true"
                        className="h-px w-6 border-t-2 border-dashed"
                        style={{ borderColor: "rgba(252,110,4,.55)" }}
                      />
                    )}
                    <MilestoneSmall
                      index={i}
                      active={isActive}
                      pulse={isPulse}
                      reduced={reduced}
                      size={44}
                    />
                    {/* Connector right */}
                    {!isTop && (
                      <div
                        aria-hidden="true"
                        className="h-px w-6 border-t-2 border-dashed"
                        style={{ borderColor: "rgba(252,110,4,.55)" }}
                      />
                    )}
                  </div>

                  {/* Tablet: opposite empty column */}
                  <div className={isTop ? "sm:col-start-3 hidden sm:block xl:hidden" : "sm:col-start-1 hidden sm:block xl:hidden"} />
                </div>
              </div>

              {/* ─── Desktop milestone (row 2) ─── */}
              <div
                aria-hidden="true"
                className={`hidden xl:flex items-center justify-center xl:row-start-2 xl:col-start-${colStart} xl:justify-self-center z-10 relative`}
                style={{ marginTop: MS_MT[i] }}
              >
                {/* Dashed vertical connector */}
                <div className="absolute flex flex-col items-center w-px" style={{ [isTop ? "bottom" : "top"]: "100%", height: 33 }}>
                  <div
                    className="w-px border-l-2 border-dashed"
                    style={{ height: 33, borderColor: "rgba(252,110,4,.55)" }}
                  />
                </div>
                <Milestone
                  index={i}
                  active={isActive}
                  pulse={isPulse}
                  reduced={reduced}
                />
              </div>
            </li>
          );
        })}

        {/* ── Tablet end pill ── */}
        <li
          aria-hidden="true"
          className="hidden sm:flex xl:hidden justify-center mt-2"
        >
          <GoLivePill />
        </li>

        {/* ── Mobile end pill ── */}
        <li
          aria-hidden="true"
          className="flex sm:hidden mt-2"
        >
          <GoLivePill />
        </li>
      </ol>

      {/* ── Three.js layer — absolute overlay, pointer-events-none ── */}
      {Scene3D && (
        <div className="absolute inset-0 z-[1] pointer-events-none xl:block hidden" aria-hidden="true">
          <Scene3D storeRef={storeRef} olRef={olRef} />
        </div>
      )}
    </div>
  );
}
