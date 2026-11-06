"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "./ui";
import { TESTIMONIALS } from "@/data/site-config";

// TODO: replace TESTIMONIALS with real client reviews

const SLIDE_VARIANTS = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } }),
};

function TestimonialCard({ t, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      style={{
        background: "#fff",
        border: "1px solid rgba(16,17,26,.08)",
        borderRadius: 20,
        padding: "28px 26px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top-left accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 48, height: 3,
        background: "linear-gradient(90deg,#FF6B01,#0C1323)",
        borderRadius: "0 0 4px 0",
      }} />

      {/* Quote icon */}
      <Quote
        size={22}
        style={{ color: "#FF6B01", opacity: 0.5, flexShrink: 0 }}
        aria-hidden="true"
      />

      {/* Quote text */}
      <blockquote style={{
        margin: 0, flex: 1,
        fontSize: 14, lineHeight: 1.75,
        color: "#3a3b4a",
        fontStyle: "italic",
      }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Result tag */}
      {t.result && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "4px 10px",
          borderRadius: 99,
          background: "rgba(255,107,1,0.08)",
          border: "1px solid rgba(255,107,1,0.18)",
          fontSize: 11, fontWeight: 700,
          color: "#FF6B01",
          width: "fit-content",
        }}>
          <span style={{ fontSize: 8 }}>✦</span>
          {t.result}
        </div>
      )}

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(16,17,26,.06)", paddingTop: 16 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#0C1323,#FF6B01)",
          display: "grid", placeItems: "center",
          fontSize: 14, fontWeight: 900, color: "#fff",
        }}>
          {t.avatar}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#10111a", lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ margin: 0, fontSize: 11, color: "#747684", lineHeight: 1.4 }}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const items  = TESTIMONIALS;
  const total  = items.length;              // 4
  const [page, setPage]   = useState(0);   // 0 = items[0,1], 1 = items[2,3]
  const [dir,  setDir]    = useState(1);
  const [paused, setPaused] = useState(false);
  const pages = Math.ceil(total / 2);      // 2 pages of 2

  const go = (d) => {
    setDir(d);
    setPage((p) => (p + d + pages) % pages);
  };

  // Auto-advance every 6s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, page]);

  const pair = [items[page * 2], items[page * 2 + 1]].filter(Boolean);

  return (
    <section
      aria-label="Client testimonials"
      className="py-16 lg:py-20"
      style={{ background: "linear-gradient(180deg,#f7f5f0,#eeebff)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="mb-10">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "1.6px", textTransform: "uppercase", color: "#747684", marginBottom: 8 }}>
                Client Stories
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                What Our Clients Say
              </h2>
              <p style={{ marginTop: 6, fontSize: 13, color: "#747684" }}>
                Trusted by startups, local businesses and growing brands.
              </p>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: pages }).map((_, k) => (
                  <button
                    key={k}
                    onClick={() => { setDir(k > page ? 1 : -1); setPage(k); }}
                    aria-label={`Page ${k + 1}`}
                    style={{
                      width: page === k ? 22 : 7,
                      height: 7, borderRadius: 99,
                      background: page === k ? "#FF6B01" : "rgba(16,17,26,.2)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "width .3s, background .3s",
                    }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(16,17,26,.12)", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", transition: "background .2s, transform .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0C1323"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "inherit"; }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next"
                style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(16,17,26,.12)", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", transition: "background .2s, transform .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FF6B01"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "inherit"; }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* 2 cards — slide in/out together */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={page}
              custom={dir}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              {pair.map((t, i) => (
                <TestimonialCard key={t.name} t={t} delay={i * 0.07} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 20, height: 2, background: "rgba(16,17,26,.08)", borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            key={page}
            style={{ height: "100%", background: "linear-gradient(90deg,#0C1323,#FF6B01)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>

        {/* Mobile: single column */}
        <style>{`
          @media (max-width: 640px) {
            .testimonial-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
