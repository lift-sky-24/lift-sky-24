"use client";
// Decorative animation layer for HeroBanner (stat counters + image parallax).
// No text content here — all content is server-rendered in HeroBanner.js.
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const GlowOrbs = dynamic(() => import("@/components/animation/GlowOrbs"), { ssr: false });

export default function HeroBannerClient() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let ctx;
    let cancelled = false;

    async function init() {
      try {
        const { gsap }          = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (cancelled) return;

        // Reset to 0 before browser paints so the user never sees a flash
        const statEls = document.querySelectorAll("[data-stat-to]");
        statEls.forEach((el) => {
          el.textContent = "0" + (el.dataset.statSuffix || "");
        });

        statEls.forEach((el) => {
          const to     = parseInt(el.dataset.statTo, 10);
          const suffix = el.dataset.statSuffix || "";
          const obj    = { val: 0 };
          gsap.to(obj, {
            val:      to,
            duration: 1.8,
            ease:     "power2.out",
            onUpdate()  { el.textContent = Math.round(obj.val) + suffix; },
            onComplete(){ el.textContent = to + suffix; },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Hero image parallax
        ctx = gsap.context(() => {
          const imgWrap = document.getElementById("hero-img-wrap");
          if (imgWrap) {
            gsap.to(imgWrap, {
              y:    50,
              ease: "none",
              scrollTrigger: {
                trigger: "body",
                start:   "top top",
                end:     "+=600",
                scrub:   true,
              },
            });
          }
        });
      } catch (e) {
        console.warn("[HeroBannerClient] init failed:", e);
      }
    }

    init();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <GlowOrbs intensity={0.6} />
    </div>
  );
}
