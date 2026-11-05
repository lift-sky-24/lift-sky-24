"use client";
/**
 * AOSProvider — initialises AOS once on mount, respects reduced motion.
 * Library: AOS only.
 */
import { useEffect } from "react";
import { MOTION } from "@/lib/motion-config";

export default function AOSProvider({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (prefersReduced) return;

    import("aos").then(({ default: AOS }) => {
      AOS.init({
        duration:   MOTION.aos.duration,
        once:       MOTION.aos.once,
        offset:     MOTION.aos.offset,
        easing:     MOTION.aos.easing,
        anchorPlacement: "top-bottom",
      });
    });
  }, []);

  return children;
}
