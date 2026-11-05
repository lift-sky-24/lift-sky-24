"use client";
/**
 * AOSProvider — initialises AOS once on mount, respects reduced motion.
 * AOS.refresh() is intentionally NOT called on route change to prevent
 * scroll-reveal elements from re-animating on navigation.
 */
import { useEffect } from "react";
import { MOTION } from "@/lib/motion-config";

export default function AOSProvider({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (prefersReduced) return;

    import("aos").then(({ default: AOS }) => {
      AOS.init({
        duration:        MOTION.aos.duration,
        once:            true,   // animate ONCE — never re-trigger
        offset:          MOTION.aos.offset,
        easing:          MOTION.aos.easing,
        anchorPlacement: "top-bottom",
        mirror:          false,  // do not animate on scroll up
        disable:         false,
      });
    });
  }, []); // mount only — no route-change re-init

  return children;
}
