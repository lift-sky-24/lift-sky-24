"use client";
/**
 * HeroBannerClient — pure animation enhancement for HeroBanner.
 * No text content here — content lives in the server HeroBanner shell.
 * Libraries: GSAP (scroll parallax + word reveal), GlowOrbs (CSS)
 */
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const GlowOrbs = dynamic(() => import("@/components/animation/GlowOrbs"), { ssr: false });

export default function HeroBannerClient() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let ctx;
    async function init() {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Animate stat counters from 0
      const statEls = document.querySelectorAll("[data-stat-to]");
      statEls.forEach((el) => {
        const to     = parseInt(el.dataset.statTo, 10);
        const suffix = el.dataset.statSuffix || "";
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: to,
          duration: 1.8,
          ease: "power2.out",
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          onComplete() { el.textContent = to + suffix; },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      ctx = gsap.context(() => {
        // Word-by-word reveal on H1
        const words = document.querySelectorAll("#hero-heading .word-inner");
        if (words.length) {
          gsap.from(words, {
            y: "105%",
            opacity: 0,
            duration: 0.72,
            stagger: 0.04,
            ease: "power3.out",
            delay: 0.1,
          });
        }

        // Hero image scroll parallax
        const imgWrap = document.getElementById("hero-img-wrap");
        if (imgWrap) {
          gsap.to(imgWrap, {
            y: 55,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end:   "+=600",
              scrub: true,
            },
          });
        }
      });
    }

    init();
    return () => ctx?.revert();
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <GlowOrbs intensity={0.8} />
    </div>
  );
}
