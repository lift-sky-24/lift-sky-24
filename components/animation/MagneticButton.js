"use client";
/**
 * MagneticButton — pulls toward cursor within radius, elastic return.
 * Adds shine sweep + ripple on click.
 * Library: GSAP for magnetic physics, Framer Motion for press scale.
 * Usage: <MagneticButton><Link ...>CTA</Link></MagneticButton>
 */
import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion-config";

export default function MagneticButton({ children, className = "", style = {}, strength, radius }) {
  const wrapRef    = useRef(null);
  const innerRef   = useRef(null);
  const { magnetic: mc } = MOTION;
  const s = strength ?? mc.strength;
  const r = radius   ?? mc.radius;

  useEffect(() => {
    // Only on fine-pointer devices
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let gsap, cleanup;

    import("gsap").then(({ gsap: g }) => {
      gsap = g;

      const onMove = (e) => {
        const rect  = wrap.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = e.clientX - cx;
        const dy    = e.clientY - cy;
        const dist  = Math.hypot(dx, dy);

        if (dist < r) {
          gsap.to(inner, {
            x: dx * s, y: dy * s,
            duration: 0.3, ease: "power2.out",
          });
        } else {
          gsap.to(inner, {
            x: 0, y: 0,
            duration: mc.returnDur, ease: mc.returnEase,
          });
        }
      };

      const onLeave = () => {
        gsap.to(inner, {
          x: 0, y: 0,
          duration: mc.returnDur, ease: mc.returnEase,
        });
      };

      document.addEventListener("mousemove", onMove, { passive: true });
      wrap.addEventListener("mouseleave",    onLeave);

      cleanup = () => {
        document.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave",    onLeave);
      };
    });

    return () => cleanup?.();
  }, [s, r, mc.returnDur, mc.returnEase]);

  // Ripple on click
  const addRipple = useCallback((e) => {
    const btn  = wrapRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const rip  = document.createElement("span");
    rip.className   = "ripple";
    rip.style.left  = `${e.clientX - rect.left}px`;
    rip.style.top   = `${e.clientY - rect.top}px`;
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`magnetic-btn ${className}`}
      style={{ display: "inline-flex", position: "relative", overflow: "hidden", ...style }}
      onClick={addRipple}
    >
      <motion.span
        ref={innerRef}
        style={{ display: "inline-flex", position: "relative", zIndex: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
        {/* Shine overlay */}
        <span className="shine-overlay" aria-hidden="true" />
      </motion.span>
    </span>
  );
}
