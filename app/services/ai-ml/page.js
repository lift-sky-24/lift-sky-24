import PageHero from "@/components/PageHero";
import { Section, IconCards, MiniCards, CTABand } from "@/components/Sections";
import { aiServices, aiUseCases } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("AI & Machine Learning Services", "Machine learning, deep learning, computer vision, NLP and predictive analytics solutions for your business.", "/services/ai-ml");

export default function Page() {
  return (
    <>
      <PageHero title="Smarter Solutions with" accent="AI & Machine Learning"
        sub="We use artificial intelligence to automate work, uncover insights and create smarter customer experiences."
        image="/images/ai.svg" alt="AI neural network illustration"
        ctas={[{ label: "Get a Free Quote", href: "/contact" }, { label: "Explore Services", href: "/services" }]} />
      <Section title="Our AI & ML Services"><IconCards items={aiServices} /></Section>
      <Section title="Use Cases" tone="soft"><MiniCards items={aiUseCases} cols="md:grid-cols-5" /></Section>
      <CTABand title="Let's Build Something Amazing" sub="Talk to our AI team about your idea." />
    </>
  );
}
