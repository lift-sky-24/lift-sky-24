import PageHero from "@/components/PageHero";
import { Section, IconCards, Steps, CTABand } from "@/components/Sections";
import { services, processSteps } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("Our Services", "End-to-end digital solutions: web development, mobile apps, UI/UX design, cloud, digital marketing and IT consulting.", "/services");

export default function Services() {
  return (
    <>
      <PageHero title="Our Services" accent="End-to-End Digital Solutions for Your Business"
        sub="We offer a wide range of IT services to help you build, scale and grow your business with the right technology."
        image="/images/hero.svg" alt="Web and mobile services illustration"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "View Pricing", href: "/pricing" }]} />
      <Section title="Our Services"><IconCards items={services} /></Section>
      <Section title="Process We Follow" tone="soft"><Steps items={processSteps} /></Section>
      <CTABand title="Ready to Discuss Your Project?" sub="Get a free consultation and let's build something great." />
    </>
  );
}
