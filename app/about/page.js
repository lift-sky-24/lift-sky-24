import PageHero  from "@/components/PageHero";
import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import { Reveal, Stagger, StaggerItem } from "@/components/ui";
import { missionVision, values, team } from "@/lib/data";
import { BRAND, STATS } from "@/data/site-config";
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
        title="About"
        accent="We Build. We Design. We Grow."
        eyebrow={BRAND.tagline}
        sub="LiftSky24 started as a small group of freelancers in Jaipur who kept getting asked the same thing: 'Can you handle our marketing too?' We could — and we did. Today we're a full-service team of developers, designers and digital marketers who work together on every project. No silos, no handoff chaos. Just one team that cares about your results."
        image="/images/team.svg"
        alt="The LiftSky24 team at work in Jaipur"
        stats={STATS.map((s) => ({ n: s.value, s: s.suffix, l: s.label }))}
        ctas={[{ label: "Work With Us", href: "/contact" }]}
      />

      <Section title="Our Mission &amp; Vision">
        <IconCards items={missionVision} cols="lg:grid-cols-2" />
      </Section>

      <Section title="Our Values" tone="soft">
        <MiniCards items={values} cols="md:grid-cols-4" />
      </Section>

      <Section title="Meet the Team" sub="The people behind your project — you'll work directly with these folks.">
        <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m) => (
            <StaggerItem key={m.n}>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-card">
                <span
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-gradient text-2xl font-bold text-white"
                  aria-hidden="true">
                  {m.n.split(" ").map((w) => w[0]).join("")}
                </span>
                <h3 className="mt-4 font-semibold text-navy-900">{m.n}</h3>
                <p className="text-xs text-slate-500">{m.r}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CTABand
        title="Let's Build Something Together"
        sub="Whether you have a brief or just an idea — get in touch for a free call."
        button="Start the Conversation"
      />
    </>
  );
}
