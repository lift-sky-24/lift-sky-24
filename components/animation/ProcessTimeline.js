"use client";
/**
 * ProcessTimeline — scroll-scrubbed SVG line that draws as user scrolls.
 * Each step card lights up when reached.
 * Library: GSAP + ScrollTrigger.
 */
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PROCESS } from "@/data/site-config";

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const lineRef      = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const container = containerRef.current;
    const line      = lineRef.current;
    if (!container || !line) return;

    let ctx;
    async function init() {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Draw line on scroll
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start:   "top 70%",
            end:     "bottom 60%",
            scrub:   1,
          },
        });

        // Each step rises in
        const steps = container.querySelectorAll(".process-step");
        steps.forEach((step, i) => {
          gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              once: true,
            },
            delay: i * 0.1,
          });
        });
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting line (desktop) */}
      <div className="absolute top-9 left-9 right-9 h-0.5 hidden lg:block" aria-hidden>
        <div className="absolute inset-0 bg-slate-200 rounded-full" />
        <div
          ref={lineRef}
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(90deg,#6557ff,#ff4fa3,#ff6338)", transformOrigin: "left center" }}
        />
      </div>

      <ol className={`relative grid gap-5 sm:grid-cols-2 ${PROCESS.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
        {PROCESS.map((step, i) => (
          <li key={step.t} className="process-step relative" style={{ opacity: 1 }}>
            <motion.div
              className="h-full rounded-2xl border border-slate-100 bg-white p-6 transition-shadow"
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(101,87,255,.15)" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Step number with animated ring on hover */}
              <motion.span
                className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white relative z-10"
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {i + 1}
              </motion.span>
              <p className="mt-1 text-[10px] font-black tracking-widest uppercase text-brand/50">{step.n}</p>
              <h3 className="mt-3 font-semibold text-navy-900">{step.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.d}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
