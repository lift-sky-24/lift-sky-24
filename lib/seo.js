export function meta(title, description, path = "/") {
  const full = `${title} | LiftSky24`;
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, type: "website", images: ["/images/hero.svg"] },
    twitter: { card: "summary_large_image", title: full, description, images: ["/images/hero.svg"] },
  };
}
