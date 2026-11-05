"use client";
/**
 * CursorFollower — desktop-only custom cursor.
 * Small dot tracks exactly; larger ring follows with lerp lag.
 * Expands + shows label over cards/links; glows over buttons.
 * Library: GSAP (direct DOM manipulation, no React state = 60fps).
 */
import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion-config";

export default function CursorFollower() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only on fine-pointer (mouse) devices
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    // Reveal cursors
    dot.style.opacity  = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    let mx = -100, my = -100; // mouse
    let rx = -100, ry = -100; // ring (lagged)
    let raf;
    const { ringLag, expandScale, glowSize } = MOTION.cursor;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      // Dot follows exactly
      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      // Ring lerps
      rx += (mx - rx) * ringLag;
      ry += (my - ry) * ringLag;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover state detection
    const onEnter = (e) => {
      const el = e.target.closest(
        "a,button,[data-cursor],[data-cursor-label],[data-card],.project-card,.blog-card,.service-card,.ind-card,.price-card"
      );
      if (!el) return;

      const cursorLabel = el.dataset.cursorLabel || el.dataset.cursor || "";
      const isButton    = el.tagName === "BUTTON" || el.closest("button") ||
                          el.classList.contains("btn-dark-pill") ||
                          el.classList.contains("btn-cta-pill") ||
                          el.classList.contains("h-cta");
      const isCard      = el.dataset.card !== undefined ||
                          el.classList.contains("project-card") ||
                          el.classList.contains("blog-card") ||
                          el.classList.contains("service-card") ||
                          el.classList.contains("ind-card") ||
                          el.classList.contains("price-card");
      const isDrag      = el.dataset.cursor === "drag";

      ring.dataset.state = isButton ? "glow" : isCard ? "card" : isDrag ? "drag" : "link";

      if (cursorLabel || isDrag) {
        label.textContent  = isDrag ? "Drag" : (cursorLabel || "View");
        label.style.opacity = "1";
      }
    };

    const onLeave = () => {
      ring.dataset.state = "";
      label.style.opacity = "0";
    };

    // Hide over inputs/textareas
    const onEnterInput = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        dot.style.opacity  = "0";
        ring.style.opacity = "0";
        document.body.style.cursor = "auto";
      }
    };
    const onLeaveInput = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
      document.body.style.cursor = "none";
    };

    window.addEventListener("mousemove",   onMove, { passive: true });
    document.addEventListener("mouseover",  onEnter,      { passive: true });
    document.addEventListener("mouseout",   onLeave,      { passive: true });
    document.addEventListener("mouseover",  onEnterInput, { passive: true });
    document.addEventListener("mouseout",   onLeaveInput, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",   onMove);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
      document.removeEventListener("mouseover",  onEnterInput);
      document.removeEventListener("mouseout",   onLeaveInput);
      document.body.style.cursor = "auto";
    };
  }, []);

  const { dotSize, ringSize } = MOTION.cursor;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         dotSize,
          height:        dotSize,
          borderRadius:  "50%",
          background:    "#6557ff",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       0,
          willChange:    "transform",
          mixBlendMode:  "difference",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         ringSize,
          height:        ringSize,
          borderRadius:  "50%",
          border:        "1.5px solid rgba(101,87,255,0.6)",
          pointerEvents: "none",
          zIndex:        9998,
          opacity:       0,
          willChange:    "transform",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          transition:    "width .25s, height .25s, background .25s, border-color .25s",
        }}
        data-state=""
      >
        <span
          ref={labelRef}
          style={{
            fontSize:   9,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:      "#fff",
            opacity:    0,
            transition: "opacity .15s",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      <style>{`
        [data-state="card"] {
          width:${ringSize * 2.2}px !important;
          height:${ringSize * 2.2}px !important;
          border-color: rgba(101,87,255,0.35) !important;
          background: rgba(101,87,255,0.06) !important;
        }
        [data-state="glow"] {
          width:${MOTION.cursor.glowSize}px !important;
          height:${MOTION.cursor.glowSize}px !important;
          background: rgba(101,87,255,0.15) !important;
          border-color: rgba(255,79,163,0.4) !important;
        }
        [data-state="drag"] {
          width:${ringSize * 2.5}px !important;
          height:${ringSize * 2.5}px !important;
          background: rgba(101,87,255,0.1) !important;
        }
        [data-state="link"] {
          width:${ringSize * 1.6}px !important;
          height:${ringSize * 1.6}px !important;
          border-color: rgba(255,79,163,0.5) !important;
        }
      `}</style>
    </>
  );
}
