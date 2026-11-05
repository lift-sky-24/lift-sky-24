import PageHero     from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import PricingTable  from "@/components/PricingTable";
import FAQ           from "@/components/FAQ";
import { meta }      from "@/lib/seo";
import { BRAND }     from "@/data/site-config";
import { pricingPageHero, pricingPlansSection, pricingFaqSection, pricingCTA } from "@/data/pages/pricing";

export const metadata = meta(
  "Pricing",
  `Simple, transparent pricing for website development, app development, SEO and digital marketing. Choose Starter, Business or Premium — or request a custom quote from ${BRAND.name}.`,
  "/pricing"
);

export default function Pricing() {
  return (
    <>
      <PageHero
        title={pricingPageHero.title}
        accent={pricingPageHero.accent}
        eyebrow={pricingPageHero.eyebrow}
        sub={pricingPageHero.sub}
        image={pricingPageHero.image}
        alt={pricingPageHero.alt}
      />
      <Section title={pricingPlansSection.title} center={pricingPlansSection.center} sub={pricingPlansSection.sub}>
        <PricingTable />
      </Section>
      <FAQ title={pricingFaqSection.title} />
      <CTABand title={pricingCTA.title} sub={pricingCTA.sub} button={pricingCTA.button} href={pricingCTA.href} />
    </>
  );
}
