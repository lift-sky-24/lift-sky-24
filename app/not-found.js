// Server component — exports metadata
import { BRAND } from "@/data/site-config";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata = { title: `Page Not Found | ${BRAND.name}` };

export default function NotFound() {
  return <NotFoundClient />;
}
