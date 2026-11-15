import GraphicDesignPage from "@/components/GraphicDesignPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { graphicDesignData } from "@/data/service-details/graphic-design";

export const metadata = meta(
  "Graphic Design Company in Jaipur | LiftSky24",
  "LiftSky24 offers graphic design in Jaipur: logos, branding, social media creatives, brochures, packaging and UI design. Get a free quote.",
  "/services/graphic-design"
);

export default function GraphicDesignService() {
  const faqs = graphicDesignData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",            href: "/" },
    { name: "Services",        href: "/services" },
    { name: "Graphic Design",  href: "/services/graphic-design" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"Graphic Design", desc: graphicDesignData.meta?.description || "Graphic design services in Jaipur", href:"/services/graphic-design" })) }} />
      <GraphicDesignPage breadcrumb={breadcrumb} />
    </>
  );
}
