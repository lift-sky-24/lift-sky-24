import PageHero from "@/components/PageHero";
import { Section, IconCards, TechGrid, Steps, CTABand } from "@/components/Sections";
import { webServices, webTech, webProcess } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("Web Development Services", "Modern, fast, secure and SEO-friendly websites and web apps built with React, Next.js and Node.js.", "/services/web-development");

export default function Page() {
  return (
    <>
      <PageHero title="Modern Websites" accent="That Drive Results"
        sub="We build fast, secure and SEO-friendly websites that attract visitors and turn them into customers."
        badges={["Fast", "Secure", "SEO Friendly"]} image="/images/hero.svg" alt="Web development illustration"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "View Our Work", href: "/portfolio" }]} />
      <Section title="Our Web Development Services"><IconCards items={webServices} cols="lg:grid-cols-4" /></Section>
      <Section title="Technologies We Use" tone="soft"><TechGrid items={webTech} /></Section>
      <Section title="Our Process"><Steps items={webProcess} /></Section>
      <CTABand title="Ready to Build Your Website?" sub="Let's create a website that grows your business." />
    </>
  );
}
