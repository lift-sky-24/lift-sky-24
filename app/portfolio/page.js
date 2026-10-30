import PageHero from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import ProjectGrid from "@/components/ProjectGrid";
import { meta } from "@/lib/seo";

export const metadata = meta("Our Portfolio", "Explore LiftSky24's latest web apps, mobile apps and UI/UX projects built for growing businesses.", "/portfolio");

export default function Portfolio() {
  return (
    <>
      <PageHero title="Our Portfolio" accent="Ideas to Impact"
        sub="Explore some of our latest projects and see how we help businesses launch high-performing digital products."
        image="/images/hero.svg" alt="Portfolio projects illustration" />
      <Section title="Selected Work"><ProjectGrid filters /></Section>
      <CTABand title="Have a Project in Mind?" sub="Let's create something amazing together." />
    </>
  );
}
