import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import { missionVision, values } from "@/lib/data";
import { BRAND, STATS } from "@/data/site-config";
import { aboutCTA } from "@/data/pages/about";
import { meta } from "@/lib/seo";
import AboutHero from "@/components/AboutHero";
import FloatingHero from "@/components/FloatingHero";
import { heroElements } from "@/data/hero-elements";

export const metadata = meta(
  "About Us",
  `${BRAND.name} is a Jaipur-based digital agency — a team of developers, designers and marketers who work directly with founders and businesses to build and grow their online presence.`,
  "/about"
);

export default function About() {
  return (
    <>
      <AboutHero />

      <FloatingHero
        eyebrow="OUR STORY"
        title="We Don't Just Build Websites. We Build Digital Futures."
        titleAccent="Digital Futures."
        description="Founded in Jaipur with a mission to help businesses rise higher in the digital world. We combine creative design with smart development to deliver results that matter."
        ctas={[
          { text: "Start a Project",   href: "/contact",  variant: "primary"   },
          { text: "Our Services",      href: "/services", variant: "secondary" },
        ]}
        centerIcon={heroElements.about.centerIcon}
        centerLabel={heroElements.about.centerLabel}
        floatingElements={heroElements.about.elements}
        stats={[
          { number: "5+",  label: "Years"     },
          { number: "30+", label: "Projects"  },
          { number: "7",   label: "Services"  },
          { number: "24h", label: "Response"  },
        ]}
      />

      <Section title="Our Mission &amp; Vision">
        <IconCards items={missionVision} cols="lg:grid-cols-2" />
      </Section>

      <Section title="Our Values" tone="soft">
        <MiniCards items={values} cols="md:grid-cols-4" />
      </Section>

      <CTABand
        title={aboutCTA.title}
        sub={aboutCTA.sub}
        button={aboutCTA.button}
        href={aboutCTA.href}
      />
    </>
  );
}
