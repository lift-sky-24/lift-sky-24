import PageHero from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import PricingTable from "@/components/PricingTable";
import FAQ from "@/components/FAQ";
import { meta } from "@/lib/seo";

export const metadata = meta("Pricing", "Simple, transparent pricing for web, mobile and custom software projects. Choose Starter, Business or Enterprise.", "/pricing");

export default function Pricing() {
  return (
    <>
      <PageHero title="Simple, Transparent" accent="Pricing"
        sub="Choose the plan that fits your business. No hidden charges, just great value and support."
        image="/images/pricing.svg" alt="Pricing plans illustration" />
      <Section title="Choose Your Plan" center><PricingTable /></Section>
      <FAQ />
      <CTABand title="Need a Custom Plan?" sub="Contact us for a tailored solution that fits your budget." button="Get a Free Quote" />
    </>
  );
}
