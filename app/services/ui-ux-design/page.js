import PageHero from "@/components/PageHero";
import { Section, Steps, TechGrid, CTABand } from "@/components/Sections";
import { designProcess, designTools } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("UI/UX Design Services", "User-centred UI/UX design: research, wireframing, prototyping and testing for web and mobile products.", "/services/ui-ux-design");

export default function Page() {
  return (
    <>
      <PageHero title="Beautiful Designs" accent="For Better Experiences"
        sub="We design intuitive, engaging interfaces that make your product easy and enjoyable to use."
        image="/images/design.svg" alt="UI/UX design artboard illustration"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "View Our Work", href: "/portfolio" }]} />
      <Section title="Our Design Process"><Steps items={designProcess} /></Section>
      <Section title="Design Tools" tone="soft"><TechGrid items={designTools} /></Section>
      <CTABand title="Let's Design Something Amazing" sub="Tell us about your product and we'll make it shine." />
    </>
  );
}
