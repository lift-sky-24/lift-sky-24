"use client";
// Change WATERMARK_TILT (degrees) to rotate the text without editing classes.
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
          "font-black leading-[0.8] tracking-[-0.05em] whitespace-nowrap text-center",
          "text-transparent",
          "bg-gradient-to-b from-[rgba(252,110,4,0.10)] to-transparent bg-clip-text",
          // 1px stroke on mobile, 1.5px on tablet+
          "[-webkit-text-stroke:1px_rgba(252,110,4,0.30)]",
          "sm:[-webkit-text-stroke:1.5px_rgba(252,110,4,0.28)]",
          // length: hint prevents Tailwind treating vw values as colors
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
