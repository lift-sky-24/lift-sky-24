import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Digital Marketing",
  "Digital marketing agency in Jaipur — LiftSky24 runs paid ads, email campaigns and content strategy to grow your brand and generate leads.",
  "/services/digital-marketing"
);

export default function Page() {
  return <ServiceDetailPage slug="digital-marketing" />;
}
