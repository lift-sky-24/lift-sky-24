"use client";

import { Globe, Smartphone, Code2, Share2, Search, PenTool, Megaphone, Heart, ArrowUpRight } from "lucide-react";

const services = [
  { id: "website",  title: "Website Development",           text: "Modern, responsive websites and web applications.",           tags: ["Next.js", "React", "Responsive"], Icon: Globe,     span: "sm:col-span-2 lg:col-span-2 lg:min-h-[300px]" },
  { id: "app",      title: "App Development",              text: "iOS and Android apps built for performance.",                  tags: ["iOS", "Android"],                 Icon: Smartphone, span: "lg:min-h-[300px]" },
  { id: "software", title: "Software Development",         text: "Custom software that automates and scales your business.",     tags: ["Custom", "APIs"],                  Icon: Code2,     span: "lg:min-h-[300px]" },
  { id: "social",   title: "Social Media Management",      text: "Consistent content and community care across your platforms.", tags: ["Content", "Reels"],                Icon: Share2,    span: "" },
  { id: "seo",      title: "Search Engine Optimization",   text: "Rank higher on Google and get found by the right customers.", tags: ["On-page", "Keywords"],             Icon: Search,    span: "" },
  { id: "graphic",  title: "Graphic Design",               text: "Logos, creatives and brand visuals that stand out.",           tags: ["Logos", "Posters"],                Icon: PenTool,   span: "" },
  { id: "marketing",title: "Digital Marketing",            text: "Grow your brand with data-driven campaigns.",                  tags: ["Ads", "Funnels"],                  Icon: Megaphone, span: "" },
];

/* Mini illustration for each service — orange/black palette */
function Art({ id }) {
  switch (id) {
    case "website":
      return (
        <div aria-hidden className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-[0_10px_24px_-14px_rgba(16,17,20,0.20)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-1">
          <div className="flex gap-1.5 px-2.5 py-2" style={{ background: "#FFF0E4" }}>
            {[0,1,2].map((i) => <i key={i} className="size-2 rounded-full" style={{ background: "#FFD4B3" }} />)}
          </div>
          <div className="grid gap-2 p-3">
            <b className="h-2 w-[55%] rounded" style={{ background: "#171717" }} />
            <b className="h-2 w-[80%] rounded" style={{ background: "#EAE5DF" }} />
            <div className="mt-1 grid grid-cols-3 gap-2">
              <span className="h-9 rounded-lg" style={{ background: "#FC6E04" }} />
              <span className="h-9 rounded-lg" style={{ background: "#FFF0E4" }} />
              <span className="h-9 rounded-lg" style={{ background: "#FFF0E4" }} />
            </div>
          </div>
        </div>
      );
    case "app":
      return (
        <div aria-hidden className="grid h-[104px] w-16 content-start gap-1.5 rounded-2xl border-2 px-2 pb-2 pt-3.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6" style={{ borderColor: "#101114" }}>
          <b className="h-6 rounded" style={{ background: "#FC6E04" }} />
          <b className="h-2.5 rounded" style={{ background: "#EAE5DF" }} />
          <b className="h-2.5 rounded" style={{ background: "#EAE5DF" }} />
        </div>
      );
    case "software":
      return (
        <div aria-hidden className="w-full max-w-[200px] rounded-xl p-3" style={{ background: "#101114", boxShadow: "0 10px 24px rgba(16,17,20,0.4)" }}>
          <div className="grid gap-1.5">
            <b className="h-1.5 w-[40%] rounded transition-all duration-500 group-hover:w-[60%]" style={{ background: "#FC6E04" }} />
            <b className="ml-3 h-1.5 w-[60%] rounded" style={{ background: "#FF8A1F" }} />
            <b className="ml-3 h-1.5 w-[35%] rounded" style={{ background: "#FFD4B3" }} />
            <b className="h-1.5 w-[25%] rounded" style={{ background: "#FC6E04" }} />
          </div>
        </div>
      );
    case "social":
      return (
        <div aria-hidden className="flex items-center gap-3">
          <span className="size-11 rounded-full" style={{ background: "linear-gradient(135deg,#FC6E04,#FF8A1F)" }} />
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-transform duration-500 group-hover:scale-110" style={{ background: "#FFF0E4", color: "#E04F00" }}>
            <Heart size={14} style={{ fill: "#FC6E04", color: "#FC6E04" }} /> 2.4k
          </span>
        </div>
      );
    case "seo":
      return (
        <div aria-hidden className="grid w-full max-w-[220px] gap-2">
          <div className="flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm bg-white" style={{ borderColor: "#EAE5DF" }}>
            <Search size={14} style={{ color: "#929292" }} />
            <b className="h-2 w-[60%] rounded" style={{ background: "#EAE5DF" }} />
          </div>
          <span className="w-fit rounded-full px-2.5 py-1 text-xs font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1.5" style={{ background: "#FC6E04" }}>
            SEO-ready
          </span>
        </div>
      );
    case "graphic":
      return (
        <div aria-hidden className="relative h-[72px]">
          <span className="absolute left-0 top-1.5 size-14 rounded-full" style={{ background: "#FC6E04" }} />
          <span className="absolute left-9 top-1.5 size-14 rounded-xl border-2 border-dashed transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-12" style={{ borderColor: "#101114" }} />
          <span className="absolute left-20 top-11 h-0 w-0 -rotate-[25deg] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2.5"
            style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "18px solid #101114" }} />
        </div>
      );
    default:
      return (
        <div aria-hidden className="flex h-[72px] items-end gap-2">
          {["30%","48%","40%","72%","100%"].map((h, i, a) => (
            <span key={h} style={{ height: h, width: 18, background: i === a.length - 1 ? "#FC6E04" : "#EAE5DF" }}
              className="origin-bottom rounded-t-md rounded-b-sm transition-transform duration-500 group-hover:scale-y-[1.12]" />
          ))}
        </div>
      );
  }
}

export default function Services() {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-28" style={{ background: "#F8F7F4", color: "#171717" }}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <header className="mb-8 sm:mb-14">
          <h2 className="mb-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight">Our Services</h2>
          <p className="max-w-[46ch] text-base leading-relaxed sm:text-xl" style={{ color: "#6B6B70" }}>
            We build digital solutions that drive real business results.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map(({ id, title, text, tags, Icon, span }, i) => (
            <article
              key={id}
              onMouseMove={handleMove}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`group relative isolate flex flex-col justify-between gap-5 overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300 [--mx:50%] [--my:50%]
                before:pointer-events-none before:absolute before:inset-0 before:-z-10
                before:bg-[radial-gradient(360px_circle_at_var(--mx)_var(--my),rgba(252,110,4,0.12),transparent_65%)]
                before:opacity-0 before:transition-opacity before:duration-300
                hover:-translate-y-1 hover:before:opacity-100
                motion-safe:animate-[rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] sm:min-h-[260px] sm:p-6 ${span}`}
              style={{ borderColor: "#EAE5DF" }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-[52px] place-items-center rounded-2xl transition-colors duration-300 group-hover:text-[#101114]"
                  style={{ background: "#FFF0E4", color: "#FC6E04" }}
                  onMouseEnter={(e) => { const p = e.currentTarget.closest("article"); if (p) { e.currentTarget.style.background="#FC6E04"; e.currentTarget.style.color="#101114"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="#FFF0E4"; e.currentTarget.style.color="#FC6E04"; }}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="grid size-9 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45"
                  style={{ borderColor: "#EAE5DF", color: "#929292" }}>
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <Art id={id} />

              <div>
                <h3 className="mb-1.5 text-xl font-bold tracking-tight">
                  <a href="/contact" className="outline-none after:absolute after:-inset-[400px]">{title}</a>
                </h3>
                <p className="mb-3.5 max-w-[38ch] leading-normal" style={{ color: "#6B6B70" }}>{text}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <li key={t} className="rounded-full px-2.5 py-1 text-[0.78rem] font-medium" style={{ background: "#FFF0E4", color: "#E04F00" }}>{t}</li>
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
