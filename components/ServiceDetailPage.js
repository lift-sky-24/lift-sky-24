import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, IconCards, TechGrid, Steps, CTABand } from "@/components/Sections";
import FAQ from "@/components/FAQ";
import { Reveal, Stagger, StaggerItem } from "@/components/ui";
import { SERVICES, IMAGES } from "@/data/site-config";
import { serviceDetails, services } from "@/lib/data";

export default function ServiceDetailPage({ slug }) {
  const svc    = SERVICES.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!svc || !detail) return null;

  const iconMap     = Object.fromEntries(services.map((s) => [s.t, s.icon]));
  const relatedCards = detail.relatedServices
    .map((rs) => SERVICES.find((s) => s.slug === rs))
    .filter(Boolean)
    .map((s) => ({ icon: iconMap[s.name] ?? null, t: s.name, d: s.desc, href: s.href }));

  return (
    <>
      {/* Hero */}
      <PageHero
        title={svc.name}
        accent={detail.headline}
        sub={detail.overview}
        image={IMAGES.services[slug] || IMAGES.hero}
        alt={`${svc.name} — LiftSky24`}
        eyebrow="Services"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "All Services", href: "/services" }]}
      />

      {/* What's included — checklist ticks in one by one */}
      <Section title="What's Included" sub="Everything in the standard engagement:">
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detail.included.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Tools */}
      {detail.tools?.length > 0 && (
        <Section title="Tools &amp; Technologies" tone="soft">
          <TechGrid items={detail.tools} />
        </Section>
      )}

      {/* Process */}
      <Section title="Our Process">
        <Steps items={detail.process} />
      </Section>

      {/* Deliverables */}
      <Section title="Deliverables" tone="soft">
        <Reveal>
          <ul className="flex flex-wrap gap-3">
            {detail.deliverables.map((d, i) => (
              <li
                key={d}
                className="rounded-full border border-brand/30 bg-brand-light px-4 py-2 text-sm font-medium text-brand"
                data-aos="zoom-in"
                data-aos-delay={i * 50}
              >
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Service FAQs */}
      {detail.faqs?.length > 0 && (
        <FAQ items={detail.faqs} title={`${svc.name} — FAQs`} />
      )}

      {/* Related services */}
      {relatedCards.length > 0 && (
        <Section title="Related Services" tone="soft">
          <IconCards items={relatedCards} cols="lg:grid-cols-3" />
        </Section>
      )}

      <CTABand
        title={`Ready to get started with ${svc.name}?`}
        sub="Book a free call — we'll scope your project at no cost."
      />
    </>
  );
}
