import PageHero from "@/components/PageHero";
import { Section, IconCards, CheckList, CTABand } from "@/components/Sections";
import { Reveal } from "@/components/ui";
import { industries, industryPoints } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("Industries We Serve", "Tailored software solutions for healthcare, education, e-commerce, finance, manufacturing, real estate, travel and logistics.", "/industries");

export default function Industries() {
  return (
    <>
      <PageHero title="Industries We Serve" accent="Tailored Solutions for Every Industry"
        sub="We provide domain-specific solutions to meet the unique needs of different industries."
        image="/images/industries.svg" alt="Industry solutions illustration" />
      <Section title="Where We Work"><IconCards items={industries} cols="lg:grid-cols-4" /></Section>
      <Section>
        <Reveal>
          <div className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Why Industry Focused?</h2>
            <div className="mt-6 max-w-md"><CheckList items={industryPoints} /></div>
          </div>
        </Reveal>
      </Section>
      <CTABand title="Let's Build Your Industry Solution" sub="Talk to our experts and get started." button="Send Message" />
    </>
  );
}
