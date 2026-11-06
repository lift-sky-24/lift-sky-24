import Link from "next/link";
import Image from "next/image";
import { Section, CTABand, CheckList } from "@/components/Sections";
import { Reveal, Stagger, StaggerItem } from "@/components/ui";
import FAQ from "@/components/FAQ";
import { services } from "@/lib/data";
import { meta } from "@/lib/seo";
import { BRAND } from "@/data/site-config";
import {
  industriesPageHero,
  industriesIntro,
  INDUSTRY_CATEGORIES,
  whyIndustryFocused,
  industryFAQs,
  industriesCTA,
} from "@/data/pages/industries";
import {
  Briefcase, HeartPulse, GraduationCap, ShoppingBag, UtensilsCrossed,
  Cpu, Factory, Palette, Landmark, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata = meta(
  "Industries We Serve",
  `${BRAND.name} builds digital solutions for businesses across healthcare, education, retail, hospitality, technology, manufacturing and many more industries in India.`,
  "/industries"
);

const ICON_MAP = {
  Briefcase, HeartPulse, GraduationCap, ShoppingBag,
  UtensilsCrossed, Cpu, Factory, Palette, Landmark,
};

// Accent color map — all mapped to orange/black brand system
const ACCENT_CLASSES = {
  "#6557ff": "bg-[#FC6E04]",
  "#059669": "bg-[#059669]",
  "#d97706": "bg-[#d97706]",
  "#e11d48": "bg-[#e11d48]",
  "#ea580c": "bg-[#FC6E04]",
  "#7c3aed": "bg-[#101114]",
  "#475569": "bg-[#475569]",
  "#c026d3": "bg-[#E04F00]",
  "#16a34a": "bg-[#16a34a]",
};

export default function Industries() {
  const featured   = INDUSTRY_CATEGORIES.filter((c) => c.featured);
  const secondary  = INDUSTRY_CATEGORIES.filter((c) => !c.featured);

  return (
    <>
      <PageHero
        title={industriesPageHero.title}
        accent={industriesPageHero.accent}
        eyebrow={industriesPageHero.eyebrow}
        sub={industriesPageHero.sub}
        image={industriesPageHero.image}
        alt={industriesPageHero.alt}
      />

      {/* ── Intro strip ─────────────────────────────────────────── */}
      <section className="bg-navy-900 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{industriesIntro.heading}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed">{industriesIntro.body}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured categories (large cards) ───────────────────── */}
      <Section title="Featured Industries" sub="Deep expertise where it matters most.">
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <Reveal key={cat.id} delay={i * 0.1}>
                <div
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.color} p-7 hover:-translate-y-1 transition-all duration-300 hover:shadow-card-lg`}
                >
                  {/* Icon + label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-white"
                      style={{ background: cat.accent }}
                    >
                      {Icon && <Icon size={20} />}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{cat.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 mb-5">{cat.featuredDesc}</p>
                  {/* Sub-industry pills */}
                  <ul className="flex flex-wrap gap-2">
                    {cat.industries.slice(0, 5).map((ind) => (
                      <li key={ind.name} className="rounded-full bg-white/70 border border-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {ind.name}
                      </li>
                    ))}
                    {cat.industries.length > 5 && (
                      <li className="rounded-full bg-white/70 border border-white px-3 py-1 text-xs font-semibold text-slate-500">
                        +{cat.industries.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── Full industry showcase — bento-style grid ───────────── */}
      <section className="bg-slate-50/70 py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">Every Industry We Serve</h2>
            <p className="mt-2 text-slate-600">From solo consultants to fast-growing enterprises — across 50+ business types.</p>
          </Reveal>

          <div className="space-y-8">
            {secondary.map((cat, ci) => {
              const Icon = ICON_MAP[cat.icon];
              return (
                <Reveal key={cat.id} delay={ci * 0.05}>
                  <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${cat.color} border-b border-slate-100`}>
                      <span
                        className="grid h-8 w-8 place-items-center rounded-lg text-white text-sm flex-shrink-0"
                        style={{ background: cat.accent }}
                      >
                        {Icon && <Icon size={16} />}
                      </span>
                      <h3 className="font-bold text-navy-900 text-base">{cat.label}</h3>
                      <span className="ml-auto text-xs text-slate-400 font-medium">{cat.industries.length} industries</span>
                    </div>
                    {/* Industry cards */}
                    <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-3 lg:grid-cols-6">
                      {cat.industries.map((ind) => (
                        <div
                          key={ind.name}
                          className="bg-white p-4 hover:bg-slate-50 transition-colors group"
                        >
                          <p className="text-sm font-semibold text-navy-900 group-hover:text-brand transition-colors leading-tight mb-1">
                            {ind.name}
                          </p>
                          <p className="text-xs text-slate-400 leading-snug line-clamp-2 hidden sm:block">
                            {ind.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why industry-focused ─────────────────────────────────── */}
      <Section>
        <Reveal>
          <div
            className="rounded-3xl p-8 text-white sm:p-10"
            style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}
          >
            <h2 className="text-2xl font-bold sm:text-3xl">{whyIndustryFocused.heading}</h2>
            <p className="mt-3 max-w-xl text-white/70 text-sm leading-relaxed">{whyIndustryFocused.body}</p>
            <div className="mt-6 max-w-md">
              <CheckList items={whyIndustryFocused.points} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Services applicable across industries ────────────────── */}
      <section className="py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-9 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">Services We Offer Across All Industries</h2>
            <p className="mt-2 text-slate-600">One team, all your digital needs — applied to your specific industry context.</p>
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.t}>
                <Link
                  href={s.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 hover:-translate-y-1 hover:shadow-card transition-all duration-300"
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-light text-brand group-hover:bg-brand-gradient group-hover:text-[#101114] transition-all duration-300">
                    {s.icon && <s.icon size={20} />}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-navy-900 group-hover:text-brand transition-colors text-sm">{s.t}</h3>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed line-clamp-2">{s.d}</p>
                  </div>
                  <ArrowRight size={16} className="flex-shrink-0 text-slate-300 group-hover:text-brand transition-colors mt-0.5" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <FAQ items={industryFAQs} title="Industries — FAQs" />

      <CTABand
        title={industriesCTA.title}
        sub={industriesCTA.sub}
        button={industriesCTA.button}
        href={industriesCTA.href}
      />
    </>
  );
}
