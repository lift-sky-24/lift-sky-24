import SocialMediaPage from "@/components/SocialMediaPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { socialMediaData } from "@/data/service-details/social-media-management";

export const metadata = meta(
  "Social Media Marketing in Jaipur | LiftSky24",
  "LiftSky24 offers social media marketing in Jaipur, including Instagram, Facebook, LinkedIn, content creation and paid advertising.",
  "/services/social-media-management"
);

export default function SocialMediaService() {
  const faqs = socialMediaData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",                     href: "/" },
    { name: "Services",                 href: "/services" },
    { name: "Social Media Management",  href: "/services/social-media-management" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"Social Media Management", desc:"Social media marketing services in Jaipur", href:"/services/social-media-management" })) }} />
      <SocialMediaPage breadcrumb={breadcrumb} />
    </>
  );
}
