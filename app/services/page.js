import PageHero    from "@/components/PageHero";
import { Section, IconCards, CTABand } from "@/components/Sections";
import ProcessRoadmap from "@/components/ProcessRoadmap";
import { services, processSteps } from "@/lib/data";
import { meta } from "@/lib/seo";
import { BRAND, LOCAL_SEO } from "@/data/site-config";
import { servicesPageHero, servicesGridSection, servicesProcessSection, servicesCTA } from "@/data/pages/services";

export const metadata = meta(
  "Our Services",
  `${BRAND.name} offers 7 digital services: website development, app development, software development, social media management, SEO, graphic design and digital marketing in ${LOCAL_SEO.city}.`,
  "/services"
);

export default function Services() {
  return (
    <>
      <PageHero
        title={servicesPageHero.title}
        accent={servicesPageHero.accent}
        eyebrow={servicesPageHero.eyebrow}
        sub={servicesPageHero.sub}
        image={servicesPageHero.image}
        alt={servicesPageHero.alt}
        ctas={servicesPageHero.ctas}
      />
      <Section title={servicesGridSection.title} sub={servicesGridSection.sub}>
        <IconCards items={services} cols={servicesGridSection.cols} />
      </Section>
      <Section title={servicesProcessSection.title} tone={servicesProcessSection.tone} sub={servicesProcessSection.sub}>
        <ProcessRoadmap items={processSteps} />
      </Section>
      <CTABand title={servicesCTA.title} sub={servicesCTA.sub} button={servicesCTA.button} href={servicesCTA.href} />
    </>
  );
}
