"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useInView, useReducedMotion,
  useScroll, useTransform,
} from "framer-motion";
import {
  MapPin, Settings, FileText, PenTool, ShoppingCart,
  Link2, Search, Target, ShieldCheck, BarChart3,
  Layers, SlidersHorizontal, Code2, Server, Layout,
  Globe, ShoppingBag, Building2, GraduationCap, Heart,
  Plane, Utensils, Monitor, ChevronDown, ArrowRight,
  Check, Wrench,
} from "lucide-react";
import { seoData as data } from "@/data/service-details/seo";
import ServicePricingSection from "@/components/ServicePricingSection";

/* ─── Icon map ───────────────────────────────────────────────── */
const ICON_MAP = {
  MapPin, Settings, FileText, PenTool, ShoppingCart,
  Link2, Search, Target, ShieldCheck, BarChart3,
  Layers, SlidersHorizontal, Code2, Server, Layout,
  Globe, ShoppingBag, Building2, GraduationCap, Heart,
  Plane, Utensils, Monitor, Wrench,
};

/* ─── Reveal wrapper ─────────────────────────────────────────── */
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
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader({ heading, subheading, light = false }) {
  return (
    <div className="text-center">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight lg:text-5xl"
          style={{ color: light ? "#fff" : "#171717" }}>
          {heading}
        </h2>
        {subheading && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed"
            style={{ color: light ? "#9CA3AF" : "#6B6B70" }}>
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
function HeroSection({ breadcrumb = [] }) {
  const reduced = useReducedMotion();
  const words   = data.hero.title.split(" ");

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20 lg:py-28"
      style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}
    >
      {/* Glows */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background: "rgba(252,110,4,0.10)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background: "rgba(255,138,31,0.08)" }} />
      {/* Subtle "search results" line pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,rgba(252,110,4,0.03) 0px,rgba(252,110,4,0.03) 1px,transparent 1px,transparent 40px)",
        }} />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-40px)]">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4.5 2.5 L7.5 6 L4.5 9.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {i < breadcrumb.length - 1
                  ? <a href={item.href} style={{ color: "rgba(255,255,255,0.50)", textDecoration: "none" }} className="hover:text-white transition-colors">{item.name}</a>
                  : <span style={{ color: "#FC6E04" }} aria-current="page">{item.name}</span>
                }
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#FC6E04" }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          {data.hero.eyebrow}
        </motion.p>

        {/* Heading — word stagger */}
        <h1 className="mt-5 text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span key={i} className="mr-[0.22em] inline-block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              {word === "Jaipur" ? (
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#FF8A1F,#FC6E04)" }}>
                  {word}
                </span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "#9CA3AF" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 }}>
          {data.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8 }}>
          <Link href={data.hero.primaryCta.href} className="btn-cta-pill">
            <Search size={15} aria-hidden /> {data.hero.primaryCta.text}
          </Link>
          <Link href={data.hero.secondaryCta.href} className="btn-outline-light">
            {data.hero.secondaryCta.text}
          </Link>
        </motion.div>

        {/* Highlights */}
        <div className="mt-12 flex flex-wrap gap-3">
          {data.hero.highlights.map((h, i) => (
            <motion.span key={h}
              className="flex items-center gap-2 rounded-full border-l-2 px-4 py-2 text-sm"
              style={{ background: "#1A1A1F", borderColor: "#FC6E04", color: "#D1D5DB" }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1 + i * 0.1 }}>
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
   SECTION 2 — SEO SERVICES (7 cards)
══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section className="py-24" style={{ background: "#F8F7F4" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.services.heading} subheading={data.services.subheading} />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.services.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Search;
            /* Last card (index 6 in a 4-col grid) → push to center col 2 */
            const isLast = i === data.services.items.length - 1;
            return (
              <Reveal key={item.number} delay={i * 0.08}>
                <motion.div
                  className={`group relative cursor-default overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300${isLast ? " xl:col-start-2" : ""}`}
                  style={{ borderColor: "#EAE5DF" }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FC6E04"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(252,110,4,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EAE5DF"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg,rgba(252,110,4,0.05),transparent)" }} aria-hidden />
                  <span className="pointer-events-none absolute right-4 top-4 select-none text-6xl font-black"
                    style={{ color: "rgba(252,110,4,0.10)", lineHeight: 1 }} aria-hidden>
                    {item.number}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#FC6E04]"
                    style={{ background: "#FFF0E4" }}>
                    <Icon size={22} style={{ color: "#FC6E04", transition: "color .3s" }}
                      className="group-hover:text-white" aria-hidden />
                  </span>
                  <h3 className="relative mt-4 text-lg font-bold" style={{ color: "#171717" }}>{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed" style={{ color: "#6B6B70" }}>{item.description}</p>
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t}
                        className="rounded-full border px-2 py-1 text-xs transition-colors duration-300 group-hover:border-[#FFD4B3] group-hover:bg-[#FFF0E4] group-hover:text-[#C2410C]"
                        style={{ background: "#F8F7F4", borderColor: "#EAE5DF", color: "#6B6B70" }}>
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
   SECTION 3 — PLATFORMS & INDUSTRIES
══════════════════════════════════════════════════════════════ */
function PlatformsSection() {
  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={data.platforms.heading} subheading={data.platforms.subheading} />

        {/* Platforms */}
        <Reveal delay={0.1}>
          <h3 className="mt-12 mb-6 text-xl font-bold" style={{ color: "#171717" }}>Supported Platforms</h3>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {data.platforms.platforms.map((p, i) => {
            const Icon = ICON_MAP[p.icon] ?? Globe;
            return (
              <Reveal key={p.name} delay={i * 0.08} direction="left">
                <motion.div
                  className="group cursor-default rounded-xl border p-5 text-center transition-all duration-300"
                  style={{ background: "#F8F7F4", borderColor: "#EAE5DF" }}
                  whileHover={{ scale: 1.03 }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#101114"; e.currentTarget.style.borderColor = "#FC6E04"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#F8F7F4"; e.currentTarget.style.borderColor = "#EAE5DF"; }}
                >
                  <Icon size={28} style={{ color: "#FC6E04", margin: "0 auto" }} aria-hidden />
                  <p className="mt-3 text-sm font-semibold transition-colors duration-300 group-hover:text-white"
                    style={{ color: "#171717" }}>
                    {p.name}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Industries */}
        <Reveal delay={0.1}>
          <h3 className="mt-14 mb-6 text-xl font-bold" style={{ color: "#171717" }}>Industries We Serve</h3>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.platforms.industries.map((ind, i) => {
            const Icon = ICON_MAP[ind.icon] ?? Globe;
            return (
              <Reveal key={ind.name} delay={i * 0.1} direction="right">
                <motion.div
                  className="group flex cursor-default items-center gap-3 rounded-xl border p-4 transition-colors duration-300"
                  style={{ background: "#fff", borderColor: "#EAE5DF" }}
                  whileHover={{ x: 4 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FC6E04"; e.currentTarget.style.background = "#FFF0E4"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EAE5DF"; e.currentTarget.style.background = "#fff"; }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#FC6E04]"
                    style={{ background: "#FFF0E4" }}>
                    <Icon size={18} style={{ color: "#FC6E04" }} className="group-hover:text-white transition-colors duration-300" aria-hidden />
                  </span>
                  <p className="text-sm font-medium" style={{ color: "#171717" }}>{ind.name}</p>
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
   SECTION 4 — WHY LIFTSKY24 (dark)
══════════════════════════════════════════════════════════════ */
function WhySection() {
  return (
    <section className="py-24" style={{ background: "#101114" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader
          heading={data.why.heading}
          subheading={data.why.subheading}
          light
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.why.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Target;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}
                  whileHover={{ scale: 1.03 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(252,110,4,0.50)"; e.currentTarget.style.background = "rgba(252,110,4,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  {/* Glow */}
                  <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "rgba(252,110,4,0.10)" }} aria-hidden />
                  {/* Left accent bar */}
                  <div className="absolute bottom-6 left-0 top-6 w-[3px] origin-top rounded-full transition-transform duration-300 group-hover:scale-y-100"
                    style={{ background: "#FC6E04", transform: "scaleY(0)" }} aria-hidden />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#FC6E04]"
                    style={{ background: "rgba(252,110,4,0.15)" }}>
                    <Icon size={20} style={{ color: "#FC6E04" }} className="group-hover:text-[#101114] transition-colors duration-300" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{item.description}</p>
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

        {/* Desktop */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div aria-hidden className="absolute top-7 left-0 right-0 h-[2px]" style={{ background: "#EAE5DF" }} />
            <motion.div aria-hidden className="absolute top-7 left-0 h-[2px]"
              style={{ background: "linear-gradient(90deg,#FF8A1F,#FC6E04)", width: reduced ? "100%" : lineWidth }} />
            <div className="relative grid grid-cols-6 gap-4">
              {data.process.steps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center">
                    {/* Progress label */}
                    <motion.p className="mb-2 text-xs font-bold" style={{ color: "#FC6E04" }}
                      initial={reduced ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}>
                      {step.progress}
                    </motion.p>
                    {/* Circle */}
                    <motion.div
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all duration-500"
                      style={{ borderColor: "#EAE5DF", color: "#6B6B70" }}
                      initial={reduced ? false : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.12 }}>
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

        {/* Mobile vertical */}
        <div className="mt-10 lg:hidden">
          <div className="relative ml-[19px] border-l-2" style={{ borderColor: "#EAE5DF" }}>
            {data.process.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative mb-8 pl-10">
                  <span className="absolute -left-[27px] flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold"
                    style={{ borderColor: "#EAE5DF", color: "#6B6B70" }}>
                    {step.number}
                  </span>
                  <p className="text-xs font-bold mb-1" style={{ color: "#FC6E04" }}>{step.progress}</p>
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
   SECTION 6 — PORTFOLIO / COMING SOON
══════════════════════════════════════════════════════════════ */
function PortfolioSection() {
  const sampleMetrics = [
    { label: "Organic Traffic",   value: "+147%", note: "Sample format — real data coming soon" },
    { label: "Keyword Rankings",  value: "Top 3",  note: "Sample format — real data coming soon" },
    { label: "Local Visibility",  value: "+89%",  note: "Sample format — real data coming soon" },
  ];

  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="mx-auto w-[min(900px,100%-40px)]">
        <SectionHeader heading={data.portfolio.heading} subheading={data.portfolio.subheading} />
        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-sm italic" style={{ color: "#6B6B70" }}>{data.portfolio.note}</p>
        </Reveal>

        {/* Coming-soon card */}
        <Reveal delay={0.2}>
          <motion.div
            className="relative mt-10 overflow-hidden rounded-2xl px-10 py-16 text-center"
            style={{ background: "linear-gradient(135deg,#101114,#2A160D)" }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            {/* Watermark */}
            <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 select-none font-black text-white opacity-[0.02]"
              style={{ fontSize: "20rem", lineHeight: 1 }}>
              S
            </span>
            <Search size={56} style={{ color: "#FC6E04", margin: "0 auto" }} aria-hidden />
            <h3 className="mt-6 text-2xl font-bold text-white">SEO Case Studies Coming Soon</h3>
            <p className="mx-auto mt-3 max-w-lg" style={{ color: "#9CA3AF" }}>
              We&apos;re currently documenting our SEO results with verified performance data. Request a free SEO audit to see how we can improve your website&apos;s rankings.
            </p>
            <Link href={data.portfolio.cta.href} className="btn-cta-pill mt-8 inline-flex">
              {data.portfolio.cta.text} <ArrowRight size={15} aria-hidden />
            </Link>
          </motion.div>
        </Reveal>

        {/* Sample metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {sampleMetrics.map((m, i) => (
            <Reveal key={m.label} delay={0.1 + i * 0.1}>
              <div className="rounded-xl border p-5" style={{ background: "#F8F7F4", borderColor: "#EAE5DF" }}>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B6B70" }}>{m.label}</p>
                <p className="mt-1 text-3xl font-black" style={{ color: "#FC6E04" }}>{m.value}</p>
                <p className="mt-1 text-xs italic" style={{ color: "#6B6B70" }}>{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — FAQ
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
                <div className="overflow-hidden rounded-xl border bg-white transition-all duration-300"
                  style={{ borderColor: isOpen ? "#FC6E04" : "#EAE5DF", borderLeftWidth: isOpen ? 3 : 1 }}>
                  <button
                    id={`seo-faq-btn-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`seo-faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6E04] focus-visible:ring-inset">
                    <span className="font-semibold transition-colors duration-200"
                      style={{ color: isOpen ? "#FC6E04" : "#171717" }}>
                      {faq.question}
                    </span>
                    <ChevronDown size={18} className="shrink-0 transition-transform duration-300"
                      style={{ color: isOpen ? "#FC6E04" : "#9CA3AF", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`seo-faq-panel-${i}`} role="region"
                        aria-labelledby={`seo-faq-btn-${i}`} key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden">
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
   SECTION 8 — FINAL CTA
══════════════════════════════════════════════════════════════ */
function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}>
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ background: "rgba(252,110,4,0.08)" }} />
      {/* "Search results" line metaphor */}
      <div aria-hidden className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-[0.04]">
        {[80, 65, 72, 58, 68, 75].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white" style={{ width: `${w}%` }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-[min(900px,100%-40px)] text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl">
              {data.finalCta.heading.split("Google Rankings?")[0]}
              <br />
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#FF8A1F,#FC6E04)" }}>
                Google Rankings?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "#9CA3AF" }}>
              {data.finalCta.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href={data.finalCta.primaryCta.href} className="btn-cta-pill">
                <Search size={15} aria-hidden /> {data.finalCta.primaryCta.text}
              </Link>
              <Link href={data.finalCta.secondaryCta.href} className="btn-outline-light">
                {data.finalCta.secondaryCta.text}
              </Link>
            </div>
            <p className="mt-8 text-sm uppercase tracking-wider" style={{ color: "#6B7280" }}>
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
export default function SeoServicePage({ breadcrumb = [] }) {
  return (
    <main>
      <HeroSection breadcrumb={breadcrumb} />
      <ServicesSection />
      <PlatformsSection />
      <WhySection />
      <ProcessSection />
      <PortfolioSection />
      <ServicePricingSection slug="seo" />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
