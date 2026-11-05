"use client";
/**
 * SpotlightCard — cursor-following radial spotlight inside a card.
 * Library: vanilla JS (mousemove sets CSS vars, CSS does the rendering).
 * Can be combined with TiltCard or used standalone.
 * Usage: <SpotlightCard className="rounded-2xl border bg-white p-6">...</SpotlightCard>
 */
import { useRef, useCallback } from "react";

export default function SpotlightCard({ children, className = "", style = {}, color = "rgba(101,87,255,0.10)" }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{
        "--spotlight-color": color,
        ...style,
      }}
      onMouseMove={onMove}
      data-card=""
    >
      {children}
    </div>
  );
}
