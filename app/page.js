import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import ProjectGrid from "@/components/ProjectGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { Button, Reveal } from "@/components/ui";
import { services, why } from "@/lib/data";
import { meta } from "@/lib/seo";
import HeroBanner from "@/components/HeroBanner";

export const metadata = {
  ...meta("Web, Mobile, UI/UX & AI Development Company", "LiftSky24 is a leading IT services company delivering web development, mobile apps, UI/UX design, cloud and AI solutions.", "/"),
  title: "LiftSky24 | Web, Mobile, UI/UX & AI Development Company",
};

export default function Home() {
  return (
    <>
    <HeroBanner/>
      <PageHero title="We're More Than Just a" accent="Tech Company"
        sub="LiftSky24 is a leading IT services company delivering innovative web, mobile and AI solutions that help growing businesses scale with confidence."
        image="/images/team.svg" alt="LiftSky24 team collaborating on a project"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "Explore Our Services", href: "/services" }]}
        stats={[{ n: 500, s: "+", l: "Happy Clients" }, { n: 120, s: "+", l: "Projects Completed" }, { n: 5, s: "+", l: "Years Experience" }]} />

      <Section title="Our Services" sub="We build digital solutions that drive real business results."><IconCards items={services} /></Section>

      <Section title="Why Choose LiftSky24?" tone="soft">
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <MiniCards items={why} />
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-gradient p-6 text-white">
              <p className="text-lg font-bold">Ready to Start Your Project?</p>
              <p className="mt-1 text-sm text-white/80">Let&apos;s turn your idea into reality.</p>
              <Button href="/contact" variant="light" className="mt-4 w-fit">Get a Free Quote</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Featured Projects">
        <ProjectGrid limit={4} />
        <div className="mt-6 text-right"><Link href="/portfolio" className="text-sm font-semibold text-brand hover:underline">View All Projects</Link></div>
      </Section>

      <Testimonials />
      <FAQ />
      <CTABand title="Ready to Build Something Great?" sub="Tell us about your project and get a free consultation." />
    </>
  );
}
