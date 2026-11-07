import Link from "next/link";
import HeroSection      from "@/components/HeroSection";
import PageHero         from "@/components/PageHero";
import { Section, MiniCards, CTABand } from "@/components/Sections";
import ProcessRoadmap   from "@/components/ProcessRoadmap";
import ServicesShowcase from "@/components/Servicesshowcase";
import Testimonials     from "@/components/Testimonials";
import FAQ              from "@/components/FAQ";
import PricingTable     from "@/components/PricingTable";
import { Reveal }       from "@/components/ui";
import { TechMarquee, ServicesMarquee } from "@/components/HomeMarquees";
import WhyCtaCard       from "@/components/WhyCtaCard";
import { why, processSteps } from "@/lib/data";
import { BRAND }        from "@/data/site-config";
import { meta }         from "@/lib/seo";
import {
  homeAboutSnippet,
  whyCtaCard,
  homeProcess,
  homePricingSection,
  homeCTA,
  marqueeItems,
} from "@/data/pages/home";

export const metadata = {
  ...meta(
    `Website, App, SEO & Digital Marketing Agency | ${BRAND.name}`,
    `${BRAND.name} — website development, app development, software, SEO, social media management, graphic design and digital marketing for startups and growing businesses in Jaipur, India.`,
    "/"
  ),
  title: `${BRAND.name} | Website, App, SEO & Digital Marketing Agency in Jaipur`,
};

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* Tech stack marquee */}
      <TechMarquee items={marqueeItems.tech} />

      {/* 2. About snippet */}
      <PageHero
        title={homeAboutSnippet.title}
        accent={homeAboutSnippet.accent}
        eyebrow={homeAboutSnippet.eyebrow}
        sub={homeAboutSnippet.sub}
        image={homeAboutSnippet.image}
        alt={homeAboutSnippet.alt}
        ctas={homeAboutSnippet.ctas}
      />

      {/* 3. Services */}
      <ServicesShowcase />

      {/* 4. Why Choose Us */}
      <Section title="Why Choose LiftSky24?" tone="soft">
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
          <MiniCards items={why} cols="md:grid-cols-3" />
          <Reveal>
            <WhyCtaCard
              title={whyCtaCard.title}
              sub={whyCtaCard.sub}
              href={whyCtaCard.href}
              cta={whyCtaCard.cta}
              footnote={whyCtaCard.footnote}
            />
          </Reveal>
        </div>
      </Section>

      {/* 5. Process */}
      <Section title={homeProcess.title} sub={homeProcess.sub}>
        <ProcessRoadmap items={processSteps} />
      </Section>

      {/* Services marquee reverse */}
      <ServicesMarquee items={marqueeItems.services} />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Pricing */}
      <Section title={homePricingSection.title} sub={homePricingSection.sub} center={homePricingSection.center}>
        <PricingTable />
        <div className="mt-8 text-center">
          <Link href={homePricingSection.viewAllHref} className="text-sm font-semibold text-brand hover:underline">
            {homePricingSection.viewAllLabel}
          </Link>
        </div>
      </Section>

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Final CTA */}
      <CTABand title={homeCTA.title} sub={homeCTA.sub} button={homeCTA.button} href={homeCTA.href} />
    </>
  );
}
