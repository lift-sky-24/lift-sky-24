import DigitalMarketingPage from "@/components/DigitalMarketingPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { digitalMarketingData } from "@/data/service-details/digital-marketing";

export const metadata = meta(
  "Digital Marketing Company in Jaipur | LiftSky24",
  "LiftSky24 offers digital marketing services in Jaipur and Rajasthan, including SEO, Google Ads, social media marketing and online advertising.",
  "/services/digital-marketing"
);

export default function DigitalMarketingService() {
  const faqs = digitalMarketingData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",               href: "/" },
    { name: "Services",           href: "/services" },
    { name: "Digital Marketing",  href: "/services/digital-marketing" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"Digital Marketing", desc:"Digital marketing services in Jaipur", href:"/services/digital-marketing" })) }} />
      <DigitalMarketingPage breadcrumb={breadcrumb} />
    </>
  );
}
