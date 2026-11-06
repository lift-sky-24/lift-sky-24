"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Smartphone, Code2, Share2, Search, PenTool, Megaphone, ArrowUpRight, ChevronRight } from "lucide-react";

const services = [
  {
    id:      "website",
    title:   "Website Development",
    text:    "Modern, responsive websites and web apps built for speed, SEO and conversions.",
    tags:    ["Next.js", "React", "Responsive"],
    Icon:    Globe,
    image:   "/images/services/demo.png",
    href:    "/services/website-development",
  },
  {
    id:      "app",
    title:   "App Development",
    text:    "iOS and Android apps built for performance — cross-platform or native.",
    tags:    ["iOS", "Android", "React Native"],
    Icon:    Smartphone,
    image:   "/images/services/demo.png",
    href:    "/services/app-development",
  },
  {
    id:      "software",
    title:   "Software Development",
    text:    "Custom software that automates your workflows and scales with your business.",
    tags:    ["Custom", "APIs", "SaaS"],
    Icon:    Code2,
    image:   "/images/services/demo.png",
    href:    "/services/software-development",
  },
  {
    id:      "social",
    title:   "Social Media Management",
    text:    "Consistent, on-brand content and community management across every platform.",
    tags:    ["Content", "Reels", "Campaigns"],
    Icon:    Share2,
    image:   "/images/services/demo.png",
    href:    "/services/social-media-management",
  },
  {
    id:      "seo",
    title:   "Search Engine Optimization",
    text:    "Rank higher on Google and get found by the right customers at the right time.",
    tags:    ["On-page", "Keywords", "Technical"],
    Icon:    Search,
    image:   "/images/services/demo.png",
    href:    "/services/seo",
  },
  {
    id:      "graphic",
    title:   "Graphic Design",
    text:    "Logos, brand identities and creative visuals that make your business unforgettable.",
    tags:    ["Logos", "Branding", "Print"],
    Icon:    PenTool,
    image:   "/images/services/demo.png",
    href:    "/services/graphic-design",
  },
  {
    id:      "marketing",
    title:   "Digital Marketing",
    text:    "Data-driven campaigns that bring in qualified leads and grow your revenue.",
    tags:    ["Google Ads", "Meta Ads", "Email"],
    Icon:    Megaphone,
    image:   "/images/services/demo.png",
    href:    "/services/digital-marketing",
  },
];

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section id="services" className="relative overflow-hidden py-14 sm:py-20" style={{ background: "#F8F7F4" }}>
      {/* Subtle orange glow top-right */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle,#FC6E04 0%,transparent 70%)", transform: "translate(30%,-30%)" }} />

      <div className="relative mx-auto w-[min(1200px,100%-40px)]">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight" style={{ color: "#171717" }}>
            Our Services
          </h2>
          <p className="mt-2 max-w-[46ch] text-base sm:text-lg leading-relaxed" style={{ color: "#6B6B70" }}>
            We build digital solutions that drive real business results.
          </p>
        </div>

        {/* Main layout: left list + right image panel */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-stretch">

          {/* ── Left: service list ──────────────────────────────── */}
          <div className="flex flex-col gap-1.5">
            {services.map((svc, i) => {
              const Icon = svc.Icon;
              const isActive = active === i;
              return (
                <div
                  key={svc.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{
                    borderRadius: 14,
                    padding: "12px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: isActive ? "#fff" : "transparent",
                    border: `1px solid ${isActive ? "#FFD4B3" : "transparent"}`,
                    boxShadow: isActive ? "0 4px 20px rgba(252,110,4,0.10)" : "none",
                    transition: "background .2s, border-color .2s, box-shadow .2s",
                  }}
                >
                  {/* Icon */}
                  <span style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    display: "grid", placeItems: "center",
                    background: isActive ? "#FC6E04" : "#FFF0E4",
                    color: isActive ? "#101114" : "#FC6E04",
                    transition: "background .2s, color .2s",
                  }}>
                    <Icon size={19} strokeWidth={1.8} />
                  </span>

                  {/* Title */}
                  <span style={{
                    flex: 1,
                    fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
                    color: isActive ? "#171717" : "#6B6B70",
                    transition: "color .2s",
                  }}>
                    {svc.title}
                  </span>

                  {/* Arrow — shown when active */}
                  <ChevronRight size={16} style={{
                    flexShrink: 0,
                    color: isActive ? "#FC6E04" : "transparent",
                    transition: "color .2s",
                  }} />
                </div>
              );
            })}
          </div>

          {/* ── Right: image + info panel ───────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4">
            {/* Image — changes on hover, links to service page */}
            <Link
              href={s.href}
              className="group relative block overflow-hidden rounded-3xl flex-1"
              style={{
                minHeight: 320,
                boxShadow: "0 24px 60px rgba(16,17,20,0.22)",
                border: "1px solid rgba(252,110,4,0.10)",
              }}
            >
              {/* Background */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1B1714,#101114,#2A160D)" }}>
                {/* Large icon watermark */}
                {(() => { const Icon = s.Icon; return <Icon aria-hidden strokeWidth={0.5} className="absolute right-[6%] top-[8%] size-40 text-white/8" />; })()}
              </div>

              {/* Service image — transition on active change */}
              {services.map((svc, i) => (
                <img
                  key={svc.id}
                  src={svc.image}
                  alt={svc.title}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  className="absolute inset-0 size-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  style={{ opacity: active === i ? 1 : 0, transition: "opacity .6s ease, transform .7s ease" }}
                />
              ))}

              {/* Bottom overlay shade */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(16,17,20,0.85) 0%,rgba(16,17,20,0.1) 55%,transparent 100%)" }} />

              {/* Info overlay */}
              <div className="absolute inset-x-5 bottom-5 text-white">
                <h3 className="text-xl font-bold leading-tight mb-2">{s.title}</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.72)" }}>{s.text}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map((tag) => (
                    <span key={tag} style={{
                      borderRadius: 99, padding: "3px 10px",
                      fontSize: "0.75rem", fontWeight: 600,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                    }}>{tag}</span>
                  ))}
                </div>
                {/* CTA */}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  borderRadius: 99, padding: "9px 18px",
                  fontSize: 13, fontWeight: 700,
                  background: "#FC6E04", color: "#101114",
                }}>
                  Learn more <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>

            {/* Service quick-links grid — 3 cards */}
            <div className="grid grid-cols-3 gap-3">
              {services.filter((_, i) => i !== active).slice(0, 3).map((svc) => {
                const Icon = svc.Icon;
                return (
                  <Link
                    key={svc.id}
                    href={svc.href}
                    style={{
                      borderRadius: 14, padding: "14px",
                      background: "#fff",
                      border: "1px solid #EAE5DF",
                      textDecoration: "none",
                      transition: "border-color .2s, box-shadow .2s, transform .2s",
                      display: "flex", flexDirection: "column", gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#FFD4B3";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(252,110,4,0.10)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#EAE5DF";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center", background: "#FFF0E4", color: "#FC6E04" }}>
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#171717", lineHeight: 1.3 }}>{svc.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Mobile: accordion (accordion opens below each item) ── */}
          <div className="lg:hidden">
            {services.map((svc, i) => {
              const isOpen = active === i;
              if (!isOpen) return null;
              return (
                <div key={svc.id}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4">
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1B1714,#101114)" }} />
                    <img src={svc.image} alt={svc.title} className="absolute inset-0 size-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(16,17,20,0.75) 0%,transparent 60%)" }} />
                  </div>
                  <p className="text-sm mb-3" style={{ color: "#6B6B70" }}>{svc.text}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {svc.tags.map((t) => (
                      <span key={t} style={{ borderRadius: 99, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600, background: "#FFF0E4", color: "#E04F00" }}>{t}</span>
                    ))}
                  </div>
                  <Link href={svc.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 99, padding: "10px 20px", fontSize: 13, fontWeight: 700, background: "#101114", color: "#FC6E04", textDecoration: "none" }}>
                    Learn more <ArrowUpRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
