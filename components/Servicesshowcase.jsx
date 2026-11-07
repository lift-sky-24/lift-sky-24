"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  Globe, Smartphone, Code2, Share2, Search, PenTool,
  Megaphone, ArrowUpRight, ChevronRight,
} from "lucide-react";
import { IMG } from "@/data/images";

/* ─────────────────────────────────────────────────────────────────
   Service data — single source (never duplicated in this file)
   image + alt pulled from the centralised data/images.js registry
   so swapping a real photo later requires one edit there.
───────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const stageRef  = useRef(null);
  const timerRef  = useRef(null);
  const reduced   = useReducedMotion();

  /* ── hover-intent: 80 ms delay before switching active ── */
  const hoverActivate = useCallback((i) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(i), 80);
  }, []);

  /* cancel pending hover when pointer leaves the list */
  const cancelHover = useCallback(() => clearTimeout(timerRef.current), []);

  /* cleanup on unmount */
  useEffect(() => () => clearTimeout(timerRef.current), []);

  /* ── mobile scroll-into-view after tab tap ── */
  const handleTabClick = useCallback((i) => {
    setActive(i);
    if (!stageRef.current) return;
    const isDesktop = window.matchMedia("(min-width:1024px)").matches;
    if (isDesktop) return;
    const rect = stageRef.current.getBoundingClientRect();
    const notVisible = rect.top < 70 || rect.bottom / window.innerHeight < 0.7;
    if (notVisible) {
      stageRef.current.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [reduced]);

  /* ── keyboard roving tabindex ── */
  const handleKeyDown = useCallback((e, i) => {
    const last = SERVICES.length - 1;
    let next = i;
    if (e.key === "ArrowDown")       { e.preventDefault(); next = i < last ? i + 1 : 0; }
    else if (e.key === "ArrowUp")    { e.preventDefault(); next = i > 0    ? i - 1 : last; }
    else if (e.key === "Home")       { e.preventDefault(); next = 0; }
    else if (e.key === "End")        { e.preventDefault(); next = last; }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleTabClick(i); return; }
    else return;
    setActive(next);
    /* move focus to the newly activated tab */
    document.getElementById(`svc-tab-${SERVICES[next].slug}`)?.focus();
  }, [handleTabClick]);

  const s = SERVICES[active];

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
        {/* ── Section header ──────────────────────────────────────── */}
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

        {/* ── Two-column grid (lg+) / single column (below lg) ────── */}
        {/*
            Mobile order:  stage (order-1 → top), list (order-2 → bottom)
            Desktop order: list left, stage right — normal flow
        */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch">

          {/* ══════════════════════════════════════════════════════════
              LEFT — tab list
              Desktop: natural order (left).
              Mobile: pushed below the stage with order-2.
          ══════════════════════════════════════════════════════════ */}
          <div
            role="tablist"
            aria-label="Our services"
            aria-orientation="vertical"
            className="flex flex-col gap-1.5 order-2 lg:order-1"
            onMouseLeave={cancelHover}
          >
            {SERVICES.map((svc, i) => {
              const Icon    = svc.Icon;
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
                  onClick={() => handleTabClick(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  /* min-h-[64px] keeps list height stable regardless of active item */
                  className="svc-tab-btn flex w-full items-center gap-3.5 rounded-[14px] px-4 min-h-[64px] py-3 text-left transition-all duration-200"
                  style={{
                    background:  isActive ? "#fff" : "transparent",
                    border:      `1px solid ${isActive ? "rgba(252,110,4,0.30)" : "transparent"}`,
                    boxShadow:   isActive ? "0 4px 20px rgba(252,110,4,0.10)" : "none",
                    cursor:      "pointer",
                  }}
                >
                  {/* Icon box */}
                  <span
                    aria-hidden="true"
                    className="grid place-items-center shrink-0 rounded-xl transition-all duration-200"
                    style={{
                      width: 40, height: 40,
                      background: isActive
                        ? "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)"
                        : "#FFF0E4",
                      color: isActive ? "#101114" : "#FC6E04",
                    }}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                  </span>

                  {/* Title */}
                  <span
                    className="flex-1 text-[15px] font-bold leading-snug transition-colors duration-200"
                    style={{ letterSpacing: "-0.01em", color: isActive ? "#171717" : "#6B6B70" }}
                  >
                    {svc.title}
                  </span>

                  {/* Active chevron */}
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

          {/* ══════════════════════════════════════════════════════════
              RIGHT — image stage + info panel
              Desktop: natural order (right).
              Mobile: pushed to top with order-1.
          ══════════════════════════════════════════════════════════ */}
          <div
            ref={stageRef}
            className="flex flex-col gap-4 order-1 lg:order-2 scroll-mt-24"
          >
            {/* Image stage */}
            <div
              className="relative overflow-hidden rounded-3xl lg:flex-1 lg:min-h-[28rem]"
              /* Mobile: aspect ratio; desktop: stretches to match list height */
              style={{
                aspectRatio: "16/10",
                boxShadow:   "0 24px 60px rgba(16,17,20,0.18)",
                border:      "1px solid rgba(252,110,4,0.08)",
              }}
            >
              {/* Aspect ratio only applies on mobile/tablet; on desktop flex-1 takes over */}
              <style>{`
                @media (min-width:1024px){
                  .svc-stage-ar { aspect-ratio: unset !important; }
                }
              `}</style>
              <div className="svc-stage-ar absolute inset-0" style={{ aspectRatio: "16/10" }}>
                {/* Dark base layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg,#1B1714,#101114,#2A160D)" }}
                />

                {/* All 7 images stacked, cross-faded — ONE DOM node per image */}
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
                      className="object-cover transition-transform duration-700 ease-out"
                      loading={i === 0 ? "eager" : "lazy"}
                      style={{
                        opacity:         active === i ? 1 : 0,
                        transition:      reduced ? "none" : "opacity .5s ease",
                        transform:       active === i ? "scale(1)" : "scale(1.06)",
                      }}
                    />
                  );
                })}

                {/* Bottom gradient overlay for panel legibility (no text sits on raw image) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(16,17,20,0.5) 0%, transparent 55%)" }}
                />
              </div>
            </div>

            {/* Info panel — sits BELOW the image, not overlaid on it */}
            <div
              id={`svc-panel-${s.slug}`}
              role="tabpanel"
              aria-labelledby={`svc-tab-${s.slug}`}
              key={s.slug}   /* re-mounts on change → triggers rise animation */
              className="rounded-2xl border p-5 bg-white/90 backdrop-blur-xl"
              style={{
                borderColor: "rgba(255,255,255,0.6)",
                boxShadow:   "0 4px 20px rgba(16,17,20,0.06)",
                animation:   reduced ? "none" : "rise 0.6s cubic-bezier(0.2,0.8,0.2,1) both",
              }}
            >
              <h3
                className="text-lg font-bold leading-snug mb-1"
                style={{ color: "#171717", letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#6B6B70" }}>
                {s.text}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: "#FFF0E4", color: "#E04F00", border: "1px solid #FFD4B3" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={s.href}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:  "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                  color:       "#101114",
                  boxShadow:   "0 4px 14px rgba(252,110,4,0.22)",
                }}
              >
                Learn more <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Hover-only style for list items (not applied on touch) */}
    </section>
  );
}
