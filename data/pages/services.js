/**
 * data/pages/services.js — Services hub page content.
 * Individual service card data comes from data/site-config.js → SERVICES.
 * Service detail content comes from data/service-details/[slug].js.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const servicesPageHero = {
  title:   "Our Services",
  accent:  "Everything Your Business Needs to Grow Online",
  eyebrow: "7 Core Services",
  sub:     "From your first website to a full digital strategy — we offer website development, app development, software, SEO, social media management, graphic design and digital marketing under one roof.",
  image:   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80",
  alt:     "Modern digital workspace with screens showing web development and design work",
  ctas: [
    { label: "Get a Free Quote", href: "/contact" },
    { label: "View Pricing",     href: "/pricing"  },
  ],
};

// ── Services grid section ─────────────────────────────────────────
export const servicesGridSection = {
  title: "What We Do",
  sub:   "Click any service to see full details, inclusions and pricing.",
  cols:  "lg:grid-cols-3 sm:grid-cols-2",
};

// ── Process section ───────────────────────────────────────────────
export const servicesProcessSection = {
  title: "How We Work",
  tone:  "soft",
  sub:   "A clear four-step process on every project.",
};

// ── CTA ───────────────────────────────────────────────────────────
export const servicesCTA = {
  title:  "Not Sure Which Service You Need?",
  sub:    "Tell us about your goal — we'll recommend the right approach. Free, no-commitment call.",
  button: "Talk to Us",
  href:   "/contact",
};
