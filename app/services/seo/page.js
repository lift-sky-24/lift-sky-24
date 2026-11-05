import ServiceDetailPage from "@/components/ServiceDetailPage";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Search Engine Optimization (SEO)",
  "SEO services in Jaipur — LiftSky24 improves your Google rankings with technical SEO, on-page optimisation and content strategy for local and national businesses.",
  "/services/seo"
);

export default function Page() {
  return <ServiceDetailPage slug="seo" />;
}
