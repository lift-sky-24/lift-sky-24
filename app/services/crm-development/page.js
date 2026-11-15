import CrmDevelopmentPage from "@/components/CrmDevelopmentPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { crmDevelopmentData } from "@/data/service-details/crm-development";

export const metadata = meta(
  "CRM Development Company in Jaipur | LiftSky24",
  "LiftSky24 offers custom CRM development in Jaipur for lead management, customer relationships, business automation and CRM integrations.",
  "/services/crm-development"
);

export default function CrmDevelopmentService() {
  const faqs = crmDevelopmentData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",             href: "/" },
    { name: "Services",         href: "/services" },
    { name: "CRM Development",  href: "/services/crm-development" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"CRM Development", desc:"Custom CRM development services in Jaipur", href:"/services/crm-development" })) }} />
      <CrmDevelopmentPage breadcrumb={breadcrumb} />
    </>
  );
}
