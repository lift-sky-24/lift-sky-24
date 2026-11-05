"use client";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export default function PageHeroAnimationClient() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let ctx;
    async function init() {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Target the nearest .page-hero-heading's .word-inner spans
      const headings = document.querySelectorAll(".page-hero-heading .word-inner");
      if (!headings.length) return;

      ctx = gsap.context(() => {
        gsap.from(headings, {
          y:        "105%",
          opacity:  0,
          duration: 0.65,
          stagger:  0.035,
          ease:     "power3.out",
          delay:    0.05,
        });
      });
    }
    init();
    return () => ctx?.revert();
  }, [reduce]);

  return null; // renders nothing
}
