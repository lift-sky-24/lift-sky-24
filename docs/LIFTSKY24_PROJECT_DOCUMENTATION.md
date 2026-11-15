# LiftSky24 — Complete Project Documentation

> **Ground-truth document.** Every value here is extracted from the live codebase. Update this file whenever you change data, components, routes or dependencies.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack and Dependencies](#2-tech-stack-and-dependencies)
3. [Folder and File Structure](#3-folder-and-file-structure)
4. [Design System](#4-design-system)
5. [Typography](#5-typography)
6. [Global Components](#6-global-components)
7. [Pages](#7-pages)
8. [Content Data](#8-content-data)
9. [Animations](#9-animations)
10. [Images and Assets](#10-images-and-assets)
11. [SEO](#11-seo)
12. [Forms and Integrations](#12-forms-and-integrations)
13. [Performance and Accessibility](#13-performance-and-accessibility)
14. [Change Log](#14-change-log)
15. [Known Issues and TODOs](#15-known-issues-and-todos)
16. [AI Handoff Summary](#16-ai-handoff-summary)

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Company** | LiftSky24 |
| **Tagline** | Rise Higher. Go Further. |
| **Purpose** | Full-service digital agency website — converts visitors to enquiries |
| **Target audience** | Startups, local businesses and founders in Jaipur / India |
| **Status** | Live at `https://www.liftsky24.com` (deployed on Vercel) |
| **Git repo** | `github.com/lift-sky-24/lift-sky-24`, branch `main` |
| **Local dev** | `http://localhost:3000` |

### The 7 Services (exact canonical names, slugs and routes)

| # | Name | Slug | Route |
|---|---|---|---|
| 1 | Website Development | `website-development` | `/services/website-development` |
| 2 | App Development | `app-development` | `/services/app-development` |
| 3 | Software Development | `software-development` | `/services/software-development` |
| 4 | Social Media Management | `social-media-management` | `/services/social-media-management` |
| 5 | Search Engine Optimization (SEO) | `seo` | `/services/seo` |
| 6 | Graphic Design | `graphic-design` | `/services/graphic-design` |
| 7 | Digital Marketing | `digital-marketing` | `/services/digital-marketing` |

---

## 2. Tech Stack and Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `next` | `15.3.9` | Framework (App Router, JS only — no TypeScript) |
| `react` | `^18.3.1` | UI |
| `react-dom` | `^18.3.1` | DOM rendering |
| `framer-motion` | `^11.11.0` | Animations (primary — used everywhere except ProcessRoadmap3D) |
| `three` | `0.169.0` | 3D WebGL — only in `components/Hero3DVisual.jsx` and `components/ProcessRoadmap3D.js` |
| `@react-three/fiber` | `8.17.10` | React bindings for Three.js — only in `ProcessRoadmap3D.js` |
| `lucide-react` | `^0.454.0` | Icons |
| `lenis` | `^1.3.27` | Smooth scroll (desktop mouse only) |
| `gsap` | `^3.15.1` | Stat counter animations in `HeroBannerClient.js` |
| `aos` | `^2.3.4` | Scroll reveal (init-once, no route-change refresh) |

### Dev

| Package | Version |
|---|---|
| `tailwindcss` | `^3.4.14` |
| `postcss` | `^8.4.47` |
| `autoprefixer` | `^10.4.20` |

### next.config.mjs highlights

```js
transpilePackages: ["three"]   // Three.js is ESM-only; must be transpiled
redirects: [
  /services/ai-ml          → /services
  /services/mobile-apps    → /services/app-development
  /services/ui-ux-design   → /services/graphic-design
  /services/web-development→ /services/website-development
]
images.remotePatterns: images.unsplash.com, plus.unsplash.com, source.unsplash.com, images.pexels.com
```

### Animation library rule
- **Framer Motion** — everywhere except the 3D roadmap layer
- **Three.js / @react-three/fiber** — ONLY inside `ProcessRoadmap3D.js` (lazy-loaded, never SSR'd)
- **GSAP** — only for stat counter in `HeroBannerClient.js`; do not add new GSAP usage
- **AOS** — init-once in `AOSProvider.js`; never call `AOS.refresh()` on route change

---

## 3. Folder and File Structure

```
LiftSky24/
├── app/
│   ├── favicon.ico                  # Favicon — in app/ not public/ (Next.js App Router)
│   ├── globals.css                  # Design tokens, all CSS variables, component CSS
│   ├── layout.js                    # Root layout — Header, Footer, providers, JSON-LD
│   ├── not-found.js                 # Server shell → renders NotFoundClient
│   ├── page.js                      # Home page (Server Component)
│   ├── robots.js                    # /robots.txt
│   ├── sitemap.js                   # /sitemap.xml
│   ├── about/page.js
│   ├── api/contact/route.js         # POST /api/contact → Google Sheets webhook
│   ├── blog/
│   │   ├── page.js
│   │   ├── website-cost-india-2025/page.js
│   │   ├── website-speed-seo/page.js
│   │   └── social-media-vs-digital-marketing/page.js
│   ├── contact/page.js
│   ├── industries/page.js
│   ├── pricing/page.js
│   ├── privacy-policy/page.js
│   ├── services/
│   │   ├── page.js                  # Services hub
│   │   ├── website-development/page.js
│   │   ├── app-development/page.js
│   │   ├── software-development/page.js
│   │   ├── social-media-management/page.js
│   │   ├── seo/page.js
│   │   ├── graphic-design/page.js
│   │   └── digital-marketing/page.js
│   └── terms/page.js
│
├── components/
│   ├── AboutHero.jsx                # About page hero (orange theme)
│   ├── BlogList.js                  # Blog listing with search + pagination
│   ├── Breadcrumbs.js               # Breadcrumb nav + JSON-LD
│   ├── ContactForm.js               # Contact form (name, email, phone, details)
│   ├── FAQ.js                       # Accordion FAQ
│   ├── Footer.js                    # Dark footer — 4-col grid
│   ├── FooterWatermark.js           # Large decorative watermark behind footer
│   ├── Header.js                    # Sticky nav — direct DOM classList (no React re-render on scroll)
│   ├── Hero3DVisual.jsx             # Three.js orbital scene for HeroSection
│   ├── HeroBanner.js                # Legacy hero (not used on home page — replaced by HeroSection)
│   ├── HeroBannerClient.js          # Legacy client animations (GSAP stat counters)
│   ├── HeroSection.jsx              # Home page hero — Three.js 3D visual + heading
│   ├── HomeMarquees.js              # "use client" wrapper for MarqueeRow (ssr:false)
│   ├── HoverCard.js                 # Spring hover lift wrapper
│   ├── LeadPopup.js                 # Lead capture popup (30s delay + exit-intent)
│   ├── MagneticButton.js            # Magnetic cursor pull effect
│   ├── MarqueeRow.js                # Infinite horizontal marquee
│   ├── NewServices.jsx              # Bento-grid services (not used on home — replaced by ServicesShowcase)
│   ├── NotFoundClient.js            # 404 page content ("use client")
│   ├── PageHero.js                  # Inner page hero banner (server component)
│   ├── PageTransition.js            # Pass-through — Next.js handles transitions natively
│   ├── PricingTable.js              # 4 pricing cards with TiltCard
│   ├── ProcessRoadmap.js            # "How We Work" wave road (desktop) + mobile timeline
│   ├── ProcessRoadmap3D.js          # Three.js layer for ProcessRoadmap (lazy, desktop-only)
│   ├── ProjectGrid.js               # Portfolio grid (empty state currently)
│   ├── ScrollProgressBar.js         # Fixed reading-progress bar at top
│   ├── Sections.js                  # Section, IconCards, MiniCards, Steps, TechGrid, CTABand, CheckList
│   ├── ServiceDetailPage.js         # Shared template for all 7 service detail pages
│   ├── Servicesshowcase.jsx         # Home "Our Services" — desktop tabs + mobile accordion
│   ├── SmoothScrollProvider.js      # Lenis smooth scroll (desktop mouse only)
│   ├── Testimonials.js              # 2 cards/slide on desktop, 1 on mobile
│   ├── TiltCard.js                  # 3D tilt + glare (Framer Motion)
│   ├── ui.js                        # Reveal, Counter, Stagger, StaggerItem, Button
│   ├── WhatsAppFAB.js               # Fixed WhatsApp button (green — keep green always)
│   └── WhyCtaCard.js                # Dark CTA card in Why section ("use client" for MagneticButton)
│
├── data/
│   ├── images.js                    # Centralised image registry (IMG.services, IMG.blog, etc.)
│   ├── site-config.js               # BRAND, CONTACT, SOCIAL, STATS, SERVICES, NAV, WHY, PROCESS, TESTIMONIALS, FAQS, PRICING, INDUSTRIES, BLOG_POSTS, PORTFOLIO, IMAGES
│   ├── pages/
│   │   ├── about.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   ├── home.js
│   │   ├── industries.js
│   │   ├── pricing.js
│   │   └── services.js
│   └── service-details/             # Per-service detail content (headline, included, tools, process, deliverables, FAQs)
│
├── lib/
│   ├── data.js                      # Re-exports + legacy compat (processSteps, services, why, plans, etc.)
│   ├── motion-config/index.js       # MOTION constants (durations, springs, tilt, cursor config)
│   └── seo.js                       # meta(), breadcrumbSchema(), faqSchema(), serviceSchema()
│
├── public/
│   └── images/
│       ├── LiftSky24Logo.png        # PRIMARY LOGO (254 KB PNG)
│       ├── home_hero.png            # Home hero image (1.6 MB)
│       ├── about.png                # About page image (1.8 MB)
│       ├── hero.svg, phones.svg, design.svg, team.svg, pricing.svg, industries.svg
│       └── services/
│           ├── web-development.webp         (86 KB) ← note: filename differs from slug
│           ├── app-development.webp         (84 KB)
│           ├── software-development.webp    (67 KB)
│           ├── social-media-management.webp (88 KB)
│           ├── seo.webp                     (98 KB)
│           ├── graphic-design.webp          (86 KB)
│           ├── digital-marketing.webp       (71 KB)
│           └── demo.png                     (1.8 MB, legacy placeholder)
│
├── docs/
│   └── LIFTSKY24_PROJECT_DOCUMENTATION.md   ← this file
│
├── next.config.mjs
├── tailwind.config.js
├── package.json
└── .env.local                       # GOOGLE_SHEET_WEBHOOK (gitignored — set on Vercel separately)
```

---

## 4. Design System

### Brand Colors (Black + Orange — no purple, pink, violet or indigo)

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#FC6E04` | Main orange accent |
| `--color-primary-dark` | `#E04F00` | Deep orange (hover, gradient depth) |
| `--color-primary-light` | `#FF8A1F` | Warm orange (gradient start) |
| `--color-primary-soft` | `#FFF0E4` | Light orange surfaces, icon backgrounds |
| `--color-black` | `#101114` | Buttons, header CTA background |
| `--color-background` | `#F8F7F4` | Main site background (warm white) |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-text` | `#171717` | Primary body text |
| `--color-text-muted` | `#6B6B70` | Descriptions, secondary text |
| `--color-border` | `#EAE5DF` | Default borders |
| `--color-border-orange` | `#FFD4B3` | Orange borders (active states) |
| Amber | `#FFC247` | GO LIVE pill, orb on ProcessRoadmap |
| Navy | `#0C1322` | Text on orange fills, milestone numbers |
| `brand.text` | `#C2410C` | Small orange text — AA contrast on white |

### Tailwind Tokens (tailwind.config.js)

```js
colors: {
  ink: "#171717", paper: "#F8F7F4", muted: "#6B6B70", dark: "#101114",
  brand: { DEFAULT:"#FC6E04", dark:"#E04F00", light:"#FFF0E4", warm:"#FF8A1F", text:"#C2410C" },
  amber: { DEFAULT:"#FFC247", dark:"#F59E0B" },
  navy:  { 900:"#171717", 800:"#101114", 700:"#2A160D", DEFAULT:"#0C1322" },
  border: { DEFAULT:"#EAE5DF", orange:"#FFD4B3" },
}
backgroundImage: {
  "brand-gradient":  "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
  "brand-gradient-r":"linear-gradient(110deg,#E04F00,#FC6E04,#FF8A1F)",
  "dark-section":    "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)",
}
boxShadow: {
  card:     "0 10px 30px -12px rgba(252,110,4,0.18)",
  "card-lg":"0 25px 60px rgba(20,12,4,0.12)",
  orange:   "0 8px 24px rgba(252,110,4,0.28)",
}
```

### CSS Variables (globals.css :root)

```css
--color-primary: #FC6E04  --color-primary-dark: #E04F00  --color-primary-light: #FF8A1F
--color-primary-soft: #FFF0E4  --color-black: #101114  --color-background: #F8F7F4
--color-surface: #FFFFFF  --color-text: #171717  --color-text-muted: #6B6B70
--color-border: #EAE5DF  --color-border-orange: #FFD4B3
--line: rgba(16,17,20,.12)   /* legacy — road track color */
```

### Buttons

| Class | Default | Hover |
|---|---|---|
| `.btn-dark-pill` | `#101114` bg + `#FC6E04` text | `#FC6E04` bg + `#101114` text |
| `.btn-light-pill` | transparent + `#FC6E04` border + `#171717` text | `#FFF0E4` bg + `#E04F00` text |
| `.btn-cta-pill` | orange gradient + `#101114` text | lift + stronger shadow |

### Section backgrounds (tone prop)

| `tone` | CSS |
|---|---|
| `"white"` (default) | Transparent (inherits `var(--color-background)`) |
| `"soft"` | `bg-gradient-to-b from-white to-[#FFF7F0]` |

### ProcessRoadmap grid classes (globals.css — never purge)

`.rm-ol`, `.rm-li`, `.rm-item`, `.rm-card`, `.rm-ms`, `.rm-conn`, `.rm-road`, `.rm-start`, `.rm-golive` — defined inside `@media (min-width: 1280px)` using CSS custom properties (`--col`, `--row`, `--card-align`, `--ms-top`, `--conn-align`). These classes exist because Tailwind purges dynamic class names built with template literals.

---

## 5. Typography

| Font | Loaded via | Weights | Used for |
|---|---|---|---|
| **Inter** | Google Fonts `<link>` in `layout.js` | 400, 500, 600, 700, 800, 900 | All body text, headings, UI |

No other fonts are loaded globally. `AboutHero.jsx` uses `Caveat` (system fallback for a decorative handwritten note — not critical).

---

## 6. Global Components

### Header (`components/Header.js`)
- **Type:** `"use client"`
- **Behavior:** Sticky top, `position:sticky top:0 z-50`. Scroll handled by **direct DOM classList** (`header.classList.add("scrolled")`) + `requestAnimationFrame` throttle — zero React re-renders on scroll. No Framer Motion scroll hooks.
- **Hide-on-scroll:** Desktop only (`pointer:fine`). Mobile: never hides.
- **Mobile drawer:** `AnimatePresence` height `0 → auto`, staggered nav items.
- **CTA button:** `.h-cta` — `#101114` bg + `#FC6E04` text, hover reverses.
- **Active nav:** orange underline `::after` pseudo, orange text.
- **Dropdown:** CSS `visibility/opacity` hover — no JS.
- **Data source:** `NAV` from `data/site-config.js`.

### Footer (`components/Footer.js`)
- **Type:** `"use client"` (newsletter state)
- **Background:** `#10111a`, `position:relative`, `overflow:hidden`
- **Layout:** `.footer-grid` — 4 cols (`1.4fr 1fr 1fr 1fr`), 2 cols ≤900px, 1 col ≤500px
- **Watermark:** `FooterWatermark` as first child (z-0); content wrapper z-10
- **Newsletter:** client-side validation only (no backend yet)
- **Social icons:** hover gradient `linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)`
- **Subscribe button:** orange gradient, navy `#0C1322` text
- **Link hover:** `#FC6E04`

### FooterWatermark (`components/FooterWatermark.js`)
- **Type:** `"use client"` — Framer Motion `useReducedMotion()`
- **Text:** `BRAND.name` ("LiftSky24"), decorative, `aria-hidden`
- **Sizing:** mobile `text-[length:28vw]` (2 stacked lines), tablet `sm:text-[length:17vw]`, desktop `lg:text-[length:min(15vw,19rem)]`
- **Outline:** `-webkit-text-stroke` 1px mobile / 1.5px desktop, `rgba(252,110,4,0.28)`
- **Animation:** entrance `opacity 0→1 scale 0.96→1`, float `y:[0,-12,0]` 6s loop

### HeroSection (`components/HeroSection.jsx`)
- **Type:** `"use client"` — Framer Motion, Three.js via dynamic import
- **Used on:** Home page only
- **Background:** `#090A0D` (near-black), animated orange radial glows, grid pattern
- **Heading:** `"We Build Digital Experiences That Move Business Forward."` — orange accent words via gradient
- **CTAs:** "Start a Project" → `/contact`; "Explore Services" → `/services`
- **Right side:** `Hero3DVisual` (Three.js orbital scene — `ssr:false`)
- **Trust strip:** Creative Digital Solutions · Built for Business Growth · Technology That Scales

### ServicesShowcase (`components/Servicesshowcase.jsx`)
- **Type:** `"use client"`
- **Used on:** Home page (section 3)
- **Data:** 7 services defined inline (title, text, tags, Icon, href). Images from `IMG.services[slug]` in `data/images.js`.
- **Desktop (≥1024px):** Two-column grid `lg:grid-cols-[5fr_6fr]`. Left = tab list (7 items, `role="tablist"`, `role="tab"`). Right = single unified image card — image fills container (`object-contain` on dark `#101114` base), strong bottom-to-top gradient overlay, service info (title, description, tags, "Learn more" CTA) all inside the image card as `position:absolute bottom-0`. **No separate info card below the image.**
- **Mobile (<1024px):** Vertical accordion. First item expanded by default. Each item: collapsed = icon + title + chevron; expanded = image card with overlay info (same unified structure as desktop). `grid-template-rows: 0fr → 1fr` CSS transition.
- **Hover intent:** 80ms `setTimeout` before switching active on desktop.
- **Keyboard:** ArrowUp/Down/Home/End/Enter/Space.
- **Images:** `object-contain` (not `object-cover`) — illustrations must show fully without cropping.

### ProcessRoadmap (`components/ProcessRoadmap.js`)
- **Type:** `"use client"`
- **Used on:** Home (`/`) and Services hub (`/services`)
- **Data:** `processSteps` from `lib/data.js` (shape `{t, d}`, 5 items)
- **Desktop (≥768px):** Single SVG wave road (`viewBox="0 0 1000 160"`). 5 markers positioned ON the wave via `position:absolute left: x% top: CARD_ZONE + (y/VB_H)*WAVE_H`. Cards above/below the road with dotted vertical connectors. START pill left, GO LIVE pill right.
- **Mobile (<768px):** Vertical left-side timeline. 36px milestones, cards to the right.
- **Scroll progress:** `useScroll`, `useMotionValueEvent`. Desktop: SVG clip path reveals dotted line left→right. Mobile: `scaleY` on overlay line.
- **3D layer:** `ProcessRoadmap3D` loaded lazily (checks: xl+hover+fine, not reduced-motion, not saveData, hardwareConcurrency>4, deviceMemory>4, WebGL available). Three.js only. If unavailable → CSS hover fallback.
- **CSS grid classes:** `.rm-ol`, `.rm-li`, `.rm-item`, etc. in `globals.css` (never purged).

### Testimonials (`components/Testimonials.js`)
- **Type:** `"use client"`
- **Data:** `TESTIMONIALS` (4 entries — placeholder)
- **Layout:** 2 cards/slide on desktop, 1 on mobile (detected by `window.innerWidth < 640`)
- **Auto-advance:** every 6s, paused on hover
- **Animation:** `AnimatePresence mode="wait"`, slide x ±60px

### PricingTable (`components/PricingTable.js`)
- **Type:** `"use client"`, `TiltCard` via `dynamic(ssr:false)`
- **Layout:** `grid-cols-4` desktop, `sm:grid-cols-2` tablet
- **Popular plan:** black background, orange price, orange badge
- **Data:** `PRICING` from `site-config.js` (4 plans)

### FAQ (`components/FAQ.js`)
- **Type:** `"use client"`
- **Accordion:** single-open, first item open by default (`useState(0)`)
- **Active state:** orange left accent bar, orange question text, orange ± icon
- **Data:** `FAQS` from `site-config.js` (8 questions)

### LeadPopup (`components/LeadPopup.js`)
- **Type:** `"use client"`
- **Triggers:** 30s timer OR exit-intent (mouse leaves top of viewport)
- **×  close:** reshow after 40s (same session, no localStorage)
- **"No thanks":** permanent dismiss for 7 days (`localStorage`)
- **Fields:** Name (required), Phone, Email (phone or email required)
- **Submit:** POSTs to `/api/contact`
- **Centering:** fixed `inset-0 flex items-center justify-center` wrapper; modal uses `position:relative`

### WhatsAppFAB (`components/WhatsAppFAB.js`)
- **Fixed:** `bottom:24px right:24px z-60`
- **Color:** `#25d366` (WhatsApp green — NEVER change)
- **Link:** `CONTACT.whatsapp` (hides if empty)

### PageHero (`components/PageHero.js`)
- **Type:** Server component
- **Used on:** About, Services, all 7 service pages, Portfolio, Industries, Pricing, Blog, Contact
- **Background:** warm orange radial wash (no purple/lavender)
- **Props:** `title`, `accent`, `sub`, `image`, `alt`, `ctas[]`, `badges[]`, `stats[]`, `eyebrow`

### Section, CTABand, etc. (`components/Sections.js`)
- **Server component** (no `"use client"`)
- **CTABand background:** `linear-gradient(135deg,#101114 0%,#1B1714 40%,#2A160D 70%,rgba(252,110,4,0.25) 100%)`
- **TechGrid hues:** orange palette (no indigo/violet)
- **Steps:** kept for service detail pages only (ProcessRoadmap replaced it on home and services hub)

---

## 7. Pages

### Home (`app/page.js`) — Server Component

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Hero | `HeroSection` | Three.js orbital 3D, dark bg `#090A0D` |
| 2 | Tech marquee | `TechMarquee` | 20 tech items, 28s, continuous |
| 3 | About snippet | `PageHero` | Unsplash team photo |
| 4 | Services | `ServicesShowcase` | Tabs desktop / accordion mobile |
| 5 | Why Choose Us | `Section` + `MiniCards` + `WhyCtaCard` | Dark CTA card with MagneticButton |
| 6 | How We Work | `Section` + `ProcessRoadmap` | Wave road, 5 steps |
| 7 | Services marquee | `ServicesMarquee` | 15 service items, 22s, reversed |
| 8 | Testimonials | `Testimonials` | 4 placeholder entries |
| 9 | Pricing | `Section` + `PricingTable` | 4 plans |
| 10 | FAQ | `FAQ` | 8 questions |
| 11 | CTA Band | `CTABand` | Dark orange gradient bg |

### Services Hub (`app/services/page.js`) — Server Component

- PageHero → 7-card `IconCards` grid → `ProcessRoadmap` (tone="soft") → `CTABand`

### Service Detail Pages (`/services/[slug]/page.js`)

All 7 use `ServiceDetailPage` component with per-service data from `lib/data.js serviceDetails`.
Sections: PageHero → What's Included → Tools & Technologies → Our Process (`Steps`) → Deliverables → Service FAQs → Related Services → CTABand.

### Other Pages

| Route | Key components |
|---|---|
| `/about` | `AboutHero` + `PageHero` + mission/values cards + team + CTABand |
| `/contact` | `PageHero` + `ContactForm` + address/map |
| `/pricing` | `PageHero` + `PricingTable` + `FAQ` + `CTABand` |
| `/blog` | `PageHero` + 3 post cards with categories |
| `/blog/[slug]` | 3 blog post pages with real content |
| `/industries` | `PageHero` + featured industry cards + all 9 categories bento grid + FAQ |
| `/portfolio` | `PageHero` + `ProjectGrid` (empty state) |
| `/privacy-policy` | Static text |
| `/terms` | Static text |
| `/404` | `NotFoundClient` (floating emojis, animated 404) |

---

## 8. Content Data

### BRAND

```js
name: "LiftSky24"  tagline: "Rise Higher. Go Further."
url: "https://www.liftsky24.com"  ogImage: "/images/og-image.png" // TODO: create
```

### CONTACT

```js
email: "contact.liftsky24@gmail.com"
phone: "+91 88757 96652"  phoneTel: "tel:+918875796652"
whatsapp: "https://wa.me/918875796652"
address: "91/109 Sector 9, Mandir Marg Patel Marg Mansarovar, Jaipur — 302020"
hours: "Mon – Sat, 10 AM – 7 PM IST"
```

### SOCIAL

```js
instagram: "https://www.instagram.com/liftsky24/"
linkedin:  "https://www.linkedin.com/company/144081440/"
facebook:  "https://www.facebook.com/share/1CC9BDAubF/"
youtube:   ""   // hidden — add URL when ready
twitter:   ""   // hidden — add URL when ready
```

### STATS (4 items)
5+ Years Experience · 30+ Projects Delivered · 7 Core Services · 24h Response Time

### PROCESS (5 steps)
01 Discuss · 02 Design · 03 Develop · 04 Deliver · 05 Support

### PRICING (4 plans)

| Plan | Price | Popular | Key features |
|---|---|---|---|
| Starter | ₹4,999 | No | 3 pages, responsive, contact form, basic SEO, 1 month support |
| Growth | ₹17,999 | **Yes** | 8 pages, custom UI/UX, SEO, analytics, WhatsApp, 3 months support |
| Pro | ₹33,999 | No | 20 pages, CMS, advanced SEO, integrations, performance opt, 1 year support |
| Custom | Custom | No | Unlimited scope, app/software, dedicated team, retainer, all 7 services |

### NAV (7 items)
Home · About · Services (dropdown with 7 services) · Industries · Blog · Pricing · Contact
*(Portfolio removed from nav)*

### TESTIMONIALS (4 — placeholder)
Priya S. · Arjun M. · Kavita R. · Rohit T.

### FAQS (8 questions)
Website timeline · iOS+Android apps · SEO-friendly builds · Post-launch · Getting a quote · Payment terms · Revisions · Source code ownership

### BLOG_POSTS (3 articles)
1. "How Much Does a Business Website Cost in India?" — Website Development
2. "Why Website Speed Matters for SEO" — SEO
3. "Social Media Management vs Digital Marketing" — Digital Marketing

### PORTFOLIO
Empty (`[]`) — ready for real projects.

### Image Registry (`data/images.js`)

The **single source of truth** for all image paths. `ServicesShowcase` reads `IMG.services[slug]`.

```js
IMG.services = {
  "website-development":    "/images/services/web-development.webp"       // filename differs from slug
  "app-development":        "/images/services/app-development.webp"
  "software-development":   "/images/services/software-development.webp"
  "social-media-management":"/images/services/social-media-management.webp"
  "seo":                    "/images/services/seo.webp"
  "graphic-design":         "/images/services/graphic-design.webp"
  "digital-marketing":      "/images/services/digital-marketing.webp"
}
```

> **Important:** The file for Website Development is `web-development.webp` (NOT `website-development.webp`). This mapping in `images.js` is intentional.

---

## 9. Animations

### Rules
- Framer Motion everywhere (entrance, hover, layout)
- Three.js only in `Hero3DVisual.jsx` and `ProcessRoadmap3D.js`
- GSAP only in `HeroBannerClient.js` (stat counters — legacy)
- AOS: init-once, never `AOS.refresh()` on route change
- Always respect `useReducedMotion()` / `prefers-reduced-motion`

### Key animations

| Component | Library | What | Trigger |
|---|---|---|---|
| HeroSection | Framer | Word-by-word stagger heading | Mount |
| Hero3DVisual | Three.js | Orbital rings, particles, mouse parallax | Continuous RAF |
| ServicesShowcase | CSS transition | Image opacity 0→1 cross-fade (0.5s) | Tab switch |
| ServicesShowcase | CSS grid-rows | Accordion expand 0fr→1fr | Mobile tap |
| ProcessRoadmap | Framer `useScroll` | SVG clip path reveals wave left-to-right | Scroll |
| ProcessRoadmap | Framer `whileInView` | Cards fade-up y:24→0 | Scroll into view |
| ProcessRoadmap3D | Three.js | Card float, hover tilt, orb on road, particles | Continuous RAF |
| Testimonials | Framer `AnimatePresence` | Slide x:±60 opacity | Auto + manual |
| FAQ | Framer `AnimatePresence` | Height 0→auto, opacity | Click |
| Footer watermark | Framer | Float y:[0,-12,0] 6s loop | Mount |
| Header | DOM classList | shadow toggle, hide-on-scroll | Scroll (rAF throttle) |
| LeadPopup | Framer | scale 0.92→1, opacity | Timer/exit-intent |
| MarqueeRow | CSS `marquee-scroll` | translateX(-50%) | Continuous, `--marquee-dur` |
| ScrollProgressBar | GSAP scrub | scaleX 0→1 | Scroll |

---

## 10. Images and Assets

### Tracked in git

| File | Path | Used in | Size |
|---|---|---|---|
| LiftSky24Logo.png | `/images/LiftSky24Logo.png` | Header (h:52px), Footer (h:34px) | 254 KB |
| home_hero.png | `/images/home_hero.png` | HeroSection (legacy — not shown on current home) | 1.6 MB |
| about.png | `/images/about.png` | AboutHero | 1.8 MB |
| web-development.webp | `/images/services/web-development.webp` | ServicesShowcase (Website Dev) | 86 KB |
| app-development.webp | `/images/services/app-development.webp` | ServicesShowcase (App Dev) | 84 KB |
| software-development.webp | `/images/services/software-development.webp` | ServicesShowcase (Software Dev) | 67 KB |
| social-media-management.webp | `/images/services/social-media-management.webp` | ServicesShowcase | 88 KB |
| seo.webp | `/images/services/seo.webp` | ServicesShowcase (SEO) | 98 KB |
| graphic-design.webp | `/images/services/graphic-design.webp` | ServicesShowcase (Graphic Design) | 86 KB |
| digital-marketing.webp | `/images/services/digital-marketing.webp` | ServicesShowcase (Digital Marketing) | 71 KB |
| hero.svg, phones.svg, design.svg, team.svg | `/images/*.svg` | PageHero on various inner pages | 1–3 KB |

### Missing / TODO

| File | Needed for |
|---|---|
| `/images/og-image.png` | OG/Twitter meta image (1200×630) |
| `/images/blog/website-cost.jpg` | Blog listing thumbnail |
| `/images/blog/speed-seo.jpg` | Blog listing thumbnail |
| `/images/blog/social-vs-digital.jpg` | Blog listing thumbnail |

### Next.js Image usage

- `next/image` with `fill` + `object-contain` in `ServicesShowcase` (service images are illustrations — must not crop)
- `next/image` with `fill` + `object-cover` in `PageHero` (photography)
- Remote patterns: Unsplash hosts only

---

## 11. SEO

### Metadata system (`lib/seo.js`)

- `meta(title, description, path)` — generates full Next.js metadata including OG, Twitter, canonical, robots
- Title pattern: `"Page Title | LiftSky24"`
- Description: `.slice(0, 160)` enforced
- Canonical: `${BRAND.url}${path}`
- `metadataBase`: `new URL("https://www.liftsky24.com")`

### JSON-LD schemas (implemented)

| Schema | Where |
|---|---|
| `ProfessionalService` | `app/layout.js` (every page) — name, URL, email, phone, address, all 7 services as OfferCatalog |
| `BreadcrumbList` | `components/Breadcrumbs.js` |
| `FAQPage` | `lib/seo.js faqSchema()` — defined but not yet injected on pages |
| `Service` | `lib/seo.js serviceSchema()` — defined but not yet injected |

### Sitemap / robots

- `app/sitemap.js` → `/sitemap.xml` (auto-generated, all 27 routes)
- `app/robots.js` → `/robots.txt`

### Per-page titles

| Page | Title |
|---|---|
| Home | `LiftSky24 \| Website, App, SEO & Digital Marketing Agency in Jaipur` |
| About | `About Us \| LiftSky24` |
| Services | `Our Services \| LiftSky24` |
| Contact | `Contact Us \| LiftSky24` |
| Pricing | `Pricing \| LiftSky24` |
| Blog | `Blog & Resources \| LiftSky24` |
| Industries | `Industries We Serve \| LiftSky24` |
| Portfolio | `Portfolio \| LiftSky24` |
| 404 | `Page Not Found \| LiftSky24` |
| Each service | `{Service Name} \| LiftSky24` |

---

## 12. Forms and Integrations

### Contact form (`components/ContactForm.js` → `app/api/contact/route.js`)

- **Fields:** Name (required), Email (required), Phone (optional), Project Details (required, min 10 chars)
- **Validation:** client-side regex + server-side re-validation
- **API:** `POST /api/contact` → `GOOGLE_SHEET_WEBHOOK` env var
- **Webhook guard:** only calls webhook if URL starts with `https://script.google.com`; otherwise logs and returns `{success:true,dev:true}`
- **Payload sent:** `{name, email, phone, details, timestamp, source}`
- **ENV:** `GOOGLE_SHEET_WEBHOOK` — set in `.env.local` locally, set in Vercel environment variables in production. **Never commit to git.**
- **Setup guide:** `docs/google-apps-script.js`

### Lead popup (`components/LeadPopup.js`)
- Same `/api/contact` endpoint
- Sends `details: "Quick enquiry via popup — Phone: X, Email: Y"`

### Newsletter (Footer)
- Client-side validation only — **no backend connected yet**

---

## 13. Performance and Accessibility

### Performance

- Three.js lives in a lazy chunk (`_app-pages-browser_components_ProcessRoadmap3D_js.js`, ~7MB uncompressed) — never loaded on mobile, never in the shared bundle
- Home page First Load JS: ~167 kB
- `SmoothScrollProvider`: Lenis only on `pointer:fine` (mouse) + not `prefers-reduced-motion`
- `IntersectionObserver` pauses Three.js render loops when off-screen
- `ScrollProgressBar` and `ProcessRoadmap3D` pause when tab is hidden
- MarqueeRow: no pause-on-hover (removed to prevent stop/restart feel)
- Images: `next/image` with correct `sizes`, `loading="eager"` only on first visible image, all others lazy

### Accessibility

- Skip-to-content link in `layout.js`
- `role="banner"` on header, `aria-label="Main navigation"` on nav
- `role="tablist"` + `role="tab"` + `role="tabpanel"` + roving tabindex in `ServicesShowcase`
- `role="list"` + `role="listitem"` in `ProcessRoadmap`
- Decorative elements: `aria-hidden="true"` (road SVG, watermark, Three.js canvas, milestone circles)
- Three.js canvas: `aria-hidden="true"`, `pointer-events:none`, `tabIndex={-1}`
- Error boundary around Three.js `Canvas` — silently falls back to CSS on WebGL errors
- `prefers-reduced-motion`: respected in every animated component

### Scroll stability fixes (all applied)

- `PageTransition`: no `key={pathname}` remount
- `SmoothScrollProvider`: no `AOS.refresh()` or `ScrollTrigger.refresh()` on route change
- `Header`: direct DOM classList — no React state on scroll
- `GlowOrbs`: `transform:translate` (compositor-only, no layout)

---

## 14. Change Log

### Phase 1 — Logo and Branding
- Added LiftSky24Logo.png to Header and Footer
- Fixed Footer hydration error (moved `>` CSS selector from inline `<style>` to globals.css)

### Phase 2 — Digital Agency Theme
- Replaced navy/indigo/violet palette with Black + Orange brand system
- New CSS variables in globals.css, Tailwind tokens updated
- All purple/pink/indigo removed from every component

### Phase 3 — Services (7 Canonical)
- Removed Cloud Solutions, IT Consulting, AI & ML, UI/UX Design
- Added Software Development, Social Media Management, Graphic Design
- 301 redirects in next.config.mjs
- 7 service detail pages created

### Phase 4 — Content and Data Architecture
- `data/site-config.js` as single source of truth
- `lib/data.js` as re-export/compat layer
- `data/pages/*.js` for per-page content
- `data/images.js` as centralised image registry
- 3 blog post pages with real content
- Privacy Policy, Terms, 404, sitemap, robots

### Phase 5 — Contact Form + Google Sheets
- `/api/contact/route.js` — POST with server validation + webhook guard
- `.env.local` with `GOOGLE_SHEET_WEBHOOK`
- Phone field added to ContactForm

### Phase 6 — SEO
- `lib/seo.js` with meta(), faqSchema(), serviceSchema()
- `ProfessionalService` JSON-LD in layout.js
- Sitemap, robots, Breadcrumbs

### Phase 7 — Scroll Stability
- PageTransition: removed `key={pathname}`
- SmoothScrollProvider: removed AOS.refresh and ScrollTrigger.refresh
- Header: direct DOM classList + rAF throttle
- ParallaxSection: removed from PageHero
- GlowOrbs: compositor-only transforms

### Phase 8 — Footer Redesign
- LiftSky24 watermark: single centered mark behind all 3 columns (phase-shifted vs per-column)
- Bounce animation removed → gentle float
- Social/Subscribe: brand orange gradient (removed pink)

### Phase 9 — Testimonials + Pricing
- Testimonials: 2-cards/slide desktop, 1 mobile
- Pricing: 4 plans (₹4,999 / ₹17,999 / ₹33,999 / Custom)

### Phase 10 — Lead Popup + Favicon
- LeadPopup: 30s delay + exit-intent, × close → reshow 40s, No thanks → 7-day dismiss
- Favicon: `app/favicon.ico` (not `public/`) to avoid 500 conflict

### Phase 11 — Industries Expansion
- 9 categories, 50+ industries in `data/pages/industries.js`

### Phase 12 — ProcessRoadmap v1 (Road Path)
- Replaced flat 5-col Steps grid with animated SVG road path + TiltCard

### Phase 13 — ServicesShowcase — Proper ARIA Tabs
- Left list (7 tabs) + right image stage
- `next/image` (fill, object-contain), no duplicate markup
- Full keyboard/ARIA tabs pattern
- Hover-intent 80ms, mobile scroll-into-view

### Phase 14 — HeroSection (Three.js 3D)
- `components/HeroSection.jsx` — Three.js orbital scene via `Hero3DVisual.jsx`
- `npm install three@0.169.0 @react-three/fiber@8.17.10`
- `transpilePackages: ["three"]` in next.config.mjs

### Phase 15 — Full Brand Theme (Black + Orange)
- Replaced all purple/pink/indigo across every file
- New Tailwind tokens: `brand.text`, `amber`, `navy.DEFAULT`
- Updated globals.css, tailwind.config.js, all components

### Phase 16 — ProcessRoadmap v2 (Wave Road + Three.js Layer)
- `ProcessRoadmap.js` rewritten: markers ON the SVG wave at alternating high/low points
- `ProcessRoadmap3D.js` created: idle float, hover tilt, twin planes, orb, particles
- `.rm-*` CSS classes in globals.css (Tailwind dynamic class purge workaround)

### Phase 17 — Next.js 14 → 15.3.9 Upgrade
- `next@15.3.9` — React 18 compatible
- `next/dynamic ssr:false` moved out of Server Components into client wrappers:
  - `HomeMarquees.js` (TechMarquee + ServicesMarquee)
  - `WhyCtaCard.js` (MagneticButton)
  - `NotFoundClient.js` (MagneticButton)
- Hydration fix: `<style>` with `aria-selected="true"` moved from JSX to globals.css

### Phase 18 — ServicesShowcase — Overlay Info + Mobile Accordion
- Info panel moved **inside** the image card as `position:absolute bottom-0` overlay
- Desktop: unified image+info card, no separate panel below
- Mobile: vertical accordion (grid-rows: 0fr→1fr transition), each item = image with overlay
- `object-contain` on dark `#101114` base (illustrations must show fully)

### Phase 19 — Service Images — Real WebP Files
- `data/images.js` updated with real WebP paths in `/images/services/`
- 7 WebP files committed to git (were untracked → missing on Vercel → 400 error)
- Note: Website Development file = `web-development.webp` (not `website-development.webp`)

---

## 15. Known Issues and TODOs

### Critical — Before Launch

| # | Issue | File | Fix |
|---|---|---|---|
| 1 | OG image missing | `public/images/og-image.png` | Create 1200×630 branded PNG |
| 2 | Blog thumbnail images missing | `public/images/blog/` | Create: `website-cost.jpg`, `speed-seo.jpg`, `social-vs-digital.jpg` |
| 3 | Social icons on Contact page all `href="#"` | `app/contact/page.js` | Add real social URLs |
| 4 | Google Maps link is generic | `app/contact/page.js` | Replace with real Google Maps share link |
| 5 | Newsletter form no backend | `components/Footer.js` | Connect to email service (Mailchimp / ConvertKit) |
| 6 | Google Sheets webhook not configured on Vercel | Vercel env vars | Add `GOOGLE_SHEET_WEBHOOK` in Vercel project settings |

### Content — Owner Input Required

| Item | Location |
|---|---|
| Portfolio projects (currently empty) | `data/site-config.js → PORTFOLIO` |
| Real client testimonials | `data/site-config.js → TESTIMONIALS` |
| Real team photos | `app/about/page.js` |
| YouTube and Twitter social links | `data/site-config.js → SOCIAL` |
| Real company stats | `data/site-config.js → STATS` |

### Technical — Low Priority

| Item |
|---|
| `faqSchema()` and `serviceSchema()` defined in `lib/seo.js` but not injected on pages |
| Inter font still loaded via `<link>` — could use `next/font/google` for better optimization |
| GSAP in `HeroBannerClient.js` is loaded but `HeroBanner.js` is not used on the home page — could remove |
| `HoverCard.js`, `HeroBanner.js`, `HeroBannerClient.js`, `NewServices.jsx` are defined but not actively used |

---

## 16. AI Handoff Summary

### What you need to know immediately

1. **Single source of truth for data:** `data/site-config.js`. All pages pull from it. `lib/data.js` is a re-export compat layer for older components.

2. **Image registry:** `data/images.js` → `IMG.services[slug]`. The ServicesShowcase reads images from here. `Website Development` slug maps to `web-development.webp` (not `website-development.webp`).

3. **No `"use client"` in Server Components using `next/dynamic ssr:false`** (Next.js 15 rule). Wrap in a client component if you need dynamic ssr:false. See `HomeMarquees.js`, `WhyCtaCard.js`, `NotFoundClient.js` as examples.

4. **Never use dynamic Tailwind class names** (e.g. `` `xl:col-start-${i}` ``). They are purged. Use `globals.css` classes with CSS custom properties instead (see `.rm-*` for the ProcessRoadmap grid as the reference pattern).

5. **Three.js files:** `Hero3DVisual.jsx` and `ProcessRoadmap3D.js` only. Never import Three.js or `@react-three/fiber` anywhere else. Both are `ssr:false` dynamic imports. `transpilePackages: ["three"]` is set in `next.config.mjs`.

6. **Scroll stability:** Never call `AOS.refresh()` or `ScrollTrigger.refresh()` on route changes. Never add `key={pathname}` to layout wrappers.

7. **Environment variables:** `GOOGLE_SHEET_WEBHOOK` must be set in Vercel project settings (not just `.env.local`) for the contact form to work in production.

8. **Build command:** `npx next build`. Lint runs automatically. 27 static pages expected.

9. **Git:** `main` branch, Vercel auto-deploys on push. Files in `public/` must be committed — Vercel does not serve uncommitted files.

10. **WhatsApp FAB:** Color is `#25d366`. Never change it. It is the official WhatsApp brand color.
