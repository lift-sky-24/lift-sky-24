/**
 * Centralized image registry.
 * Change a path here and it updates everywhere.
 */

export const IMG = {
  // ── Brand / site-wide ────────────────────────────────────────────
  logo:    { src: "/images/LiftSky24Logo.png", alt: "LiftSky24 logo",          w: 180, h: 50  },
  ogImage: { src: "/images/og-image.png",      alt: "LiftSky24",               w: 1200,h: 630 },

  // ── Home / shared ────────────────────────────────────────────────
  heroHome:{ src: "/images/home_hero.png",      alt: "LiftSky24 hero illustration",              w: 1000, h: 680 },
  team:    { src: "/images/team.svg",           alt: "LiftSky24 team working together",          w: 600,  h: 500 },
  about:   { src: "/images/about.png",          alt: "LiftSky24 office and team",                w: 900,  h: 600 },

  // ── Service images — real WebP photos from public/images/services/ ──
  services: {
    "website-development":    { src: "/images/services/web-development.webp",        alt: "Website development services",          w: 600, h: 500 },
    "app-development":        { src: "/images/services/app-development.webp",        alt: "Mobile app development services",       w: 600, h: 500 },
    "software-development":   { src: "/images/services/software-development.webp",   alt: "Custom software development",           w: 600, h: 500 },
    "social-media-management":{ src: "/images/services/social-media-management.webp",alt: "Social media management services",      w: 600, h: 500 },
    "seo":                    { src: "/images/services/seo.webp",                    alt: "Search engine optimisation services",   w: 600, h: 500 },
    "graphic-design":         { src: "/images/services/graphic-design.webp",         alt: "Graphic design and branding services",  w: 600, h: 500 },
    "digital-marketing":      { src: "/images/services/digital-marketing.webp",      alt: "Digital marketing agency services",     w: 600, h: 500 },
  },

  // ── Blog post thumbnails (placeholder — swap with real images) ───
  blog: {
    "website-cost-india-2025":      { src: "/images/hero.svg",    alt: "Website cost in India",                  w: 800, h: 450 },
    "website-speed-seo":            { src: "/images/hero.svg",    alt: "Website speed and SEO",                  w: 800, h: 450 },
    "social-media-vs-digital-marketing":{ src: "/images/hero.svg",alt: "Social media vs digital marketing",      w: 800, h: 450 },
  },
};
