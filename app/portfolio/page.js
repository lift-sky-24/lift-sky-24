import PageHero    from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import ProjectGrid  from "@/components/ProjectGrid";
import { meta }     from "@/lib/seo";
import { BRAND }    from "@/data/site-config";

export const metadata = meta(
  "Portfolio",
  `Explore projects by ${BRAND.name} — website development, app development, software and digital marketing work for startups and businesses in Jaipur and across India.`,
  "/portfolio"
);

export default function Portfolio() {
  return (
    <>
      <PageHero
        title="Our Portfolio"
        accent="Ideas to Impact"
        eyebrow="Selected Work"
        sub="We document our work carefully. Case studies are coming — in the meantime, get in touch to see examples relevant to your industry."
        image="/images/hero.svg"
        alt="LiftSky24 portfolio illustration"
        ctas={[{ label: "Start Your Project", href: "/contact" }]}
      />
      <Section title="Selected Work" sub="Real projects. Real results. More coming soon.">
        <ProjectGrid filters />
      </Section>
      <CTABand
        title="Have a Project in Mind?"
        sub="We'd love to hear about it. Let's build something great together."
      />
    </>
  );
}
