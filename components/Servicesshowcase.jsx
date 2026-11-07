"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  Globe, Smartphone, Code2, Share2, Search, PenTool,
  Megaphone, ArrowUpRight, ChevronRight, ChevronDown,
} from "lucide-react";
import { IMG } from "@/data/images";

/* ─── Service definitions ─────────────────────────────────────── */
const SERVICES = [
  {
    slug:  "website-development",
    title: "Website Development",
    text:  "Modern, responsive websites and web apps built for speed, SEO and conversions.",
    tags:  ["Next.js", "React", "Responsive"],
    Icon:  Globe,
    href:  "/services/website-development",
  },
  {
    slug:  "app-development",
    title: "App Development",
    text:  "iOS and Android apps built for performance — cross-platform or native.",
    tags:  ["iOS", "Android", "React Native"],
    Icon:  Smartphone,
    href:  "/services/app-development",
  },
  {
    slug:  "software-development",
    title: "Software Development",
    text:  "Custom software that automates your workflows and scales with your business.",
    tags:  ["Custom", "APIs", "SaaS"],
    Icon:  Code2,
    href:  "/services/software-development",
  },
  {
    slug:  "social-media-management",
    title: "Social Media Management",
    text:  "Consistent, on-brand content and community management across every platform.",
    tags:  ["Content", "Reels", "Campaigns"],
    Icon:  Share2,
    href:  "/services/social-media-management",
  },
  {
    slug:  "seo",
    title: "Search Engine Optimization",
    text:  "Rank higher on Google and get found by the right customers at the right time.",
    tags:  ["On-page", "Keywords", "Technical"],
    Icon:  Search,
    href:  "/services/seo",
  },
  {
    slug:  "graphic-design",
    title: "Graphic Design",
    text:  "Logos, brand identities and creative visuals that make your business unforgettable.",
    tags:  ["Logos", "Branding", "Print"],
    Icon:  PenTool,
    href:  "/services/graphic-design",
  },
  {
    slug:  "digital-marketing",
    title: "Digital Marketing",
    text:  "Data-driven campaigns that bring in qualified leads and grow your revenue.",
    tags:  ["Google Ads", "Meta Ads", "Email"],
    Icon:  Megaphone,
    href:  "/services/digital-marketing",
  },
];

/* ─── Shared overlay info (used inside the image on both layouts) ── */
function ServiceOverlay({ svc }) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
      <h3
        className="text-xl sm:text-2xl font-extrabold leading-snug mb-1.5"
        style={{ color: "#fff", letterSpacing: "-0.02em", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
      >
        {svc.title}
      </h3>
      <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.82)" }}>
        {svc.text}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap"
            style={{
              background: "rgba(252,110,4,0.18)",
              border:     "1px solid rgba(252,110,4,0.45)",
              color:      "#FFD4B3",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA — stopPropagation so mobile accordion doesn't toggle on link click */}
      <Link
        href={svc.href}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        style={{
          background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
          color:      "#101114",
          boxShadow:  "0 4px 14px rgba(252,110,4,0.30)",
        }}
      >
        Learn more <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────── */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const timerRef  = useRef(null);
  const reduced   = useReducedMotion();

  /* hover-intent: 80ms delay */
  const hoverActivate = useCallback((i) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(i), 80);
  }, []);
  const cancelHover = useCallback(() => clearTimeout(timerRef.current), []);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  /* keyboard roving tabindex */
  const handleKeyDown = useCallback((e, i) => {
    const last = SERVICES.length - 1;
    let next = i;
    if      (e.key === "ArrowDown")                  { e.preventDefault(); next = i < last ? i + 1 : 0; }
    else if (e.key === "ArrowUp")                    { e.preventDefault(); next = i > 0    ? i - 1 : last; }
    else if (e.key === "Home")                       { e.preventDefault(); next = 0; }
    else if (e.key === "End")                        { e.preventDefault(); next = last; }
    else if (e.key === "Enter" || e.key === " ")     { e.preventDefault(); setActive(i); return; }
    else return;
    setActive(next);
    document.getElementById(`svc-tab-${SERVICES[next].slug}`)?.focus();
  }, []);

  /* mobile accordion toggle */
  const handleAccordionClick = useCallback((i) => {
    setActive((prev) => (prev === i ? i : i)); // always open clicked, never close last
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-14 sm:py-20"
      style={{ background: "#F8F7F4" }}
    >
      {/* Subtle orange glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle,#FC6E04 0%,transparent 70%)", transform: "translate(30%,-30%)" }}
      />

      <div className="relative mx-auto w-[min(1200px,100%-40px)]">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight"
            style={{ color: "#171717" }}
          >
            Our Services
          </h2>
          <p className="mt-2 max-w-[46ch] text-base sm:text-lg leading-relaxed" style={{ color: "#6B6B70" }}>
            We build digital solutions that drive real business results.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP LAYOUT (lg+): left tabs + right unified card
        ═══════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch">

          {/* Left — tab list */}
          <div
            role="tablist"
            aria-label="Our services"
            aria-orientation="vertical"
            className="flex flex-col gap-1.5"
            onMouseLeave={cancelHover}
          >
            {SERVICES.map((svc, i) => {
              const Icon     = svc.Icon;
              const isActive = active === i;
              return (
                <button
                  key={svc.slug}
                  id={`svc-tab-${svc.slug}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`svc-panel-${svc.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  onMouseEnter={() => hoverActivate(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="svc-tab-btn flex w-full items-center gap-3.5 rounded-[14px] px-4 min-h-[64px] py-3 text-left transition-all duration-200"
                  style={{
                    background: isActive ? "#fff" : "transparent",
                    border:     `1px solid ${isActive ? "rgba(252,110,4,0.30)" : "transparent"}`,
                    boxShadow:  isActive ? "0 4px 20px rgba(252,110,4,0.10)" : "none",
                    cursor:     "pointer",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="grid place-items-center shrink-0 rounded-xl transition-all duration-200"
                    style={{
                      width: 40, height: 40,
                      background: isActive ? "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" : "#FFF0E4",
                      color:      isActive ? "#101114" : "#FC6E04",
                    }}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <span
                    className="flex-1 text-[15px] font-bold leading-snug transition-colors duration-200"
                    style={{ letterSpacing: "-0.01em", color: isActive ? "#171717" : "#6B6B70" }}
                  >
                    {svc.title}
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? "#FC6E04" : "transparent" }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right — unified image + overlay card */}
          <div
            id={`svc-panel-${SERVICES[active].slug}`}
            role="tabpanel"
            aria-labelledby={`svc-tab-${SERVICES[active].slug}`}
            className="relative overflow-hidden rounded-3xl min-h-[28rem]"
            style={{
              boxShadow: "0 24px 60px rgba(16,17,20,0.22)",
              border:    "1px solid rgba(252,110,4,0.08)",
            }}
          >
            {/* Dark base */}
            <div className="absolute inset-0" style={{ background: "#101114" }} aria-hidden="true" />

            {/* All 7 images — stacked, cross-faded */}
            {SERVICES.map((svc, i) => {
              const imgData = IMG.services[svc.slug] ?? IMG.services["website-development"];
              return (
                <Image
                  key={svc.slug}
                  src={imgData.src}
                  alt={active === i ? imgData.alt : ""}
                  aria-hidden={active !== i}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-contain transition-opacity duration-500 ease-in-out"
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    opacity:    active === i ? 1 : 0,
                    transition: reduced ? "none" : "opacity .5s ease",
                  }}
                />
              );
            })}

            {/* Strong bottom gradient so overlay text is always readable */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,11,14,0.92) 0%, rgba(10,11,14,0.55) 40%, transparent 70%)",
              }}
            />

            {/* Overlay info — title, desc, tags, CTA all inside the card */}
            <ServiceOverlay svc={SERVICES[active]} key={SERVICES[active].slug} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MOBILE LAYOUT (<lg): vertical accordion
        ═══════════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col gap-3">
          {SERVICES.map((svc, i) => {
            const Icon     = svc.Icon;
            const isOpen   = active === i;
            const imgData  = IMG.services[svc.slug] ?? IMG.services["website-development"];

            return (
              <div
                key={svc.slug}
                className="overflow-hidden rounded-2xl transition-all duration-300"
                style={{
                  border:    `1px solid ${isOpen ? "rgba(252,110,4,0.35)" : "#EAE5DF"}`,
                  boxShadow: isOpen ? "0 8px 30px rgba(252,110,4,0.12)" : "0 1px 4px rgba(16,17,20,0.05)",
                  background: "#fff",
                }}
              >
                {/* Accordion header — always visible */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mob-svc-${svc.slug}`}
                  onClick={() => handleAccordionClick(i)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span
                    className="grid place-items-center shrink-0 rounded-xl transition-all duration-200"
                    style={{
                      width: 38, height: 38,
                      background: isOpen ? "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" : "#FFF0E4",
                      color:      isOpen ? "#101114" : "#FC6E04",
                    }}
                  >
                    <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span
                    className="flex-1 text-[15px] font-bold leading-snug"
                    style={{ color: isOpen ? "#171717" : "#6B6B70", letterSpacing: "-0.01em" }}
                  >
                    {svc.title}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color:     isOpen ? "#FC6E04" : "#929292",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Accordion body — image + overlay, collapses when closed */}
                <div
                  id={`mob-svc-${svc.slug}`}
                  style={{
                    display:         "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:       reduced ? "none" : "grid-template-rows 0.35s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    {/* Image + overlay unified card */}
                    <div
                      className="relative mx-4 mb-4 overflow-hidden rounded-2xl"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {/* Dark base */}
                      <div className="absolute inset-0" style={{ background: "#101114" }} aria-hidden="true" />

                      {/* Image */}
                      <Image
                        src={imgData.src}
                        alt={imgData.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        loading={i === 0 ? "eager" : "lazy"}
                      />

                      {/* Gradient overlay */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,11,14,0.90) 0%, rgba(10,11,14,0.50) 45%, transparent 70%)",
                        }}
                      />

                      {/* Info overlay inside the image */}
                      <ServiceOverlay svc={svc} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
