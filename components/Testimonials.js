"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "./ui";
import { TESTIMONIALS } from "@/data/site-config";

// TODO: replace TESTIMONIALS with real client reviews

// Card gradient palettes — inspired by reference tile cards
const CARD_PALETTES = [
  { bg: "linear-gradient(145deg,#ffe8d4,#ffb9ce)",  text: "#14121f", accent: "#FF6B01" },
  { bg: "linear-gradient(145deg,#e2d9ff,#9b86ff)",  text: "#14121f", accent: "#7357ff" },
  { bg: "linear-gradient(145deg,#d9f0ff,#809de8)",  text: "#14121f", accent: "#2563eb" },
  { bg: "linear-gradient(145deg,#d9ffeb,#7fd3a1)",  text: "#14121f", accent: "#059669" },
];

// Orb decoration inside each card
function CardOrb({ color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 140,
        height: 140,
        borderRadius: "45% 55% 65% 35%",
        right: -24,
        bottom: -28,
        background: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.08))`,
        transform: "rotate(28deg)",
        transition: "transform .7s ease",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Testimonials() {
  const items = TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [paused, items.length, active]);

  return (
    <section
      aria-label="Client testimonials"
      className="py-16 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f7f5f0,#eeebff)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted mb-2">Client Stories</p>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">What Our Clients Say</h2>
            </div>
            {/* Dot nav */}
            <div className="flex gap-2">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => { setActive(k); setPaused(true); }}
                  aria-label={`Testimonial ${k + 1}`}
                  style={{
                    width: active === k ? 28 : 8,
                    height: 8,
                    borderRadius: 99,
                    background: active === k ? "#FF6B01" : "rgba(16,17,26,.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "width .3s, background .3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cards grid — bento style */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {items.map((t, i) => {
            const palette   = CARD_PALETTES[i % CARD_PALETTES.length];
            const isActive  = i === active;
            const isFeatured = isActive; // active card is slightly larger

            return (
              <motion.div
                key={t.name}
                onClick={() => setActive(i)}
                layout
                animate={{
                  scale:   isFeatured ? 1.02 : 1,
                  opacity: isFeatured ? 1 : 0.78,
                }}
                whileHover={{ scale: 1.03, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 22,
                  padding: "26px 24px 22px",
                  background: palette.bg,
                  color: palette.text,
                  cursor: "pointer",
                  minHeight: isFeatured ? 220 : 200,
                  border: isFeatured ? `2px solid ${palette.accent}40` : "2px solid transparent",
                  boxShadow: isFeatured ? `0 16px 40px ${palette.accent}20` : "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <CardOrb color={palette.accent} />

                {/* Quote mark */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 18,
                    opacity: 0.15,
                    fontSize: 48,
                    lineHeight: 1,
                    fontWeight: 900,
                    color: palette.accent,
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Avatar + name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: palette.accent,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 15,
                      fontWeight: 900,
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${palette.accent}40`,
                    }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 800, lineHeight: 1.2 }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 11, opacity: 0.65, lineHeight: 1.3 }}>{t.role}</p>
                  </div>
                </div>

                {/* Quote text */}
                <blockquote style={{ margin: 0, fontSize: 13, lineHeight: 1.65, opacity: 0.85, position: "relative", zIndex: 2 }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Result tag */}
                {t.result && (
                  <div
                    style={{
                      marginTop: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 99,
                      background: "rgba(255,255,255,0.55)",
                      fontSize: 10,
                      fontWeight: 800,
                      color: palette.accent,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <span style={{ fontSize: 8 }}>✦</span>
                    {t.result}
                  </div>
                )}

                {/* Active indicator line */}
                {isFeatured && (
                  <motion.div
                    layoutId="active-line"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: palette.accent,
                      borderRadius: "0 0 22px 22px",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Auto-progress bar */}
        <div style={{ marginTop: 24, height: 2, background: "rgba(16,17,26,.1)", borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            key={active}
            style={{ height: "100%", background: "#FF6B01", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
