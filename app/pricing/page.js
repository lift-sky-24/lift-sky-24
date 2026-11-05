import PageHero     from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import PricingTable  from "@/components/PricingTable";
import FAQ           from "@/components/FAQ";
import { meta }      from "@/lib/seo";
import { BRAND }     from "@/data/site-config";

export const metadata = meta(
  "Pricing",
  `Simple, transparent pricing for website development, app development, SEO and digital marketing. Choose Starter, Business or Premium — or request a custom quote from ${BRAND.name}.`,
  "/pricing"
);

export default function Pricing() {
  return (
    <>
      <PageHero
        title="Simple, Transparent"
        accent="Pricing"
        eyebrow="No hidden fees"
        sub="Every project starts with a clear scope and a fixed quote. Choose a starting package or talk to us about a custom scope — we'll give you an honest breakdown before any work begins."
        image="/images/pricing.svg"
        alt="LiftSky24 pricing plans illustration"
      />
      <Section title="Choose Your Plan" center sub="Starting prices — final cost depends on your scope. All quotes are free.">
        <PricingTable />
      </Section>
      <FAQ title="Pricing &amp; Payment FAQs" />
      <CTABand
        title="Need a Custom Quote?"
        sub="Tell us what you're building — we'll scope it for free and send a detailed breakdown."
        button="Get a Free Quote"
      />
    </>
  );
}
