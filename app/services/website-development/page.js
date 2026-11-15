import WebsiteDevelopmentPage from "@/components/WebsiteDevelopmentPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { meta, faqSchema } from "@/lib/seo";
import { websiteDevelopmentData } from "@/data/service-details/website-development";

export const metadata = meta(
  "Website Development Company in Jaipur | LiftSky24",
  "LiftSky24 offers professional website development services in Jaipur — custom websites, e-commerce, WordPress, web apps. Responsive, SEO-friendly and performance optimized.",
  "/services/website-development"
);

export default function WebsiteDevelopment() {
  /* Map FAQ shape {question, answer} → {q, a} expected by faqSchema */
  const faqsForSchema = websiteDevelopmentData.faqs.map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqsForSchema)) }}
      />
      <Breadcrumbs
        items={[
          { name: "Services", href: "/services" },
          { name: "Website Development" },
        ]}
      />
      <WebsiteDevelopmentPage />
    </>
  );
}
