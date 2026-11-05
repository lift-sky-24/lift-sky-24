import PageHero    from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import ProjectGrid  from "@/components/ProjectGrid";
import { meta }     from "@/lib/seo";
import { BRAND }    from "@/data/site-config";
import { portfolioPageHero, portfolioGridSection, portfolioCTA } from "@/data/pages/portfolio";

export const metadata = meta(
  "Portfolio",
  `Explore projects by ${BRAND.name} — website development, app development, software and digital marketing work for startups and businesses in Jaipur and across India.`,
  "/portfolio"
);

export default function Portfolio() {
  return (
    <>
      <PageHero
        title={portfolioPageHero.title}
        accent={portfolioPageHero.accent}
        eyebrow={portfolioPageHero.eyebrow}
        sub={portfolioPageHero.sub}
        image={portfolioPageHero.image}
        alt={portfolioPageHero.alt}
        ctas={portfolioPageHero.ctas}
      />
      <Section title={portfolioGridSection.title} sub={portfolioGridSection.sub}>
        <ProjectGrid filters />
      </Section>
      <CTABand title={portfolioCTA.title} sub={portfolioCTA.sub} button={portfolioCTA.button} href={portfolioCTA.href} />
    </>
  );
}
