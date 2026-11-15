import { Section, CTABand } from "@/components/Sections";
import PricingTable  from "@/components/PricingTable";
import FAQ           from "@/components/FAQ";
import { meta }      from "@/lib/seo";
import { BRAND }     from "@/data/site-config";
import { pricingPlansSection, pricingFaqSection, pricingCTA } from "@/data/pages/pricing";
import FloatingHero from "@/components/FloatingHero";
import { heroElements } from "@/data/hero-elements";

export const metadata = meta(
  "Pricing",
  `Simple, transparent pricing for website development, app development, SEO and digital marketing. Choose Starter, Business or Premium — or request a custom quote from ${BRAND.name}.`,
  "/pricing"
);

export default function Pricing() {
  return (
    <>
      <FloatingHero
        eyebrow="TRANSPARENT PRICING"
        title="Simple, Honest Pricing. No Surprises."
        titleAccent="No Surprises."
        description="Every project is scoped before work begins. Choose a starting plan or request a fully custom quote — either way, you'll know exactly what you're paying for."
        ctas={[
          { text: "Get a Custom Quote", href: "/contact",  variant: "primary"   },
          { text: "Talk to Us",         href: "/contact",  variant: "secondary" },
        ]}
        centerIcon={heroElements.pricing.centerIcon}
        centerLabel={heroElements.pricing.centerLabel}
        floatingElements={heroElements.pricing.elements}
      />
      <Section title={pricingPlansSection.title} center={pricingPlansSection.center} sub={pricingPlansSection.sub}>
        <PricingTable />
      </Section>
      <FAQ title={pricingFaqSection.title} />
      <CTABand title={pricingCTA.title} sub={pricingCTA.sub} button={pricingCTA.button} href={pricingCTA.href} />
    </>
  );
}
