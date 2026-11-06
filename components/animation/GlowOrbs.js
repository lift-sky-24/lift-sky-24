"use client";
// Animated CSS gradient orbs. Uses transform:translate (compositor-only, no layout thrashing).
// Paused when scrolled off-screen via IntersectionObserver.
import { useEffect, useRef } from "react";

const ORBS = [
  { color: "rgba(101,87,255,0.15)", size: 360, x: 75, y: 20, speed: 0.018 },
  { color: "rgba(255,79,163,0.12)", size: 300, x: 15, y: 70, speed: 0.022 },
  { color: "rgba(255,99,56,0.08)",  size: 240, x: 50, y: 85, speed: 0.015 },
];

export default function GlowOrbs({ intensity = 1 }) {
  const containerRef = useRef(null);
  const posRef       = useRef(ORBS.map((o) => ({ x: o.x, y: o.y })));
  const mouseRef     = useRef({ x: 50, y: 50 });
  const rafRef       = useRef(null);
  const runningRef   = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Create orb elements using transform:translate (compositor-only)
    const orbEls = ORBS.map((orb) => {
      const el         = document.createElement("div");
      const blur = Math.min(orb.size * 0.25, 80); // capped at 80px
      el.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:${orb.size}px;
        height:${orb.size}px;
        top:0; left:0;
        background:${orb.color};
        filter:blur(${blur}px);
        pointer-events:none;
        will-change:transform;
      `;
      el.setAttribute("aria-hidden", "true");
      container.appendChild(el);
      return el;
    });

    const onMouseMove = (e) => {
      const rect     = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      };
    };
    container.addEventListener("mousemove", onMouseMove, { passive: true });

    let t = 0;
    const tick = () => {
      if (!runningRef.current) return;
      t += 0.008;
      ORBS.forEach((orb, i) => {
        const pos = posRef.current[i];
        const mx  = mouseRef.current.x;
        const my  = mouseRef.current.y;
        // Gentle float with subtle mouse attraction
        const targetX = orb.x + Math.sin(t * orb.speed * 60 + i * 2) * 6 + (mx - orb.x) * 0.02 * intensity;
        const targetY = orb.y + Math.cos(t * orb.speed * 60 + i * 1.5) * 5 + (my - orb.y) * 0.02 * intensity;
        pos.x += (targetX - pos.x) * 0.025;
        pos.y += (targetY - pos.y) * 0.025;

        const rect = container.getBoundingClientRect();
        const pxX  = (pos.x / 100) * rect.width  - orb.size / 2;
        const pxY  = (pos.y / 100) * rect.height - orb.size / 2;
        orbEls[i].style.transform = `translate(${pxX}px,${pxY}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    // Only run when visible
    const observer = new IntersectionObserver(([entry]) => {
      runningRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    }, { threshold: 0.01 });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      orbEls.forEach((el) => el.remove());
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
