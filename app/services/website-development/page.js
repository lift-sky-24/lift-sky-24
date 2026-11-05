import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Website Development",
  "Website development company in Jaipur — LiftSky24 builds fast, SEO-ready, responsive websites and web applications for startups and growing businesses.",
  "/services/website-development"
);

export default function Page() {
  return <ServiceDetailPage slug="website-development" />;
}
