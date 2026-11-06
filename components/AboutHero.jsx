"use client";

import { useEffect, useRef, useState } from "react";
import { HeartHandshake, PackageCheck, Award } from "lucide-react";

// Font classes — using Inter (already loaded in layout.js) + system cursive for handwritten note
const jakartaClass = ""; // Inter is the site font, loaded globally
const handStyle    = { fontFamily: "Caveat, cursive" }; // fallback if Caveat not loaded

/* ---------- Edit these ---------- */
const HERO_IMAGE = "/images/about.png"; // Collaborative_Teamwork_in_a_Modern_Office-1.png ko public/images/about.png naam se save karo
const SHOW_NOTE = true; // false karo agar handwritten note nahi chahiye

const stats = [
  { to: 500, label: "Happy Clients", Icon: HeartHandshake },
  { to: 120, label: "Projects Completed", Icon: PackageCheck },
  { to: 5, label: "Years Experience", Icon: Award },
];
const values = ["Built on Innovation", "Driven by Quality", "Focused on Your Success"];
const GRADIENT = "linear-gradient(90deg,#FF8A1F,#FC6E04,#E04F00,#FC6E04,#FF8A1F)";

/* Image ke 4 edges ko section background mein fade karne wala mask.
   Left side 12% fade (white/blue shapes), bottom mein white strip hide hoti hai. */
const IMAGE_MASK = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 12%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 87%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 12%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 87%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const css = `
@keyframes ah-fade{from{opacity:0;transform:translateY(18px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes ah-up{from{transform:translateY(105%) rotate(4deg)}to{transform:none}}
@keyframes ah-sheen{to{background-position:200% 0}}
@keyframes ah-reveal{from{opacity:0}to{opacity:1}}
@keyframes ah-drift{50%{transform:translate(26px,-20px) scale(1.1)}}
@keyframes ah-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes ah-line{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.ah-fade{animation:ah-fade .9s cubic-bezier(.2,.8,.2,1) var(--d,0ms) both}
.ah-up{display:inline-block;animation:ah-up .9s cubic-bezier(.2,.8,.2,1) var(--d,0ms) both}
.ah-sheen{background-size:200% 100%;animation:ah-sheen 5s linear infinite}
.ah-reveal{animation:ah-reveal 1s ease-out .2s both}
.ah-drift{animation:ah-drift 9s ease-in-out infinite}
.ah-draw{stroke-dasharray:1;animation:ah-draw 1.1s ease-out var(--d,0ms) both}
.ah-line{transform-origin:left;animation:ah-line 1s cubic-bezier(.2,.8,.2,1) var(--d,0ms) both}
@media (prefers-reduced-motion:reduce){.ah-root *{animation:none!important}}
`;

function Count({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const t0 = performance.now() + 800;
        const tick = (t) => {
          const p = Math.min(Math.max((t - t0) / 1600, 0), 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref} className="tabular-nums">{n}+</span>;
}

function Word({ children, d, style }) {
  return (
    <span className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
      <span className="ah-up" style={{ "--d": `${d}ms`, ...style }}>{children}</span>
    </span>
  );
}

export default function AboutHero() {
  return (
    <section
      id="about"
      className={`ah-root relative overflow-hidden text-[#171717]`}
      style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#FFF7F0 50%,#FFF0E4 100%)" }}
    >
      <style>{css}</style>

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-4 lg:py-20">
        {/* ---------------- Left: content ---------------- */}
        <div className="relative z-10 max-w-xl">
          <span className="ah-fade inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: "#FFF0E4", color: "#E04F00" }}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: "#FC6E04" }} />
              <span className="relative inline-flex size-2 rounded-full" style={{ background: "#FC6E04" }} />
            </span>
            About Us
          </span>

          <h1 className="mt-5 text-[clamp(1.5rem,3.2vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">
            <span className="block whitespace-nowrap">
              <Word d={100}>We’re</Word>
              <Word d={170}>More</Word>
              <Word d={240}>Than</Word>
              <Word d={310}>Just</Word>
            </span>
            <span className="block whitespace-nowrap">
              <Word d={380}>a</Word>
              <Word d={450}>
                <span className="ah-sheen bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                  Tech Company
                </span>
              </Word>
            </span>
          </h1>

          <p className="ah-fade mt-5 max-w-[52ch] text-base leading-relaxed text-[#4A5894] sm:text-lg" style={{ "--d": "650ms" }}>
            LiftSky24 is a leading IT services company, delivering innovative web solutions, mobile apps, and digital
            transformation services to help businesses grow in the digital world.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
            {stats.map(({ to, label, Icon }, i) => (
              <div
                key={label}
                className="ah-fade group flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3"
                style={{ "--d": `${800 + i * 110}ms` }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-6"
                  style={{ background: "#FFF0E4", color: "#FC6E04" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background="#FC6E04"; e.currentTarget.style.color="#101114"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="#FFF0E4"; e.currentTarget.style.color="#FC6E04"; }}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <div className="text-xl font-extrabold leading-none sm:text-2xl">
                    <Count to={to} />
                  </div>
                  <div className="mt-1 text-xs sm:text-[0.8rem]" style={{ color: "#6B6B70" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ah-line mt-8 h-px w-full max-w-md" style={{ "--d": "1100ms", background: "linear-gradient(90deg,#FFD4B3,transparent)", transformOrigin: "left" }} />

          <ul className="ah-fade mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium" style={{ "--d": "1250ms", color: "#6B6B70" }}>
            {values.map((v, i) => (
              <li key={v} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="size-1 rounded-full" style={{ background: "#FC6E04" }} />}
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------- Right: image ---------------- */}
        <div className="relative lg:-mr-8 xl:-mr-16">
          {/* orange orbs behind image */}
          <div aria-hidden className="ah-drift pointer-events-none absolute -left-10 top-6 size-64 rounded-full blur-3xl" style={{ background: "rgba(252,110,4,0.15)" }} />
          <div aria-hidden className="ah-drift pointer-events-none absolute -bottom-10 right-0 size-72 rounded-full blur-3xl [animation-delay:-4s]" style={{ background: "rgba(255,138,31,0.12)" }} />

          <div className="ah-reveal relative">
            <div className="relative">
              {/* Image 2170x725 hai (3:1). 2:1 box + object-cover se sirf team wala part crop hota hai,
                  baaki white/blue shapes mask se background mein ghul jaate hain. */}
              <img
                src={HERO_IMAGE}
                alt="LiftSky24 team collaborating around a laptop"
                draggable={false}
                className="aspect-[2/1] w-full select-none object-cover object-[62%_50%]"
                style={IMAGE_MASK}
              />

              {SHOW_NOTE && (
                <div className="pointer-events-none absolute right-[4%] top-[3%]">
                  <div className="-rotate-[8deg] text-right text-[clamp(1rem,2vw,1.6rem)] leading-[1.05]" style={{ color: "#FC6E04", ...handStyle }}>
                    {["Great People", "Build Great", "Products"].map((line, i) => (
                      <div key={line} className="ah-fade" style={{ "--d": `${1500 + i * 160}ms` }}>{line}</div>
                    ))}
                  </div>
                  <svg viewBox="0 0 80 80" className="ml-auto mt-1 w-12 sm:w-14" fill="none" stroke="#FC6E04" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <path className="ah-draw" pathLength="1" style={{ "--d": "2000ms" }} d="M60 6 C 78 30, 52 62, 16 66" />
                    <path className="ah-draw" pathLength="1" style={{ "--d": "2900ms" }} d="M16 66 L30 55 M16 66 L28 77" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}