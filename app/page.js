import Link from "next/link";
import dynamic from "next/dynamic";
import HeroBanner   from "@/components/HeroBanner";
import PageHero     from "@/components/PageHero";
import { Section, MiniCards, CTABand, Steps } from "@/components/Sections";
import ServicesShowcase from "@/components/Servicesshowcase";
import ProjectGrid  from "@/components/ProjectGrid";
import Testimonials from "@/components/Testimonials";
import FAQ          from "@/components/FAQ";
import PricingTable from "@/components/PricingTable";
import { Button, Reveal } from "@/components/ui";
import { why, processSteps } from "@/lib/data";
import { BRAND } from "@/data/site-config";
import { meta } from "@/lib/seo";
// Page-specific data — all content lives here, not in the JSX
import {
  homeAboutSnippet,
  whyCtaCard,
  homeProcess,
  homePortfolioSection,
  homePricingSection,
  homeFaqSection,
  homeCTA,
  marqueeItems,
} from "@/data/pages/home";

const MarqueeRow     = dynamic(() => import("@/components/animation/MarqueeRow"),     { ssr: false });
const MagneticButton = dynamic(() => import("@/components/animation/MagneticButton"), { ssr: false });

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
      <HeroBanner />

      {/* Tech stack marquee */}
      <div className="border-y border-slate-100 bg-white/60 py-4 overflow-hidden">
        <MarqueeRow items={marqueeItems.tech} duration={35} />
      </div>

      {/* 2. About snippet — content from data/pages/home.js */}
      <PageHero
        title={homeAboutSnippet.title}
        accent={homeAboutSnippet.accent}
        eyebrow={homeAboutSnippet.eyebrow}
        sub={homeAboutSnippet.sub}
        image={homeAboutSnippet.image}
        alt={homeAboutSnippet.alt}
        ctas={homeAboutSnippet.ctas}
      />

      {/* 3. Services (tabbed showcase) */}
      <ServicesShowcase />

      {/* 4. Why Choose Us — data from data/site-config.js → WHY (via lib/data why) */}
      <Section title="Why Choose LiftSky24?" tone="soft">
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
          <MiniCards items={why} cols="md:grid-cols-3" />
          <Reveal>
            <div
              className="flex h-full flex-col justify-center rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#6557ff,#ff4fa3)" }}
            >
              <div aria-hidden style={{ position:"absolute",inset:0,background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,.08) 50%,transparent 60%)",backgroundSize:"200% 100%",animation:"marquee-scroll 3s linear infinite" }} />
              <p className="text-xl font-bold leading-tight relative z-10" style={{ whiteSpace:"pre-line" }}>{whyCtaCard.title}</p>
              <p className="mt-2 text-sm text-white/80 relative z-10">{whyCtaCard.sub}</p>
              <div className="mt-5 w-fit relative z-10">
                <MagneticButton>
                  <Button href={whyCtaCard.href} variant="light">{whyCtaCard.cta}</Button>
                </MagneticButton>
              </div>
              <p className="mt-3 text-xs text-white/60 relative z-10">{whyCtaCard.footnote}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5. Process — data from data/site-config.js → PROCESS (via lib/data processSteps) */}
      <Section title={homeProcess.title} sub={homeProcess.sub}>
        <Steps items={processSteps} />
      </Section>

      {/* 6. Featured Projects — data from data/site-config.js → PORTFOLIO */}
      <Section title={homePortfolioSection.title} tone={homePortfolioSection.tone}>
        <ProjectGrid limit={homePortfolioSection.limit} cols="lg:grid-cols-3" />
        <div className="mt-6 text-right">
          <Link href={homePortfolioSection.viewAllHref} className="text-sm font-semibold text-brand hover:underline">
            {homePortfolioSection.viewAllLabel}
          </Link>
        </div>
      </Section>

      {/* Services marquee reverse */}
      <div className="border-y border-slate-100 bg-white/60 py-4 overflow-hidden">
        <MarqueeRow items={marqueeItems.services} duration={28} reverse />
      </div>

      {/* 7. Testimonials — data from data/site-config.js → TESTIMONIALS */}
      <Testimonials />

      {/* 8. Pricing preview — data from data/site-config.js → PRICING */}
      <Section title={homePricingSection.title} sub={homePricingSection.sub} center={homePricingSection.center}>
        <PricingTable />
        <div className="mt-8 text-center">
          <Link href={homePricingSection.viewAllHref} className="text-sm font-semibold text-brand hover:underline">
            {homePricingSection.viewAllLabel}
          </Link>
        </div>
      </Section>

      {/* 9. FAQ — data from data/site-config.js → FAQS */}
      <FAQ />

      {/* 10. Final CTA */}
      <CTABand title={homeCTA.title} sub={homeCTA.sub} button={homeCTA.button} href={homeCTA.href} />
    </>
  );
}
