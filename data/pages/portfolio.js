/**
 * data/pages/portfolio.js — Portfolio page content.
 * Project data lives in data/site-config.js → PORTFOLIO (currently empty).
 * Add projects there when ready — no component changes needed.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const portfolioPageHero = {
  title:   "Our Portfolio",
  accent:  "Ideas to Impact",
  eyebrow: "Selected Work",
  sub:     "We document our work carefully. Case studies are coming — in the meantime, get in touch to see examples relevant to your industry.",
  image:   "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=640&q=80",
  alt:     "Creative design workspace with digital portfolio work on screens",
  ctas:    [{ label: "Start Your Project", href: "/contact" }],
};

// ── Grid section ──────────────────────────────────────────────────
export const portfolioGridSection = {
  title: "Selected Work",
  sub:   "Real projects. Real results. More coming soon.",
};

// ── Empty state (shown when PORTFOLIO array is empty) ────────────
export const portfolioEmptyState = {
  heading: "Our case studies are on the way",
  sub:     "We're documenting our recent work. Check back soon — or start your own project with us today.",
  cta:     "Start your project",
  href:    "/contact",
};

// ── Category filters ──────────────────────────────────────────────
export const portfolioCategories = ["All", "Web Apps", "Mobile Apps", "Software", "Design"];

// ── CTA ───────────────────────────────────────────────────────────
export const portfolioCTA = {
  title:  "Have a Project in Mind?",
  sub:    "We'd love to hear about it. Let's build something great together.",
  button: "Get a Free Quote",
  href:   "/contact",
};
