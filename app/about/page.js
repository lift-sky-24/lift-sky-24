import PageHero  from "@/components/PageHero";
import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import { missionVision, values } from "@/lib/data";
import { BRAND, STATS } from "@/data/site-config";
import { aboutPageHero, aboutCTA } from "@/data/pages/about";
import { meta } from "@/lib/seo";
import AboutHero from "@/components/AboutHero";

export const metadata = meta(
  "About Us",
  `${BRAND.name} is a Jaipur-based digital agency — a team of developers, designers and marketers who work directly with founders and businesses to build and grow their online presence.`,
  "/about"
);

export default function About() {
  return (
    <>
      <AboutHero />

      <PageHero
        title={aboutPageHero.title}
        accent={aboutPageHero.accent}
        eyebrow={aboutPageHero.eyebrow}
        sub={aboutPageHero.sub}
        image={aboutPageHero.image}
        alt={aboutPageHero.alt}
        stats={STATS.map((s) => ({ n: s.value, s: s.suffix, l: s.label }))}
        ctas={aboutPageHero.ctas}
      />

      <Section title="Our Mission &amp; Vision">
        <IconCards items={missionVision} cols="lg:grid-cols-2" />
      </Section>

      <Section title="Our Values" tone="soft">
        <MiniCards items={values} cols="md:grid-cols-4" />
      </Section>

      {/* Meet the Team section removed per design decision */}

      <CTABand
        title={aboutCTA.title}
        sub={aboutCTA.sub}
        button={aboutCTA.button}
        href={aboutCTA.href}
      />
    </>
  );
}
