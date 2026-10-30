import PageHero from "@/components/PageHero";
import { Section, IconCards, TechGrid, CTABand } from "@/components/Sections";
import { mobileServices, mobileTech } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("Mobile App Development", "iOS, Android and cross-platform mobile app development with Flutter, React Native, Swift and Kotlin.", "/services/mobile-apps");

export default function Page() {
  return (
    <>
      <PageHero title="Apps That Make" accent="an Impact"
        sub="We design and build high-quality mobile apps that users love and businesses rely on."
        image="/images/phones.svg" alt="Mobile app screens illustration"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "View Our Work", href: "/portfolio" }]} />
      <Section title="Our Mobile App Services"><IconCards items={mobileServices} cols="lg:grid-cols-4" /></Section>
      <Section title="Technologies We Use" tone="soft"><TechGrid items={mobileTech} /></Section>
      <CTABand title="Turn Your Idea Into an App" sub="Let's build something users will love." button="Get a Free Quote" />
    </>
  );
}
