"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "./ui";
import { TESTIMONIALS } from "@/data/site-config";

// TODO: replace TESTIMONIALS in data/site-config.js with real client reviews

export default function Testimonials() {
  const items      = TESTIMONIALS;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);

  const go   = (d) => setIdx((v) => (v + d + items.length) % items.length);
  const t    = items[idx];

  // Auto-advance with progress bar
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setIdx((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(intervalRef.current);
  }, [items.length, paused, idx]);

  // Drag handling
  const dragX = useMotionValue(0);
  const onDragEnd = (_, info) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
    dragX.set(0);
  };

  return (
    <section
      aria-label="Client testimonials"
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ background: "radial-gradient(ellipse at 60% 50%,rgba(101,87,255,.05),transparent 60%),rgba(248,250,252,.7)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">What Our Clients Say</h2>
          <p className="mt-2 text-slate-500 text-sm">Trusted by startups, local businesses and growing brands.</p>
        </Reveal>

        <motion.div
          className="relative mt-10 cursor-grab active:cursor-grabbing rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-card sm:p-12 overflow-hidden"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          style={{ x: dragX, touchAction: "pan-y", minHeight: 280 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, info) => { setDragging(false); onDragEnd(e, info); }}
          data-card=""
          data-cursor="drag"
          data-cursor-label="Drag"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Subtle gradient bg */}
          <div aria-hidden style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 80% 20%,rgba(101,87,255,.04),transparent 60%)",pointerEvents:"none" }} />

          <Quote className="mx-auto text-brand opacity-20 relative z-10" aria-hidden="true" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={idx}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={  { opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <blockquote className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <motion.span
                  className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-brand-gradient font-bold text-white text-lg"
                  aria-hidden="true"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {t.avatar}
                </motion.span>
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Auto-progress bar */}
          {!paused && (
            <motion.div
              key={idx}
              className="absolute bottom-0 left-0 h-0.5 bg-brand-gradient"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 7, ease: "linear" }}
              style={{ transformOrigin: "left", width: "100%" }}
            />
          )}
        </motion.div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="rounded-full border border-slate-200 bg-white p-2 transition hover:bg-brand-light"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </motion.button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {items.map((_, k) => (
              <motion.button
                key={k}
                role="tab"
                onClick={() => setIdx(k)}
                aria-label={`Show testimonial ${k + 1}`}
                aria-selected={k === idx}
                className="rounded-full"
                animate={{ width: k === idx ? 24 : 8, backgroundColor: k === idx ? "#6557ff" : "#cbd5e1" }}
                transition={{ duration: 0.3 }}
                style={{ height: 8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="rounded-full border border-slate-200 bg-white p-2 transition hover:bg-brand-light"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
