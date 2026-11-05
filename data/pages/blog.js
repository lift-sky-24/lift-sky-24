/**
 * data/pages/blog.js — Blog listing page content.
 * Individual post data comes from data/site-config.js → BLOG_POSTS.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const blogPageHero = {
  title:   "Blog & Resources",
  accent:  "Practical Digital Insights",
  eyebrow: "From the LiftSky24 team",
  sub:     "Plain-language guides on websites, SEO, apps, social media and digital marketing — written for business owners, not developers.",
  image:   "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=640&q=80",
  alt:     "Editorial workspace with laptop and notebook for content creation",
};

// ── Articles section ──────────────────────────────────────────────
export const blogArticlesSection = {
  title: "Latest Articles",
  cols:  "sm:grid-cols-2 lg:grid-cols-3",
};

// ── Category list ─────────────────────────────────────────────────
export const blogCategories = [
  "All",
  "Website Development",
  "App Development",
  "SEO",
  "Digital Marketing",
  "Graphic Design",
];
