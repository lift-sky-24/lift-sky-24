import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Social Media Management",
  "Social media management services in Jaipur — LiftSky24 handles content creation, scheduling and community management for Instagram, Facebook and LinkedIn.",
  "/services/social-media-management"
);

export default function Page() {
  return <ServiceDetailPage slug="social-media-management" />;
}
