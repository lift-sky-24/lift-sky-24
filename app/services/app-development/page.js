import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "App Development",
  "Professional iOS and Android app development services in Jaipur — LiftSky24 builds cross-platform and native mobile apps for startups and growing businesses.",
  "/services/app-development"
);

export default function Page() {
  return <ServiceDetailPage slug="app-development" />;
}
