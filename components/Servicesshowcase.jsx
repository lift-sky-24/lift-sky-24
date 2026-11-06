"use client";

import { useState } from "react";
import { Globe, Smartphone, Code2, Share2, Search, PenTool, Megaphone, ChevronDown, ArrowUpRight } from "lucide-react";

const IMG = "/images/services/demo.png";

const services = [
  { id: "website", title: "Website Development",            text: "Modern, responsive websites and web applications.",              tags: ["Next.js", "React", "Responsive"], Icon: Globe,     image: IMG },
  { id: "app",     title: "App Development",               text: "iOS and Android apps built for performance.",                     tags: ["iOS", "Android"],                 Icon: Smartphone, image: IMG },
  { id: "software",title: "Software Development",          text: "Custom software that automates and scales your business.",        tags: ["Custom", "APIs"],                  Icon: Code2,     image: IMG },
  { id: "social",  title: "Social Media Management",       text: "Consistent content and community care across your platforms.",    tags: ["Content", "Reels"],                Icon: Share2,    image: IMG },
  { id: "seo",     title: "Search Engine Optimization (SEO)",text: "Rank higher on Google and get found by the right customers.",  tags: ["On-page", "Keywords"],             Icon: Search,    image: IMG },
  { id: "graphic", title: "Graphic Design",                text: "Logos, creatives and brand visuals that stand out.",              tags: ["Logos", "Posters"],                Icon: PenTool,   image: IMG },
  { id: "marketing",title:"Digital Marketing",             text: "Grow your brand with data-driven campaigns.",                    tags: ["Ads", "Funnels"],                  Icon: Megaphone, image: IMG },
];

function Visual({ s, zoom, shade }) {
  const Icon = s.Icon;
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#1B1714 0%,#101114 60%,#2A160D 100%)" }}>
      <Icon aria-hidden strokeWidth={1} className="absolute right-[8%] top-[10%] size-32 text-white/10" />
      <img
        src={s.image} alt="" loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        className={`absolute inset-0 size-full object-cover transition-transform duration-[6000ms] ease-out ${zoom ? "scale-110" : "scale-100"}`}
      />
      {shade && (
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,17,20,0.88) 0%, rgba(16,17,20,0.15) 50%, transparent 100%)" }} />
      )}
    </div>
  );
}

function Tags({ tags, onImage }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t} style={{
          borderRadius: 99,
          padding: "4px 10px",
          fontSize: "0.78rem",
          fontWeight: 600,
          background: onImage ? "rgba(255,255,255,0.15)" : "#FFF0E4",
          color: onImage ? "#fff" : "#E04F00",
          border: onImage ? "1px solid rgba(255,255,255,0.2)" : "1px solid #FFD4B3",
        }}>{t}</li>
      ))}
    </ul>
  );
}

function Cta({ onImage }) {
  return (
    <a
      href="/contact"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        borderRadius: 99, padding: "10px 20px",
        fontSize: 13, fontWeight: 700,
        background: onImage ? "#FC6E04" : "#101114",
        color: onImage ? "#101114" : "#FC6E04",
        textDecoration: "none",
        transition: "background .2s, color .2s, transform .2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
    >
      Get a free quote <ArrowUpRight size={16} />
    </a>
  );
}

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);

  const preview = (i) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) setActive(i);
  };

  return (
    <section id="services" className="relative overflow-hidden py-14 sm:py-20 lg:py-28" style={{ background: "#F8F7F4" }}>
      {/* Subtle orange glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #FC6E04 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="relative mx-auto w-[min(1200px,100%-40px)]">
        <header className="mb-8 sm:mb-14">
          <h2 className="mb-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight text-[#171717]">
            Our Services
          </h2>
          <p className="max-w-[46ch] text-base leading-relaxed sm:text-xl" style={{ color: "#6B6B70" }}>
            We build digital solutions that drive real business results.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
          {/* Service list */}
          <div className="flex flex-col gap-2">
            {services.map((s, i) => {
              const Icon = s.Icon;
              const open = active === i;
              return (
                <div key={s.id} style={{
                  borderRadius: 16,
                  border: `1px solid ${open ? "#FFD4B3" : "transparent"}`,
                  background: open ? "#fff" : "transparent",
                  boxShadow: open ? "0 8px 30px rgba(252,110,4,0.12)" : "none",
                  transition: "border-color .2s, background .2s, box-shadow .2s",
                }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => preview(i)}
                    onFocus={() => preview(i)}
                    style={{
                      display: "flex", width: "100%", alignItems: "center", gap: 14,
                      borderRadius: 16, padding: "12px 16px", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      color: open ? "#171717" : "#6B6B70",
                      transition: "color .2s",
                    }}
                  >
                    <span style={{
                      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: open ? "#FC6E04" : "#FFF0E4",
                      color: open ? "#101114" : "#FC6E04",
                      transition: "background .2s, color .2s",
                    }}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span style={{ flex: 1, fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
                      {s.title}
                    </span>
                    <ChevronDown size={18} style={{
                      flexShrink: 0, transition: "transform .3s",
                      transform: open ? "rotate(180deg)" : "none",
                      color: open ? "#FC6E04" : "#929292",
                    }} />
                  </button>

                  {/* Mobile accordion */}
                  <div style={{
                    display: "grid",
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: "grid-template-rows .4s",
                  }} className="lg:hidden">
                    <div style={{ overflow: "hidden" }}>
                      <div className="px-4 pb-4">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                          <Visual s={s} zoom={open} />
                        </div>
                        <p className="mb-3 mt-4 text-sm" style={{ color: "#6B6B70" }}>{s.text}</p>
                        <div className="mb-4"><Tags tags={s.tags} /></div>
                        <Cta />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop stage */}
          <div className="relative hidden lg:block h-[440px] xl:h-[480px] overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 30px 70px rgba(16,17,20,0.30)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {services.map((s, i) => (
              <div key={s.id} aria-hidden={active !== i}
                className={`absolute inset-0 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}>
                <Visual s={s} zoom={active === i} shade />
              </div>
            ))}

            {/* Glass info card */}
            <div key={services[active].id}
              className="absolute inset-x-4 bottom-4 rounded-2xl p-5 text-white motion-safe:animate-[rise_0.6s_cubic-bezier(0.2,0.8,0.2,1)_both]"
              style={{ background: "rgba(16,17,20,0.70)", backdropFilter: "blur(16px)", border: "1px solid rgba(252,110,4,0.20)" }}>
              <h3 className="mb-1.5 text-xl font-bold tracking-tight">{services[active].title}</h3>
              <p className="mb-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{services[active].text}</p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Tags tags={services[active].tags} onImage />
                <Cta onImage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
