"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useAnimationFrame,
} from "framer-motion";
import {
  MessageSquare, Mic, MessageCircle, ArrowRight,
  ChevronDown, Mic2, Phone, Waves,
} from "lucide-react";

/* ─── Shared tokens ──────────────────────────────────────────── */
const C = {
  bg:        "#080A0D",
  panel:     "#17191D",
  orange:    "#FC6E04",
  deepOrange:"#E04F00",
  warmOrange:"#FF8A1F",
  white:     "#F8F7F4",
  muted:     "#8A8A95",
  border:    "rgba(252,110,4,0.22)",
  glassBg:   "rgba(23,25,29,0.85)",
};

/* ─── Animated travelling particle along an SVG path ─────────── */
function Particle({ pathId, duration = 3, delay = 0, reduced }) {
  if (reduced) return null;
  return (
    <motion.circle r="3" fill={C.orange} opacity="0.9"
      style={{ filter: `drop-shadow(0 0 4px ${C.orange})` }}>
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        keyPoints="0;1" keyTimes="0;1" calcMode="linear">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );
}

/* ─── Animated audio waveform bars ──────────────────────────── */
function Waveform({ reduced }) {
  const heights = [4, 8, 14, 10, 18, 10, 14, 8, 4];
  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 3, height: h, background: C.orange, opacity: 0.8 }}
          animate={reduced ? undefined : { scaleY: [1, 1.8, 0.6, 1.4, 1], opacity: [0.8, 1, 0.5, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

/* ─── Single floating communication panel ───────────────────── */
function CommPanel({ children, floatY = [-6, 6], floatDuration = 4, delay = 0, style = {}, className = "", reduced }) {
  return (
    <motion.div
      className={`rounded-2xl ${className}`}
      style={{
        background:    C.glassBg,
        border:        `1px solid ${C.border}`,
        backdropFilter:"blur(14px)",
        boxShadow:     `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(252,110,4,0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
        ...style,
      }}
      animate={reduced ? undefined : { y: floatY }}
      transition={{ duration: floatDuration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      whileHover={{ scale: 1.03, boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(252,110,4,0.35)` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Right visual: communication hub ───────────────────────── */
function CommVisual({ reduced }) {
  /* SVG path IDs for particle travel */
  const paths = {
    toSms:      "path-to-sms",
    toVoice:    "path-to-voice",
    toWhatsapp: "path-to-whatsapp",
  };

  return (
    <div className="relative flex h-full min-h-[380px] w-full items-center justify-center sm:min-h-[460px]">

      {/* Orange ambient glow behind hub */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{ background: "rgba(252,110,4,0.14)" }} />

      {/* ── SVG connection lines + particles ── */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Centre point: 200,200 */}
        {/* SMS panel: ~top-left  → 90,100  */}
        {/* Voice panel: ~top-right → 310,100 */}
        {/* WhatsApp panel: ~bottom-center → 200,330 */}

        {/* Line to SMS */}
        <path id={paths.toSms}
          d="M 200 200 C 160 165, 130 140, 90 110"
          fill="none" stroke={C.orange} strokeWidth="1.2" strokeDasharray="4 4"
          opacity="0.45" filter="url(#glow-line)" />
        {/* Line to Voice */}
        <path id={paths.toVoice}
          d="M 200 200 C 240 165, 270 140, 310 110"
          fill="none" stroke={C.orange} strokeWidth="1.2" strokeDasharray="4 4"
          opacity="0.45" filter="url(#glow-line)" />
        {/* Line to WhatsApp */}
        <path id={paths.toWhatsapp}
          d="M 200 200 C 200 240, 200 280, 200 320"
          fill="none" stroke={C.orange} strokeWidth="1.2" strokeDasharray="4 4"
          opacity="0.45" filter="url(#glow-line)" />

        {/* Glowing endpoint nodes */}
        {[[90,110],[310,110],[200,320]].map(([cx,cy],i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="4" fill={C.orange}
            style={{ filter: `drop-shadow(0 0 5px ${C.orange})` }}
            animate={reduced ? undefined : { opacity: [0.5,1,0.5], r: [3,5,3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }} />
        ))}

        {/* Particles travelling along paths */}
        <Particle pathId={paths.toSms}      duration={2.6} delay={0}    reduced={reduced} />
        <Particle pathId={paths.toVoice}    duration={3.0} delay={0.9}  reduced={reduced} />
        <Particle pathId={paths.toWhatsapp} duration={2.4} delay={0.4}  reduced={reduced} />
      </svg>

      {/* ── Central hub ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
        style={{
          width: 80, height: 80,
          background: "linear-gradient(135deg,#FF8A1F,#FC6E04,#E04F00)",
          boxShadow: `0 0 0 8px rgba(252,110,4,0.12), 0 0 40px rgba(252,110,4,0.35)`,
        }}
        animate={reduced ? undefined : {
          boxShadow: [
            `0 0 0 8px rgba(252,110,4,0.12), 0 0 40px rgba(252,110,4,0.35)`,
            `0 0 0 14px rgba(252,110,4,0.08), 0 0 60px rgba(252,110,4,0.50)`,
            `0 0 0 8px rgba(252,110,4,0.12), 0 0 40px rgba(252,110,4,0.35)`,
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08 }}
      >
        <MessageCircle size={32} color="#101114" strokeWidth={2.2} aria-hidden />
        <p className="mt-0.5 text-[9px] font-black uppercase tracking-widest" style={{ color: "#101114" }}>Hub</p>
      </motion.div>

      {/* ── SMS Panel — top-left ── */}
      <motion.div
        className="absolute z-10"
        style={{ top: "4%", left: "2%", width: "clamp(145px,40%,175px)" }}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.4 }}
      >
        <CommPanel floatY={[-5, 5]} floatDuration={4.2} delay={0} reduced={reduced} style={{ padding: "14px 16px" }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(252,110,4,0.18)" }}>
              <MessageSquare size={14} color={C.orange} aria-hidden />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.orange }}>SMS</span>
          </div>
          {/* Message bubbles */}
          <div className="space-y-1.5">
            <div className="rounded-xl rounded-tl-sm px-3 py-1.5 text-right" style={{ background: "rgba(252,110,4,0.20)", maxWidth: "80%", marginLeft: "auto" }}>
              <p className="text-[10px] font-medium" style={{ color: C.white }}>Hi, we need a website</p>
            </div>
            <div className="rounded-xl rounded-tl-sm px-3 py-1.5" style={{ background: "rgba(248,247,244,0.10)", maxWidth: "85%" }}>
              <p className="text-[10px] font-medium" style={{ color: C.muted }}>On it! Let's connect</p>
            </div>
          </div>
        </CommPanel>
      </motion.div>

      {/* ── Voice Panel — top-right ── */}
      <motion.div
        className="absolute z-10"
        style={{ top: "4%", right: "2%", width: "clamp(145px,40%,175px)" }}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.6 }}
      >
        <CommPanel floatY={[-7, 4]} floatDuration={5.1} delay={0.8} reduced={reduced} style={{ padding: "14px 16px" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(252,110,4,0.18)" }}>
              <Mic2 size={14} color={C.orange} aria-hidden />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.orange }}>Voice</span>
          </div>
          <div className="flex flex-col gap-2">
            <Waveform reduced={reduced} />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: C.orange }} />
              <p className="text-[10px]" style={{ color: C.muted }}>Call in progress…</p>
            </div>
          </div>
        </CommPanel>
      </motion.div>

      {/* ── WhatsApp Panel — bottom-center ── */}
      <motion.div
        className="absolute z-10"
        style={{ bottom: "4%", left: "50%", transform: "translateX(-50%)", width: "clamp(160px,45%,195px)" }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.8 }}
      >
        <CommPanel floatY={[-4, 6]} floatDuration={3.8} delay={1.5} reduced={reduced} style={{ padding: "14px 16px" }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(252,110,4,0.18)" }}>
              {/* WhatsApp-inspired chat bubble — no green, uses orange palette */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                  fill={C.orange} opacity="0.9"/>
                <path d="M8.5 9h7M8.5 12h5" stroke="#101114" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.orange }}>WhatsApp</span>
          </div>
          <div className="rounded-xl px-3 py-2" style={{ background: "rgba(252,110,4,0.14)" }}>
            <p className="text-[10px] font-medium leading-snug" style={{ color: C.white }}>
              Quick reply within 24 hours ✓
            </p>
          </div>
        </CommPanel>
      </motion.div>

      {/* Dot-grid background texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle,#FC6E04 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function ContactHero() {
  const reduced    = useReducedMotion();
  const sectionRef = useRef(null);

  const scrollToContact = useCallback(() => {
    const target = document.getElementById("contact-section");
    if (target) {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: C.bg, paddingTop: "clamp(32px,5vw,56px)", paddingBottom: "clamp(48px,6vw,72px)" }}
      aria-label="Contact hero"
    >
      {/* Page-level ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ background: "rgba(252,110,4,0.05)" }} />

      <div className="relative mx-auto w-[min(1280px,100%-40px)]">
        {/* Two-panel grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-6">

          {/* ════════════ LEFT PANEL ════════════ */}
          <motion.div
            className="flex flex-col justify-center rounded-2xl px-8 py-12 sm:px-10 sm:py-14"
            style={{
              background: C.panel,
              border: `1px solid rgba(255,255,255,0.06)`,
              boxShadow: "0 4px 40px rgba(0,0,0,0.40)",
              minHeight: "clamp(360px,55vh,580px)",
            }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <motion.p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color: C.orange }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.2 }}
            >
              Let's Connect
            </motion.p>

            {/* Heading */}
            <motion.h1
              className="mt-5 font-black leading-[1.07] tracking-tight"
              style={{ fontSize: "clamp(2rem,3.6vw,3.2rem)", color: C.white }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Let's Start a{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(110deg,${C.warmOrange},${C.orange},${C.deepOrange})` }}>
                Conversation.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-5 max-w-sm text-base leading-relaxed"
              style={{ color: C.muted, maxWidth: "36ch" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 }}
            >
              Have a project in mind or looking for the right digital partner? Let's talk about your goals
              and explore how we can build something meaningful together.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8 }}
            >
              <motion.a
                href="#contact-section"
                onClick={(e) => { e.preventDefault(); scrollToContact(); }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold"
                style={{
                  background: `linear-gradient(110deg,${C.warmOrange},${C.orange},${C.deepOrange})`,
                  color: "#101114",
                  boxShadow: `0 8px 28px rgba(252,110,4,0.32)`,
                  textDecoration: "none",
                }}
                whileHover={reduced ? undefined : { y: -3, boxShadow: `0 14px 36px rgba(252,110,4,0.45)` }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us <ArrowRight size={15} aria-hidden />
              </motion.a>
            </motion.div>

            {/* Subtle bottom contact hint */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-5 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1 }}
            >
              {[
                { icon: MessageSquare, label: "Message" },
                { icon: Phone,         label: "Call"    },
                { icon: Mic,           label: "WhatsApp"},
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} style={{ color: C.orange }} aria-hidden />
                  <span className="text-xs" style={{ color: C.muted }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════ RIGHT PANEL ════════════ */}
          <motion.div
            className="flex items-center justify-center overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(135deg,#0E1014,#13151A)",
              border: `1px solid rgba(252,110,4,0.10)`,
              boxShadow: "0 4px 40px rgba(0,0,0,0.40)",
              minHeight: "clamp(300px,50vh,580px)",
            }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <CommVisual reduced={reduced} />
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="mt-5 flex justify-center">
          <motion.button
            onClick={scrollToContact}
            aria-label="Scroll to contact form"
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              background: C.white,
              boxShadow: "0 4px 16px rgba(0,0,0,0.30)",
            }}
            whileHover={reduced ? undefined : { y: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.40)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.1 }}
          >
            <ChevronDown size={20} style={{ color: "#101114" }} aria-hidden />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
