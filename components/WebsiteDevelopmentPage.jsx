"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Globe, ShoppingCart, Code2, RefreshCw, Building2,
  GraduationCap, ShieldCheck, Palette, MonitorSmartphone,
  Zap, TrendingUp, Rocket, Building, ChevronDown,
  ArrowRight, Check, Layout, Store,
} from "lucide-react";
import { websiteDevelopmentData as data } from "@/data/service-details/website-development";

/* ─── Icon map ────────────────────────────────────────────────── */
const ICON_MAP = {
  Globe, ShoppingCart, Code2, RefreshCw, Building2,
  GraduationCap, ShieldCheck, Palette, MonitorSmartphone,
  Zap, TrendingUp, Rocket, Building, Layout, Store,
};

/* ─── Reveal animation wrapper ───────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up"    ?  40 : direction === "down"  ? -40 : 0,
      x: direction === "left"  ?  40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay:    reduced ? 0 : delay,
        ease:     [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section header (reused across sections) ────────────────── */
function SectionHeader({ heading, subheading, light = false, center = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <h2
          className="text-3xl font-bold tracking-tight lg:text-5xl"
          style={{ color: light ? "#fff" : "#171717" }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: light ? "#9CA3AF" : "#6B6B70", maxWidth: center ? "42rem" : undefined, margin: center ? "1rem auto 0" : "1rem 0 0" }}
          >
            {subheading}
          </p>
        )}
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const reduced = useReducedMotion();

  /* Split heading into words for stagger */
  const words = data.hero.title.split(" ");

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20 lg:py-28"
      style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background: "rgba(252,110,4,0.10)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background: "rgba(255,138,31,0.08)" }}
      />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-40px)]">
        {/* Eyebrow */}
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#FC6E04" }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        >
          {data.hero.eyebrow}
        </motion.p>

        {/* Heading — word-by-word stagger */}
        <h1 className="mt-5 text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* "Jaipur" gets orange gradient */}
              {word === "Jaipur" ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#FF8A1F,#FC6E04)" }}
                >
                  {word}
                </span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "#9CA3AF" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 }}
        >
          {data.hero.description}
        </motion.p>
        <motion.p
          className="mt-2 max-w-2xl text-base leading-relaxed"
          style={{ color: "#6B7280" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.72 }}
        >
          {data.hero.subDescription}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8 }}
        >
          <Link href={data.hero.primaryCta.href} className="btn-cta-pill">
            {data.hero.primaryCta.text} <ArrowRight size={16} aria-hidden />
          </Link>
          <Link
            href={data.hero.secondaryCta.href}
            className="btn-outline-light"
          >
            {data.hero.secondaryCta.text}
          </Link>
        </motion.div>

        {/* Highlights */}
        <div className="mt-12 flex flex-wrap gap-3">
          {data.hero.highlights.map((h, i) => (
            <motion.span
              key={h}
              className="flex items-center gap-2 rounded-full border-l-2 px-4 py-2 text-sm"
              style={{
                background:   "#1A1A1F",
                borderColor:  "#FC6E04",
                color:        "#D1D5DB",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1 + i * 0.1 }}
            >
              <Check size={14} style={{ color: "#FC6E04", flexShrink: 0 }} aria-hidden />
              {h}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — OUR SERVICES (8 cards)
══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section className="py-24" style={{ background: "#F8F7F4" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.services.heading} subheading={data.services.subheading} />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.services.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Globe;
            return (
              <Reveal key={item.number} delay={i * 0.08}>
                <motion.div
                  className="group relative cursor-default overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300"
                  style={{ borderColor: "#EAE5DF" }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FC6E04";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(252,110,4,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#EAE5DF";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Hover bg tint */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg,rgba(252,110,4,0.05),transparent)" }}
                    aria-hidden
                  />

                  {/* Watermark number */}
                  <span
                    className="pointer-events-none absolute right-4 top-4 select-none text-6xl font-black transition-all duration-300"
                    style={{ color: "rgba(252,110,4,0.10)", lineHeight: 1 }}
                    aria-hidden
                  >
                    {item.number}
                  </span>

                  {/* Icon */}
                  <span
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ background: "#FFF0E4" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FC6E04";
                      e.currentTarget.querySelector("svg").style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFF0E4";
                      e.currentTarget.querySelector("svg").style.color = "#FC6E04";
                    }}
                  >
                    <Icon size={22} style={{ color: "#FC6E04", transition: "color .3s" }} aria-hidden />
                  </span>

                  <h3 className="relative mt-4 text-lg font-bold" style={{ color: "#171717" }}>
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed" style={{ color: "#6B6B70" }}>
                    {item.description}
                  </p>

                  {/* Tech tags */}
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-2 py-1 text-xs transition-colors duration-300 group-hover:border-[#FFD4B3] group-hover:bg-[#FFF0E4] group-hover:text-[#C2410C]"
                        style={{ background: "#F8F7F4", borderColor: "#EAE5DF", color: "#6B6B70" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — WHY LIFTSKY24
══════════════════════════════════════════════════════════════ */
function WhySection() {
  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <Reveal direction="right">
            <div className="relative">
              {/* Decorative circle */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                style={{ background: "rgba(252,110,4,0.10)" }}
              />
              <p className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: "#FC6E04" }}>
                Why LiftSky24
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight lg:text-5xl" style={{ color: "#171717" }}>
                {data.why.heading.split("With Purpose")[0]}
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#FF8A1F,#FC6E04)" }}
                >
                  With Purpose
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "#6B6B70" }}>
                {data.why.subheading}
              </p>
            </div>
          </Reveal>

          {/* Right — feature cards */}
          <div className="flex flex-col gap-6">
            {data.why.items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <Reveal key={item.title} direction="left" delay={i * 0.12}>
                  <div
                    className="group relative flex items-start gap-4 overflow-hidden rounded-xl border-l-[3px] p-5 transition-all duration-300"
                    style={{ background: "transparent", borderLeftColor: "transparent" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FFF0E4";
                      e.currentTarget.style.borderLeftColor = "#FC6E04";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderLeftColor = "transparent";
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#FC6E04]"
                      style={{ background: "#101114" }}
                    >
                      <Icon size={18} style={{ color: "#fff" }} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold" style={{ color: "#171717" }}>{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: "#6B6B70" }}>{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — TECH STACK
══════════════════════════════════════════════════════════════ */
function TechStackSection() {
  return (
    <section className="py-24" style={{ background: "#101114" }}>
      <div className="mx-auto w-[min(1000px,100%-40px)]">
        <SectionHeader heading={data.techStack.heading} subheading={data.techStack.subheading} light />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {data.techStack.items.map((tech, i) => (
            <Reveal key={tech.name} delay={i * 0.08}>
              <motion.div
                className="group relative rounded-xl border p-6 text-center backdrop-blur-sm transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)" }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FC6E04";
                  e.currentTarget.style.background = "rgba(252,110,4,0.08)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(252,110,4,0.20)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Decorative dot */}
                <span
                  className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "#FC6E04" }}
                  aria-hidden
                />
                <p className="text-lg font-bold" style={{ color: "#fff" }}>{tech.name}</p>
                <p className="mt-2 text-sm" style={{ color: "#9CA3AF" }}>{tech.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — PROCESS
══════════════════════════════════════════════════════════════ */
function ProcessSection() {
  const sectionRef = useRef(null);
  const reduced    = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 50%"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24" style={{ background: "#F8F7F4" }} ref={sectionRef}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.process.heading} subheading={data.process.subheading} />

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            {/* Background line */}
            <div
              aria-hidden
              className="absolute top-7 left-0 right-0 h-[2px]"
              style={{ background: "#EAE5DF" }}
            />
            {/* Animated fill line */}
            <motion.div
              aria-hidden
              className="absolute top-7 left-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg,#FF8A1F,#FC6E04)",
                width:      reduced ? "100%" : lineWidth,
              }}
            />

            <div className="relative grid grid-cols-6 gap-4">
              {data.process.steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center">
                    {/* Number circle */}
                    <motion.div
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all duration-500"
                      style={{ borderColor: "#EAE5DF", color: "#6B6B70" }}
                      initial={reduced ? false : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.12 }}
                    >
                      {step.number}
                    </motion.div>
                    <p className="mt-4 text-sm font-bold" style={{ color: "#171717" }}>{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "#6B6B70" }}>{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-10 lg:hidden">
          <div className="relative ml-[19px] border-l-2" style={{ borderColor: "#EAE5DF" }}>
            {data.process.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative mb-8 pl-10">
                  {/* Circle */}
                  <span
                    className="absolute -left-[27px] flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold"
                    style={{ borderColor: "#EAE5DF", color: "#6B6B70" }}
                  >
                    {step.number}
                  </span>
                  <p className="font-bold" style={{ color: "#171717" }}>{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#6B6B70" }}>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — PORTFOLIO
══════════════════════════════════════════════════════════════ */
function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...data.portfolio.categories];

  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.portfolio.heading} subheading={data.portfolio.subheading} />
        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-base" style={{ color: "#6B6B70" }}>
            {data.portfolio.description}
          </p>
        </Reveal>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full border px-4 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FC6E04] focus-visible:ring-offset-2"
                style={{
                  borderColor: isActive ? "#FC6E04" : "#EAE5DF",
                  background:  isActive ? "#FC6E04" : "transparent",
                  color:       isActive ? "#fff"    : "#6B6B70",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#FC6E04";
                    e.currentTarget.style.color = "#FC6E04";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#EAE5DF";
                    e.currentTarget.style.color = "#6B6B70";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Coming-soon card */}
        <Reveal delay={0.2}>
          <div
            className="mt-12 flex flex-col items-center justify-center rounded-2xl px-8 py-20 text-center"
            style={{ background: "linear-gradient(135deg,#101114,#2A160D)" }}
          >
            <Rocket size={48} style={{ color: "#FC6E04" }} aria-hidden />
            <p className="mt-5 text-xl font-semibold" style={{ color: "#fff" }}>
              New projects being added soon
            </p>
            <p className="mt-2 text-base" style={{ color: "#9CA3AF" }}>
              We&apos;re currently documenting our best work
            </p>
            <Link
              href={data.portfolio.cta.href}
              className="btn-cta-pill mt-8"
            >
              {data.portfolio.cta.text} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — WHO WE WORK WITH
══════════════════════════════════════════════════════════════ */
function WhoWeWorkWithSection() {
  return (
    <section className="py-24" style={{ background: "#F8F7F4" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.whoWeWorkWith.heading} subheading={data.whoWeWorkWith.subheading} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.whoWeWorkWith.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Rocket;
            return (
              <Reveal key={item.title} delay={i * 0.12}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border bg-white p-8 transition-all duration-300"
                  style={{ borderColor: "#EAE5DF" }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(252,110,4,0.10)";
                    /* bottom accent bar */
                    e.currentTarget.querySelector(".accent-bar").style.transform = "scaleX(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.querySelector(".accent-bar").style.transform = "scaleX(0)";
                  }}
                >
                  {/* Bottom accent bar */}
                  <div
                    className="accent-bar pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left"
                    style={{
                      background:  "linear-gradient(90deg,#FF8A1F,#FC6E04)",
                      transform:   "scaleX(0)",
                      transition:  "transform .3s ease",
                    }}
                    aria-hidden
                  />

                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                    style={{ background: "#FFF0E4" }}
                  >
                    <Icon size={24} style={{ color: "#FC6E04" }} aria-hidden />
                  </div>

                  <h3 className="mt-5 text-xl font-bold" style={{ color: "#171717" }}>{item.title}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: "#6B6B70" }}>{item.description}</p>

                  <p className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2" style={{ color: "#FC6E04" }}>
                    Learn more <ArrowRight size={14} aria-hidden />
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — LOCAL SEO
══════════════════════════════════════════════════════════════ */
function LocalSeoSection() {
  return (
    <section className="py-20" style={{ background: "#fff" }}>
      <div className="mx-auto w-[min(900px,100%-40px)]">
        <Reveal>
          <div className="text-center">
            {/* Orange accent bar */}
            <div className="mx-auto mb-8 h-1 w-16 rounded-full" style={{ background: "#FC6E04" }} aria-hidden />
            <h2 className="text-2xl font-bold lg:text-3xl" style={{ color: "#171717" }}>
              {data.localSeo.heading}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 space-y-4 text-center">
            {data.localSeo.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "#6B6B70" }}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — FAQ
══════════════════════════════════════════════════════════════ */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24" style={{ background: "#F8F7F4" }}>
      <div className="mx-auto w-[min(768px,100%-40px)]">
        <SectionHeader heading="Frequently Asked Questions" />

        <div className="mt-12 space-y-3">
          {data.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  className="overflow-hidden rounded-xl border bg-white transition-all duration-300"
                  style={{ borderColor: isOpen ? "#FC6E04" : "#EAE5DF", borderLeftWidth: isOpen ? 3 : 1 }}
                >
                  <button
                    id={`faq-btn-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6E04] focus-visible:ring-inset"
                  >
                    <span
                      className="font-semibold transition-colors duration-200"
                      style={{ color: isOpen ? "#FC6E04" : "#171717" }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        color:     isOpen ? "#FC6E04" : "#9CA3AF",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#6B6B70" }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — FINAL CTA
══════════════════════════════════════════════════════════════ */
function FinalCtaSection() {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ background: "rgba(252,110,4,0.08)" }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #FC6E04 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto w-[min(900px,100%-40px)] text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl">
              {data.finalCta.heading.split("Great Together.")[0]}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#FF8A1F,#FC6E04)" }}
              >
                Great Together.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "#9CA3AF" }}>
              {data.finalCta.description}
            </p>
            <p className="mt-2 text-base" style={{ color: "#6B7280" }}>
              {data.finalCta.subDescription}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href={data.finalCta.primaryCta.href} className="btn-cta-pill">
                {data.finalCta.primaryCta.text} <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={data.finalCta.secondaryCta.href} className="btn-outline-light">
                {data.finalCta.secondaryCta.text}
              </Link>
            </div>

            <p
              className="mt-8 text-sm uppercase tracking-wider"
              style={{ color: "#6B7280" }}
            >
              {data.finalCta.supportingText}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════ */
export default function WebsiteDevelopmentPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <TechStackSection />
      <ProcessSection />
      <PortfolioSection />
      <WhoWeWorkWithSection />
      <LocalSeoSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
