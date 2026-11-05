import { BRAND, LOCAL_SEO } from "@/data/site-config";

/**
 * Generate per-page metadata. Title pattern: "Page Title | LiftSky24"
 * Pass canonical as the path (e.g. "/services/website-development").
 */
export function meta(title, description, path = "/") {
  const fullTitle = `${title} | ${BRAND.name}`;
  const ogImage   = BRAND.ogImage;
  const canonical = path.startsWith("http") ? path : `${BRAND.url}${path}`;

  return {
    title:       fullTitle,
    description: description.slice(0, 160), // enforce 160 char max
    alternates:  { canonical },
    openGraph: {
      title:       fullTitle,
      description: description.slice(0, 160),
      url:         canonical,
      siteName:    BRAND.name,
      type:        "website",
      images:      [{ url: `${BRAND.url}${ogImage}`, width: 1200, height: 630, alt: `${BRAND.name} — ${title}` }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       fullTitle,
      description: description.slice(0, 160),
      images:      [`${BRAND.url}${ogImage}`],
    },
    robots: {
      index:  true,
      follow: true,
      // Prevent staging/preview URLs from being treated as canonical
      googleBot: { index: true, follow: true },
    },
  };
}

/** JSON-LD for BreadcrumbList — pass array of { name, href } */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       item.name,
      item:       `${BRAND.url}${item.href}`,
    })),
  };
}

/** JSON-LD for FAQPage */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name:    f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** JSON-LD for a single Service */
export function serviceSchema(svc) {
  return {
    "@context":   "https://schema.org",
    "@type":      "Service",
    name:         svc.name,
    description:  svc.desc,
    url:          `${BRAND.url}${svc.href}`,
    provider: {
      "@type": "Organization",
      name:    BRAND.name,
      url:     BRAND.url,
    },
    areaServed: {
      "@type":   "City",
      name:      LOCAL_SEO.city,
    },
  };
}
