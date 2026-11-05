"use client";
/**
 * CountUp — animates a number from 0 to final value on scroll.
 * Library: GSAP ScrollTrigger.
 * Server renders the final value immediately (SEO + no-JS safe).
 * Usage: <CountUp value={30} suffix="+" />
 */
import { useRef, useEffect, useState } from "react";
import { MOTION } from "@/lib/motion-config";

export default function CountUp({ value, suffix = "", prefix = "", duration = 1.8, className = "" }) {
  const ref         = useRef(null);
  const [display, setDisplay] = useState(value); // SSR shows final value

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let ctx;
    async function init() {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val:      value,
          duration,
          ease:     "power2.out",
          onUpdate: () => setDisplay(Math.round(obj.val)),
          scrollTrigger: {
            trigger: el,
            start:   "top 85%",
            once:    true,
          },
          onComplete: () => {
            setDisplay(value);
            // Pulse glow on finish
            if (el) {
              el.style.transition = "text-shadow .3s";
              el.style.textShadow = "0 0 20px rgba(101,87,255,.5)";
              setTimeout(() => { if (el) el.style.textShadow = ""; }, 600);
            }
          },
        });
      });
    }

    setDisplay(0); // start from 0 on client
    init();
    return () => ctx?.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
