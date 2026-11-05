"use client";
/**
 * ScrollProgressBar — thin top bar that fills as user scrolls.
 * Library: GSAP ScrollTrigger (single element, no layout shift).
 */
import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion-config";

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    let ctx;
    import("gsap").then(({ gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.to(barRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start:   "top top",
              end:     "bottom bottom",
              scrub:   true,
            },
          });
        });
      })
    );

    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        height:          `${MOTION.progressBar.height}px`,
        background:      MOTION.progressBar.gradient,
        transformOrigin: "left center",
        transform:       "scaleX(0)",
        zIndex:          MOTION.progressBar.zIndex,
        pointerEvents:   "none",
      }}
    />
  );
}
