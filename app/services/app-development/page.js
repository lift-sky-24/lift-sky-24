import AppDevelopmentPage from "@/components/AppDevelopmentPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { appDevelopmentData } from "@/data/service-details/app-development";

export const metadata = meta(
  "Mobile App Development Company in Jaipur | LiftSky24",
  "LiftSky24 builds modern Android and iOS mobile apps in Jaipur. Flutter, React Native, native development. Get a free consultation.",
  "/services/app-development"
);

export default function AppDevelopmentService() {
  const faqs = appDevelopmentData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",            href: "/" },
    { name: "Services",        href: "/services" },
    { name: "App Development", href: "/services/app-development" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"App Development", desc:"Mobile app development services in Jaipur", href:"/services/app-development" })) }} />
      <AppDevelopmentPage breadcrumb={breadcrumb} />
    </>
  );
}
