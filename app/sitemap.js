import { allPages, SITE } from "@/lib/data";
export default function sitemap() {
  return [...allPages.map((p) => p.href), "/all-pages"].map((p) => ({ url: SITE + p, lastModified: new Date() }));
}
