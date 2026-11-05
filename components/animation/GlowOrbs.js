"use client";
/**
 * GlowOrbs — animated CSS gradient orbs that react to mouse movement.
 * Pure CSS + inline style via JS, no canvas = near-zero CPU cost.
 * Library: vanilla JS requestAnimationFrame (not GSAP, not Framer).
 * Usage: <GlowOrbs /> inside any position:relative container.
 */
import { useEffect, useRef } from "react";

const ORBS = [
  { color: "rgba(101,87,255,0.18)",  size: 420, x: 75, y: 20,  speed: 0.018 },
  { color: "rgba(255,79,163,0.14)",  size: 380, x: 15, y: 70,  speed: 0.022 },
  { color: "rgba(255,99,56,0.10)",   size: 300, x: 50, y: 85,  speed: 0.015 },
];

export default function GlowOrbs({ intensity = 1 }) {
  const containerRef = useRef(null);
  const posRef       = useRef(ORBS.map((o) => ({ x: o.x, y: o.y })));
  const mouseRef     = useRef({ x: 50, y: 50 });
  const rafRef       = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Create orb elements
    const orbEls = ORBS.map((orb, i) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:${orb.size}px;
        height:${orb.size}px;
        background:${orb.color};
        filter:blur(${orb.size * 0.45}px);
        pointer-events:none;
        will-change:transform;
        transform:translate(-50%,-50%);
        left:${orb.x}%;
        top:${orb.y}%;
      `;
      el.setAttribute("aria-hidden", "true");
      container.appendChild(el);
      return el;
    });

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      };
    };
    container.addEventListener("mousemove", onMouseMove, { passive: true });

    let t = 0;
    const tick = () => {
      t += 0.008;
      ORBS.forEach((orb, i) => {
        const pos = posRef.current[i];
        // Gentle float + slight mouse attraction
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const targetX = orb.x + Math.sin(t * orb.speed * 60 + i * 2) * 8 + (mx - orb.x) * 0.04 * intensity;
        const targetY = orb.y + Math.cos(t * orb.speed * 60 + i * 1.5) * 6 + (my - orb.y) * 0.04 * intensity;
        pos.x += (targetX - pos.x) * 0.03;
        pos.y += (targetY - pos.y) * 0.03;
        orbEls[i].style.left = `${pos.x}%`;
        orbEls[i].style.top  = `${pos.y}%`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafRef.current);
      }
    });
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
      style={{
        position: "absolute",
        inset:    0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex:   0,
      }}
    />
  );
}
