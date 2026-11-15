"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const SERVICE_IMAGE = "/Bg/LiftSky24 Neon Service Hub.png";

/* Word-by-word heading split */
function AnimatedHeading({ reduced }) {
  /* "Everything You Need to Build, Launch & Grow." — highlight: "Build, Launch & Grow." */
  const before  = ["Everything", "You", "Need", "to"];
  const accent  = ["Build,", "Launch", "&", "Grow."];

  return (
    <h1 className="font-black leading-[1.08] tracking-tight"
      style={{ fontSize: "clamp(2rem,4.2vw,3.6rem)", color: "#fff" }}>
      <span className="block">
        {before.map((w, i) => (
          <motion.span
            key={w}
            className="mr-[0.22em] inline-block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </span>
      <span className="block">
        {accent.map((w, i) => (
          <motion.span
            key={w}
            className="mr-[0.22em] inline-block bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3 + (before.length + i) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export default function ServicesHero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#080A0D", minHeight: "clamp(540px,90vh,860px)" }}
    >
      {/* ── Background glows ── */}
      {/* Left ambient — stays behind text, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "rgba(252,110,4,0.06)" }}
      />
      {/* Right atmospheric — behind the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 translate-x-[20%] rounded-full blur-[120px]"
        style={{ background: "rgba(252,110,4,0.14)" }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #FC6E04 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative mx-auto flex h-full w-[min(1400px,100%-40px)] flex-col items-center gap-10 py-16 lg:flex-row lg:items-center lg:gap-0 lg:py-0" style={{ minHeight: "inherit" }}>

        {/* ════════════ LEFT — text content (42%) ════════════ */}
        <div className="z-10 w-full lg:w-[42%] lg:shrink-0 lg:pr-10">

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
            style={{ borderColor: "rgba(252,110,4,0.35)", background: "rgba(252,110,4,0.10)" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 }}
          >
            <Sparkles size={13} style={{ color: "#FC6E04" }} aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#FF8A1F" }}>
              Digital Solutions That Drive Growth
            </span>
          </motion.div>

          {/* Heading */}
          <div className="mt-6">
            <AnimatedHeading reduced={reduced} />
          </div>

          {/* Description */}
          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed sm:text-[1.05rem]"
            style={{ color: "#B8B8BE" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85 }}
          >
            From stunning websites and powerful applications to custom software, creative branding and
            performance-driven marketing — we bring every part of your digital growth under one roof.
          </motion.p>

          {/* Supporting text */}
          <motion.p
            className="mt-3 text-sm font-semibold"
            style={{ color: "#FC6E04" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1 }}
          >
            7 Core Services. One Digital Growth Partner.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.05 }}
          >
            {/* Primary */}
            <motion.div whileHover={reduced ? undefined : { y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200"
                style={{
                  background:  "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                  color:       "#101114",
                  boxShadow:   "0 8px 24px rgba(252,110,4,0.30)",
                }}
              >
                Explore Our Services <ArrowRight size={15} aria-hidden />
              </Link>
            </motion.div>

            {/* Secondary */}
            <motion.div whileHover={reduced ? undefined : { y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(252,110,4,0.50)", color: "#fff" }}
              >
                Let's Discuss Your Project
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════ RIGHT — service ecosystem image (58%) ════════════ */}
        <motion.div
          className="relative flex w-full items-center justify-center lg:w-[58%] lg:pl-6"
          initial={{ opacity: 0, x: reduced ? 0 : 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Blending mask — fades left edge into the dark bg so no hard border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{ background: "linear-gradient(to right, #080A0D, transparent)" }}
          />
          {/* Fades bottom edge slightly */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16"
            style={{ background: "linear-gradient(to top, #080A0D, transparent)" }}
          />

          <Image
            src={SERVICE_IMAGE}
            alt="LiftSky24 seven core services — Website Development, App Development, Software Development, Social Media Management, SEO, Graphic Design and Digital Marketing"
            width={1200}
            height={900}
            priority
            className="relative z-0 h-auto w-full max-w-[720px] select-none"
            style={{ objectFit: "contain" }}
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
