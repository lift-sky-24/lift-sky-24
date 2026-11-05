"use client";
/**
 * ParallaxSection — wraps children and applies vertical scroll parallax.
 * Library: GSAP ScrollTrigger (scrub).
 * Usage: <ParallaxSection speed={0.15}><img ... /></ParallaxSection>
 */
import { useRef, useEffect } from "react";
import { MOTION } from "@/lib/motion-config";

export default function ParallaxSection({ children, speed = MOTION.parallax.medium, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let ctx;
    async function init() {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const dist = el.offsetHeight * speed;
      ctx = gsap.context(() => {
        gsap.fromTo(el,
          { y: -dist / 2 },
          {
            y: dist / 2,
            ease: "none",
            scrollTrigger: {
              trigger:  el,
              start:    "top bottom",
              end:      "bottom top",
              scrub:    true,
            },
          }
        );
      });
    }
    init();
    return () => ctx?.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
