/**
 * LiftSky24 — Single source of truth for all site-wide data.
 * Edit this file to update content across the whole site.
 */

// ── Brand ──────────────────────────────────────────────────────────
export const BRAND = {
  name:    "LiftSky24",
  tagline: "Rise Higher. Go Further.",
  url:     "https://www.liftsky24.com",
  /** TODO: replace with real Open Graph image path once created */
  ogImage: "/images/og-image.png",
};

// ── Contact ────────────────────────────────────────────────────────
export const CONTACT = {
  email:     "contact.liftsky24@gmail.com",
  phone:     "+91 88757 96652",
  phoneTel:  "tel:+918875796652",
  whatsapp:  "https://wa.me/918875796652",
  address: {
    line1:    "Flat No. 91/109, Sector 9",
    line2:    "Mandir Marg, Patel Marg, Mansarovar",
    city:     "Jaipur",
    state:    "Rajasthan",
    pin:      "302020",
    landmark: "In front of Taxila Business School",
    country:  "India",
    /** Google Maps embed src — Taxila Business School, Mansarovar */
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1!2d75.7449!3d26.8651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af3e91fcb1d%3A0x9c03af2a73e7b2a!2sTaxila%20Business%20School!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  hours:     "Mon – Sat, 10 AM – 7 PM IST",
};

// ── Social links (set to "" to hide the icon) ──────────────────────
export const SOCIAL = {
  instagram: "https://www.instagram.com/liftsky24/",
  linkedin:  "https://www.linkedin.com/company/144081440/",
  facebook:  "https://www.facebook.com/share/1CC9BDAubF/",
  youtube:   "",   // TODO: add when channel is ready
  twitter:   "",   // TODO: add when account is ready
};

// ── City / region for local SEO ────────────────────────────────────
export const LOCAL_SEO = {
  city:    "Jaipur",
  region:  "Rajasthan",
  country: "India",
};

// ── Trust stats  (TODO: replace with real numbers) ─────────────────
export const STATS = [
  { value: 5,   suffix: "+", label: "Years Experience"    },
  { value: 30,  suffix: "+", label: "Projects Delivered"  },
  { value: 7,   suffix: "",  label: "Core Services"       },
  { value: 24,  suffix: "h", label: "Response Time"       },
];

// ── Services (single source — used in nav, cards, pages, schema) ───
export const SERVICES = [
  {
    slug:     "website-development",
    name:     "Website Development",
    tagline:  "Fast, beautiful websites that rank and convert.",
    desc:     "We build responsive, SEO-ready websites — from landing pages to complex web applications — tailored to your business goals.",
    icon:     "Monitor",
    color:    "bg-[#e8f2ff]",
    href:     "/services/website-development",
  },
  {
    slug:     "app-development",
    name:     "App Development",
    tagline:  "iOS and Android apps your users will love.",
    desc:     "From idea to App Store — we design and build cross-platform and native mobile apps focused on performance and user experience.",
    icon:     "Smartphone",
    color:    "bg-[#f1eaff]",
    href:     "/services/app-development",
  },
  {
    slug:     "software-development",
    name:     "Software Development",
    tagline:  "Custom software built around your workflow.",
    desc:     "Bespoke software solutions — CRMs, ERPs, portals and automation tools — built to solve real business problems.",
    icon:     "Code2",
    color:    "bg-[#fff0eb]",
    href:     "/services/software-development",
  },
  {
    slug:     "social-media-management",
    name:     "Social Media Management",
    tagline:  "Stay consistent, grow your audience.",
    desc:     "Content planning, creative production and community management across Instagram, Facebook, LinkedIn and more.",
    icon:     "Share2",
    color:    "bg-[#fff5dd]",
    href:     "/services/social-media-management",
  },
  {
    slug:     "seo",
    name:     "Search Engine Optimization (SEO)",
    tagline:  "Get found on Google — and stay there.",
    desc:     "Technical SEO, on-page optimisation and content strategy to improve your rankings and drive qualified organic traffic.",
    icon:     "Search",
    color:    "bg-[#e8f8ef]",
    href:     "/services/seo",
  },
  {
    slug:     "graphic-design",
    name:     "Graphic Design",
    tagline:  "Visuals that make your brand memorable.",
    desc:     "Logos, brand identities, marketing materials and social creatives designed to stand out and communicate clearly.",
    icon:     "Palette",
    color:    "bg-[#e9e8ff]",
    href:     "/services/graphic-design",
  },
  {
    slug:     "digital-marketing",
    name:     "Digital Marketing",
    tagline:  "Grow faster with a joined-up digital strategy.",
    desc:     "Paid ads, email campaigns, content marketing and analytics — a full-funnel approach to growing your brand online.",
    icon:     "TrendingUp",
    color:    "bg-[#fff0d6]",
    href:     "/services/digital-marketing",
  },
];

// ── Navigation ─────────────────────────────────────────────────────
export const NAV = [
  { label: "Home",       href: "/"           },
  { label: "About",      href: "/about"       },
  {
    label: "Services", href: "/services",
    children: [
      { label: "All Services",                    href: "/services"                        },
      ...SERVICES.map((s) => ({ label: s.name, href: s.href })),
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Blog",       href: "/blog"       },
  { label: "Pricing",    href: "/pricing"    },
  { label: "Contact",    href: "/contact"    },
];

// ── Why Choose Us ──────────────────────────────────────────────────
export const WHY = [
  { icon: "MessageCircle", t: "Direct Communication",    d: "Talk to the developers directly — on WhatsApp, calls or email. No middlemen."        },
  { icon: "FileText",      t: "Fixed, Transparent Quotes", d: "You get a clear breakdown before work starts. No surprise invoices."              },
  { icon: "RefreshCw",     t: "Free Revision Rounds",    d: "We iterate until you're happy. Revisions are included, not extras."                  },
  { icon: "Zap",           t: "Fast, SEO-Ready Builds",  d: "Every site ships optimised for speed and search — not as an afterthought."          },
  { icon: "HeadphonesIcon",t: "Post-Launch Support",     d: "We don't disappear after go-live. Ongoing support is part of the deal."             },
  { icon: "Layers",        t: "One Team for Everything", d: "Dev, design and marketing under one roof. No handoff chaos."                        },
];

// ── Process steps ──────────────────────────────────────────────────
export const PROCESS = [
  { n: "01", t: "Discuss",  d: "We start with a free call to understand your goals, audience and timeline." },
  { n: "02", t: "Design",   d: "Wireframes, brand direction and prototypes — reviewed and approved by you."  },
  { n: "03", t: "Develop",  d: "Clean, tested code built with modern tools and best practices."              },
  { n: "04", t: "Deliver",  d: "We launch, hand over assets and brief your team. You own everything."        },
  { n: "05", t: "Support",  d: "Ongoing maintenance, updates and monitoring — as little or as much as you need." },
];

// ── Testimonials (TODO: replace with real client reviews) ──────────
export const TESTIMONIALS = [
  {
    name:     "Priya S.",
    role:     "Owner, local retail store",
    avatar:   "P",
    quote:    "LiftSky24 delivered our website exactly on time. The team communicated every step of the way — no surprises. Our customers love how fast it loads.",
    result:   "Delivered on time, site loads fast",
  },
  {
    name:     "Arjun M.",
    role:     "Founder, early-stage startup",
    avatar:   "A",
    quote:    "We needed a mobile app quickly and within budget. They scoped it honestly, kept to the quote and we got our first leads in the first month after launch.",
    result:   "Within budget, first leads in month one",
  },
  {
    name:     "Kavita R.",
    role:     "Marketing Head, coaching institute",
    avatar:   "K",
    quote:    "Our Google rankings improved noticeably after the SEO work. The team explained what they were doing in plain language — not jargon.",
    result:   "Better rankings, clear communication",
  },
  {
    name:     "Rohit T.",
    role:     "Co-founder, e-commerce brand",
    avatar:   "R",
    quote:    "The social media creatives they produce are consistent and on-brand. It used to take us hours; now it's handled every week without us chasing anyone.",
    result:   "Consistent content, time saved",
  },
];

// ── FAQs (used on Home, Pricing, service detail pages) ────────────
export const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "A standard 5-10 page business website typically takes 2–4 weeks. Larger projects or e-commerce stores can take 4–8 weeks. We give you a realistic timeline in the initial call and stick to it.",
  },
  {
    q: "Do you build apps for both iOS and Android?",
    a: "Yes. We build cross-platform apps using React Native or Flutter, which run on both iOS and Android from a single codebase — keeping cost and timelines lean. We also do native apps when performance demands it.",
  },
  {
    q: "Will my website be SEO-friendly?",
    a: "Every website we build follows SEO best practices: fast load times, proper heading structure, meta tags, schema markup, mobile responsiveness and clean URLs. If you want deeper SEO work (keyword research, content, link building), that's a separate service.",
  },
  {
    q: "What happens after the project launches?",
    a: "We hand over all source code, credentials and assets — you own everything. We also offer ongoing support packages for hosting, updates and monitoring. Most clients stay on a monthly retainer.",
  },
  {
    q: "How do I get a quote?",
    a: "Fill in the contact form or message us on WhatsApp. Share a brief idea of what you need — the type of project, rough timeline and budget range. We'll get back within 24 hours with initial thoughts and schedule a free call.",
  },
  {
    q: "What are your payment terms?",
    a: "We typically work on a 50% upfront / 50% on delivery model for fixed-scope projects. For longer engagements we agree milestone-based payments. We accept UPI, bank transfer and major cards.",
  },
  {
    q: "How many revisions are included?",
    a: "The design phase includes two rounds of revisions as standard. Development changes within the agreed scope are included. Additions beyond the original scope are quoted separately and agreed before work begins.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes, completely. On final payment you receive the full source code, all design files, logins and documentation. We don't hold anything back.",
  },
];

// ── Pricing (TODO: set real prices) ────────────────────────────────
export const PRICING = [
  {
    name:      "Starter",
    priceFrom: "₹4,999",
    period:    "project",
    desc:      "For individuals and micro-businesses who need a clean, fast online presence — fast.",
    features: [
      "Up to 3 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO setup",
      "1 month support",
    ],
    cta:     "Get Started",
    popular: false,
  },
  {
    name:      "Growth",
    priceFrom: "₹17,999",
    period:    "project",
    desc:      "For small businesses that need a proper website with more pages, custom design and SEO.",
    features: [
      "Up to 8 pages",
      "Custom UI/UX design",
      "On-page SEO",
      "Google Analytics setup",
      "Contact form + WhatsApp",
      "3 months support",
    ],
    cta:     "Get Started",
    popular: true,
  },
  {
    name:      "Pro",
    priceFrom: "₹33,999",
    period:    "project",
    desc:      "For growing brands that need a full-featured website with CMS, advanced SEO and integrations.",
    features: [
      "Up to 20 pages",
      "CMS integration",
      "Advanced SEO + schema",
      "3rd-party integrations",
      "Performance optimisation",
      "1 year support",
    ],
    cta:     "Get Started",
    popular: false,
  },
  {
    name:      "Custom",
    priceFrom: "Custom",
    period:    "scope",
    desc:      "Apps, software, e-commerce or a full digital package — scoped and priced to fit your exact needs.",
    features: [
      "Unlimited scope",
      "App or software development",
      "Dedicated project team",
      "Monthly retainer option",
      "Priority support & SLA",
      "All 7 services available",
    ],
    cta:     "Talk to Us",
    popular: false,
  },
];

// ── Industries ─────────────────────────────────────────────────────
export const INDUSTRIES = [
  { icon: "HeartPulse",     t: "Healthcare",          d: "Secure patient portals, clinic management and telemedicine apps." },
  { icon: "GraduationCap",  t: "Education",           d: "LMS platforms, student portals and e-learning tools." },
  { icon: "ShoppingCart",   t: "E-Commerce",          d: "Custom storefronts, payment integrations and inventory tools." },
  { icon: "Landmark",       t: "Finance",             d: "Dashboards, calculators and fintech compliance tools." },
  { icon: "Building2",      t: "Real Estate",         d: "Property portals, virtual tours and CRM integration." },
  { icon: "Plane",          t: "Travel & Hospitality",d: "Booking engines, itinerary tools and loyalty platforms." },
  { icon: "Factory",        t: "Manufacturing",       d: "ERP integration, supply chain and QC dashboards." },
  { icon: "Truck",          t: "Logistics",           d: "Fleet tracking, order management and route optimisation." },
];

// ── Blog starter posts ─────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    slug:    "website-cost-india-2025",
    title:   "How Much Does a Business Website Cost in India?",
    excerpt: "A practical breakdown of website costs in India — what affects pricing, what to expect at each budget level, and how to avoid overpaying.",
    category:"Website Development",
    date:    "2025-10-15",
    readMin: 5,
    image:   "/images/blog/website-cost.jpg",
    featured: true,
  },
  {
    slug:    "website-speed-seo",
    title:   "Why Website Speed Matters for SEO (and How to Fix It)",
    excerpt: "Google uses page speed as a ranking factor. Here's why a slow website is costing you traffic — and the most impactful fixes.",
    category:"SEO",
    date:    "2025-10-01",
    readMin: 4,
    image:   "/images/blog/speed-seo.jpg",
    featured: true,
  },
  {
    slug:    "social-media-vs-digital-marketing",
    title:   "Social Media Management vs Digital Marketing: What's the Difference?",
    excerpt: "Many business owners use these terms interchangeably. They're not the same — here's what each covers and which one your business actually needs.",
    category:"Digital Marketing",
    date:    "2025-09-20",
    readMin: 5,
    image:   "/images/blog/social-vs-digital.jpg",
    featured: true,
  },
];

// ── Portfolio (empty — ready for real projects) ────────────────────
// TODO: add real client projects here when ready.
// Each entry: { slug, title, category, client, year, image, summary, tags[] }
export const PORTFOLIO = [];

// ── Image paths (centralised for easy swap) ────────────────────────
export const IMAGES = {
  logo:     "/images/LiftSky24Logo.png",
  heroHome: "/images/home_hero.png",
  about:    "/images/about.png",
  team:     "/images/team.svg",
  hero:     "/images/hero.svg",
  phones:   "/images/phones.svg",
  design:   "/images/design.svg",
  pricing:  "/images/pricing.svg",
  // ── Page hero images (Unsplash — replace with brand images when ready) ──
  pages: {
    services:   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80",
    portfolio:  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=640&q=80",
    blog:       "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=640&q=80",
    pricing:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&q=80",
    contact:    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&q=80",
    industries: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&q=80",
    about:      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=640&q=80",
    homeAbout:  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&q=80",
  },
  /** TODO: add real service images — one per service */
  services: {
    "website-development":    "/images/hero.svg",
    "app-development":        "/images/phones.svg",
    "software-development":   "/images/hero.svg",
    "social-media-management":"/images/hero.svg",
    "seo":                    "/images/hero.svg",
    "graphic-design":         "/images/design.svg",
    "digital-marketing":      "/images/hero.svg",
  },
};
