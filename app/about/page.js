import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import { Reveal, Stagger, StaggerItem } from "@/components/ui";
import { missionVision, values, team } from "@/lib/data";
import { meta } from "@/lib/seo";
import AboutHero from "@/components/AboutHero";

export const metadata = meta("About Us", "Meet the LiftSky24 team: developers, designers and IT professionals building digital solutions together.", "/about");

export default function About() {
  return (
    <>
    <AboutHero/>
      <PageHero title="About Us" accent="Building Digital Solutions, Together"
        sub="We are a passionate team of developers, designers and IT professionals dedicated to creating innovative products that deliver quality and customer success."
        image="/images/team.svg" alt="The LiftSky24 team at work"
        stats={[{ n: 500, s: "+", l: "Happy Clients" }, { n: 120, s: "+", l: "Projects Completed" }, { n: 5, s: "+", l: "Years Experience" }]} />
      <Section title="Our Mission & Vision"><IconCards items={missionVision} cols="lg:grid-cols-2" /></Section>
      <Section title="Our Values" tone="soft"><MiniCards items={values} /></Section>
      <Section title="Meet Our Team">
        <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m) => (
            <StaggerItem key={m.n}>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-card">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-gradient text-2xl font-bold text-white" aria-hidden="true">{m.n.split(" ").map((w) => w[0]).join("")}</span>
                <h3 className="mt-4 font-semibold text-navy-900">{m.n}</h3>
                <p className="text-xs text-slate-500">{m.r}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTABand title="Join Our Growing Team" sub="Be a part of something bigger and build the future with us." button="View Careers" />
    </>
  );
}
