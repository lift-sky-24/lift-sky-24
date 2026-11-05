"use client";

import { useState } from "react";
import { Globe, Smartphone, Code2, Share2, Search, PenTool, Megaphone, ChevronDown, ArrowUpRight } from "lucide-react";

// Use system font stack â€” matches the site's Inter font loaded in layout.js
const displayClass = "";  // heading style applied via inline style below
const bodyClass    = "";

/*
  PALETTE (one brand accent, everything else is neutral)
  ink     #0F1A4D  headings, text on light
  muted   #5B6489  body text
  canvas  #F5F6FC  section background
  line    #E3E6F5  borders
  accent  indigo-600 (#4F46E5)  active states, buttons, icons

  IMAGES: file path is public/images/services/demo.png. For a different photo per service,
  change `image: IMG` to e.g. "/images/services/seo.png" on that service.
  If an image is missing, the brand gradient + icon fallback shows.
*/
const IMG = "/images/services/demo.png"; // file lives at public/images/services/demo.png

const services = [
  { id: "website", title: "Website Development", text: "Modern, responsive websites and web applications.", tags: ["Next.js", "React", "Responsive"], Icon: Globe, image: IMG },
  { id: "app", title: "App Development", text: "iOS and Android apps built for performance.", tags: ["iOS", "Android"], Icon: Smartphone, image: IMG },
  { id: "software", title: "Software Development", text: "Custom software that automates and scales your business.", tags: ["Custom", "APIs"], Icon: Code2, image: IMG },
  { id: "social", title: "Social Media Management", text: "Consistent content and community care across your platforms.", tags: ["Content", "Reels"], Icon: Share2, image: IMG },
  { id: "seo", title: "Search Engine Optimization (SEO)", text: "Rank higher on Google and get found by the right customers.", tags: ["On-page", "Keywords"], Icon: Search, image: IMG },
  { id: "graphic", title: "Graphic Design", text: "Logos, creatives and brand visuals that stand out.", tags: ["Logos", "Posters"], Icon: PenTool, image: IMG },
  { id: "marketing", title: "Digital Marketing", text: "Grow your brand with data-driven campaigns.", tags: ["Ads", "Funnels"], Icon: Megaphone, image: IMG },
];

/* Image with brand-gradient fallback and a slow zoom while active */
function Visual({ s, zoom, shade }) {
  const Icon = s.Icon;
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-700 to-[#0F1A4D]">
      <Icon aria-hidden strokeWidth={1} className="absolute right-[8%] top-[10%] size-32 text-white/15" />
      <img
        src={s.image}
        alt=""
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        className={`absolute inset-0 size-full object-cover transition-transform duration-[6000ms] ease-out ${zoom ? "scale-110" : "scale-100"}`}
      />
      {shade && <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A4D]/85 via-[#0F1A4D]/15 to-transparent" />}
    </div>
  );
}

function Tags({ tags, onImage }) {
  const style = onImage
    ? "border border-white/25 bg-white/15 text-white"
    : "bg-indigo-50 text-indigo-700";
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t} className={`rounded-full px-2.5 py-1 text-[0.78rem] font-medium ${style}`}>{t}</li>
      ))}
    </ul>
  );
}

function Cta({ onImage }) {
  const style = onImage
    ? "bg-white text-[#0F1A4D] hover:bg-indigo-50 focus-visible:outline-white"
    : "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600";
  return (
    <a href="#contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${style}`}>
      Get a free quote <ArrowUpRight size={16} />
    </a>
  );
}

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);

  // Desktop: hover previews a service. Touch: tap opens it.
  const preview = (i) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) setActive(i);
  };

  return (
    <section id="services" className={`relative overflow-hidden bg-[#F5F6FC] py-14 text-[#0F1A4D] sm:py-20 lg:py-28`}>
      {/* soft light glow behind the stage */}
      <div aria-hidden className="pointer-events-none absolute -right-32 top-24 size-[480px] rounded-full bg-indigo-300/40 blur-[110px]" />

      <div className="relative mx-auto w-[min(1200px,100%-40px)]">
        <header className="mb-8 sm:mb-14">
          <h2 className={`mb-3 text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]`}>Our Services</h2>
          <p className="max-w-[46ch] text-base leading-relaxed text-[#5B6489] sm:text-xl">We build digital solutions that drive real business results.</p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12">
          {/* ---------- Service list (accordion on mobile, selector on desktop) ---------- */}
          <div className="flex flex-col gap-2">
            {services.map((s, i) => {
              const Icon = s.Icon;
              const open = active === i;
              return (
                <div key={s.id} className={`rounded-2xl border transition-all duration-300 ${open ? "border-[#E3E6F5] bg-white shadow-[0_14px_36px_-20px_rgba(79,70,229,0.45)]" : "border-transparent"}`}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => preview(i)}
                    onFocus={() => preview(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 ${open ? "text-[#0F1A4D]" : "text-[#5B6489] hover:text-[#0F1A4D]"}`}
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${open ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 ring-1 ring-[#E3E6F5]"}`}>
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className={`flex-1 text-lg font-bold tracking-tight sm:text-xl`}>{s.title}</span>
                    <ChevronDown size={20} className={`shrink-0 transition-all duration-300 lg:-rotate-90 ${open ? "rotate-180 text-indigo-600 lg:opacity-100" : "lg:opacity-0"}`} />
                  </button>

                  {/* Mobile / tablet: the image opens inside the list */}
                  <div className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/9]">
                          <Visual s={s} zoom={open} />
                        </div>
                        <p className="mb-3 mt-4 text-[#5B6489]">{s.text}</p>
                        <div className="mb-4"><Tags tags={s.tags} /></div>
                        <Cta />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- Desktop stage ---------- */}
          <div className="relative hidden h-[440px] overflow-hidden rounded-3xl xl:h-[480px] shadow-[0_30px_70px_-30px_rgba(15,26,77,0.55)] ring-1 ring-[#0F1A4D]/10 lg:block">
            {services.map((s, i) => (
              <div key={s.id} aria-hidden={active !== i} className={`absolute inset-0 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}>
                <Visual s={s} zoom={active === i} shade />
              </div>
            ))}

            {/* Glass info card, re-mounts per service so it animates in */}
            <div key={services[active].id} className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-[#0F1A4D]/55 p-5 text-white backdrop-blur-xl motion-safe:animate-[rise_0.6s_cubic-bezier(0.2,0.8,0.2,1)_both]">
              <h3 className={`mb-1.5 text-2xl font-bold tracking-tight`}>{services[active].title}</h3>
              <p className="mb-3 max-w-[48ch] text-base text-white/85">{services[active].text}</p>
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
