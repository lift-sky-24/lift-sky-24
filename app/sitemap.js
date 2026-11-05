import { BRAND, SERVICES } from "@/data/site-config";
import { BLOG_POSTS } from "@/data/site-config";

export default function sitemap() {
  const base = BRAND.url;
  const now  = new Date().toISOString();

  const staticPages = [
    { url: `${base}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/industries`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/pricing`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const servicePages = SERVICES.map((s) => ({
    url:            `${base}${s.href}`,
    lastModified:   now,
    changeFrequency:"monthly",
    priority:       0.85,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url:            `${base}/blog/${p.slug}`,
    lastModified:   new Date(p.date).toISOString(),
    changeFrequency:"monthly",
    priority:       0.65,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
