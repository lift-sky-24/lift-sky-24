import { BRAND } from "@/data/site-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
    host:    BRAND.url,
  };
}
