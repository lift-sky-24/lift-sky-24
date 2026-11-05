/**
 * data/pages/home.js — Home page section content.
 * Edit here to update homepage copy without touching JSX components.
 *
 * Homepage previews reuse data from other page files (services, industries,
 * blog, portfolio) — do NOT duplicate content here.
 */
import { BRAND } from "@/data/site-config";

// ── Hero section ──────────────────────────────────────────────────
export const homeHero = {
  tagline:   BRAND.tagline,   // "Rise Higher. Go Further."
  h1Line1:   "Websites, Apps & Digital Growth",
  h1Line2:   "That Take Your Business Higher.",
  sub:       "We build fast websites, mobile apps, custom software and run SEO, social media and digital marketing campaigns — everything a growing business needs, in one team.",
  trustItems: [
    "No hidden fees",
    "You own the source code",
    "24h response time",
  ],
  ctas: [
    { label: "Get a Free Quote",  href: "/contact"  },
    { label: "View Our Services", href: "/services" },
  ],
};

// ── About snippet (home page "More Than Just a Tech Company") ──────
export const homeAboutSnippet = {
  title:   "We're More Than Just a",
  accent:  "Tech Company",
  eyebrow: BRAND.tagline,
  sub:     "LiftSky24 started as a small team of freelancers who kept getting asked the same question: 'Can you also handle our marketing?' We could — and we did. Today we're a full-service digital team: developers, designers and marketers who work together on every project, not in separate silos. We work directly with founders, marketing heads and small business owners who want real results without agency jargon.",
  image:   "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&q=80",
  alt:     "LiftSky24 team collaborating on digital projects",
  ctas: [
    { label: "About LiftSky24",  href: "/about"   },
    { label: "Get a Free Quote", href: "/contact" },
  ],
};

// ── Why Choose Us CTA card (inside the section) ───────────────────
export const whyCtaCard = {
  title:   "Ready to Start\nYour Project?",
  sub:     "Talk to the team today — free call, no commitment.",
  cta:     "Get a Free Quote",
  footnote:"Or message us on WhatsApp for a quick response.",
  href:    "/contact",
};

// ── Process section ───────────────────────────────────────────────
export const homeProcess = {
  title: "How We Work",
  sub:   "A clear, five-step process. No surprises.",
};

// ── Portfolio section ─────────────────────────────────────────────
export const homePortfolioSection = {
  title:    "Featured Projects",
  tone:     "soft",
  limit:    6,
  viewAllLabel: "View All Projects →",
  viewAllHref:  "/portfolio",
};

// ── Pricing section ───────────────────────────────────────────────
export const homePricingSection = {
  title:   "Simple, Transparent Pricing",
  sub:     "Starting prices — every project is scoped before work begins.",
  center:  true,
  viewAllLabel: "See full pricing details →",
  viewAllHref:  "/pricing",
};

// ── FAQ section ───────────────────────────────────────────────────
export const homeFaqSection = {
  title: "Frequently Asked Questions",
};

// ── Final CTA ─────────────────────────────────────────────────────
export const homeCTA = {
  title:  "Ready to Build Something Great?",
  sub:    "Tell us about your project — we'll get back within 24 hours with a free consultation.",
  button: "Get a Free Quote",
  href:   "/contact",
};

// ── Tech stack marquee items ──────────────────────────────────────
export const marqueeItems = {
  tech: [
    "React", "Next.js", "Node.js", "React Native", "Flutter",
    "Tailwind CSS", "MongoDB", "PostgreSQL", "AWS", "Figma",
    "Google Ads", "Meta Ads", "SEO", "Mailchimp", "Firebase",
    "TypeScript", "Vercel", "Docker", "WordPress", "Shopify",
  ],
  services: [
    "Website Development", "App Development", "Software Development",
    "Social Media Management", "SEO", "Graphic Design", "Digital Marketing",
    "Branding", "UI Design", "Web Apps", "Mobile Apps", "E-Commerce",
    "SEO Audit", "Google Ads", "Content Strategy",
  ],
};
