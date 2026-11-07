'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, Rocket, Sparkles } from 'lucide-react';
import Hero3DVisual from './Hero3DVisual';

const HEADING_WORDS = [
  { word: 'We' },
  { word: 'Build' },
  { word: 'Digital', accent: true },
  { word: 'Experiences', accent: true },
  { word: 'That' },
  { word: 'Move' },
  { word: 'Business', accent: true },
  { word: 'Forward.', accent: true },
];

const TRUST_ITEMS = [
  { label: 'Creative Digital Solutions', Icon: Sparkles },
  { label: 'Built for Business Growth', Icon: Rocket },
  { label: 'Technology That Scales', Icon: Layers },
];

const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection({
  primaryHref = '#contact',
  secondaryHref = '#services',
}) {
  const reduced = Boolean(useReducedMotion());

  const variants = useMemo(
    () => ({
      container: {
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.1 } },
      },
      item: {
        hidden: { opacity: 0, y: reduced ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      },
      headingWrap: {
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
      },
      word: {
        hidden: { y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
      },
    }),
    [reduced]
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-x-clip bg-[#090A0D] font-['Sora',ui-sans-serif,system-ui,sans-serif] text-white"
    >
      {/* ------------------------------ Background ------------------------------ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={reduced ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.22),transparent_65%)] blur-3xl"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -30, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.12),transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090A0D] to-transparent" />
      </div>

      {/* -------------------------------- Layout -------------------------------- */}
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:pt-32 lg:grid-cols-2 lg:gap-8 lg:pb-20">
        {/* LEFT: content */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.p
            variants={variants.item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#FF853D] backdrop-blur-md sm:text-xs"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6A1A] opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6A1A]" />
            </span>
            YOUR DIGITAL GROWTH PARTNER
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={variants.headingWrap}
            className="mt-6 max-w-[16ch] text-[2.5rem] font-extrabold leading-[1.06] tracking-tight sm:max-w-none sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {HEADING_WORDS.map(({ word, accent }) => (
              <span key={word}>
                <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
                  <motion.span
                    variants={variants.word}
                    className={
                      accent
                        ? 'inline-block bg-gradient-to-r from-[#FF6A1A] via-[#FF853D] to-[#FFB067] bg-clip-text text-transparent'
                        : 'inline-block'
                    }
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={variants.item}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            From stunning websites and powerful software to mobile applications and
            result-driven digital marketing, we transform your ideas into digital solutions that
            help your business grow.
          </motion.p>

          <motion.div
            variants={variants.item}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <motion.a
              href={primaryHref}
              whileHover={reduced ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6A1A] to-[#FF853D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(255,106,26,0.7)] outline-none transition-shadow hover:shadow-[0_14px_50px_-6px_rgba(255,133,61,0.85)] focus-visible:ring-2 focus-visible:ring-[#FF853D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D] sm:text-base"
            >
              Start a Project
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              href={secondaryHref}
              whileHover={reduced ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-white outline-none backdrop-blur-md transition-colors hover:border-[#FF853D]/50 hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-[#FF853D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0D] sm:text-base"
            >
              Explore Services
            </motion.a>
          </motion.div>

          <motion.ul
            variants={variants.item}
            aria-label="Why LiftSky24"
            className="mt-10 grid w-full gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-4"
          >
            {TRUST_ITEMS.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-[#FF853D]">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* RIGHT: 3D Digital Innovation Universe */}
        <div className="relative w-full">
          <Hero3DVisual />
        </div>
      </div>
    </section>
  );
}
