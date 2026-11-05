"use client";

import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Globe, Smartphone, Code2, Share2, Search, PenTool, Megaphone, Heart, ArrowUpRight } from "lucide-react";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"] });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"] });

const services = [
  { id: "website", title: "Website Development", text: "Modern, responsive websites and web applications.", tags: ["Next.js", "React", "Responsive"], Icon: Globe, span: "sm:col-span-2 lg:col-span-2 lg:min-h-[300px]" },
  { id: "app", title: "App Development", text: "iOS and Android apps built for performance.", tags: ["iOS", "Android"], Icon: Smartphone, span: "lg:min-h-[300px]" },
  { id: "software", title: "Software Development", text: "Custom software that automates and scales your business.", tags: ["Custom", "APIs"], Icon: Code2, span: "lg:min-h-[300px]" },
  { id: "social", title: "Social Media Management", text: "Consistent content and community care across your platforms.", tags: ["Content", "Reels"], Icon: Share2, span: "" },
  { id: "seo", title: "Search Engine Optimization (SEO)", text: "Rank higher on Google and get found by the right customers.", tags: ["On-page", "Keywords"], Icon: Search, span: "" },
  { id: "graphic", title: "Graphic Design", text: "Logos, creatives and brand visuals that stand out.", tags: ["Logos", "Posters"], Icon: PenTool, span: "" },
  { id: "marketing", title: "Digital Marketing", text: "Grow your brand with data-driven campaigns.", tags: ["Ads", "Funnels"], Icon: Megaphone, span: "" },
];

/* CSS-only mini illustration for each service, built with Tailwind utilities */
function Art({ id }) {
  const soft = "bg-[#c9cdf3]";
  switch (id) {
    case "website":
      return (
        <div aria-hidden className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#e4e7f7] bg-white shadow-[0_10px_24px_-14px_rgba(15,26,77,0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-1">
          <div className="flex gap-1.5 bg-[#eef0ff] px-2.5 py-2">
            {[0, 1, 2].map((i) => <i key={i} className="size-2 rounded-full bg-[#b9bff0]" />)}
          </div>
          <div className="grid gap-2 p-3">
            <b className="h-2 w-[55%] rounded bg-[#0f1a4d]" />
            <b className={`h-2 w-[80%] rounded ${soft}`} />
            <div className="mt-1 grid grid-cols-3 gap-2">
              <span className="h-9 rounded-lg bg-indigo-600" />
              <span className="h-9 rounded-lg bg-[#eef0ff]" />
              <span className="h-9 rounded-lg bg-[#eef0ff]" />
            </div>
          </div>
        </div>
      );
    case "app":
      return (
        <div aria-hidden className="grid h-[104px] w-16 content-start gap-1.5 rounded-2xl border-2 border-[#0f1a4d] px-2 pb-2 pt-3.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6">
          <b className="h-6 rounded bg-indigo-600" />
          <b className={`h-2.5 rounded ${soft}`} />
          <b className={`h-2.5 rounded ${soft}`} />
        </div>
      );
    case "software":
      return (
        <div aria-hidden className="w-full max-w-[200px] rounded-xl bg-[#0f1a4d] p-3 shadow-[0_10px_24px_-14px_rgba(15,26,77,0.6)]">
          <div className="grid gap-1.5">
            <b className="h-1.5 w-[40%] rounded bg-indigo-400 transition-all duration-500 group-hover:w-[60%]" />
            <b className="ml-3 h-1.5 w-[60%] rounded bg-[#8f95ea]" />
            <b className="ml-3 h-1.5 w-[35%] rounded bg-[#c9cdf3]" />
            <b className="h-1.5 w-[25%] rounded bg-indigo-400" />
          </div>
        </div>
      );
    case "social":
      return (
        <div aria-hidden className="flex items-center gap-3">
          <span className="size-11 rounded-full bg-gradient-to-br from-indigo-600 to-[#8f95ea]" />
          <span className="flex items-center gap-1.5 rounded-full bg-[#eef0ff] px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-transform duration-500 group-hover:scale-110">
            <Heart size={14} className="fill-indigo-600 text-indigo-600" /> 2.4k
          </span>
        </div>
      );
    case "seo":
      return (
        <div aria-hidden className="grid w-full max-w-[220px] gap-2">
          <div className="flex items-center gap-2 rounded-full border border-[#e4e7f7] bg-white px-3 py-2 shadow-sm">
            <Search size={14} className="text-[#566086]" />
            <b className={`h-2 w-[60%] rounded ${soft}`} />
          </div>
          <span className="w-fit rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1.5">
            SEO-ready
          </span>
        </div>
      );
    case "graphic":
      return (
        <div aria-hidden className="relative h-[72px]">
          <span className="absolute left-0 top-1.5 size-14 rounded-full bg-indigo-600" />
          <span className="absolute left-9 top-1.5 size-14 rounded-xl border-2 border-dashed border-[#0f1a4d] transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-12" />
          <span className="absolute left-20 top-11 h-0 w-0 -rotate-[25deg] border-x-8 border-b-[18px] border-x-transparent border-b-[#0f1a4d] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2.5" />
        </div>
      );
    default:
      return (
        <div aria-hidden className="flex h-[72px] items-end gap-2">
          {["30%", "48%", "40%", "72%", "100%"].map((h, i, a) => (
            <span key={h} style={{ height: h }} className={`w-[18px] origin-bottom rounded-t-md rounded-b-sm transition-transform duration-500 group-hover:scale-y-[1.12] ${i === a.length - 1 ? "bg-indigo-600" : soft}`} />
          ))}
        </div>
      );
  }
}

export default function Services() {
  // Cursor spotlight: only updates two CSS variables, so React never re-renders
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services" className={`${body.className} bg-[#fbfbff] py-12 text-[#0f1a4d] sm:py-20 lg:py-28`}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <header className="mb-8 sm:mb-14">
          <h2 className={`${display.className} mb-3 text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]`}>
            Our Services
          </h2>
          <p className="max-w-[46ch] text-base leading-relaxed text-[#566086] sm:text-xl">
            We build digital solutions that drive real business results.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map(({ id, title, text, tags, Icon, span }, i) => (
            <article
              key={id}
              onMouseMove={handleMove}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`group relative isolate flex flex-col justify-between gap-5 overflow-hidden rounded-3xl border border-[#e4e7f7] bg-white p-5 transition-all duration-300 [--mx:50%] [--my:50%]
                before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(360px_circle_at_var(--mx)_var(--my),rgba(99,102,241,0.16),transparent_65%)] before:opacity-0 before:transition-opacity before:duration-300
                hover:-translate-y-1 hover:border-[#c7cbf5] hover:shadow-[0_18px_40px_-18px_rgba(79,70,229,0.35)] hover:before:opacity-100
                focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-indigo-600
                motion-safe:animate-[rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] sm:min-h-[260px] sm:p-6 ${span}`}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-[52px] place-items-center rounded-2xl bg-[#eef0ff] text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="grid size-9 place-items-center rounded-full border border-[#e4e7f7] text-[#566086] transition-all duration-300 group-hover:rotate-45 group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <Art id={id} />

              <div>
                <h3 className={`${display.className} mb-1.5 text-xl font-bold tracking-tight`}>
                  {/* after:inset stretches the link over the whole card */}
                  <a href="#contact" className="outline-none after:absolute after:-inset-[400px]">{title}</a>
                </h3>
                <p className="mb-3.5 max-w-[38ch] leading-normal text-[#566086]">{text}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <li key={t} className="rounded-full bg-[#eef0ff] px-2.5 py-1 text-[0.78rem] font-medium text-indigo-800">{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}