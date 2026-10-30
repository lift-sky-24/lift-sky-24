import PageHero from "@/components/PageHero";
import { Section } from "@/components/Sections";
import BlogList from "@/components/BlogList";
import { meta } from "@/lib/seo";

export const metadata = meta("Blog & Resources", "Insights, guides and resources on web development, mobile apps, UI/UX design and digital marketing from LiftSky24.", "/blog");

export default function Blog() {
  return (
    <>
      <PageHero title="Insights & Resources" accent="Stay Updated with the Latest Trends"
        sub="Explore our blogs, guides and resources to stay ahead in the digital world."
        image="/images/hero.svg" alt="Blog and resources illustration" />
      <Section title="Latest Articles"><BlogList /></Section>
    </>
  );
}
