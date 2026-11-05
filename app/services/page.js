import PageHero    from "@/components/PageHero";
import { Section, IconCards, Steps, CTABand } from "@/components/Sections";
import { services, processSteps } from "@/lib/data";
import { meta } from "@/lib/seo";
import { BRAND, LOCAL_SEO } from "@/data/site-config";

export const metadata = meta(
  "Our Services",
  `${BRAND.name} offers 7 digital services: website development, app development, software development, social media management, SEO, graphic design and digital marketing in ${LOCAL_SEO.city}.`,
  "/services"
);

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        accent="Everything Your Business Needs to Grow Online"
        eyebrow="7 Core Services"
        sub="From your first website to a full digital strategy — we offer website development, app development, software, SEO, social media management, graphic design and digital marketing under one roof."
        image="/images/hero.svg"
        alt="LiftSky24 digital services illustration"
        ctas={[
          { label: "Get a Free Quote", href: "/contact" },
          { label: "View Pricing",     href: "/pricing"  },
        ]}
      />
      <Section title="What We Do" sub="Click any service to see full details, inclusions and pricing.">
        <IconCards items={services} cols="lg:grid-cols-3 sm:grid-cols-2" />
      </Section>
      <Section title="How We Work" tone="soft" sub="A clear four-step process on every project.">
        <Steps items={processSteps} />
      </Section>
      <CTABand title="Not Sure Which Service You Need?" sub="Tell us about your goal — we'll recommend the right approach. Free, no-commitment call." />
    </>
  );
}
