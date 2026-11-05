import PageHero  from "@/components/PageHero";
import { Section, IconCards, CheckList, CTABand } from "@/components/Sections";
import { Reveal } from "@/components/ui";
import { industries, industryPoints, services } from "@/lib/data";
import { meta } from "@/lib/seo";
import { BRAND } from "@/data/site-config";

export const metadata = meta(
  "Industries We Serve",
  `${BRAND.name} builds digital solutions for healthcare, education, e-commerce, finance, real estate, travel, manufacturing and logistics businesses in India.`,
  "/industries"
);

export default function Industries() {
  return (
    <>
      <PageHero
        title="Industries We Serve"
        accent="Tailored Solutions for Every Sector"
        eyebrow="Sector Expertise"
        sub="We've worked across healthcare, education, retail and more. Every industry has its own workflows, compliance needs and customer expectations — we build around them."
        image="/images/industries.svg"
        alt="Industries served by LiftSky24"
      />

      <Section title="Where We Work" sub="Domain knowledge means fewer surprises and faster delivery.">
        <IconCards items={industries} cols="lg:grid-cols-4" />
      </Section>

      <Section>
        <Reveal>
          <div
            className="rounded-3xl p-8 text-white sm:p-10"
            style={{ background: "radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b" }}
          >
            <h2 className="text-2xl font-bold sm:text-3xl">Why Industry-Focused Development?</h2>
            <p className="mt-3 max-w-xl text-white/70 text-sm leading-relaxed">
              Generic solutions rarely fit perfectly. We bring sector-specific experience to every project — which means better decisions, fewer revisions and outcomes that actually work for your users.
            </p>
            <div className="mt-6 max-w-md">
              <CheckList items={industryPoints} />
            </div>
          </div>
        </Reveal>
      </Section>

      <Section title="Services We Offer" tone="soft" sub="Every service, applied to your industry context.">
        <IconCards items={services} cols="lg:grid-cols-3 sm:grid-cols-2" />
      </Section>

      <CTABand
        title="Let's Build Your Industry Solution"
        sub="Tell us your industry and challenge — we'll suggest the right approach."
        button="Talk to Us"
      />
    </>
  );
}
