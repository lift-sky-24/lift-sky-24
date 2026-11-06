/**
 * lib/data.js — Re-exports and legacy-compat layer.
 * All canonical data lives in @/data/site-config.
 * Import from there in new code; use this file only for
 * components that expect the old data shape.
 */

// ── All top-level imports must be at the top ──────────────────────
import {
  BRAND, CONTACT, SOCIAL, STATS, PROCESS, TESTIMONIALS, FAQS, PRICING,
  INDUSTRIES as _IND, IMAGES, PORTFOLIO, BLOG_POSTS, NAV, WHY as _WHY,
  SERVICES as _SERVICES, LOCAL_SEO,
} from "@/data/site-config";

import {
  Monitor, Smartphone, Code2, Share2, Search, Palette, TrendingUp,
  HeartPulse, GraduationCap, ShoppingCart, Landmark, Factory, Building2, Plane, Truck,
  Users, Clock, Layers, Smile, Lightbulb, ShieldCheck, Heart, Target, Eye,
  MessageCircle, FileText, RefreshCw, Zap, Headphones,
  Globe, ShoppingBag, Wrench, Apple,
  BarChart3, Mail, MousePointerClick, LayoutTemplate,
  Megaphone, LineChart, PenTool,
  Boxes, Star, CheckCircle2,
} from "lucide-react";

export { BRAND, CONTACT, SOCIAL, STATS, PROCESS, TESTIMONIALS, FAQS, PRICING,
         IMAGES, PORTFOLIO, BLOG_POSTS, NAV, LOCAL_SEO, _SERVICES as SERVICES };

export const SITE = "https://www.liftsky24.com";
export { NAV as nav } from "@/data/site-config";

const SERVICE_ICONS = {
  "website-development":     Monitor,
  "app-development":         Smartphone,
  "software-development":    Code2,
  "social-media-management": Share2,
  "seo":                     Search,
  "graphic-design":          Palette,
  "digital-marketing":       TrendingUp,
};

const INDUSTRY_ICONS = {
  HeartPulse, GraduationCap, ShoppingCart, Landmark,
  Factory, Building2, Plane, Truck,
};

const WHY_ICONS = {
  MessageCircle, FileText, RefreshCw, Zap,
  HeadphonesIcon: Headphones, Layers,
};

export const services = _SERVICES.map((s) => ({
  icon: SERVICE_ICONS[s.slug] ?? Monitor,
  t:    s.name,
  d:    s.desc,
  href: s.href,
  slug: s.slug,
}));

export const why = _WHY.map((w) => ({
  icon: WHY_ICONS[w.icon] ?? Lightbulb,
  t:    w.t,
  d:    w.d,
}));

export const processSteps = PROCESS.map((p) => ({ t: p.t, d: p.d }));

export const plans = PRICING.map((p) => ({
  name:      p.name,
  monthly:   parseInt((p.priceFrom || "0").replace(/[^\d]/g, "")) || 0,
  custom:    p.priceFrom === "Custom",
  priceFrom: p.priceFrom,
  features:  p.features,
  popular:   p.popular || false,
  cta:       p.cta,
}));

export const industries = _IND.map((i) => ({
  icon: INDUSTRY_ICONS[i.icon] ?? HeartPulse,
  t:    i.t,
  d:    i.d,
}));

export const industryPoints = [
  "Domain expertise and experience",
  "Industry-specific best practices",
  "Faster time to market",
  "Better business outcomes",
];

export const values = [
  { icon: Lightbulb,   t: "Innovation",     d: "We stay ahead so you don't have to."  },
  { icon: ShieldCheck, t: "Integrity",       d: "Honest quotes, honest timelines."      },
  { icon: Users,       t: "Collaboration",  d: "Your team + our team, one goal."       },
  { icon: Heart,       t: "Customer First", d: "Your success is our success."           },
];
export const missionVision = [
  { icon: Target, t: "Our Mission", d: "To deliver innovative digital solutions that drive measurable growth and lasting value for every client we work with." },
  { icon: Eye,    t: "Our Vision",  d: "To be a trusted digital partner for startups, local businesses and growing brands across India." },
];
export const team = [
  { n: "Amit S.",    r: "Founder & CEO"    },
  { n: "Priya K.",   r: "Lead Developer"   },
  { n: "Rahul V.",   r: "Design Lead"      },
  { n: "Neha G.",    r: "Digital Marketing"},
  { n: "Sandeep Y.", r: "Project Manager"  },
];

export const projects = [];

export { BLOG_POSTS as posts } from "@/data/site-config";
export const blogCats = ["All", "Website Development", "App Development", "SEO", "Digital Marketing", "Graphic Design"];

export const footerIndustries = ["Healthcare", "Education", "E-Commerce", "Finance", "Real Estate", "Travel & Hospitality"];

export const serviceDetails = {
  "website-development": {
    headline: "Fast, Beautiful Websites That Work Hard for Your Business",
    overview: "We build responsive, SEO-ready websites for businesses of every size — from simple landing pages to full-featured web applications. Every site ships with fast load times, clean code and a design that reflects your brand.",
    included: [
      "Custom responsive design (mobile, tablet, desktop)",
      "SEO-friendly HTML structure and meta setup",
      "Contact form with validation",
      "Google Analytics integration",
      "CMS integration (optional — WordPress, Sanity, etc.)",
      "1 month post-launch support",
    ],
    tools: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Vercel"],
    process: [
      { t: "Discovery call", d: "We discuss your goals, audience and must-haves." },
      { t: "Design",         d: "Wireframes and visual design reviewed by you." },
      { t: "Development",    d: "Clean, tested, accessible code." },
      { t: "Launch",         d: "Deploy, test across devices, hand over access." },
    ],
    deliverables: ["Fully deployed website", "Source code repository", "CMS training (if applicable)", "SEO setup report", "Design files"],
    faqs: [
      { q: "How long will it take?",               a: "A 5-page site typically takes 2–3 weeks. Larger projects are scoped individually." },
      { q: "Will I be able to update it myself?",  a: "Yes — we can add a CMS so you can edit text, images and pages without touching code." },
      { q: "Do you offer e-commerce?",             a: "Yes — we build WooCommerce, Shopify and custom e-commerce solutions." },
    ],
    relatedServices: ["app-development", "seo", "graphic-design"],
  },
  "app-development": {
    headline: "Mobile Apps That Solve Real Problems and Keep Users Coming Back",
    overview: "We design and build iOS and Android apps from scratch. Whether it's a cross-platform app using React Native or a native build, we focus on clean UX, fast performance and a codebase you can grow.",
    included: [
      "UX wireframes and UI design",
      "iOS and Android builds",
      "API integration",
      "Push notifications",
      "App Store and Play Store submission",
      "3 months post-launch support",
    ],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    process: [
      { t: "Requirements", d: "User stories, feature list, platform decision." },
      { t: "Design",       d: "UI kit, prototypes, user testing." },
      { t: "Development",  d: "Sprint-based builds with regular demos." },
      { t: "Launch",       d: "App store submission, crash monitoring setup." },
    ],
    deliverables: ["Published app (iOS + Android)", "Source code", "API documentation", "App store assets"],
    faqs: [
      { q: "Cross-platform or native?",             a: "We'll recommend based on your budget and needs. Cross-platform is faster and cheaper; native is better for performance-heavy apps." },
      { q: "Do you handle App Store submission?",   a: "Yes — we manage the full submission for both App Store and Google Play." },
    ],
    relatedServices: ["website-development", "software-development", "graphic-design"],
  },
  "software-development": {
    headline: "Custom Software Built Around How Your Business Actually Works",
    overview: "Off-the-shelf software rarely fits perfectly. We build custom internal tools, CRMs, ERPs, client portals and automation systems designed specifically for your workflow.",
    included: [
      "Requirements analysis and system design",
      "Database architecture",
      "User roles and permissions",
      "Admin dashboard",
      "API and third-party integrations",
      "Testing and documentation",
    ],
    tools: ["Node.js", "Python", "React", "PostgreSQL", "MongoDB", "Docker"],
    process: [
      { t: "Discovery",    d: "Map current workflows, pain points and required features." },
      { t: "Architecture", d: "System design, data model, tech stack decision." },
      { t: "Build",        d: "Phased delivery with demos at each milestone." },
      { t: "Handover",     d: "Full documentation, training and code transfer." },
    ],
    deliverables: ["Deployed application", "Source code", "Technical documentation", "User manual", "Training session"],
    faqs: [
      { q: "How is this different from a website?",       a: "Custom software is a business tool — it automates workflows, stores data and helps your team operate. It's not a public-facing marketing site." },
      { q: "Can you integrate with tools we already use?", a: "Yes — we integrate with most third-party APIs including payment gateways, CRMs, accounting tools and messaging platforms." },
    ],
    relatedServices: ["website-development", "app-development", "digital-marketing"],
  },
  "social-media-management": {
    headline: "Consistent, On-Brand Social Media That Grows Your Audience",
    overview: "We handle your social media end-to-end — strategy, content creation, scheduling and community management — so you stay visible and consistent without spending hours on it every week.",
    included: [
      "Monthly content calendar",
      "Custom graphics and captions",
      "Scheduling and posting",
      "Story and reel content",
      "Monthly performance report",
      "Community management (comments and DMs)",
    ],
    tools: ["Canva Pro", "Adobe Creative Suite", "Buffer", "Meta Business Suite", "Later"],
    process: [
      { t: "Audit",    d: "Review current profiles, audience and competitors." },
      { t: "Strategy", d: "Define content pillars, tone and posting schedule." },
      { t: "Creation", d: "Design and write content for approval before posting." },
      { t: "Manage",   d: "Post, monitor, respond and report monthly." },
    ],
    deliverables: ["Monthly content calendar", "All graphics and copy", "Scheduled posts", "Analytics report"],
    faqs: [
      { q: "Which platforms do you manage?",  a: "Instagram, Facebook, LinkedIn and X. We focus on the 2–3 platforms most relevant to your audience." },
      { q: "Do I approve the content first?", a: "Yes — we share a content calendar for approval before anything goes live." },
    ],
    relatedServices: ["graphic-design", "digital-marketing", "seo"],
  },
  "seo": {
    headline: "Get Found on Google — and Stay There",
    overview: "We improve your search rankings through technical SEO, on-page optimisation and content strategy. Every recommendation is data-driven and explained in plain language — no jargon.",
    included: [
      "Full SEO audit",
      "Keyword research and mapping",
      "On-page optimisation (titles, meta, headings, schema)",
      "Technical fixes (speed, crawlability, Core Web Vitals)",
      "Content recommendations",
      "Monthly ranking and traffic report",
    ],
    tools: ["Google Search Console", "Google Analytics", "Ahrefs", "Screaming Frog", "PageSpeed Insights"],
    process: [
      { t: "Audit",    d: "Identify technical issues and quick wins." },
      { t: "Strategy", d: "Keyword research, competitor gap analysis." },
      { t: "Optimise", d: "On-page and technical fixes, content improvements." },
      { t: "Monitor",  d: "Track rankings, traffic and conversions monthly." },
    ],
    deliverables: ["SEO audit report", "Keyword strategy document", "Optimised pages", "Monthly progress report"],
    faqs: [
      { q: "How long before I see results?",  a: "Most clients see measurable improvement in 3–6 months. We set realistic expectations upfront." },
      { q: "Do you guarantee rankings?",      a: "No. Anyone who guarantees a specific rank is misleading you. We guarantee quality work and transparent reporting." },
    ],
    relatedServices: ["website-development", "digital-marketing", "social-media-management"],
  },
  "graphic-design": {
    headline: "Visuals That Make Your Brand Impossible to Forget",
    overview: "From logos to full brand identities, social media creatives to marketing collateral — we design visuals that communicate clearly and look great across every touchpoint.",
    included: [
      "Logo design (primary + variants)",
      "Brand colour palette and typography",
      "Business card and letterhead",
      "Social media templates",
      "Marketing materials (flyers, brochures, banners)",
      "Final files in all formats (print + digital)",
    ],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign", "Canva Pro"],
    process: [
      { t: "Brief",    d: "Understand your brand, audience and competitors." },
      { t: "Concepts", d: "2–3 initial directions for your feedback." },
      { t: "Refine",   d: "Iterate on the chosen direction until you're happy." },
      { t: "Deliver",  d: "Final files in all required formats." },
    ],
    deliverables: ["All design files (AI, PDF, PNG, SVG)", "Brand guidelines document", "Social media kit"],
    faqs: [
      { q: "How many revisions are included?", a: "Two rounds of revisions are included at each stage. Additional rounds can be added if needed." },
      { q: "Do I own the designs?",            a: "Yes — on final payment you own all artwork and source files outright." },
    ],
    relatedServices: ["social-media-management", "website-development", "digital-marketing"],
  },
  "digital-marketing": {
    headline: "Grow Faster With a Joined-Up Digital Strategy",
    overview: "Paid advertising, email marketing, content strategy and analytics — we manage the full digital funnel to bring in more qualified leads and convert them into customers.",
    included: [
      "Digital strategy and goal setting",
      "Google Ads / Meta Ads management",
      "Email marketing campaigns",
      "Landing page recommendations",
      "Conversion tracking setup",
      "Monthly performance report",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Mailchimp", "HubSpot", "Google Analytics 4", "GTM"],
    process: [
      { t: "Strategy",  d: "Audience research, channel selection, budget plan." },
      { t: "Setup",     d: "Campaign creation, tracking and pixel installation." },
      { t: "Launch",    d: "Go live with close monitoring in the first week." },
      { t: "Optimise",  d: "Weekly checks, A/B tests, budget reallocation." },
    ],
    deliverables: ["Campaign setup and ad creatives", "Tracking configuration", "Monthly performance report", "Recommendations deck"],
    faqs: [
      { q: "What's the minimum ad budget?", a: "We recommend at least Rs. 10,000/month in ad spend to generate meaningful data. Our management fee is separate." },
      { q: "How quickly can you launch?",   a: "A first campaign can launch within 5–7 business days of brief sign-off." },
    ],
    relatedServices: ["seo", "social-media-management", "graphic-design"],
  },
};
