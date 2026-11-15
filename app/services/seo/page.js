import SeoServicePage from "@/components/SeoServicePage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { seoData } from "@/data/service-details/seo";

export const metadata = meta(
  "SEO Services in Jaipur | LiftSky24",
  "LiftSky24 offers professional SEO services in Jaipur and Rajasthan, including local SEO, technical SEO, on-page optimization and e-commerce SEO.",
  "/services/seo"
);

export default function SeoService() {
  const faqsForSchema = seoData.faqs.map((f) => ({ q: f.question, a: f.answer }));

  const breadcrumb = [
    { name: "Home",     href: "/"        },
    { name: "Services", href: "/services"},
    { name: "SEO",      href: "/services/seo" },
  ];

  return (
    <>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqsForSchema)) }}
      />
      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: "Search Engine Optimization (SEO)",
            desc: seoData.meta.description,
            href: seoData.meta.slug,
          })),
        }}
      />
      <SeoServicePage breadcrumb={breadcrumb} />
    </>
  );
}
