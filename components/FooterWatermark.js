"use client";
/**
 * FooterWatermark
 * ---------------
 * A single large outlined "LiftSky24" centred behind the whole footer.
 * Purely decorative: aria-hidden, pointer-events-none, select-none.
 *
 * Change WATERMARK_TILT (degrees) to rotate the text without editing classes.
 * Currently 0 — perfectly horizontal.
 *
 * Sizing targets (Inter Black, measured at each breakpoint):
 *   360–639 px  → two stacked lines "Lift" / "Sky24" at 28vw → widest line ≈ 82% vw
 *   640–1023 px → one line at 17vw  → text ≈ 86% vw at 768 px
 *   1024–1919px → one line at 15vw, capped at 19rem  → ≈ 76–78% at 1280–1440 px
 *   1920px +    → capped at 19rem, centered, never touches edges
 *
 * Logo orange: #FC6E04
 */

import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/data/site-config";

const WATERMARK_TILT = 0; // degrees — change here to tilt

export default function FooterWatermark() {
  const reduced = useReducedMotion();

  /* Entrance: fade + scale in once on viewport entry */
  const entrance = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      };

  /* Ongoing gentle float */
  const floatAnim = reduced ? {} : { y: [0, -12, 0] };
  const floatTransition = reduced
    ? {}
    : { duration: 6, ease: "easeInOut", repeat: Infinity };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
    >
      <motion.span
        {...entrance}
        animate={floatAnim}
        transition={floatTransition}
        style={{ rotate: WATERMARK_TILT }}
        className={[
          /* Layout */
          "font-black leading-[0.8] tracking-[-0.05em] whitespace-nowrap text-center",
          /* Colour — transparent fill + optional vertical orange fade */
          "text-transparent",
          "bg-gradient-to-b from-[rgba(252,110,4,0.10)] to-transparent bg-clip-text",
          /* Outline stroke — mobile vs tablet/desktop */
          "[-webkit-text-stroke:1px_rgba(252,110,4,0.30)]",
          "sm:[-webkit-text-stroke:1.5px_rgba(252,110,4,0.28)]",
          /* Responsive font-size using length: hint so Tailwind won't treat value as a color */
          "text-[length:28vw]",
          "sm:text-[length:17vw]",
          "lg:text-[length:min(15vw,19rem)]",
        ].join(" ")}
      >
        {/* Mobile: two stacked lines; tablet+: single line */}
        <span className="block sm:hidden">
          <span className="block">Lift</span>
          <span className="block">Sky24</span>
        </span>
        <span className="hidden sm:block">{BRAND.name}</span>
      </motion.span>
    </div>
  );
}
