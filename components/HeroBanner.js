import Image   from "next/image";
import Link    from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle, ArrowDown } from "lucide-react";
import { BRAND, STATS } from "@/data/site-config";

const HeroBannerClient = dynamic(
  () => import("@/components/HeroBannerClient"),
  { ssr: false }
);

const trust = [
  "No hidden fees",
  "You own the source code",
  "24h response time",
];

export default function HeroBanner() {
  return (
    <section
      className="relative isolate overflow-hidden bg-hero-bg-wash before:content-[''] before:absolute before:-z-10 before:right-[-70px] before:top-[-20px] before:h-[600px] before:w-[600px] before:rounded-full before:bg-hero-bg-aurora before:blur-[70px] before:opacity-25 before:animate-hero-bg-aurora after:content-[''] after:absolute after:inset-0 after:-z-10 after:pointer-events-none after:opacity-25 after:bg-hero-bg-dots after:bg-[length:8px_8px] after:[mask-image:linear-gradient(90deg,#000,transparent_80%)] max-[620px]:before:h-[360px] max-[620px]:before:w-[360px] max-[620px]:before:right-[-60px] max-[620px]:before:top-0 max-[620px]:before:blur-[50px] motion-reduce:before:animate-none"
    >
      {/* Client-only decorative layer — never blocks text */}
      <HeroBannerClient />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-20 relative z-10">

        {/* ── Left: all text — SSR, always visible ────────────────── */}
        <div>
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-wide text-brand uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {BRAND.tagline}
          </span>

          {/* H1 */}
          <h1 className="mt-5 text-[clamp(1.9rem,3.8vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-navy-900">
            Websites, Apps &amp; Digital Growth
            <br />
            <span className="gradient-text">That Take Your Business Higher.</span>
          </h1>

          {/* Sub */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
            We build fast websites, mobile apps, custom software and run SEO, social media and digital marketing campaigns — everything a growing business needs, in one team.
          </p>

          {/* Trust checks */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CheckCircle size={13} className="shrink-0 text-emerald-500" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-dark-pill">
              Get a Free Quote <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn-light-pill">
              View Our Services
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/60 border border-white/80 px-4 py-3"
              >
                <dt className="text-xs text-slate-500">{s.label}</dt>
                <dd
                  className="mt-0.5 text-xl font-extrabold text-navy-900"
                  data-stat-to={s.value}
                  data-stat-suffix={s.suffix}
                >
                  0{s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Right: hero image ────────────────────────────────────── */}
        {/*
          isolate added so the -z-10 glow child does not fall
          behind the section background.
        */}
        <div
          id="hero-img-wrap"
          className="relative isolate mx-auto aspect-[1000/680] w-full max-w-[600px]"
          style={{ willChange: "transform" }}
        >
          {/* Glow behind the hero image */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[3%] top-[12%] bottom-[6%] -z-10 rounded-[48%] bg-hero-bg-glow blur-[45px] opacity-[.35] animate-hero-bg-spin motion-reduce:animate-none"
          />

          <Image
            src="/images/home_hero.png"
            alt="LiftSky24 — websites, apps and digital growth illustration"
            fill
            priority
            sizes="(min-width:1024px) 600px, 100vw"
            className="select-none object-contain mix-blend-multiply"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right,transparent 0%,#000 8%,#000 92%,transparent 100%),linear-gradient(to bottom,transparent 0%,#000 6%,#000 94%,transparent 100%)",
              maskImage:
                "linear-gradient(to right,transparent 0%,#000 8%,#000 92%,transparent 100%),linear-gradient(to bottom,transparent 0%,#000 6%,#000 94%,transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
