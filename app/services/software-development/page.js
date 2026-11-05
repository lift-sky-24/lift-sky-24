import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Software Development",
  "Custom software development in Jaipur — LiftSky24 builds CRMs, ERPs, portals and automation tools tailored to your business workflow.",
  "/services/software-development"
);

export default function Page() {
  return <ServiceDetailPage slug="software-development" />;
}
