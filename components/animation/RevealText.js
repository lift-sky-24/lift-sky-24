"use client";
/**
 * RevealText — word-by-word mask slide-up reveal triggered on scroll.
 * Uses data-word spans already in the DOM (no innerHTML mutation).
 * Library: GSAP + ScrollTrigger.
 *
 * Usage:
 *   <RevealText as="h1">
 *     {splitWords("Your heading text here")}
 *   </RevealText>
 *
 * Or just wrap any element and target .word-inner children.
 */
import { useRef, useEffect } from "react";
import { MOTION } from "@/lib/motion-config";

/** Helper: convert a string into word-masked spans (React-safe, no innerHTML) */
export function splitWords(text) {
  return text.split(" ").filter(Boolean).map((word, i) => (
    <span key={i} className="reveal-text-mask" style={{ display: "inline-block", marginRight: "0.28em" }}>
      <span className="word-inner" style={{ display: "inline-block" }}>
        {word}
      </span>
    </span>
  ));
}

export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  style   = {},
  delay   = 0,
  stagger = MOTION.textReveal.stagger,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let ctx;
    async function init() {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const inners = el.querySelectorAll(".word-inner");
      if (!inners.length) return;

      ctx = gsap.context(() => {
        gsap.from(inners, {
          y:        MOTION.textReveal.y,
          opacity:  0,
          duration: MOTION.textReveal.duration,
          stagger,
          delay,
          ease:     MOTION.textReveal.ease,
          scrollTrigger: {
            trigger: el,
            start:   "top 88%",
            once:    true,
          },
        });
      });
    }

    init();
    return () => ctx?.revert();
  }, [delay, stagger]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
