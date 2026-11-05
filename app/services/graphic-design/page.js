import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Graphic Design",
  "Graphic design and branding services in Jaipur — LiftSky24 creates logos, brand identities, social media creatives and marketing materials.",
  "/services/graphic-design"
);

export default function Page() {
  return <ServiceDetailPage slug="graphic-design" />;
}
