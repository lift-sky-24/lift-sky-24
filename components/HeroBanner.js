/**
 * HeroBanner — server component shell.
 * All text rendered in SSR HTML, always visible.
 * HeroBannerClient adds animations on top after mount.
 */
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
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#FFE0C060,transparent 35%)",
      }}
    >
      {/* Client-only decorative layer — never blocks text */}
      <HeroBannerClient />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8 lg:py-20 relative z-10">

        {/* Left: all text — SSR, always visible */}
        <div>
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-wide text-brand uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {BRAND.tagline}
          </span>

          {/* H1 — plain text, NO mask, NO GSAP hide */}
          <h1 className="mt-5 text-[clamp(1.9rem,3.8vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-navy-900">
            Websites, Apps &amp; Digital Growth
            <br />
            <span className="gradient-text">That Take Your Business Higher.</span>
          </h1>

          {/* Sub */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
            We build fast websites, mobile apps, custom software and run SEO, social media and digital marketing campaigns — everything a growing business needs, in one team.
          </p>

          {/* Trust */}
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

          {/* Stats — server renders 0; HeroBannerClient counts up to final value */}
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/60 border border-white/80 px-4 py-3"
              >
                <dt className="text-xs text-slate-500">{s.label}</dt>
                {/* Start at 0 — GSAP counts up on scroll. Avoids final→0→final flash. */}
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

        {/* Right: hero image */}
        <div
          id="hero-img-wrap"
          className="relative mx-auto aspect-[1000/680] w-full max-w-[600px]"
          style={{ willChange: "transform" }}
        >
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
