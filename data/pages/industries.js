/**
 * data/pages/industries.js — Industries page: expanded rich data.
 * 9 categories, 50+ industries total, varied card layouts.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const industriesPageHero = {
  title:   "Industries We Serve",
  accent:  "Tailored Solutions for Every Sector",
  eyebrow: "Across Every Business Type",
  sub:     "From solo consultants to fast-growing startups, from clinics to D2C brands — we've built digital solutions across dozens of industries. Whatever your business, we understand your challenges.",
  image:   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&q=80",
  alt:     "Modern business district representing diverse industries served by LiftSky24",
};

// ── Intro strip ───────────────────────────────────────────────────
export const industriesIntro = {
  heading: "One Digital Partner. Every Industry.",
  body:    "We don't build generic websites — we build digital solutions shaped around how your specific industry works. That means faster delivery, fewer revisions and better outcomes.",
};

// ── Industry categories (full expanded list) ──────────────────────
export const INDUSTRY_CATEGORIES = [
  {
    id:    "business",
    label: "Business & Professional",
    color: "from-[#FFF7F0] to-[#FFF0E4]",
    accent:"#FC6E04",
    icon:  "Briefcase",
    featured: true,
    featuredDesc: "From solo consultants to large firms — we help professional service businesses build credibility online.",
    industries: [
      { name: "Consulting",                  desc: "Authority websites, lead capture and thought-leadership content." },
      { name: "Accounting & Finance",        desc: "Compliant, trust-focused digital presence for finance professionals." },
      { name: "Legal Services",              desc: "Professional websites that convert enquiries and communicate expertise." },
      { name: "Real Estate",                 desc: "Property portals, virtual tours and CRM integrations." },
      { name: "Architecture & Interior Design",desc:"Portfolio websites, project showcases and client inquiry systems." },
      { name: "Human Resources",             desc: "HR tech portals, job boards and recruitment landing pages." },
      { name: "Business Consulting",         desc: "Service pages, case study layouts and online proposal tools." },
    ],
  },
  {
    id:    "healthcare",
    label: "Healthcare & Wellness",
    color: "from-emerald-50 to-teal-50",
    accent:"#059669",
    icon:  "HeartPulse",
    featured: true,
    featuredDesc: "Trusted digital solutions for clinics, hospitals and wellness brands — built with patient experience in mind.",
    industries: [
      { name: "Hospitals",                   desc: "Patient portals, appointment booking and department information systems." },
      { name: "Clinics",                     desc: "Simple, fast clinic websites with online booking and location pages." },
      { name: "Dental Clinics",              desc: "Attractive dental practice websites with treatment and booking sections." },
      { name: "Diagnostic Laboratories",     desc: "Online report access, test catalogue and home collection booking." },
      { name: "Healthcare Startups",         desc: "Lean MVP apps and websites for health tech founders." },
      { name: "Fitness & Wellness",          desc: "Class booking, trainer profiles, membership and subscription tools." },
      { name: "Mental Wellness Services",    desc: "Calm, welcoming digital spaces for therapy and counselling practices." },
    ],
  },
  {
    id:    "education",
    label: "Education & Learning",
    color: "from-amber-50 to-yellow-50",
    accent:"#d97706",
    icon:  "GraduationCap",
    featured: true,
    featuredDesc: "Powering the future of learning — from coaching institutes to full-scale EdTech platforms.",
    industries: [
      { name: "Schools",                     desc: "School websites, parent portals and event management systems." },
      { name: "Colleges & Universities",     desc: "Course catalogs, admission portals and faculty management." },
      { name: "Coaching Institutes",         desc: "Batch management, fee payment and student progress tracking." },
      { name: "Online Education",            desc: "Course delivery platforms, quiz engines and certificates." },
      { name: "E-learning Platforms",        desc: "Scalable LMS solutions with video, quizzes and forums." },
      { name: "EdTech Startups",             desc: "MVP platforms, mobile apps and growth marketing for ed-startups." },
      { name: "Training & Skill Development",desc: "Corporate training portals and certification management tools." },
    ],
  },
  {
    id:    "retail",
    label: "Retail & E-Commerce",
    color: "from-[#FFF7F0] to-[#FFF0E4]",
    accent:"#E04F00",
    icon:  "ShoppingBag",
    featured: false,
    industries: [
      { name: "Fashion & Apparel",           desc: "High-converting fashion storefronts with lookbooks and size guides." },
      { name: "Electronics",                 desc: "Feature-rich product pages, comparison tools and service centres." },
      { name: "Beauty & Cosmetics",          desc: "Visual-first beauty stores with shade finders and review systems." },
      { name: "Grocery & Food Retail",       desc: "Hyperlocal grocery apps, quick-commerce and subscription baskets." },
      { name: "Furniture & Home Decor",      desc: "Room visualisers, AR previews and custom order workflows." },
      { name: "Online Marketplaces",         desc: "Multi-vendor platforms with seller dashboards and escrow payments." },
      { name: "D2C Brands",                  desc: "Brand websites, subscription funnels and retention tools for DTC." },
    ],
  },
  {
    id:    "food-hospitality",
    label: "Food, Hospitality & Travel",
    color: "from-orange-50 to-amber-50",
    accent:"#ea580c",
    icon:  "UtensilsCrossed",
    featured: false,
    industries: [
      { name: "Restaurants",                 desc: "Online menus, table booking, delivery and loyalty apps." },
      { name: "Cafes",                       desc: "Brand-forward cafe websites with menu, gallery and social links." },
      { name: "Hotels & Resorts",            desc: "Booking engines, room tours and CRM for guest management." },
      { name: "Travel Agencies",             desc: "Itinerary builders, tour packages and online payment flows." },
      { name: "Tourism Businesses",          desc: "Destination guides, attraction pages and group tour management." },
      { name: "Food Delivery",               desc: "Cloud kitchen apps, delivery tracking and franchise portals." },
      { name: "Event Management",            desc: "Event listing, ticketing, vendor management and RSVP systems." },
    ],
  },
  {
    id:    "technology",
    label: "Technology & Digital",
    color: "from-[#F8F7F4] to-[#FFF0E4]",
    accent:"#101114",
    icon:  "Cpu",
    featured: false,
    industries: [
      { name: "SaaS Companies",              desc: "Marketing sites, onboarding flows and subscription billing." },
      { name: "IT Companies",                desc: "Service pages, case studies and lead generation for IT firms." },
      { name: "Software Startups",           desc: "Lean websites, product MVPs and investor decks." },
      { name: "Mobile Applications",         desc: "App landing pages, demo videos and App Store optimisation." },
      { name: "Technology Consulting",       desc: "Thought leadership content, webinar systems and lead magnets." },
      { name: "AI & Automation Businesses",  desc: "Product explainers, demo booking and integration documentation." },
    ],
  },
  {
    id:    "manufacturing",
    label: "Manufacturing & Industrial",
    color: "from-slate-50 to-gray-100",
    accent:"#475569",
    icon:  "Factory",
    featured: false,
    industries: [
      { name: "Manufacturing",               desc: "Product catalogues, dealer portals and B2B procurement systems." },
      { name: "Automobile Businesses",       desc: "Showroom websites, test drive booking and service centre portals." },
      { name: "Construction",                desc: "Project portfolios, tender management and contractor directories." },
      { name: "Logistics & Transportation",  desc: "Fleet tracking dashboards, waybill systems and partner portals." },
      { name: "Industrial Equipment",        desc: "Spec sheets, spare parts catalogues and service request portals." },
      { name: "Supply Chain Businesses",     desc: "Vendor management, inventory dashboards and compliance tools." },
    ],
  },
  {
    id:    "media-creative",
    label: "Media, Creative & Lifestyle",
    color: "from-[#FFF7F0] to-[#FFF0E4]",
    accent:"#E04F00",
    icon:  "Palette",
    featured: false,
    industries: [
      { name: "Media Companies",             desc: "News portals, subscription paywalls and multi-author CMS." },
      { name: "Photography",                 desc: "Gallery portfolios, client proofing systems and booking pages." },
      { name: "Video Production",            desc: "Showreel sites, project showcases and production brief forms." },
      { name: "Graphic Design",              desc: "Portfolio websites, service packages and client collaboration tools." },
      { name: "Entertainment",               desc: "Streaming pages, event promotion and merchandise stores." },
      { name: "Personal Brands",             desc: "Speaker websites, newsletter systems and digital product stores." },
      { name: "Influencers & Creators",      desc: "Link-in-bio pages, merch stores and brand collaboration portals." },
    ],
  },
  {
    id:    "finance-services",
    label: "Finance & Other Services",
    color: "from-green-50 to-emerald-50",
    accent:"#16a34a",
    icon:  "Landmark",
    featured: false,
    industries: [
      { name: "Banking & Financial Services",desc: "Compliant digital banking interfaces and customer self-service portals." },
      { name: "Insurance",                   desc: "Quote calculators, policy management and agent portals." },
      { name: "Fintech",                     desc: "Scalable platforms for payments, lending, savings and investments." },
      { name: "Investment Services",         desc: "Portfolio dashboards, market data tools and investor relations pages." },
      { name: "Non-profit Organizations",    desc: "Cause-driven websites, donation systems and volunteer portals." },
      { name: "NGOs",                        desc: "Impact storytelling, donor management and campaign microsites." },
      { name: "Recruitment Agencies",        desc: "Job boards, candidate portals and ATS integrations." },
    ],
  },
];

// ── Why industry-focused ──────────────────────────────────────────
export const whyIndustryFocused = {
  heading: "Why Industry-Focused Development?",
  body:    "Generic solutions rarely fit perfectly. We bring sector-specific knowledge to every project — which means better architecture decisions, fewer change requests and outcomes that actually work for your users.",
  points: [
    "Domain expertise means fewer surprises",
    "Regulations and compliance built in from day one",
    "Faster delivery with relevant component libraries",
    "Better user experiences designed for real workflows",
  ],
};

// ── Industry FAQs ─────────────────────────────────────────────────
export const industryFAQs = [
  {
    q: "Do you work with small businesses or only larger companies?",
    a: "We work with businesses of all sizes — from solo founders launching their first website to established companies needing a full digital overhaul. Our pricing tiers and project scopes are designed to fit different stages of growth.",
  },
  {
    q: "Do you have experience in my specific industry?",
    a: "We've worked across healthcare, education, retail, hospitality, technology and many more. Even where we haven't built in your exact niche, our process starts with understanding your industry's workflows, compliance needs and user expectations.",
  },
  {
    q: "Can you help a business in a very niche industry?",
    a: "Yes. We approach niche industries with a discovery-first process — we ask the right questions, research your sector and build something that genuinely fits rather than applying a generic template.",
  },
  {
    q: "What if I need a combination of services for my industry?",
    a: "Most of our clients use a combination — for example, a clinic might need a website, an appointment app and social media management. We scope multi-service engagements honestly and manage everything under one roof.",
  },
];

// ── CTA ───────────────────────────────────────────────────────────
export const industriesCTA = {
  title:  "Let's Build Your Industry Solution",
  sub:    "Tell us your industry and challenge — we'll suggest the right approach in a free call.",
  button: "Talk to Us",
  href:   "/contact",
};
