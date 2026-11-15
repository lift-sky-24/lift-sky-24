"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

const HERO_IMAGE = "/Bg/liftsky24-industries-hero.webp";

/*
 * Industry labels — percentage-based positions relative to the image wrapper.
 * top/left are % of the image container.
 * Mapped to approximate building locations in the isometric city scene.
 */
const LABELS = [
  { id: 1,  name: "E-Commerce & Retail",        top: "12%", left: "8%"  },
  { id: 2,  name: "Healthcare",                 top: "6%",  left: "32%" },
  { id: 3,  name: "Education",                  top: "14%", left: "56%" },
  { id: 4,  name: "Real Estate",                top: "4%",  left: "76%" },
  { id: 5,  name: "Hospitality & Food",         top: "38%", left: "5%"  },
  { id: 6,  name: "Professional Services",      top: "30%", left: "30%" },
  { id: 7,  name: "Manufacturing",              top: "28%", left: "62%" },
  { id: 8,  name: "Fitness & Wellness",         top: "52%", left: "18%" },
  { id: 9,  name: "Logistics & Transportation", top: "54%", left: "50%" },
  { id: 10, name: "Beauty & Fashion",           top: "48%", left: "80%" },
];

/* Mobile shows only 4 labels on the image; rest as chips below */
const MOBILE_ON_IMAGE  = [1, 3, 5, 9];
const MOBILE_AS_CHIPS  = LABELS.filter((l) => !MOBILE_ON_IMAGE.includes(l.id));

/* Individual label pill */
function Label({ item, index, reduced }) {
  return (
    <motion.div
      aria-hidden="true"
      className="ind-label absolute"
      style={{ top: item.top, left: item.left, transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0, scale: 0.75, y: 10 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay:    reduced ? 0 : 0.6 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white"
        style={{
          background:   "rgba(10,11,14,0.78)",
          backdropFilter: "blur(10px)",
          border:       "1px solid rgba(252,110,4,0.40)",
          boxShadow:    "0 2px 16px rgba(252,110,4,0.14), 0 1px 4px rgba(0,0,0,0.5)",
          whiteSpace:   "nowrap",
          fontSize:     "clamp(9px,1vw,12px)",
          fontWeight:   700,
          lineHeight:   1,
          letterSpacing: "0.01em",
        }}
      >
        {/* Orange dot */}
        <span
          style={{
            width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
            background: "#FC6E04",
            boxShadow: "0 0 6px rgba(252,110,4,0.80)",
          }}
        />
        {item.name}
      </motion.div>
    </motion.div>
  );
}

export default function IndustriesHero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#080A0D", minHeight: "clamp(520px,88vh,860px)" }}
    >
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: "rgba(252,110,4,0.05)" }} />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 translate-x-[15%] rounded-full blur-[110px]"
        style={{ background: "rgba(252,110,4,0.12)" }} />
      {/* Dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{ backgroundImage: "radial-gradient(circle,#FC6E04 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* Main flex container */}
      <div
        className="relative mx-auto flex h-full w-[min(1400px,100%-32px)] flex-col items-center gap-8 py-14 lg:flex-row lg:items-center lg:gap-0 lg:py-0"
        style={{ minHeight: "inherit" }}
      >
        {/* ════ LEFT — text content ════ */}
        <div className="z-10 w-full shrink-0 lg:w-[42%] lg:pr-10">

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{ borderColor: "rgba(252,110,4,0.35)", background: "rgba(252,110,4,0.10)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 }}
          >
            <Building2 size={13} style={{ color: "#FC6E04" }} aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#FF8A1F" }}>
              Across Every Sector
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mt-5 font-black leading-[1.08] tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem,3.8vw,3.4rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Digital Solutions Built{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}>
              for Your Industry
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed sm:text-[1.05rem]"
            style={{ color: "#B8B8BE" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 }}
          >
            From healthcare and education to retail, hospitality and finance — we build digital solutions
            shaped around how your specific industry works, so you can focus on growing your business.
          </motion.p>

          {/* Industry count */}
          <motion.p
            className="mt-3 text-sm font-semibold"
            style={{ color: "#FC6E04" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.75 }}
          >
            10+ Industries. Tailored Digital Strategies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85 }}
          >
            <motion.div whileHover={reduced ? undefined : { y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                style={{
                  background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                  color: "#101114",
                  boxShadow: "0 8px 24px rgba(252,110,4,0.28)",
                }}
              >
                Start a Project <ArrowRight size={15} aria-hidden />
              </Link>
            </motion.div>
            <motion.div whileHover={reduced ? undefined : { y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(252,110,4,0.45)", color: "#fff" }}
              >
                Our Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile: industry chips below CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-2 lg:hidden"
            aria-label="Industries we serve"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.1 }}
          >
            {LABELS.map((l) => (
              <span
                key={l.id}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                style={{
                  background: "rgba(252,110,4,0.12)",
                  border: "1px solid rgba(252,110,4,0.30)",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FC6E04", flexShrink: 0, display: "inline-block" }} />
                {l.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ════ RIGHT — image + floating labels ════ */}
        <motion.div
          className="relative w-full lg:w-[58%] lg:pl-4"
          initial={{ opacity: 0, x: reduced ? 0 : 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image wrapper — position:relative so labels are absolute children */}
          <div className="relative mx-auto w-full max-w-[760px]">
            {/* Left edge blend */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 lg:w-24"
              style={{ background: "linear-gradient(to right,#080A0D,transparent)" }} />
            {/* Bottom edge blend */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12"
              style={{ background: "linear-gradient(to top,#080A0D,transparent)" }} />
            {/* Top edge blend */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8"
              style={{ background: "linear-gradient(to bottom,#080A0D,transparent)" }} />

            <Image
              src={HERO_IMAGE}
              alt="LiftSky24 industries we serve — isometric city illustration showing E-Commerce, Healthcare, Education, Real Estate, Hospitality, Professional Services, Manufacturing, Fitness, Logistics and Beauty sectors"
              width={1600}
              height={900}
              priority
              className="h-auto w-full select-none"
              style={{ objectFit: "contain", display: "block" }}
              sizes="(min-width:1024px) 58vw, 100vw"
            />

            {/* ── Desktop/tablet floating labels (hidden on mobile) ── */}
            <div className="hidden md:block" aria-hidden="true">
              {LABELS.map((item, i) => (
                <Label key={item.id} item={item} index={i} reduced={reduced} />
              ))}
            </div>

            {/* ── Mobile: 4 key labels only on the image ── */}
            <div className="md:hidden" aria-hidden="true">
              {LABELS.filter((l) => MOBILE_ON_IMAGE.includes(l.id)).map((item, i) => (
                <Label key={item.id} item={item} index={i} reduced={reduced} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scoped label hover style */}
      <style>{`
        @media (hover:hover) {
          .ind-label:hover > div {
            border-color: rgba(252,110,4,0.80) !important;
            box-shadow: 0 4px 20px rgba(252,110,4,0.30), 0 1px 4px rgba(0,0,0,0.5) !important;
          }
        }
      `}</style>
    </section>
  );
}
