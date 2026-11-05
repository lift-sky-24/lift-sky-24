/**
 * data/pages/pricing.js — Pricing page content.
 * Plan data comes from data/site-config.js → PRICING.
 * FAQ data comes from data/site-config.js → FAQS.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const pricingPageHero = {
  title:   "Simple, Transparent",
  accent:  "Pricing",
  eyebrow: "No hidden fees",
  sub:     "Every project starts with a clear scope and a fixed quote. Choose a starting package or talk to us about a custom scope — we'll give you an honest breakdown before any work begins.",
  image:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&q=80",
  alt:     "Professional team collaborating on business pricing and planning",
};

// ── Plan section ──────────────────────────────────────────────────
export const pricingPlansSection = {
  title:  "Choose Your Plan",
  sub:    "Starting prices — final cost depends on your scope. All quotes are free.",
  center: true,
};

// ── FAQ section ───────────────────────────────────────────────────
export const pricingFaqSection = {
  title: "Pricing & Payment FAQs",
};

// ── CTA ───────────────────────────────────────────────────────────
export const pricingCTA = {
  title:  "Need a Custom Quote?",
  sub:    "Tell us what you're building — we'll scope it for free and send a detailed breakdown.",
  button: "Get a Free Quote",
  href:   "/contact",
};
