import WebsiteDevelopmentPage from "@/components/WebsiteDevelopmentPage";
import { meta, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { websiteDevelopmentData } from "@/data/service-details/website-development";

export const metadata = meta(
  "Website Development Company in Jaipur | LiftSky24",
  "LiftSky24 offers professional website development services in Jaipur — custom websites, e-commerce, WordPress, web apps. Responsive, SEO-friendly and performance optimized.",
  "/services/website-development"
);

export default function WebsiteDevelopment() {
  const faqsForSchema = websiteDevelopmentData.faqs.map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  const breadcrumbItems = [
    { name: "Home",                href: "/" },
    { name: "Services",            href: "/services" },
    { name: "Website Development", href: "/services/website-development" },
  ];

  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqsForSchema)) }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }}
      />
      {/* Breadcrumb nav rendered inside the hero via prop */}
      <WebsiteDevelopmentPage breadcrumb={breadcrumbItems} />
    </>
  );
}
