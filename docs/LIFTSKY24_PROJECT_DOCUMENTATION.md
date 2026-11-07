# LiftSky24 — Complete Project Documentation

> **Generated from actual source code.** Every value, color, copy and structure in this document is extracted verbatim from the codebase. Do not guess values — read this file.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack and Setup](#2-tech-stack-and-setup)
3. [Folder and File Structure](#3-folder-and-file-structure)
4. [Design System (Theme)](#4-design-system-theme)
   - 4.1 [Theme Summary](#41-theme-summary)
   - 4.2 [Color Palette](#42-color-palette)
   - 4.3 [Shadows, Radius, Borders, Blur, Z-index](#43-shadows-radius-borders-blur-z-index)
   - 4.4 [Spacing and Layout](#44-spacing-and-layout)
   - 4.5 [Buttons, Inputs, Badges, Links](#45-buttons-inputs-badges-links)
5. [Typography](#5-typography)
6. [Global Components](#6-global-components)
7. [Pages](#7-pages)
8. [Content Data](#8-content-data)
9. [Animations Inventory](#9-animations-inventory)
10. [Images and Assets Inventory](#10-images-and-assets-inventory)
11. [SEO](#11-seo)
12. [Forms, Integrations and Functionality](#12-forms-integrations-and-functionality)
13. [Performance and Accessibility](#13-performance-and-accessibility)
14. [Change Log](#14-change-log)
15. [Known Issues, TODOs and Next Steps](#15-known-issues-todos-and-next-steps)
16. [AI Handoff Summary](#16-ai-handoff-summary)

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Company name** | LiftSky24 |
| **Tagline** | Rise Higher. Go Further. |
| **Purpose** | Full-service digital agency website — converts visitors to enquiries |
| **Target audience** | Startups, local businesses, founders, marketing heads in India |
| **Tone of voice** | Direct, honest, no-jargon, conversational but professional |
| **Status** | Demo / pre-launch (placeholder data in place, real data TODO) |
| **Deployment platform** | Not deployed — runs locally. Intended URL: `https://www.liftsky24.com` |
| **Local dev URL** | `http://localhost:3000` (falls back to 3001/3002 if port is taken) |

### The 7 Services — Exact Names (used everywhere: nav, cards, pages, schema, footer)

| # | Exact Service Name | Slug | Route |
|---|---|---|---|
| 1 | Website Development | `website-development` | `/services/website-development` |
| 2 | App Development | `app-development` | `/services/app-development` |
| 3 | Software Development | `software-development` | `/services/software-development` |
| 4 | Social Media Management | `social-media-management` | `/services/social-media-management` |
| 5 | Search Engine Optimization (SEO) | `seo` | `/services/seo` |
| 6 | Graphic Design | `graphic-design` | `/services/graphic-design` |
| 7 | Digital Marketing | `digital-marketing` | `/services/digital-marketing` |

> **Naming rule:** Always use these exact names. Never abbreviate or reorder. The nav dropdown lists them in this order with "All Services" first.

### Removed Services (do not re-add)

These were removed and have permanent 301 redirects:
- `Cloud Solutions` → deleted
- `IT Consulting` → deleted
- `UI/UX Design` (standalone) → redirects to `/services/graphic-design`
- `AI & ML` → redirects to `/services`
- Old routes: `/services/mobile-apps` → `/services/app-development`, `/services/web-development` → `/services/website-development`

---

## 2. Tech Stack and Setup

### Framework and Language

| Item | Value |
|---|---|
| **Framework** | Next.js 14.2.15 |
| **Router** | App Router (no Pages directory) |
| **Language** | JavaScript (JS) — no TypeScript |
| **React version** | 18.3.1 |
| **Styling** | Tailwind CSS 3.4.14 + custom CSS classes in `globals.css` |
| **Icons** | lucide-react 0.454.0 |
| **Animation** | framer-motion 11.11.0 (only animation library — no GSAP, no AOS) |
| **Path alias** | `@/*` maps to `./` (repo root) — defined in `jsconfig.json` |

### Full Dependency List (from `package.json`)

```json
"dependencies": {
  "framer-motion": "^11.11.0",
  "lucide-react": "^0.454.0",
  "next": "14.2.15",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
},
"devDependencies": {
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.14"
}
```

### Scripts

```json
"scripts": {
  "dev":   "next dev",
  "build": "next build",
  "start": "next start"
}
```

Note: No `lint` script is defined.

### Running Locally

```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

### Build and Deploy

```bash
npm run build   # Production build
npm run start   # Start production server
```

### Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `GOOGLE_SHEET_WEBHOOK` | Google Apps Script Web App URL for contact form → Google Sheets | Optional (dev works without it) |

File: `.env.local` (already created, not committed to git)

Setup guide for Sheets integration is in `/docs/google-apps-script.js`.

---

## 3. Folder and File Structure

```
LiftSky24/
├── app/                            # Next.js App Router — all routes
│   ├── layout.js                   # Root layout — Header, Footer, WhatsAppFAB, JSON-LD schema, Google Fonts
│   ├── globals.css                 # All CSS variables, keyframes, utility classes, button classes
│   ├── page.js                     # Home page (/)
│   ├── not-found.js                # 404 page
│   ├── sitemap.js                  # Auto-generated sitemap.xml
│   ├── robots.js                   # Auto-generated robots.txt
│   ├── about/page.js               # About page (/about)
│   ├── blog/
│   │   ├── page.js                 # Blog listing (/blog)
│   │   ├── website-cost-india-2025/page.js   # Blog post 1
│   │   ├── website-speed-seo/page.js         # Blog post 2
│   │   └── social-media-vs-digital-marketing/page.js  # Blog post 3
│   ├── contact/page.js             # Contact page (/contact)
│   ├── industries/page.js          # Industries page (/industries)
│   ├── portfolio/page.js           # Portfolio page (/portfolio)
│   ├── pricing/page.js             # Pricing page (/pricing)
│   ├── privacy-policy/page.js      # Privacy Policy (/privacy-policy)
│   ├── terms/page.js               # Terms & Conditions (/terms)
│   ├── services/
│   │   ├── page.js                 # Services hub (/services)
│   │   ├── website-development/page.js
│   │   ├── app-development/page.js
│   │   ├── software-development/page.js
│   │   ├── social-media-management/page.js
│   │   ├── seo/page.js
│   │   ├── graphic-design/page.js
│   │   └── digital-marketing/page.js
│   └── api/contact/route.js        # POST /api/contact — Google Sheets webhook
│
├── components/                     # All React components
│   ├── Header.js                   # Sticky navbar with scroll shadow, dropdown, mobile drawer
│   ├── Footer.js                   # Dark footer, 4-col grid, newsletter, social icons
│   ├── FooterWatermark.js          # Single centred decorative "LiftSky24" watermark behind footer
│   ├── WhatsAppFAB.js              # Fixed WhatsApp button (bottom-right)
│   ├── HeroBanner.js               # Home-page hero with stats, CTAs, blob decoration
│   ├── PageHero.js                 # Reusable inner-page hero (used on all non-home pages)
│   ├── AboutHero.jsx               # About-specific animated hero (Plus Jakarta Sans + Caveat)
│   ├── ServiceDetailPage.js        # Shared template for all 7 service detail pages
│   ├── Sections.js                 # Section, IconCards, MiniCards, Steps, TechGrid, CTABand, CheckList
│   ├── ui.js                       # Reveal, Counter, ParallaxImage, Stagger, StaggerItem, Button
│   ├── FAQ.js                      # Accordion FAQ (uses FAQS from site-config)
│   ├── Testimonials.js             # Auto-cycling carousel (uses TESTIMONIALS from site-config)
│   ├── PricingTable.js             # 3-plan pricing cards (uses PRICING from site-config)
│   ├── ProjectGrid.js              # Portfolio grid with empty state (uses PORTFOLIO from site-config)
│   ├── ContactForm.js              # 3-field form → POST /api/contact
│   ├── Breadcrumbs.js              # Breadcrumb nav + JSON-LD BreadcrumbList schema
│   ├── NewServices.jsx             # Bento-grid services (NOT used on home page currently)
│   └── Servicesshowcase.jsx        # Tabbed services showcase — used on home page
│
├── data/
│   ├── site-config.js              # SINGLE SOURCE OF TRUTH — all brand, contact, services, content
│   └── images.js                   # Centralised image registry (paths, alt text, dimensions)
│
├── lib/
│   ├── data.js                     # Re-exports from site-config + legacy-compat icon wrappers
│   └── seo.js                      # meta() helper, breadcrumbSchema(), faqSchema(), serviceSchema()
│
├── docs/
│   ├── google-apps-script.js       # Google Apps Script code to paste into Apps Script editor
│   └── LIFTSKY24_PROJECT_DOCUMENTATION.md  # This file
│
├── public/
│   └── images/
│       ├── LiftSky24Logo.png       # PRIMARY logo (used in header + footer)
│       ├── Logo.jpeg               # Old logo — not in use
│       ├── logo.png                # Old logo — not in use
│       ├── home_hero.png           # Hero section image (1.6 MB)
│       ├── about.png               # About hero image (1.8 MB)
│       ├── team.svg                # Team illustration SVG
│       ├── hero.svg                # Generic hero SVG (reused on many pages)
│       ├── hero-right-illustration.svg
│       ├── phones.svg              # App development illustration
│       ├── design.svg              # Graphic design illustration
│       ├── pricing.svg             # Pricing page illustration
│       ├── industries.svg          # Industries page illustration
│       ├── ai.svg                  # Not currently used
│       ├── project-1.svg through project-8.svg  # Not currently used (PORTFOLIO is empty)
│       ├── Gemini_Generated_Image_1klh4o1klh4o1klh.png  # Not used
│       ├── blog/                   # Blog thumbnails (paths defined in BLOG_POSTS but files may not exist)
│       ├── hero-layers/            # (base.svg, ai.svg, card.svg, glints.svg, mobile.svg, phone.svg, web.svg)
│       └── services/
│           └── demo.png            # Single placeholder for all service cards in ServicesShowcase (1.8 MB)
│
├── next.config.mjs                 # Redirects, image remote patterns
├── tailwind.config.js              # Theme tokens, colors, gradients, shadows
├── postcss.config.js               # Tailwind + autoprefixer
├── jsconfig.json                   # Path alias @/* → ./
└── package.json                    # Dependencies and scripts
```

---

## 4. Design System (Theme)

### 4.1 Theme Summary

- **Theme name/style:** "Digital Agency" — clean, modern, cream background with electric purple/pink/orange accent palette
- **Defined in this Kiro session** (theme was changed from an older navy/indigo palette)
- **Theme files:** `tailwind.config.js` (Tailwind tokens) + `app/globals.css` (CSS variables + utility classes)
- **Light/dark mode:** Light mode only — no dark mode implemented
- **Overall feel:** Cream (#f7f6f2) paper background, deep ink (#10111a) text, vibrant purple→pink gradients, geometric rounded cards, subtle glass/blur effects

### 4.2 Color Palette

#### CSS Variables (`:root` in `globals.css`)

| Variable | HEX | Usage |
|---|---|---|
| `--ink` | `#10111a` | Primary text, headings |
| `--paper` | `#f7f6f2` | Page/body background |
| `--muted` | `#686a76` | Secondary/body text, captions |
| `--purple` | `#6557ff` | Primary brand accent — links, focus, active states |
| `--cyan` | `#35d9ff` | Accent (used in gradients, not standalone) |
| `--lime` | `#c7ff5e` | Accent (used in gradients, not standalone) |
| `--pink` | `#ff4fa3` | CTA buttons, hover states, footer link hover |
| `--orange` | `#ff6338` | Gradient start, dot accents, highlight |
| `--line` | `rgba(16,17,26,.13)` | Borders, dividers |
| `--dark` | `#11121b` | Dark section backgrounds |

#### Tailwind Color Tokens (`tailwind.config.js`)

| Token | HEX | Notes |
|---|---|---|
| `ink` | `#10111a` | Mirrors `--ink` |
| `paper` | `#f7f6f2` | Mirrors `--paper` |
| `muted` | `#686a76` | Mirrors `--muted` |
| `dark` | `#11121b` | Mirrors `--dark` |
| `brand.DEFAULT` | `#6557ff` | Enables `bg-brand`, `text-brand`, `border-brand` |
| `brand.light` | `#ede9ff` | Enables `bg-brand-light` — light purple tint |
| `brand.purple` | `#6557ff` | Same as DEFAULT |
| `brand.cyan` | `#35d9ff` | Cyan accent |
| `brand.lime` | `#c7ff5e` | Lime accent |
| `brand.pink` | `#ff4fa3` | Pink accent |
| `brand.orange` | `#ff6338` | Orange accent |
| `brand.violet` | `#7c3aed` | Used in `to-brand-violet` gradient in CTABand |
| `navy.900` | `#10111a` | Legacy — same as ink |
| `navy.800` | `#11121b` | Legacy — same as dark |
| `navy.700` | `#30264a` | Legacy — deep purple-navy |

#### Gradients (full CSS)

| Name | CSS Value | Used In |
|---|---|---|
| `bg-brand-gradient` | `linear-gradient(110deg,#6557ff,#ff4fa3)` | Primary CTA buttons, active icons, avatar circles, "Most Popular" badge |
| `bg-cta-gradient` | `radial-gradient(ellipse at 12% 70%,#6535c8,transparent 36%),radial-gradient(ellipse at 90% 20%,#d94b7b,transparent 35%),#11121b` | Not used directly (inline style used instead) |
| `bg-hero-wash` | `radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%)` | HeroBanner + PageHero backgrounds (applied via inline style to avoid Tailwind purge) |
| `bg-dark-section` | `radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b` | CTABand, Industries dark panel, About dark section (applied via inline style) |
| `.gradient-text` CSS | `linear-gradient(100deg,#ff6338,#ff4fa3,#6557ff,#178fbb)` + `animation: shine 7s alternate infinite` | H1 accented spans — orange→pink→purple→teal animated gradient text |
| Header/Footer CTA | `linear-gradient(110deg,#6557ff,#ff4fa3)` | Header CTA button, mobile CTA, footer subscribe button |
| Hero blob | `conic-gradient(#ff6338,#ff4fa3,#6557ff,#35d9ff,#ff6338)` | Decorative blob in HeroBanner (opacity: 0.12, blur: 90px) |
| Footer social hover | `linear-gradient(135deg,#6557ff,#ff4fa3)` | Social icon hover background in footer |
| About hero gradient | `linear-gradient(90deg,#4F46E5,#8B5CF6,#D16BF0,#8B5CF6,#4F46E5)` | "Tech Company" text in AboutHero (animated sheen) |

#### Key Solid Colors (inline/hardcoded)

| Value | Where used |
|---|---|
| `#10111a` | Footer background |
| `#f7f6f2` | Mobile menu background (via `var(--paper)`) |
| `#fff` | Card backgrounds, input backgrounds |
| `#b4b5c1` | Footer link default color |
| `#6b6d7d` | Footer copyright text |
| `rgba(247,246,242,0.96)` | Header background (semi-transparent cream) |
| `#F5F6FC` | ServicesShowcase section background |
| `#0F1A4D` | ServicesShowcase text (deep navy — different from `--ink`) |
| `#5B6489` | ServicesShowcase muted text |
| `#E3E6F5` | ServicesShowcase border color |
| `#4F46E5` | ServicesShowcase/AboutHero accent (indigo-600) |
| `#25d366` | WhatsApp FAB background |

### 4.3 Shadows, Radius, Borders, Blur, Z-index

#### Shadows

| Token | CSS Value | Used on |
|---|---|---|
| `shadow-card` | `0 10px 30px -12px rgba(101,87,255,.25)` | Cards, forms, project cards |
| `shadow-card-lg` | `0 25px 60px rgba(41,32,71,.15)` | Hero collage mocks |
| `.project-card:hover` | `box-shadow: 0 24px 50px rgba(39,32,71,.1)` | Project cards on hover |
| `.service-card:hover` | `box-shadow: 0 22px 45px rgba(49,36,92,.1)` | Service cards on hover |
| `.price-card:hover` | `box-shadow: 0 22px 45px rgba(101,87,255,.15)` | Pricing cards on hover |
| Header CTA hover | `0 8px 20px rgba(101,87,255,.35)` | Header CTA button |
| WhatsApp FAB | `0 6px 24px rgba(37,211,102,.45)` | WhatsApp button |
| Services stage | `0 30px 70px -30px rgba(15,26,77,0.55)` | Desktop service image panel |

#### Border Radius

| Usage | Value |
|---|---|
| Cards (general) | `rounded-2xl` = 16px |
| Large cards / CTABand | `rounded-3xl` = 24px |
| Pricing cards | `rounded-3xl` = 24px |
| Buttons (pills) | `rounded-full` = 9999px |
| Tech grid tiles | `rounded-2xl` = 16px |
| Avatar circles | `rounded-full` = 9999px |
| Icon boxes | `rounded-xl` = 12px |
| Step number circles | `rounded-full` = 9999px |
| Input fields (ContactForm) | `rounded-xl` = 12px |
| Header dropdown menu | 16px (inline style) |
| Footer logo box | 10px (inline style) |
| Social icons (footer) | `border-radius: 50%` |

#### Borders

| Usage | Value |
|---|---|
| Card borders | `border border-slate-100` = 1px solid #f1f5f9 |
| Service card border | `1px solid #e5e4eb` |
| Project/blog card border | `1px solid #e4e2e9` |
| Header border-bottom | `1px solid rgba(16,17,26,.10)` |
| Input focus | `border-brand` + `ring-2 ring-brand/20` |
| Input error | `border-red-400` |
| Popular pricing card | `border-2 border-brand` |
| Section divider | `rgba(16,17,26,.13)` |

#### Blur

| Usage | Value |
|---|---|
| Header backdrop | `backdrop-filter: blur(18px)` |
| Services glass card | `backdrop-blur-xl` (Tailwind) |
| Decorative blobs | `filter: blur(90px)` / `blur-[110px]` / `blur-3xl` |

#### Z-index Scale

| Layer | Value |
|---|---|
| Header | `z-index: 50` |
| Header dropdown | `z-index: 110` |
| WhatsApp FAB | `z-index: 60` |
| Skip-to-content link | `z-[100]` (focus only) |

### 4.4 Spacing and Layout

#### Container

| Property | Value |
|---|---|
| Max width (main) | `max-w-7xl` = 1280px |
| Max width (header/footer) | `min(1200px, calc(100% - 40px))` |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` = 16px / 24px / 32px |
| ServicesShowcase container | `w-[min(1200px,100%-40px)]` |
| Blog/legal articles | `max-w-2xl` or `max-w-3xl` = 672px / 768px |
| FAQ section | `max-w-3xl` = 768px |
| Testimonials | `max-w-4xl` = 896px |

#### Section Vertical Spacing

| Property | Value |
|---|---|
| Standard section | `py-14 lg:py-18` = 56px / 72px |
| HeroBanner | `py-14 lg:py-20` = 56px / 80px |
| PageHero | `py-14 lg:py-20` = 56px / 80px |
| Testimonials | `py-16 lg:py-20` = 64px / 80px |
| FAQ section | `py-16 lg:py-20` = 64px / 80px |
| CTABand | `pb-14` = 56px bottom |
| ServicesShowcase | `py-14 sm:py-20 lg:py-28` = 56px / 80px / 112px |

#### Grid Systems

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| HeroBanner | 1 col | 1 col | `lg:grid-cols-[1fr_1.05fr]` |
| PageHero | 1 col | 1 col | `lg:grid-cols-2` |
| Section (general) | — | — | — |
| IconCards (services hub) | 1 col | `sm:grid-cols-2` | `lg:grid-cols-3` |
| IconCards (industries) | 1 col | `sm:grid-cols-2` | `lg:grid-cols-4` |
| MiniCards (why) | 2 cols | `md:grid-cols-3` | `md:grid-cols-3` |
| Steps (4) | 2 cols | 2 cols | `lg:grid-cols-4` |
| Steps (5) | 2 cols | 2 cols | `lg:grid-cols-5` |
| TechGrid | 2 cols | `sm:grid-cols-3` | `lg:grid-cols-6` |
| Pricing | 1 col | `sm:grid-cols-2` | `lg:grid-cols-3` |
| ProjectGrid | 1 col | `sm:grid-cols-2` | `lg:grid-cols-3` |
| Team | 2 cols | `md:grid-cols-3` | `lg:grid-cols-5` |
| ServicesShowcase | 1 col accordion | 1 col accordion | `lg:grid-cols-[5fr_6fr]` |
| Footer grid | 1 col (≤500px) | 2 cols (≤900px) | 4 cols (`1.4fr 1fr 1fr 1fr`) |
| Contact info+form | 1 col | 1 col | `lg:grid-cols-[1fr_1.2fr]` |
| Contact map+social | 1 col | 1 col | `lg:grid-cols-[2fr_1fr]` |

#### Tailwind Breakpoints

| Name | Min-width | What changes |
|---|---|---|
| `sm` | 640px | Grid 2 cols, larger text sizes, larger padding |
| `md` | 768px | MiniCards 4-col, team 3-col |
| `lg` | 1024px | Two-column hero layouts, desktop nav visible, full grid cols |
| `xl` | 1280px | Some hero max-widths expand |
| `2xl` | 1536px | Not specifically targeted |
| Header mobile breakpoint | ≤1080px | Nav hidden, toggle shown (custom CSS, not Tailwind breakpoint) |

### 4.5 Buttons, Inputs, Badges, Links

#### Button Variants

**`Button` component** (`components/ui.js`) — renders as `<Link>`:

| Variant | Classes | Colors |
|---|---|---|
| `primary` | `bg-brand-gradient text-white shadow-card hover:brightness-110` | Purple→pink gradient |
| `outline` | `border border-brand/30 bg-white text-brand hover:bg-brand-light` | White bg, brand border |
| `light` | `bg-white text-navy-900 hover:bg-brand-light` | White bg, dark text |

All variants share: `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95`

**CSS utility button classes** (`globals.css`) — for use in server components:

| Class | Background | Text | Padding | Hover |
|---|---|---|---|---|
| `.btn-dark-pill` | `linear-gradient(110deg,#171821,#30264a)` | `#fff` | `13px 19px` | Changes to purple→pink, translateY(-3px) |
| `.btn-light-pill` | `rgba(255,255,255,.6)` | `var(--ink)` | `13px 19px` | Border/text → purple, translateY(-2px) |
| `.btn-cta-pill` | `linear-gradient(100deg,var(--orange),var(--pink))` | `#fff` | `15px 28px` | translateY(-3px), pink shadow |
| `.btn-outline-light` | `rgba(255,255,255,.12)` | `#fff` | `13px 19px` | bg → rgba(255,255,255,.22) |

All pill buttons: `border-radius: 99px`, `font-size: 13px` (`.btn-cta-pill` is 14px), `font-weight: 800`, `transition: .25s`

**Header CTA** (`.h-cta`): `padding: 9px 18px`, `border-radius: 99px`, `background: linear-gradient(110deg,#6557ff,#ff4fa3)`, `font-size: 13px`, `font-weight: 800`

#### Inputs (ContactForm)

| State | Classes |
|---|---|
| Default | `border-slate-200 bg-white rounded-xl px-4 py-3 text-sm` |
| Focus | `focus:border-brand focus:ring-2 focus:ring-brand/20` |
| Error | `border-red-400` |
| Disabled | `disabled:opacity-60` |

#### Badges / Tags

| Type | Styles |
|---|---|
| Eyebrow pill | `rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-wide text-brand uppercase` |
| Service tag (on dark) | `border border-white/25 bg-white/15 text-white rounded-full px-2.5 py-1 text-[0.78rem] font-medium` |
| Service tag (on light) | `bg-indigo-50 text-indigo-700 rounded-full px-2.5 py-1 text-[0.78rem] font-medium` |
| Deliverable tag | `rounded-full border border-brand/20 bg-brand-light px-4 py-2 text-sm font-medium text-brand` |
| "Most Popular" badge | `rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold text-white` absolute positioned -top-3.5 |
| Blog category | `text-xs font-bold uppercase tracking-widest text-brand/60` |

#### Links

| Type | Default | Hover |
|---|---|---|
| Nav link (`.h-link`) | `color: var(--ink); opacity: .75; font-size: 13px; font-weight: 700` | `opacity: 1; color: var(--purple)` |
| Footer link (`.footer-link`) | `color: #b4b5c1; font-size: 12px` | `color: var(--pink)` |
| Breadcrumb link | `color: var(--muted); font-size: 12px` | `color: var(--purple)` |
| Inline text link | Inherits color | `hover:text-brand hover:underline` |

---

## 5. Typography

### Font Families

| Family | Source | Weights Loaded | Fallback | Display |
|---|---|---|---|---|
| **Inter** (primary) | Google Fonts via `<link>` in `layout.js` | 400, 500, 600, 700, 800, 900 | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` | `swap` (default Google Fonts behavior) |
| **Bricolage Grotesque** | `next/font/google` in `Servicesshowcase.jsx` | 600, 700, 800 | (Next.js handles fallback) | `swap` |
| **DM Sans** | `next/font/google` in `Servicesshowcase.jsx` | 400, 500 | (Next.js handles fallback) | `swap` |
| **Plus Jakarta Sans** | `next/font/google` in `AboutHero.jsx` | 400, 500, 600, 700, 800 | (Next.js handles fallback) | `swap` |
| **Caveat** | `next/font/google` in `AboutHero.jsx` | 600 | (Next.js handles fallback) | `swap` — handwritten style for decorative note |

> **Note:** Bricolage Grotesque and DM Sans are only loaded on pages that include `Servicesshowcase.jsx` (Home page). Plus Jakarta Sans and Caveat are only loaded on pages that include `AboutHero.jsx` (About page). This is handled automatically by Next.js font optimization.

### Type Scale

| Element | Font | Weight | Size Mobile | Size Desktop | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|---|---|
| H1 (HeroBanner) | Inter | 800 (extrabold) | `clamp(1.9rem, 3.8vw, 3.2rem)` ≈ 30.4px–51.2px | 51.2px | `1.08` | `tracking-tight` (-0.025em) | `text-navy-900` = #10111a |
| H1 (PageHero) | Inter | 800 (extrabold) | `text-4xl` = 36px | `sm:text-5xl` = 48px | `leading-tight` | `tracking-tight` | `text-navy-900` |
| H1 (AboutHero) | Plus Jakarta Sans | 800 | `clamp(1.5rem, 3.2vw, 3rem)` ≈ 24px–48px | 48px | `1.12` | `-0.03em` | `#0F1A4D` |
| H1 (Blog post) | Inter | 800 | `text-3xl` = 30px | `sm:text-4xl` = 36px | `leading-tight` | — | `text-navy-900` |
| H1 (404) | Inter | 800 (extrabold) | `text-3xl` = 30px | — | — | — | `text-navy-900` |
| H2 (Section title) | Inter | 700 (bold) | `text-2xl` = 24px | `sm:text-3xl` = 30px | `tracking-tight` | — | `text-navy-900` |
| H2 (CTABand) | Inter | 700 (bold) | `text-2xl` = 24px | `sm:text-3xl` = 30px | — | — | `#fff` |
| H2 (ServicesShowcase) | Bricolage Grotesque | 800 | `clamp(2.2rem, 5.5vw, 4rem)` ≈ 35.2px–64px | 64px | `1.02` | `-0.03em` | `#0F1A4D` |
| H2 (Blog post body) | Inter | 700 (bold) | `text-xl` = 20px | — | — | — | `text-navy-900` |
| H3 (Card titles) | Inter | 600 (semibold) | `text-sm` = 14px | — | — | — | `text-navy-900` |
| H3 (Section card) | Inter | 600 | varies | — | — | — | `text-navy-900` |
| Body (hero sub) | Inter | 400 | `text-base` = 16px | — | `leading-relaxed` | — | `text-slate-600` |
| Body (general) | Inter | 400 | `text-sm` = 14px | — | `leading-relaxed` | — | `text-slate-600` |
| Small/caption | Inter | 400–500 | `text-xs` = 12px | — | — | — | `text-slate-500` |
| Nav links | Inter | 700 | — | 13px | — | — | `var(--ink)` at 75% opacity |
| Button text | Inter | 700–800 | `text-sm` = 14px | 13px | — | — | varies by variant |
| Eyebrow/label | Inter | 700–800 | `text-xs` = 12px | — | — | `tracking-wide` or `tracking-wider` or `tracking-widest` | `text-brand` |
| Stat numbers (hero) | Inter | 800 (extrabold) | `text-xl` = 20px | — | — | — | `text-navy-900` |
| Stat numbers (PageHero) | Inter | 700 (bold) | `text-2xl` = 24px | `sm:text-3xl` = 30px | — | — | `text-navy-900` |
| Pricing amount | Inter | 800 (extrabold) | `text-3xl` = 30px | — | — | `tracking: -2px` | `text-navy-900` |
| 404 big number | Inter | 900 (black) | `text-8xl` = 96px | — | — | — | `text-brand opacity-20` |

### Gradient Text

```css
/* Class: .gradient-text — applied to H1 accent spans */
.gradient-text {
  color: transparent;
  background: linear-gradient(100deg, #ff6338, #ff4fa3, #6557ff, #178fbb);
  background-size: 180% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shine 7s alternate infinite;
}
/* @keyframes shine: background-position 0% → 100% center */
```

Used on: Home H1 "That Take Your Business Higher.", About H1 "We Build. We Design. We Grow."

**PageHero accent span** (separate from `.gradient-text`):
```css
bg-brand-gradient bg-clip-text text-transparent
/* = linear-gradient(110deg,#6557ff,#ff4fa3) */
```

---

## 6. Global Components

### Header (`components/Header.js`)

- **Type:** `"use client"` — React client component
- **Position:** Sticky, `top: 0`, `z-index: 50`
- **Height:** `70px`
- **Background:** `rgba(247,246,242,0.96)` + `backdrop-filter: blur(18px)`
- **Scroll behavior:** Adds `box-shadow: 0 2px 20px rgba(16,17,26,.09)` when `window.scrollY > 10`
- **Logo:** `<img src="/images/LiftSky24Logo.png" alt="LiftSky24" height="42px">`
- **Desktop nav breakpoint:** ≤1080px hides nav and CTA, shows toggle
- **Nav items (from `NAV` in `data/site-config.js`):** Home, About, Services (dropdown), Portfolio, Industries, Blog, Pricing, Contact
- **Services dropdown:** Contains "All Services" (styled `.all` = bold, border-bottom) + 7 service links. Opens on hover/focus-within, CSS-only (no JS).
- **Desktop CTA button:** "Get a Free Quote" → `/contact`, gradient pill
- **Mobile toggle:** Circle button (40×40px), shows "☰" / "✕", `aria-expanded`
- **Mobile drawer:** `framer-motion AnimatePresence`, height+opacity animation (duration: 0.22s, ease: easeOut), background: `var(--paper)`. Services item has accordion sub-menu. Ends with "Get a Free Quote" CTA.
- **Active state:** Exact match on `/`, `startsWith` for all others. Active = `color: var(--purple)`.
- **Route change:** Menu closes automatically via `useEffect` on `usePathname`.
- **Accessibility:** `role="banner"`, `aria-label="Main navigation"`, `role="menu"` on dropdown, `role="menuitem"`, `aria-current="page"` on active link, `aria-expanded` on mobile toggle, `aria-controls="mobile-menu"`, `aria-label` on mobile toggle.

### Footer (`components/Footer.js`)

- **Type:** `"use client"` (newsletter state)
- **Background:** `#10111a`
- **Position:** `relative` (required so `FooterWatermark` absolute inset-0 clips to footer bounds)
- **Overflow:** `hidden` (safety net — prevents any horizontal scroll from the large watermark text)
- **Padding:** `52px 0 0`
- **Layout:** `.footer-grid` — 4 columns at `1.4fr 1fr 1fr 1fr`, 2 cols at ≤900px (first col spans 2), 1 col at ≤500px
- **Content wrapper z-index:** `10` — sits above `FooterWatermark` (z-0)
- **Column 1 — Brand:** Logo in white rounded box (bg #fff, radius 10px, padding 6px 12px, img height 34px), tagline "Rise Higher. Go Further.", short description, social icons (Instagram, LinkedIn, Facebook visible; YouTube and Twitter hidden because SOCIAL[key] is "")
- **Column 2 — Quick Links:** Home, About, Services, Portfolio, Blog, Pricing, Contact
- **Column 3 — Services:** All 7 services with links from SERVICES array
- **Column 4 — Contact + Newsletter:** Address, email link, phone link, hours "Mon – Sat, 10 AM – 7 PM IST", newsletter form
- **Newsletter form:** Email input + "Subscribe" button. Client-side validation: regex `/^\S+@\S+\.\S+$/`. Success: "Subscribed! We'll be in touch." Error: "Enter a valid email address." No API call — frontend only.
- **Social icons:** 34×34px circles. Hidden if `SOCIAL[key]` is empty string. Hover: gradient `linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)` (brand orange — no pink).
- **Subscribe button:** `linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)`, navy `#0C1323` text (matches logo dark navy).
- **Footer link hover color:** `#FC6E04` (logo orange — updated from old `#FF6B01`).
- **Bottom bar:** "© {year} LiftSky24. All rights reserved." | Privacy Policy → `/privacy-policy` | Terms & Conditions → `/terms`
- **Tagline shown in footer:** "Rise Higher. Go Further."

### FooterWatermark (`components/FooterWatermark.js`)

- **Type:** `"use client"` — uses Framer Motion and `useReducedMotion()`
- **Purpose:** Single large decorative "LiftSky24" text centered behind the entire footer (replaces 3 small per-column watermarks)
- **Accessibility:** `aria-hidden="true"`, `pointer-events-none`, `select-none`, `tabIndex` not set — completely invisible to screen readers
- **Structure:** Outer `div` with `pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none` → `motion.span` inside
- **Text source:** `BRAND.name` from `@/data/site-config` ("LiftSky24")
- **Font:** Inter Black (weight 900) — the only heading-weight font currently loaded
- **Tilt:** `WATERMARK_TILT = 0` — constant at top of file, easy to change
- **Colour:** Text fill: `text-transparent` with soft vertical orange fade via `bg-gradient-to-b from-[rgba(252,110,4,0.10)] to-transparent bg-clip-text`. Outline: `-webkit-text-stroke` — `1px rgba(252,110,4,0.30)` mobile / `1.5px rgba(252,110,4,0.28)` tablet+. No pink.
- **Responsive sizing (Tailwind arbitrary values with `length:` hint):**

  | Breakpoint | Classes | Target width |
  |---|---|---|
  | Mobile `<640px` | `text-[length:28vw]`, two stacked lines: "Lift" / "Sky24" | ≈ 82% vw |
  | Tablet `640–1023px` | `sm:text-[length:17vw]`, one line | ≈ 86% vw at 768px |
  | Desktop `1024px+` | `lg:text-[length:min(15vw,19rem)]`, one line | ≈ 76–78% at 1280–1440px; capped at 19rem ≥ 1920px |

- **Mobile layout:** Two `<span className="block">` children inside the `motion.span` — "Lift" and "Sky24" — hidden on `sm+`. Single-line span is `hidden sm:block`.
- **Entrance animation:** `opacity: 0→1`, `scale: 0.96→1`, `duration: 0.9s`, `ease: [0.16,1,0.3,1]`, `whileInView`, `viewport: {once:true, margin:"-80px"}`. With `prefers-reduced-motion`: static, no animation.
- **Float animation:** `y: [0, -12, 0]`, `duration: 6s`, `easeInOut`, `repeat: Infinity`. Disabled with `useReducedMotion()`.
- **Does not affect footer height** — absolutely positioned, zero impact on layout.

### WhatsApp FAB (`components/WhatsAppFAB.js`)

- **Type:** `"use client"`
- **Position:** Fixed, bottom: 24px, right: 24px, z-index: 60
- **Size:** 56×56px circle
- **Background:** `#25d366` (WhatsApp green)
- **Icon:** Inline SVG WhatsApp path, 28×28px, fill #fff
- **Link:** `https://wa.me/918875796652` (from `CONTACT.whatsapp`)
- **Renders nothing** if `CONTACT.whatsapp` is empty
- **Hover:** `scale(1.08)`, stronger green shadow

### PageHero (`components/PageHero.js`)

- **Type:** Server component
- **Used on:** About, Services (hub), all 7 service detail pages, Portfolio, Industries, Pricing, Blog, Contact — and also on Home as the "About snippet" section
- **Background:** `radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%)` (inline style)
- **Layout:** 2-column grid on `lg`, 1 col below; `py-14 lg:py-20`
- **Props:** `title`, `accent`, `sub`, `image`, `alt`, `ctas[]`, `badges[]`, `stats[]`, `eyebrow`
- **Eyebrow:** `<p className="text-sm font-semibold text-brand">`
- **H1:** `text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-navy-900`. Accent span: `bg-brand-gradient bg-clip-text text-transparent`
- **Animations:** `Reveal` (Framer Motion whileInView) on H1 (y:20, delay:0), sub (delay:0.1), CTAs (delay:0.2). `ParallaxImage` on right image (scrollY 0→500 maps to y 0→40px).
- **Image:** `next/image`, width=640, height=460, `priority`, `rounded-3xl shadow-card`
- **Stats:** Up to 3; uses `Counter` component (animated 0→value over 1.6s)
- **CTAs:** First CTA = `Button variant="primary"`, second = `Button variant="outline"`

### HeroBanner (`components/HeroBanner.js`)

- **Type:** `"use client"`
- **Used on:** Home page only (first section)
- **Eyebrow:** "Rise Higher. Go Further." (from `BRAND.tagline`) — `rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-bold tracking-wide text-brand uppercase` with animated pulse dot
- **H1:** "Websites, Apps & Digital Growth / That Take Your Business Higher." — second line has `.gradient-text` class
- **Sub paragraph:** "We build fast websites, mobile apps, custom software and run SEO, social media and digital marketing campaigns — everything a growing business needs, in one team."
- **Trust checks (3):** "No hidden fees", "You own the source code", "24h response time" — `CheckCircle` icon (emerald-500) + text-xs text-slate-500
- **CTAs:** "Get a Free Quote" (`btn-dark-pill`) → `/contact`; "View Our Services" (`btn-light-pill`) → `/services`
- **Stats strip:** 4 stat cards in `grid-cols-2 sm:grid-cols-4`, each shows `Counter` with value from `STATS`
- **Image:** `/images/home_hero.png`, `fill`, `priority`, aspect-ratio `1000/680`, max-width 600px, `mix-blend-multiply`, edge-fade CSS mask
- **Animations:** All via Framer Motion `initial/animate` (not whileInView): eyebrow delay:0, H1 delay:0.1, sub delay:0.22, trust delay:0.3, CTAs delay:0.38, stats delay:0.5. Duration: 0.55s on all. Respects `useReducedMotion()`.

### Sections (`components/Sections.js`) — Exported Functions

**`Section`** — wrapper
- Props: `title`, `sub`, `children`, `tone="white"|"soft"`, `id`, `center=false`
- `tone="soft"` adds `bg-slate-50/70`
- Title: `h2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-900`, wrapped in `Reveal`

**`IconCards`** — staggered icon+title+description cards
- Props: `items[]` (each has `icon`, `t`, `d`, `href`), `cols`
- Default: `lg:grid-cols-3`; card is Link if `href` exists
- Card hover: `hover:-translate-y-1 hover:border-brand/30 hover:shadow-card`
- Icon box: `h-12 w-12 rounded-xl bg-brand-light text-brand`, on hover: `bg-brand-gradient text-white`
- Uses `Stagger` + `StaggerItem`

**`MiniCards`** — centered icon+title cards
- Default: `md:grid-cols-4`; cols override available
- Hover: `hover:-translate-y-1 hover:shadow-card`

**`Steps`** — numbered process steps
- Auto-detects 5 items → `lg:grid-cols-5`, else `lg:grid-cols-4`
- Number bubble: `h-9 w-9 rounded-full bg-brand-gradient text-sm font-bold text-white`

**`TechGrid`** — tech stack tiles
- 6 cycling hue classes: `indigo`, `violet`, `fuchsia`, `sky`, `emerald`, `amber`
- `h-24` tiles, first-letter initial badge

**`CTABand`** — full-width dark CTA strip
- Props: `title`, `sub`, `button="Get a Free Quote"`, `href="/contact"`
- Background (inline style): `radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b`
- Uses `Reveal` (Framer whileInView)
- Button: `Button variant="light"` (white background)

**`CheckList`** — white text checklist for dark backgrounds
- `emerald-400/20` icon background, `text-emerald-300` check icon

### ServicesShowcase (`components/Servicesshowcase.jsx`)

- **Type:** `"use client"`
- **Used on:** Home page (section 3 — main services showcase)
- **Section background:** `#F8F7F4` (warm cream — matches site background)
- **Section ID:** `id="services"`
- **H2:** "Our Services" — `clamp(2rem,5vw,3.5rem)`, `font-extrabold`, `tracking-tight`, `#171717`
- **Sub:** "We build digital solutions that drive real business results." — `text-base sm:text-lg`, `#6B6B70`
- **Data source:** Service content (title, text, tags, Icon, href) defined inline in the component. Images pulled from `IMG.services[slug]` in `data/images.js` so each can be swapped with one edit.
- **DOM structure:** ONE list of 7 buttons + ONE image stage (no duplicate markup, no accordion). Desktop and mobile share the same elements, CSS order utilities switch the visual arrangement.

#### Desktop layout (≥1024px)
- Two-column grid `lg:grid-cols-[5fr_6fr]`, `items-stretch` — list height equals stage height exactly. No fixed stage height (`h-[440px]` etc. removed); stage uses `flex-1 min-h-[28rem]`.
- List items: `min-h-[64px] py-3 gap-1.5` — consistent height so total never shifts.
- Inactive item: transparent bg, muted text, soft orange icon box. Hover (pointer:hover only): `bg-white/60 translateX(4px)`. Active: white card, 1px `rgba(252,110,4,0.30)` border, orange shadow, orange gradient icon box, navy title, chevron.
- Hover-intent delay: 80ms (`setTimeout`) — mouse moving across list does not flicker. Mouse leaving the list cancels the pending switch and keeps last active.
- Right stage: `overflow-hidden rounded-3xl`, 7 `next/image` (fill, object-cover) stacked and cross-faded via `opacity 0.5s`. First image `loading="eager"`, rest `loading="lazy"`. `sizes="(min-width:1024px) 50vw, 100vw"`. Subtle zoom: `scale(1.06) → scale(1)` over 0.7s on active image, disabled with `prefers-reduced-motion`.
- Info panel: sits BELOW the image in normal flow (`rounded-2xl border bg-white/90 backdrop-blur-xl p-5`). Contains: title (navy, bold), description (muted), tags (orange soft pill), "Learn more ↗" CTA (orange gradient pill → service detail page). Panel re-mounts by `key={slug}` to replay `@keyframes rise` (0.6s) on each change.

#### Mobile/tablet layout (<1024px)
- Single column. Image stage at top (`order-1`), info panel below image, tab list at bottom (`order-2`). No accordion expand/collapse inside the list.
- Image: `aspect-[16/10]` (≥640px: `aspect-[16/9]`), `max-h-[420px]`, `rounded-2xl`.
- Tap any tab → image cross-fades + info panel updates. Active tab styled same as desktop.
- Scroll-into-view: after tap, if stage is not fully visible, `stageRef.current.scrollIntoView({ behavior:"smooth", block:"start" })`. Disabled with `prefers-reduced-motion`. `scroll-mt-24` prevents header overlap.
- Tap targets: `min-h-[64px]` (≥48px).

#### Accessibility (ARIA tabs pattern)
- List wrapper: `role="tablist" aria-orientation="vertical"`
- Each item: `<button role="tab" id="svc-tab-{slug}" aria-selected aria-controls="svc-panel-{slug}" tabIndex={active?0:-1}>` (roving tabindex)
- Panel: `role="tabpanel" id="svc-panel-{slug}" aria-labelledby="svc-tab-{slug}"`
- Keyboard: `ArrowDown/Up` move + activate, `Home/End` jump to first/last, `Enter/Space` activate
- Focus ring: `outline: 2px solid #171717; outline-offset: 3px`
- Active image: descriptive alt from `data/images.js`. Inactive images: `alt="" aria-hidden`
- `prefers-reduced-motion`: no zoom, no rise animation, instant cross-fade (`transition:none`)

### FAQ (`components/FAQ.js`)

- **Type:** `"use client"`
- **Data:** Uses `FAQS` from `data/site-config.js` by default; accepts `items` prop for overrides
- **Accepts `title` prop** (default: "Frequently Asked Questions")
- **Accordion:** Single-open, `-1` = all closed. First item open by default (`useState(0)`)
- **Animation:** `AnimatePresence` + `motion.div` height+opacity: initial `{height:0, opacity:0}`, animate `{height:"auto", opacity:1}`, duration: 0.25s
- **Icon:** `Plus` (lucide-react, size 18), rotates to 45° when open (inline style transform)
- **ARIA:** `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` — proper accordion pattern
- **Used on:** Home page (global FAQs), Pricing page (global FAQs with title prop), each service detail page (service-specific FAQs)

### Testimonials (`components/Testimonials.js`)

- **Type:** `"use client"`
- **Data:** `TESTIMONIALS` from `data/site-config.js` (4 placeholder entries — TODO replace)
- **Auto-advance:** `setInterval` every 7000ms
- **Animation:** `AnimatePresence mode="wait"`, `motion.figure`: initial `{opacity:0, x:30}`, animate `{opacity:1, x:0}`, exit `{opacity:0, x:-30}`, duration 0.3s
- **Section bg:** `bg-slate-50/70`
- **Avatar:** First initial letter in `bg-brand-gradient` circle (48×48px)
- **Controls:** Previous/Next chevron buttons + dot indicators
- **Dot indicators:** Active = `w-6 bg-brand`, inactive = `w-2 bg-slate-300`
- **ARIA:** `aria-live="polite"`, `aria-atomic="true"`, `role="tablist"`, `aria-selected` on dots

### PricingTable (`components/PricingTable.js`)

- **Type:** `"use client"`
- **Data:** `PRICING` from `data/site-config.js` (3 plans)
- **Grid:** `sm:grid-cols-2 lg:grid-cols-3`, uses `Stagger` + `StaggerItem`
- **Popular card:** `border-2 border-brand`, `bg-gradient-to-b from-brand-light to-white`, "Most Popular" badge absolute -top-3.5
- **Non-popular card:** `border border-slate-100 bg-white`
- **Price display:** "Starting from" label + price (or "Custom" text)
- **Hover:** `framer-motion whileHover: {y: -6}`, duration 0.25s
- **CTA:** Popular → `bg-brand-gradient text-white`; non-popular → `border border-brand/30 bg-white text-brand`
- All CTAs link to `/contact`

### ProjectGrid (`components/ProjectGrid.js`)

- **Type:** `"use client"`
- **Data:** `PORTFOLIO` from `data/site-config.js` — currently empty `[]`
- **Empty state (current behavior):** Shows `FolderOpen` icon, "Our case studies are on the way", sub-text, "Start your project" → `/contact`
- **When projects exist:** Shows filterable grid with categories "All", "Web Apps", "Mobile Apps", "Software", "Design"
- **Animation when projects exist:** `AnimatePresence mode="popLayout"`, `motion.li` scale 0.94→1, duration 0.3s
- **Props:** `filters=false` (show category tabs), `limit` (slice), `cols="lg:grid-cols-3"`

### ContactForm (`components/ContactForm.js`)

- **Type:** `"use client"`
- **Fields:** Name (text, `autoComplete="name"`), Email (email, `autoComplete="email"`), Project Details (textarea, 4 rows)
- **Validation:** Name ≥ 2 chars, email regex, details ≥ 10 chars
- **Submission:** POST to `/api/contact` with JSON body `{name, email, details}`
- **States:** `idle` → `sending` (Loader2 spinner) → `success` | `error`
- **Success:** Shows success card with CheckCircle2, "Message Received!", "Send another message" button
- **Error:** Red alert with server error message
- **Submit button:** `bg-brand-gradient`, disabled during sending

### AboutHero (`components/AboutHero.jsx`)

- **Type:** `"use client"`
- **Used on:** About page only (first section, before PageHero)
- **Background:** `bg-gradient-to-br from-white via-[#F8F6FF] to-[#EEE9FF]`
- **Font:** Plus Jakarta Sans (body) + Caveat (handwritten note)
- **H1:** Animated word-by-word clip animation. "We're More Than Just a Tech Company" — "Tech Company" has animated gradient sheen (indigo→violet→fuchsia→violet→indigo)
- **Stats (hardcoded, separate from STATS config):** 500+ Happy Clients, 120+ Projects Completed, 5+ Years Experience. Uses local `Count` component (IntersectionObserver + rAF)
- **Values list:** "Built on Innovation", "Driven by Quality", "Focused on Your Success"
- **Image:** `/images/about.png`, aspect-ratio 2/1, object-cover, `object-[62%_50%]`, with same edge-fade mask as hero
- **Handwritten note:** `SHOW_NOTE = true` — "Great People / Build Great / Products" with SVG arrow in Caveat font, indigo-600, `-rotate-[8deg]`
- **Decorative orbs:** violet-300/40 and sky-300/40 blurred circles
- **Animations:** 7 local keyframes: `ah-fade`, `ah-up`, `ah-sheen`, `ah-reveal`, `ah-drift`, `ah-draw`, `ah-line` — all defined in inline `<style>` tag. All disabled under `prefers-reduced-motion`.

### Breadcrumbs (`components/Breadcrumbs.js`)

- **Type:** Server component
- **Auto-prepends "Home" → "/" to the items array**
- **Renders:** `BreadcrumbList` JSON-LD schema inline + `<nav aria-label="Breadcrumb">` with `ChevronRight` separators
- **Styles:** `.breadcrumb` class (flex, gap 6px, font-size 12px, color var(--muted))
- **Current page:** `aria-current="page"`, color `var(--ink)` (no link)
- **Used on:** All 3 blog post pages

### ServiceDetailPage (`components/ServiceDetailPage.js`)

- **Type:** Server component (shared template for all 7 service detail pages)
- **Sections rendered in order:**
  1. `PageHero` — title: service name, accent: `detail.headline`, sub: `detail.overview`, image from `IMAGES.services[slug]`, eyebrow: "Services", CTAs: "Get a Free Quote" + "All Services"
  2. `Section "What's Included"` — checklist grid `sm:grid-cols-2 lg:grid-cols-3`, each item has `Check` icon (emerald-500), border card
  3. `Section "Tools & Technologies"` — `TechGrid`, tone="soft"
  4. `Section "Our Process"` — `Steps`
  5. `Section "Deliverables"` — pill tags with `bg-brand-light text-brand border-brand/20`
  6. `FAQ` — service-specific questions (from `serviceDetails[slug].faqs`)
  7. `Section "Related Services"` — `IconCards` with 3 related services, tone="soft"
  8. `CTABand` — "Ready to get started with {service name}?"

---

## 7. Pages

### Home (`/`) — `app/page.js`

**Metadata:**
- Title: `LiftSky24 | Website, App, SEO & Digital Marketing Agency in Jaipur`
- Description: `LiftSky24 — website development, app development, software, SEO, social media management, graphic design and digital marketing for startups and growing businesses in Jaipur, India.`
- Canonical: `https://www.liftsky24.com/`

**Section order:**

| # | Section | Component | Layout |
|---|---|---|---|
| 1 | Hero | `HeroBanner` | 2-col grid (lg), cream wash bg |
| 2 | About snippet | `PageHero` | 2-col grid (lg), cream wash bg |
| 3 | Services (tabbed) | `ServicesShowcase` | Accordion (mobile) / 2-col stage (desktop), `#F5F6FC` bg |
| 4 | Why Choose Us | `Section` + `MiniCards` + brand gradient box | `lg:grid-cols-[1fr_22rem]`, soft bg |
| 5 | How We Work | `Section` + `ProcessRoadmap` | Winding road — wave (xl), zigzag (sm-xl), mobile left-side. Three.js layer on xl desktop. |
| 6 | Featured Projects | `Section` + `ProjectGrid` | Currently shows empty state, soft bg |
| 7 | Testimonials | `Testimonials` | Centered max-w-4xl, `bg-slate-50/70` |
| 8 | Pricing preview | `Section` + `PricingTable` + link | 3-col grid (lg), white bg, centered |
| 9 | FAQ | `FAQ` | max-w-3xl, white bg |
| 10 | Final CTA | `CTABand` | Full-width dark gradient |

**Section 2 (About snippet) exact content:**
- Eyebrow: "Rise Higher. Go Further."
- H1: "We're More Than Just a **Tech Company**" (accent in purple→pink gradient)
- Sub: "LiftSky24 started as a small team of freelancers who kept getting asked the same question: 'Can you also handle our marketing?' We could — and we did. Today we're a full-service digital team: developers, designers and marketers who work together on every project, not in separate silos. We work directly with founders, marketing heads and small business owners who want real results without agency jargon."
- Image: `/images/team.svg`, alt: "LiftSky24 team working together on digital projects"
- CTAs: "Meet the Team" → `/about`; "Get a Free Quote" → `/contact`

**Section 4 (Why Choose Us) — brand gradient CTA box:**
- "Ready to Start Your Project?" (bold)
- "Talk to the team today — free call, no commitment."
- Button: "Get a Free Quote" → `/contact`
- Small text: "Or message us on WhatsApp for a quick response."

**Section 5 (Process) exact content:**
- H2: "How We Work"
- Sub: "A clear, five-step process. No surprises."
- Component: `ProcessRoadmap` (winding road — see component docs below)
- Steps: Discuss, Design, Develop, Deliver, Support (5 steps from `PROCESS`)

**Section 6 (Projects):**
- H2: "Featured Projects"
- Limit: 6, cols: `lg:grid-cols-3`
- Currently shows empty state: "Our case studies are on the way"
- Link: "View All Projects →" → `/portfolio`

**Section 8 (Pricing) exact content:**
- H2: "Simple, Transparent Pricing"
- Sub: "Starting prices — every project is scoped before work begins."
- Link: "See full pricing details →" → `/pricing`

**Section 9 (FAQ):** Uses global `FAQS` array (8 questions — see Section 8 of this doc)

**Section 10 (CTA):**
- Title: "Ready to Build Something Great?"
- Sub: "Tell us about your project — we'll get back within 24 hours with a free consultation."
- Button: "Get a Free Quote" → `/contact`

---

### About (`/about`) — `app/about/page.js`

**Metadata:**
- Title: `About Us | LiftSky24`
- Description: `LiftSky24 is a Jaipur-based digital agency — a team of developers, designers and marketers who work directly with founders and businesses to build and grow their online presence.`

**Section order:**

| # | Section | Component |
|---|---|---|
| 1 | About hero (animated) | `AboutHero` |
| 2 | About snippet with stats | `PageHero` |
| 3 | Mission & Vision | `Section` + `IconCards` |
| 4 | Values | `Section` + `MiniCards`, tone="soft" |
| 5 | Meet the Team | `Section` + `Stagger` of team cards |
| 6 | CTA | `CTABand` |

**Section 2 (PageHero) exact content:**
- Eyebrow: "Rise Higher. Go Further."
- H1: "About **We Build. We Design. We Grow.**"
- Sub: "LiftSky24 started as a small group of freelancers in Jaipur who kept getting asked the same thing: 'Can you handle our marketing too?' We could — and we did. Today we're a full-service team of developers, designers and digital marketers who work together on every project. No silos, no handoff chaos. Just one team that cares about your results."
- Stats: 5+ Years Experience, 30+ Projects Delivered, 7 Core Services, 24h Response Time
- CTA: "Work With Us" → `/contact`
- Image: `/images/team.svg`

**Mission & Vision cards:**
- Target icon + "Our Mission": "To deliver innovative digital solutions that drive measurable growth and lasting value for every client we work with."
- Eye icon + "Our Vision": "To be a trusted digital partner for startups, local businesses and growing brands across India."

**Values cards (4):**
- Lightbulb + "Innovation": "We stay ahead so you don't have to."
- ShieldCheck + "Integrity": "Honest quotes, honest timelines."
- Users + "Collaboration": "Your team + our team, one goal."
- Heart + "Customer First": "Your success is our success."

**Team members (5):**
| Name | Role |
|---|---|
| Amit S. | Founder & CEO |
| Priya K. | Lead Developer |
| Rahul V. | Design Lead |
| Neha G. | Digital Marketing |
| Sandeep Y. | Project Manager |

**CTA:**
- Title: "Let's Build Something Together"
- Sub: "Whether you have a brief or just an idea — get in touch for a free call."
- Button: "Start the Conversation" → `/contact`

---

### Services Hub (`/services`) — `app/services/page.js`

**Metadata:**
- Title: `Our Services | LiftSky24`
- Description: `LiftSky24 offers 7 digital services: website development, app development, software development, social media management, SEO, graphic design and digital marketing in Jaipur.`

**PageHero:** Eyebrow: "7 Core Services" | H1: "Our Services **Everything Your Business Needs to Grow Online**" | Sub: "From your first website to a full digital strategy — we offer website development, app development, software, SEO, social media management, graphic design and digital marketing under one roof." | CTAs: "Get a Free Quote", "View Pricing" | Image: `/images/hero.svg`

**Layout used:** `IconCards` (icon cards grid) — this is the "icon cards grid with feature tags" layout as specified. Cols: `lg:grid-cols-3 sm:grid-cols-2`. Each card is a link to its service detail page.

**Section 2:** "How We Work" (tone="soft") — `ProcessRoadmap` with 5 process steps (winding road)

**CTA:** "Not Sure Which Service You Need?" / "Tell us about your goal — we'll recommend the right approach. Free, no-commitment call."

---

### Service Detail Pages (7 pages) — `app/services/[slug]/page.js`

All 7 pages use `ServiceDetailPage` component. Template documented in Section 6 above.

**Per-service metadata titles and descriptions:**

| Service | Meta Title | Meta Description |
|---|---|---|
| Website Development | `Website Development \| LiftSky24` | "Website development company in Jaipur — LiftSky24 builds fast, SEO-ready, responsive websites and web applications for startups and growing businesses." |
| App Development | `App Development \| LiftSky24` | "Professional iOS and Android app development services in Jaipur — LiftSky24 builds cross-platform and native mobile apps for startups and growing businesses." |
| Software Development | `Software Development \| LiftSky24` | "Custom software development in Jaipur — LiftSky24 builds CRMs, ERPs, portals and automation tools tailored to your business workflow." |
| Social Media Management | `Social Media Management \| LiftSky24` | "Social media management services in Jaipur — LiftSky24 handles content creation, scheduling and community management for Instagram, Facebook and LinkedIn." |
| SEO | `Search Engine Optimization (SEO) \| LiftSky24` | "SEO services in Jaipur — LiftSky24 improves your Google rankings with technical SEO, on-page optimisation and content strategy for local and national businesses." |
| Graphic Design | `Graphic Design \| LiftSky24` | "Graphic design and branding services in Jaipur — LiftSky24 creates logos, brand identities, social media creatives and marketing materials." |
| Digital Marketing | `Digital Marketing \| LiftSky24` | "Digital marketing agency in Jaipur — LiftSky24 runs paid ads, email campaigns and content strategy to grow your brand and generate leads." |

**Service detail data** (all from `lib/data.js` → `serviceDetails`):

Each service has: `headline`, `overview`, `included[]`, `tools[]`, `process[]`, `deliverables[]`, `faqs[]`, `relatedServices[]`

Full detail is in `lib/data.js` — `serviceDetails` export.

---

### Portfolio (`/portfolio`) — `app/portfolio/page.js`

**Metadata:** Title: `Portfolio | LiftSky24` | Description: "Explore projects by LiftSky24..."

**PageHero:** Eyebrow: "Selected Work" | H1: "Our Portfolio **Ideas to Impact**" | Sub: "We document our work carefully. Case studies are coming — in the meantime, get in touch to see examples relevant to your industry." | CTA: "Start Your Project" | Image: `/images/hero.svg`

**Section:** "Selected Work" — `ProjectGrid filters` — currently shows **empty state**: FolderOpen icon, "Our case studies are on the way", "We're documenting our recent work. Check back soon — or start your own project with us today.", "Start your project" → `/contact`

**CTA:** "Have a Project in Mind?" / "We'd love to hear about it. Let's build something great together."

---

### Industries (`/industries`) — `app/industries/page.js`

**Metadata:** Title: `Industries We Serve | LiftSky24`

**PageHero:** Eyebrow: "Sector Expertise" | H1: "Industries We Serve **Tailored Solutions for Every Sector**" | Sub: "We've worked across healthcare, education, retail and more..." | Image: `/images/industries.svg`

**Section 1:** "Where We Work" — `IconCards` `lg:grid-cols-4` — 8 industries

**Section 2:** Dark panel (inline style dark gradient) — "Why Industry-Focused Development?" + `CheckList` of 4 points

**Section 3:** "Services We Offer" (tone="soft") — `IconCards` `lg:grid-cols-3 sm:grid-cols-2` — 7 services

**CTA:** "Let's Build Your Industry Solution" / "Tell us your industry and challenge — we'll suggest the right approach." / button: "Talk to Us"

---

### Pricing (`/pricing`) — `app/pricing/page.js`

**Metadata:** Title: `Pricing | LiftSky24`

**PageHero:** Eyebrow: "No hidden fees" | H1: "Simple, Transparent **Pricing**" | Sub: "Every project starts with a clear scope and a fixed quote..." | Image: `/images/pricing.svg`

**Section:** "Choose Your Plan" (center, tone="soft") — `PricingTable`; sub: "Starting prices — final cost depends on your scope. All quotes are free."

**FAQ section:** Title: "Pricing & Payment FAQs" — uses global FAQS

**CTA:** "Need a Custom Quote?" / "Tell us what you're building — we'll scope it for free and send a detailed breakdown." / button: "Get a Free Quote"

---

### Blog (`/blog`) — `app/blog/page.js`

**Metadata:** Title: `Blog & Resources | LiftSky24`

**PageHero:** Eyebrow: "From the LiftSky24 team" | H1: "Blog & Resources **Practical Digital Insights**" | Sub: "Plain-language guides on websites, SEO, apps, social media and digital marketing — written for business owners, not developers." | Image: `/images/hero.svg`

**Section:** "Latest Articles" — `Stagger` grid `sm:grid-cols-2 lg:grid-cols-3`, each card uses `.blog-card` class. Thumbnail area shows category label (because actual images don't exist). Cards link to `/blog/[slug]`.

---

### Blog Post 1 (`/blog/website-cost-india-2025`)

**Meta title:** "How Much Does a Business Website Cost in India? | LiftSky24"
**Meta description:** "A practical breakdown of website costs in India — what affects pricing, what to expect at each budget level, and how to avoid overpaying for your next website."
**Category:** Website Development | Date: 15 October 2025 | Read: 5 min
**Structure:** Breadcrumbs, H1, date/author line, 5 H2 sections, pricing table, CTA band
**CTA:** "Ready to Build Your Website?" / "Get a clear, itemised quote — free, with no obligation."

---

### Blog Post 2 (`/blog/website-speed-seo`)

**Meta title:** "Why Website Speed Matters for SEO (and How to Fix It) | LiftSky24"
**Meta description:** "Google uses page speed as a ranking factor. A slow website costs you traffic and conversions. Here are the most impactful fixes — explained in plain language."
**Category:** SEO | Date: 1 October 2025 | Read: 4 min
**CTA:** "Is Your Website Slow?" / "We'll audit it for free and tell you exactly what to fix." / button: "Get a Free Audit"

---

### Blog Post 3 (`/blog/social-media-vs-digital-marketing`)

**Meta title:** "Social Media Management vs Digital Marketing: What's the Difference? | LiftSky24"
**Meta description:** "Many business owners use these terms interchangeably — but they're not the same thing. Here's what each covers and which one your business actually needs right now."
**Category:** Digital Marketing | Date: 20 September 2025 | Read: 5 min
**CTA:** "Not Sure Where to Start?" / "We'll help you figure out the right digital strategy for your business — free call, no jargon."

---

### Contact (`/contact`) — `app/contact/page.js`

**Metadata:** Title: `Contact Us | LiftSky24`

**PageHero:** H1: "Let's Build Something **Great Together**" | Sub: "Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you soon." | Image: `/images/hero.svg`

**Section 1:** Grid `lg:grid-cols-[1fr_1.2fr]`
- Left: 3 info cards (MapPin/Mail/Phone)
  - "Our Office": Flat No. 91/109, Sector 9, Mandir Marg, Patel Marg, Mansarovar, Jaipur – 302020 | sub-note: "Landmark: In front of Taxila Business School"
  - "Email Us": contact.liftsky24@gmail.com → `mailto:contact.liftsky24@gmail.com`
  - "Call Us": +91 88757 96652 → `tel:+918875796652`
- Right: `ContactForm`

**Section 2:** "Our Location" (tone="soft") — Grid `lg:grid-cols-[2fr_1fr]`
- Google Maps iframe: Taxila Business School, Mansarovar, Jaipur
- Social icons panel (Facebook, Twitter, LinkedIn, Instagram — all `href="#"` currently)
- "Mon to Sat, 10:00 AM to 7:00 PM IST. We reply to every message within one business day."
- "Get Directions ↗" link

---

### Privacy Policy (`/privacy-policy`)

**Metadata:** Title: `Privacy Policy | LiftSky24` | Last updated: 1 November 2025
**10 sections:** Who We Are, Information We Collect, How We Use, Legal Basis, Retention, Cookies, Third-Party Services, Your Rights, Security, Changes

---

### Terms & Conditions (`/terms`)

**Metadata:** Title: `Terms & Conditions | LiftSky24` | Last updated: 1 November 2025
**11 sections:** Agreement, Services, Payment, IP, Revisions, Confidentiality, Limitation, Website Use, Third-Party Links, Governing Law, Changes

---

### 404 (`/not-found.js`)

**Metadata:** Title: `Page Not Found | LiftSky24`
**Content:** "404" (text-8xl, brand color, 20% opacity), H1 "Page Not Found", sub text, 3 buttons: "Go Home" (btn-dark-pill), "Our Services" (btn-light-pill), "Contact Us" (btn-light-pill)

---

## 8. Content Data

All in `data/site-config.js`. Edit there — changes propagate everywhere.

### BRAND

```js
name:    "LiftSky24"
tagline: "Rise Higher. Go Further."
url:     "https://www.liftsky24.com"
ogImage: "/images/og-image.png"   // TODO: file doesn't exist yet
```

### CONTACT

```
email:     "contact.liftsky24@gmail.com"
phone:     "+91 88757 96652"
phoneTel:  "tel:+918875796652"
whatsapp:  "https://wa.me/918875796652"
address:
  line1:    "Flat No. 91/109, Sector 9"
  line2:    "Mandir Marg, Patel Marg, Mansarovar"
  city:     "Jaipur"
  state:    "Rajasthan"
  pin:      "302020"
  landmark: "In front of Taxila Business School"
  country:  "India"
  mapEmbed: Google Maps embed URL for Taxila Business School
hours:     "Mon – Sat, 10 AM – 7 PM IST"
```

### SOCIAL

```
instagram: "https://www.instagram.com/liftsky24"      (active — icon shows)
linkedin:  "https://www.linkedin.com/company/liftsky24" (active — icon shows)
facebook:  "https://www.facebook.com/liftsky24"        (active — icon shows)
youtube:   ""    (empty — icon hidden)
twitter:   ""    (empty — icon hidden)
```

### STATS (TODO: replace with real numbers)

| Value | Suffix | Label |
|---|---|---|
| 5 | + | Years Experience |
| 30 | + | Projects Delivered |
| 7 | (none) | Core Services |
| 24 | h | Response Time |

### TESTIMONIALS — All 4 (TODO: replace with real reviews)

| Name | Role | Avatar | Quote (verbatim) |
|---|---|---|---|
| Priya S. | Owner, local retail store | P | "LiftSky24 delivered our website exactly on time. The team communicated every step of the way — no surprises. Our customers love how fast it loads." |
| Arjun M. | Founder, early-stage startup | A | "We needed a mobile app quickly and within budget. They scoped it honestly, kept to the quote and we got our first leads in the first month after launch." |
| Kavita R. | Marketing Head, coaching institute | K | "Our Google rankings improved noticeably after the SEO work. The team explained what they were doing in plain language — not jargon." |
| Rohit T. | Co-founder, e-commerce brand | R | "The social media creatives they produce are consistent and on-brand. It used to take us hours; now it's handled every week without us chasing anyone." |

### FAQs — All 8 (verbatim Q&A)

1. **Q:** How long does it take to build a website?
   **A:** A standard 5-10 page business website typically takes 2–4 weeks. Larger projects or e-commerce stores can take 4–8 weeks. We give you a realistic timeline in the initial call and stick to it.

2. **Q:** Do you build apps for both iOS and Android?
   **A:** Yes. We build cross-platform apps using React Native or Flutter, which run on both iOS and Android from a single codebase — keeping cost and timelines lean. We also do native apps when performance demands it.

3. **Q:** Will my website be SEO-friendly?
   **A:** Every website we build follows SEO best practices: fast load times, proper heading structure, meta tags, schema markup, mobile responsiveness and clean URLs. If you want deeper SEO work (keyword research, content, link building), that's a separate service.

4. **Q:** What happens after the project launches?
   **A:** We hand over all source code, credentials and assets — you own everything. We also offer ongoing support packages for hosting, updates and monitoring. Most clients stay on a monthly retainer.

5. **Q:** How do I get a quote?
   **A:** Fill in the contact form or message us on WhatsApp. Share a brief idea of what you need — the type of project, rough timeline and budget range. We'll get back within 24 hours with initial thoughts and schedule a free call.

6. **Q:** What are your payment terms?
   **A:** We typically work on a 50% upfront / 50% on delivery model for fixed-scope projects. For longer engagements we agree milestone-based payments. We accept UPI, bank transfer and major cards.

7. **Q:** How many revisions are included?
   **A:** The design phase includes two rounds of revisions as standard. Development changes within the agreed scope are included. Additions beyond the original scope are quoted separately and agreed before work begins.

8. **Q:** Do I own the source code?
   **A:** Yes, completely. On final payment you receive the full source code, all design files, logins and documentation. We don't hold anything back.

### PRICING — 3 Plans (TODO: set real prices)

| Name | Starting Price | Period | Popular | CTA | Features |
|---|---|---|---|---|---|
| Starter | ₹15,000 | project | No | Get Started | Up to 5 pages, Responsive design, Basic SEO setup, Contact form, 1 month post-launch support |
| Business | ₹40,000 | project | Yes | Get Started | Up to 15 pages, Custom UI/UX design, CMS integration, Advanced SEO, 3 months post-launch support, Analytics setup |
| Premium | Custom | scope | No | Talk to Us | Unlimited scope, Dedicated project team, App development included, Monthly retainer option, Priority support & SLA, All services available |

### PROCESS — 5 Steps

| # | Title | Description |
|---|---|---|
| 01 | Discuss | We start with a free call to understand your goals, audience and timeline. |
| 02 | Design | Wireframes, brand direction and prototypes — reviewed and approved by you. |
| 03 | Develop | Clean, tested code built with modern tools and best practices. |
| 04 | Deliver | We launch, hand over assets and brief your team. You own everything. |
| 05 | Support | Ongoing maintenance, updates and monitoring — as little or as much as you need. |

### WHY CHOOSE US — 6 Points

| Icon | Title | Description |
|---|---|---|
| MessageCircle | Direct Communication | Talk to the developers directly — on WhatsApp, calls or email. No middlemen. |
| FileText | Fixed, Transparent Quotes | You get a clear breakdown before work starts. No surprise invoices. |
| RefreshCw | Free Revision Rounds | We iterate until you're happy. Revisions are included, not extras. |
| Zap | Fast, SEO-Ready Builds | Every site ships optimised for speed and search — not as an afterthought. |
| Headphones | Post-Launch Support | We don't disappear after go-live. Ongoing support is part of the deal. |
| Layers | One Team for Everything | Dev, design and marketing under one roof. No handoff chaos. |

### INDUSTRIES — 8 Sectors

Healthcare (HeartPulse), Education (GraduationCap), E-Commerce (ShoppingCart), Finance (Landmark), Real Estate (Building2), Travel & Hospitality (Plane), Manufacturing (Factory), Logistics (Truck)

### BLOG POSTS — 3 Articles

| Slug | Title | Category | Date | Read |
|---|---|---|---|---|
| `website-cost-india-2025` | How Much Does a Business Website Cost in India? | Website Development | 2025-10-15 | 5 min |
| `website-speed-seo` | Why Website Speed Matters for SEO (and How to Fix It) | SEO | 2025-10-01 | 4 min |
| `social-media-vs-digital-marketing` | Social Media Management vs Digital Marketing: What's the Difference? | Digital Marketing | 2025-09-20 | 5 min |

### PORTFOLIO

Currently `[]` — empty. Data structure expected: `{ slug, title, category, client, year, image, summary, tags[] }`

### NAV Links

Home (/), About (/about), Services (/services) [dropdown: All Services + 7 service links], Portfolio (/portfolio), Industries (/industries), Blog (/blog), Pricing (/pricing), Contact (/contact)

---

## 9. Animations Inventory

| Page / Component | Library | Effect | Trigger | Duration | Easing | Delay | Notes |
|---|---|---|---|---|---|---|---|
| HeroBanner — eyebrow | Framer Motion | fade up y:16→0, opacity 0→1 | on mount | 0.55s | default | 0s | Disabled under `useReducedMotion()` |
| HeroBanner — H1 | Framer Motion | fade up | on mount | 0.55s | default | 0.1s | |
| HeroBanner — sub | Framer Motion | fade in | on mount | 0.55s | default | 0.22s | |
| HeroBanner — trust | Framer Motion | fade up | on mount | 0.55s | default | 0.3s | |
| HeroBanner — CTAs | Framer Motion | fade up | on mount | 0.55s | default | 0.38s | |
| HeroBanner — stats | Framer Motion | fade up | on mount | 0.55s | default | 0.5s | |
| HeroBanner — Counter | Framer Motion `animate()` | count 0→value | `useInView` once | 1.6s | easeOut | — | `Counter` in `ui.js` |
| PageHero — H1 | Framer Motion `Reveal` | fade up y:20→0 | whileInView (margin -60px) | 0.55s | easeOut | 0s | |
| PageHero — sub | Framer Motion `Reveal` | fade up | whileInView | 0.55s | easeOut | 0.1s | |
| PageHero — CTAs | Framer Motion `Reveal` | fade up | whileInView | 0.55s | easeOut | 0.2s | |
| PageHero — image | Framer Motion `ParallaxImage` | scrollY 0→500 maps y 0→40px | scroll | continuous | — | — | + initial scale 0.96→1 on mount |
| AboutHero — words | CSS (`ah-up`) | clip translateY 105%→0 | on mount | 0.9s | cubic-bezier(.2,.8,.2,1) | staggered 100–450ms | |
| AboutHero — "Tech Company" | CSS (`ah-sheen`) | bg-position 0→200% | loop | 5s | linear | — | |
| AboutHero — stats | CSS (`ah-fade`) | fade+translateY+blur | on mount | 0.9s | cubic-bezier(.2,.8,.2,1) | 800–1030ms | |
| AboutHero — Count | IntersectionObserver + rAF | count 0→value | intersects (threshold 0.4) | 1.6s | cubic ease-out | 800ms | Local component |
| AboutHero — line | CSS (`ah-line`) | scaleX 0→1 | on mount | 1s | cubic-bezier(.2,.8,.2,1) | 1100ms | |
| AboutHero — values | CSS (`ah-fade`) | fade | on mount | 0.9s | cubic-bezier(.2,.8,.2,1) | 1250ms | |
| AboutHero — orbs | CSS (`ah-drift`) | translate 26px/-20px + scale 1.1 | loop | 9s | ease-in-out | 0 / -4s | |
| AboutHero — SVG arrow | CSS (`ah-draw`) | stroke-dashoffset 1→0 | on mount | 1.1s | ease-out | 2000ms + 900ms | |
| AboutHero — note text | CSS (`ah-fade`) | fade up | on mount | 0.9s | cubic-bezier(.2,.8,.2,1) | 1500–1820ms | |
| Sections — `Reveal` | Framer Motion | fade up y:24→0, opacity 0→1 | whileInView (margin -60px, once) | 0.55s | easeOut | configurable | Default y=24 |
| Sections — `Stagger` | Framer Motion | stagger children | whileInView (margin -60px, once) | — | — | — | `staggerChildren: 0.08s` |
| Sections — `StaggerItem` | Framer Motion | y:20→0, opacity 0→1 | parent trigger | 0.45s | default | — | |
| ServicesShowcase — image zoom | CSS transition | `scale(1.06)→scale(1)` on active | active state change | 0.7s | ease-out | — | Disabled with prefers-reduced-motion |
| ServicesShowcase — info panel | CSS `@keyframes rise` | opacity 0→1, translateY 14→0 | key re-mount on slug change | 0.6s | cubic-bezier(.2,.8,.2,1) | 0 | |
| ServicesShowcase — image cross-fade | CSS transition | opacity 0↔1 | active state change | 0.5s | ease | — | All 7 stacked; instant with reduced-motion |
| FAQ — accordion | Framer Motion `AnimatePresence` | height 0→auto, opacity 0→1 | click | 0.25s | default | — | Per-item |
| Testimonials — slide | Framer Motion `AnimatePresence mode="wait"` | x:30→0, exit x→-30, opacity | auto (7s) + manual | 0.3s | default | — | |
| PricingTable — hover | Framer Motion `whileHover` | y: 0→-6 | hover | 0.25s | default | — | |
| Header — mobile drawer | Framer Motion `AnimatePresence` | height 0→auto, opacity 0→1 | button click | 0.22s | easeOut | — | |
| Header — mobile sub-menu | Framer Motion `AnimatePresence` | height 0→auto | accordion click | default | default | — | |
| ProjectGrid — card enter/exit | Framer Motion `AnimatePresence mode="popLayout"` | scale 0.94→1, opacity | filter change | 0.3s | default | — | Only when projects exist |

### Global Animation Settings

- **AOS:** Not installed — Not implemented
- **GSAP:** Not installed — Not implemented
- **Framer Motion global:** No global provider — used directly in each component
- **`prefers-reduced-motion`:**
  - `ui.js Reveal`: `useReducedMotion()` → passes `initial={false}` (no animation)
  - `HeroBanner`: `useReducedMotion()` → returns `{}` for all fade props (no animation)
  - `globals.css`: `@media (prefers-reduced-motion: reduce)` — disables all CSS animations (`animation-duration: .01ms`), sets `.reveal { opacity:1; transform:none }`
  - `AboutHero`: `.ah-root * { animation: none !important }` under reduced-motion
  - `AboutHero Count`: Checks `window.matchMedia("(prefers-reduced-motion: reduce)")` and sets final value directly

---

## 10. Images and Assets Inventory

| File | Path | Used In | Alt Text | Dimensions | Format | Size | Note |
|---|---|---|---|---|---|---|---|
| LiftSky24Logo.png | `/images/LiftSky24Logo.png` | Header (h:42px), Footer (h:34px) | "LiftSky24" | auto | PNG | 254 KB | **PRIMARY LOGO** |
| home_hero.png | `/images/home_hero.png` | HeroBanner | "LiftSky24 — websites, apps and digital growth illustration" | 1000/680 aspect | PNG | 1.6 MB | Priority, mix-blend-multiply, edge-fade mask |
| about.png | `/images/about.png` | AboutHero | "LiftSky24 team collaborating around a laptop" | 2:1 aspect | PNG | 1.8 MB | object-cover, object-[62%_50%], edge-fade mask |
| team.svg | `/images/team.svg` | PageHero on Home, About, Pricing | varies | 640×460 | SVG | 1.3 KB | Reusable illustration |
| hero.svg | `/images/hero.svg` | PageHero on Services, Portfolio, Blog, Contact, Service pages | varies | 640×460 | SVG | 1.8 KB | Reused as generic placeholder on many service pages |
| phones.svg | `/images/phones.svg` | PageHero for App Development | varies | 640×460 | SVG | 2.2 KB | |
| design.svg | `/images/design.svg` | PageHero for Graphic Design | varies | 640×460 | SVG | 1.6 KB | |
| pricing.svg | `/images/pricing.svg` | PageHero for Pricing | "LiftSky24 pricing plans illustration" | 640×460 | SVG | 1.1 KB | |
| industries.svg | `/images/industries.svg` | PageHero for Industries | "Industries served by LiftSky24" | 640×460 | SVG | 1.1 KB | |
| services/demo.png | `/images/services/demo.png` | ServicesShowcase (all 7 services) | Active image uses per-service alt from `data/images.js`; inactive images `alt="" aria-hidden` | various | PNG | 1.8 MB | Single placeholder for all service images — TODO replace |
| og-image.png | `/images/og-image.png` | OG/Twitter meta tags | `${BRAND.name} — ${title}` | 1200×630 | PNG | **FILE DOES NOT EXIST** | TODO: create this file |
| Logo.jpeg | `/images/Logo.jpeg` | Not used | — | — | JPEG | 73 KB | Old logo — not in use |
| logo.png | `/images/logo.png` | Not used | — | — | PNG | 930 KB | Old logo — not in use |
| hero-right-illustration.svg | `/images/hero-right-illustration.svg` | Not used | — | — | SVG | 12 KB | Not currently referenced |
| ai.svg (root) | `/images/ai.svg` | Not used | — | — | SVG | 1.7 KB | Old AI service illustration |
| Gemini_Generated_Image.png | `/images/Gemini_Generated_Image_1klh4o1klh4o1klh.png` | Not used | — | — | PNG | 1.1 MB | Not referenced |
| project-1 through project-8.svg | `/images/project-*.svg` | Not used | — | — | SVG | 765 bytes each | Old dummy project images |
| hero-layers/ (7 SVGs) | `/images/hero-layers/*.svg` | Not used | — | — | SVG | 3–7 KB each | Layered hero assets, not referenced |
| Blog images (3) | `/images/blog/website-cost.jpg` etc. | Blog post list page | — | — | JPG | **FILES DO NOT EXIST** | Paths defined in BLOG_POSTS config |

---

## 11. SEO

### Metadata System

- **File:** `lib/seo.js` — `meta()` helper function
- **Title pattern:** `"Page Title | LiftSky24"` (full title is `${title} | ${BRAND.name}`)
- **Description enforcement:** `.slice(0, 160)` applied automatically
- **Canonical:** Absolute URL constructed as `${BRAND.url}${path}`
- **metadataBase:** `new URL("https://www.liftsky24.com")` in `app/layout.js`
- **OG image:** `https://www.liftsky24.com/images/og-image.png`, 1200×630 (file does not yet exist)

### Per-Page Titles and Descriptions

| Page | Title | Description |
|---|---|---|
| Home | LiftSky24 \| Website, App, SEO & Digital Marketing Agency in Jaipur | LiftSky24 — website development, app development, software, SEO, social media management, graphic design and digital marketing for startups and growing businesses in Jaipur, India. |
| About | About Us \| LiftSky24 | LiftSky24 is a Jaipur-based digital agency — a team of developers, designers and marketers... |
| Services | Our Services \| LiftSky24 | LiftSky24 offers 7 digital services: website development, app development, software development, social media management, SEO, graphic design and digital marketing in Jaipur. |
| Portfolio | Portfolio \| LiftSky24 | Explore projects by LiftSky24... |
| Industries | Industries We Serve \| LiftSky24 | LiftSky24 builds digital solutions for healthcare, education, e-commerce... |
| Pricing | Pricing \| LiftSky24 | Simple, transparent pricing for website development, app development, SEO and digital marketing... |
| Blog | Blog & Resources \| LiftSky24 | Practical guides on website development, SEO, social media and digital marketing from the LiftSky24 team in Jaipur. |
| Contact | Contact Us \| LiftSky24 | Contact LiftSky24 to discuss your web, mobile or AI project. Get a free quote within one business day. |
| Privacy Policy | Privacy Policy \| LiftSky24 | How LiftSky24 collects, uses and protects your personal data. |
| Terms | Terms & Conditions \| LiftSky24 | Terms governing use of LiftSky24 services and website. |
| 404 | Page Not Found \| LiftSky24 | — |
| (All 7 service pages) | See Section 7 above | See Section 7 above |

### JSON-LD Schemas Implemented

| Schema Type | Where | Fields |
|---|---|---|
| `ProfessionalService` | `app/layout.js` (global, every page) | name, url, email, telephone, description, address (PostalAddress), hasOfferCatalog with all 7 services |
| `BreadcrumbList` | `components/Breadcrumbs.js` (inline in component) | itemListElement with position, name, item URL |
| `FAQPage` | `lib/seo.js` → `faqSchema()` helper (defined but not yet injected on pages) | mainEntity with Question + acceptedAnswer |
| `Service` | `lib/seo.js` → `serviceSchema()` helper (defined but not yet injected on service pages) | name, description, url, provider, areaServed |

> Note: `faqSchema()` and `serviceSchema()` are helper functions in `lib/seo.js` but are **not yet called anywhere** — they need to be added to the relevant page files.

### Sitemap (`app/sitemap.js`)

Auto-generated at `/sitemap.xml`. Includes:
- 10 static pages (priorities: home 1.0, contact 0.9, services 0.9, others 0.7–0.8)
- 7 service pages (priority 0.85, monthly)
- 3 blog posts (priority 0.65, monthly)
- `/privacy-policy` and `/terms` (priority 0.3, yearly)

### Robots (`app/robots.js`)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://www.liftsky24.com/sitemap.xml
Host: https://www.liftsky24.com
```

### 301 Redirects (`next.config.mjs`)

| Source | Destination | Reason |
|---|---|---|
| `/services/ai-ml` | `/services` | AI & ML service removed |
| `/services/mobile-apps` | `/services/app-development` | Route renamed |
| `/services/ui-ux-design` | `/services/graphic-design` | Service renamed |
| `/services/web-development` | `/services/website-development` | Route renamed |

### Heading Structure (per page type)

- **Every page has exactly one H1** (in HeroBanner or PageHero)
- H2 used for section titles (Section component), blog post headings, legal page sections
- H3 used for card titles, info card titles, FAQ question wrappers
- **Internal linking:** Service cards link to detail pages; Blog cards link to posts; Footer links all pages; CTABand buttons link to `/contact`; "View All Projects" links to `/portfolio`

### Alt Text Coverage

- Logo: "LiftSky24"
- home_hero.png: "LiftSky24 — websites, apps and digital growth illustration"
- about.png: "LiftSky24 team collaborating around a laptop"
- All PageHero images: descriptive alt from props
- ServicesShowcase images: `alt=""` (decorative)
- Team member avatars: `aria-hidden="true"` (initials, not meaningful images)

---

## 12. Forms, Integrations and Functionality

### Contact Form (`/contact` page)

| Field | Type | Placeholder | Validation |
|---|---|---|---|
| name | text | "Enter your name" | `trim().length >= 2` |
| email | email | "Enter your email" | `regex /^\S+@\S+\.\S+$/` |
| details | textarea (4 rows) | "Tell us about your project" | `trim().length >= 10` |

- **Submit handler:** POST to `/api/contact` with JSON `{name, email, details}`
- **Success state:** Full card replacement with CheckCircle2 icon, "Message Received!", "Send another message" resets form
- **Error state:** Red alert with message from server or "Network error..."
- **Sending state:** Button disabled, Loader2 spinner, "Sending…" text

### API Route (`app/api/contact/route.js`)

- **Method:** POST only
- **Server-side validation:** Same rules as client
- **Env var:** `GOOGLE_SHEET_WEBHOOK` — if not set, logs data and returns `{success:true, dev:true}` (form works in dev without it)
- **Payload sent to Sheets:** `{name, email, details, timestamp: ISO string, source: "liftsky24.com contact form"}`
- **Error handling:** Returns 400 (validation), 502 (Sheets error), 500 (unexpected)

### Google Sheets Integration

- **Setup file:** `/docs/google-apps-script.js`
- **Sheet name:** "LiftSky24 Contacts"
- **Columns:** Timestamp, Name, Email, Message, Source
- **Headers styled:** Bold, background `#4a4de6`, white text, frozen row

### Newsletter Form (Footer)

- **Fields:** Email only
- **Validation:** Client-side regex only
- **No API call** — frontend state only, shows "Subscribed! We'll be in touch."
- **Note:** Not connected to any email service — placeholder behavior

### WhatsApp Button

- **Link format:** `https://wa.me/918875796652`
- **Always visible** (fixed position), renders only if `CONTACT.whatsapp` is not empty

### Google Maps

- **Contact page:** iframe embed pointing to Taxila Business School, Mansarovar, Jaipur
- **"Get Directions" link:** `https://maps.app.goo.gl/TaxilaBusinessSchoolJaipur` (generic — should be updated to real share link)

### Social Icon Links in Contact Page

All 4 social icons (Facebook, Twitter, LinkedIn, Instagram) have `href="#"` — **not connected to real profiles**

---

## 13. Performance and Accessibility

### Image Optimization

- `next/image` used in: `PageHero` (width=640, height=460, priority), `ServicesShowcase` (fill, object-cover, cross-faded — migrated from `<img>` to `next/image`)
- `priority` only on hero images (HeroBanner, PageHero)
- `loading="lazy"` on non-priority images
- Remote patterns for Unsplash configured in `next.config.mjs`
- `mix-blend-multiply` on hero images for seamless blending

### Font Loading

- Inter loaded via Google Fonts `<link>` in `layout.js` (not `next/font`) — loads 6 weights (400–900)
- Bricolage Grotesque, DM Sans, Plus Jakarta Sans, Caveat loaded via `next/font/google` in their respective components — only loaded on pages that need them

### Server vs Client Components

| Component | Type | Reason |
|---|---|---|
| Header | Client | `usePathname`, scroll listener, useState for open/scrolled |
| Footer | Client | Newsletter form state |
| WhatsAppFAB | Client | (could be server, but marked client) |
| HeroBanner | Client | Framer Motion mount animations, `useReducedMotion` |
| PageHero | Server | No interactivity needed |
| AboutHero | Client | `useEffect`, IntersectionObserver, rAF counter |
| Sections (all exports) | Server | No interactivity |
| ui.js (all exports) | Client | Framer Motion hooks |
| FAQ | Client | Accordion state |
| Testimonials | Client | Auto-cycle interval, index state |
| PricingTable | Client | Framer Motion whileHover |
| ProjectGrid | Client | Filter state, Framer Motion |
| ContactForm | Client | Form state, fetch |
| ServicesShowcase | Client | Active tab state |
| ServiceDetailPage | Server | Pure layout |
| Breadcrumbs | Server | Pure layout |
| All page.js files | Server | Server components (metadata exports) |

### Accessibility Features

- Skip-to-content link in layout.js (sr-only → visible on focus, z-100)
- `:focus-visible` ring: `2px solid var(--purple)`, 3px offset, 6px radius
- `role="banner"` on header
- `aria-label="Main navigation"` on nav
- `aria-haspopup`, `aria-expanded` on dropdown trigger
- `role="menu"`, `role="menuitem"` on dropdown items
- `aria-current="page"` on active nav links
- `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` on FAQ accordion
- `aria-live="polite"`, `aria-atomic="true"` on Testimonials
- `role="tablist"`, `aria-selected` on testimonial dots
- `aria-label` on WhatsApp FAB, social icons, navigation buttons
- `aria-hidden="true"` on decorative elements
- `alt` text on all meaningful images
- `aria-invalid`, `aria-describedby` on form inputs
- `role="alert"` on error messages
- `role="status"` + `aria-live="polite"` on newsletter feedback
- Keyboard navigation: all interactive elements are focusable, dropdown opens on focus-within
- `prefers-reduced-motion` respected in all animation systems

### Lighthouse Notes

Not run (dev environment only, no production build tested for Lighthouse). Build produces 26 static pages, 0 errors. First Load JS shared: 87.1 KB.

---

## 14. Change Log

All changes made to the original demo site in this Kiro session:

### Phase 1 — Logo and Branding
- Replaced old `logo.png` with `LiftSky24Logo.png` in Header and Footer
- Fixed Footer hydration error (moved `<style>` with `>` CSS selector to `globals.css`)

### Phase 2 — Theme Change (Digital Agency Theme)
- Replaced entire old theme (navy/indigo/violet palette) with digital-agency theme
- New CSS variables: `--paper #f7f6f2`, `--ink #10111a`, `--purple #6557ff`, `--pink #ff4fa3`, `--orange #ff6338`, etc.
- Updated `tailwind.config.js` with new color tokens
- Rewrote `globals.css` with new variables, keyframes, utility classes
- Rewrote `Header.js` with new theme styling
- Rewrote `Footer.js` with new theme styling
- All page content was temporarily replaced then restored to original

### Phase 3 — Services Cleanup (7 Services Only)
- Removed Cloud Solutions, IT Consulting, AI & ML, UI/UX Design (standalone) from all data
- Added 3 new services: Software Development, Social Media Management, Graphic Design
- Updated `lib/data.js` with 7 canonical services
- Deleted old service page directories: `/services/ai-ml`, `/services/mobile-apps`, `/services/ui-ux-design`, `/services/web-development`, `/services/all-pages`
- Added 301 redirects in `next.config.mjs`
- Created 7 new service detail pages with `ServiceDetailPage` shared template
- Updated nav to include Pricing and all 7 services

### Phase 4 — Content Updates
- Created `data/site-config.js` as single source of truth
- Updated `lib/data.js` as re-export/compat layer
- Fixed `tailwind.config.js`: added `brand.DEFAULT`, `brand.light`, `brand.violet` (were missing, causing `border-brand`, `bg-brand-light`, `to-brand-violet` to silently fail)
- Fixed `CTABand` gradient: was `bg-dark-section` Tailwind class (gets purged) → changed to inline `style`
- Fixed `PageHero` and `HeroBanner` hero-wash: was `bg-hero-wash` Tailwind class → changed to inline `style`
- Fixed `@keyframes rise` missing from globals (used in ServicesShowcase)
- Removed "#1 on Google" badge in `NewServices.jsx` → replaced with "SEO-ready"
- Removed "Trusted by 500+ businesses" from HeroBanner → replaced with honest trust checks
- Replaced fake avatars (A, P, R, N) + "500+ businesses worldwide" with 4 stat cards
- Replaced fake testimonials (RetailNest, MediTrack, UrbanKey) with placeholder testimonials
- Portfolio set to empty `[]` with empty state component
- Created Privacy Policy and Terms pages (with real content)
- Created 404 (`not-found.js`)
- Added WhatsApp FAB
- Rewrote HeroBanner with tagline, honest copy
- Updated all about/contact/pricing/blog/portfolio/services/industries pages

### Phase 5 — Contact Form + Google Sheets
- Added `/api/contact/route.js` for Sheets integration
- Created `/docs/google-apps-script.js` setup guide
- Created `.env.local` with `GOOGLE_SHEET_WEBHOOK` placeholder
- Updated `ContactForm.js` to POST to API with loading/success/error states
- Updated contact page with real address (Mansarovar, Jaipur), email, phone, Google Maps embed

### Phase 6 — SEO
- Rewrote `lib/seo.js` with full OG, Twitter, canonical, robots, 160-char enforcement
- Added `ProfessionalService` JSON-LD schema to `app/layout.js`
- Added `app/sitemap.js` and `app/robots.js`
- Added `Breadcrumbs` component with `BreadcrumbList` JSON-LD
- Added helper functions: `breadcrumbSchema()`, `faqSchema()`, `serviceSchema()`
- Per-page metadata on all pages

### Phase 7 — Blog
- Created `data/site-config.js → BLOG_POSTS` with 3 starter articles
- Created 3 full blog post pages with real 400–600 word content

### Phase 8 — Legacy Cleanup
- Deleted dead components: `Services.js`, `Hero.js`, `About.js`, `Portfolio.js`, `Process.js`, `Technologies.js`, `CTA.js`
- All had `SectionHeading` import bug (not exported from ui.js)
- Created `data/images.js` as centralised image registry

### Phase 9 — Stability: Scroll Flicker, Favicon, Header
- **PageTransition:** Removed `key={pathname}` — was remounting entire page tree on every navigation, causing all animations to replay and CLS spikes.
- **SmoothScrollProvider:** Removed `AOS.refresh()` and `ScrollTrigger.refresh()` from route-change effect — was re-triggering all scroll animations on navigation.
- **ParallaxSection in PageHero:** Completely removed — `useScroll()` on every inner page caused scroll-position jumps (flicker).
- **Sections.js TiltCard:** Removed `dynamic(..., {ssr:false})` wrapper — was causing CLS (empty grid cells before hydration). Replaced with CSS hover transitions.
- **GlowOrbs:** Changed `left`/`top` animation to `transform:translate` (compositor-only — no layout thrashing).
- **Header:** Replaced Framer `useScroll` + `useMotionValueEvent` with direct DOM `classList` + `requestAnimationFrame` throttle — zero React re-renders on scroll.
- **Mobile header:** Disabled `backdrop-filter`, `transform` transition and hide-on-scroll on `pointer:coarse` devices via CSS `@media` rule.
- **Favicon:** Moved from `public/favicon.ico` (was causing 500 conflict) to `app/favicon.ico` (Next.js App Router auto-detection). Deleted `app/icon.svg` which was overriding the original ICO.

### Phase 10 — Visual Redesign (Reference: digital_agency_homepage_extreme)
- **Section backgrounds:** Applied reference section colour scheme (paper/light/dark alternation with orange accent strips).
- **Marquee:** Black background, constant speed (no scroll velocity coupling), orange `✦` separators.
- **Footer LiftSky24 watermark:** `position:absolute`, centered behind Quick Links / Services / Contact columns using `top:50%, translateY(-50%), rotate(-6deg)`. Framer `y:[0,-10,0]` bounce animation with staggered delays (0 / 0.4 / 0.8 s).
- **Testimonials:** Redesigned as 2-cards-per-slide with clean white cards, orange top-accent line, italic quote, result tag, author avatar circle. `AnimatePresence` slide animation, progress bar.
- **Industries:** Expanded to 9 categories, 50+ industries. Data in `data/pages/industries.js`.

### Phase 11 — Hero Background (Reference Design)- **Goal:** Apply reference-design animated background to home-page `HeroBanner.js` only (not `PageHero`).
- **Approach:** Pure Tailwind utilities — no inline styles, no new CSS files. Classes added as ONE literal string (not array.join) to prevent Tailwind purge.
- **Tokens added to `tailwind.config.js`:**

  | Token | Type | Value |
  |---|---|---|
  | `hero-bg-wash` | `backgroundImage` | Dual radial gradient — lavender ellipse (76% 25%) + icy-blue ellipse (45% 75%) |
  | `hero-bg-aurora` | `backgroundImage` | Conic gradient 6-stop colour wheel (orange → pink → violet → cyan → lime → orange) |
  | `hero-bg-glow` | `backgroundImage` | Conic gradient (same wheel, phase-shifted) |
  | `hero-bg-dots` | `backgroundImage` | `radial-gradient(#10101930 .7px, transparent .7px)` — repeating dot pattern |
  | `hero-bg-aurora` | `keyframes` | `translate(-25px, 20px) scale(1.07)` drift |
  | `hero-bg-spin` | `keyframes` | `rotate(360deg)` |
  | `hero-bg-aurora` | `animation` | `12s ease-in-out infinite alternate` |
  | `hero-bg-spin` | `animation` | `20s linear infinite` |

- **Three visual layers (all decorative, `pointer-events:none`, `-z-10`):**
  1. **Wash** — `bg-hero-bg-wash` on section itself — soft lavender + icy-blue radial glow, always visible.
  2. **Aurora blob** — `before:` pseudo — 600×600px rounded circle, `bg-hero-bg-aurora`, `blur-[70px]`, `opacity-25`, `animate-hero-bg-aurora` (slow drift). Smaller (360px) on mobile `max-[620px]`.
  3. **Dot grid** — `after:` pseudo — covers full section, `bg-hero-bg-dots`, `bg-[length:8px_8px]`, `opacity-25`, masked right with `[mask-image:linear-gradient(90deg,#000,transparent_80%)]`.
  4. **Glow ring** — child `<div>` behind hero image — `bg-hero-bg-glow`, `blur-[45px]`, `opacity-[.35]`, `animate-hero-bg-spin` (slow spin). Respects `motion-reduce`.

- **Purge bug fixed:** Previous implementation used `[...classes].join(' ')` which Tailwind's content scanner cannot statically analyse → classes stripped from bundle. Fixed by writing the entire className as a single template literal.
- **CSS verification (post-build):** All 12 tokens confirmed present in compiled `layout.css`:
  `hero-bg-wash` ✓ · `hero-bg-aurora` ✓ · `hero-bg-glow` ✓ · `hero-bg-dots` ✓ · `hero-bg-spin` ✓ · `blur(70px)` ✓ · `8px 8px` ✓ · `mask-image` ✓ · `@keyframes hero-bg-aurora` ✓ · `@keyframes hero-bg-spin` ✓ · `animate-hero-bg-aurora` ✓ · `animate-hero-bg-spin` ✓

### Phase 12 — Footer Watermark Redesign (Single Centred Mark)- **Removed:** Three per-column `motion.span` watermarks with `watermarkStyle` (one behind Quick Links, one behind Services, one behind Contact). Also removed the `position:relative` wrapper divs and `zIndex:2` inner divs that existed only to support the old watermarks.
- **Created:** `components/FooterWatermark.js` — new `"use client"` component. Renders one large "LiftSky24" absolutely positioned and centered over the entire footer. Uses `useReducedMotion()` from Framer Motion.
- **Wiring:** `footer` root gets `position:relative` (was missing). `FooterWatermark` is first child at `z-0`. Content wrapper div gets `position:relative; zIndex:10` so all footer text / links / icons render on top.
- **Responsive sizing:** Mobile two-line ("Lift" / "Sky24") at `text-[length:28vw]`, tablet one-line at `sm:text-[length:17vw]`, desktop one-line at `lg:text-[length:min(15vw,19rem)]` (capped at 1920px+).
- **Colour:** Outlined orange only (`-webkit-text-stroke`), no pink. Mobile: `1px rgba(252,110,4,0.30)`. Tablet/desktop: `1.5px rgba(252,110,4,0.28)`. Soft top-to-transparent fill via `bg-gradient-to-b … bg-clip-text`.
- **Animation:** Entrance `opacity 0→1` + `scale 0.96→1` (0.9s, `[0.16,1,0.3,1]`, `whileInView once`), then gentle float `y:[0,-12,0]` 6 s loop. Both disabled with `prefers-reduced-motion`.
- **Optional cleanup applied:** Social hover gradient and Subscribe button updated from old `#FF6B01→#ff4fa3` (pink) to brand orange `linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)`. Subscribe button text changed to navy `#0C1323`. Footer link hover color updated from `#FF6B01` to `#FC6E04`. No other content changed.
- **Files changed:** `components/Footer.js`, `components/FooterWatermark.js` (new), `docs/LIFTSKY24_PROJECT_DOCUMENTATION.md`
- **Build result:** ✓ 0 errors, 27/27 pages generated. All watermark CSS classes verified in compiled output.

### Phase 13 — ServicesShowcase Redesign (Proper Tabs, Matched Heights)
- **Removed:** 3 extra quick-link cards below the desktop stage (were `services.filter(…).slice(0,3).map(…)`). Removed separate mobile accordion markup. No more duplicate image requests or duplicate DOM nodes.
- **Single source of truth:** One list of 7 `<button role="tab">` elements, one image stage — desktop and mobile share the same DOM. CSS `order-1/order-2` utilities swap visual arrangement per breakpoint.
- **Desktop (≥1024px):** List left, stage right (`lg:grid-cols-[5fr_6fr]`, `items-stretch`). Stage height equals list height exactly — no fixed `h-[440px]`. Info panel sits below the image in normal flow (`bg-white/90 backdrop-blur-xl`), so text never sits on raw image pixels. Hover-intent 80 ms delay.
- **Mobile (<1024px):** Image stage top (`order-1`), info panel below, tab list at bottom (`order-2`). Tap → cross-fade + scroll-into-view (only if stage not visible, skipped with prefers-reduced-motion).
- **Images:** Migrated from `<img>` to `next/image` (fill, object-cover). First `loading="eager"`, rest `loading="lazy"`. `sizes="(min-width:1024px) 50vw, 100vw"`. Source and alt text from `data/images.js` registry.
- **Animations:** Zoom `scale(1.06)→scale(1)` over 0.7s (was 6s). Cross-fade 0.5s. Info panel `@keyframes rise` re-triggered on slug key change. All off with `prefers-reduced-motion`.
- **Accessibility:** Full ARIA tabs pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`, roving tabindex, keyboard ArrowDown/Up/Home/End/Enter/Space, visible focus ring 2px navy).
- **Files changed:** `components/Servicesshowcase.jsx`, `docs/LIFTSKY24_PROJECT_DOCUMENTATION.md`
- **Build:** ✓ 0 errors.

### Phase 14 — Process Roadmap (Winding Road + Three.js Layer)

#### What changed
- **Replaced:** Old flat `ProcessRoadmap.js` (5 equal-height cards in a row with a horizontal dashed SVG road) replaced with a winding road component on Home and Services hub. `Steps` component in `Sections.js` is unchanged (still used on all service detail pages).
- **New files:** `components/ProcessRoadmap.js` (full rewrite), `components/ProcessRoadmap3D.js` (new Three.js layer).
- **Dependencies added:** `@react-three/fiber@8.17.10` (pinned exact). `three@0.169.0` was already installed.
- **next.config.mjs:** Added `transpilePackages: ["three"]`.
- **tailwind.config.js:** Added `brand.text: "#C2410C"` (AA small orange text), `amber.DEFAULT: "#FFC247"`, `amber.dark: "#F59E0B"`, `navy.DEFAULT: "#0C1322"`.

#### ProcessRoadmap component (`components/ProcessRoadmap.js`)
- **Type:** `"use client"`. Accepts `items` prop (array `{t, d}`).
- **Three layouts, one DOM** (`<ol role="list" data-roadmap>` with 5 `<li role="listitem">`):
  - **xl (≥1280px) wave grid:** `.rm-ol` class (from `globals.css`) makes it a 5-col CSS grid (`grid-template-columns: repeat(5, minmax(0,1fr))`, `grid-template-rows: auto 200px auto`). `.rm-li` on each `<li>` sets `display:contents` at xl so its children become direct grid items. `.rm-item` + CSS custom props (`--col`, `--row`, `--card-align`, `--ms-top`, `--conn-align`) set via inline `style` place every child exactly. Wave SVG uses `.rm-road` (col 1–5, row 2). START/GO LIVE use `.rm-start` / `.rm-golive`.
  - **sm–xl (640–1279px) zigzag:** `sm:grid sm:grid-cols-[1fr_56px_1fr]` per item; cards alternate left/right column; 44px milestones center column; vertical dotted road in CSS background-image.
  - **<640px single-side:** `grid grid-cols-[44px_1fr]` per item; 36px milestone left, card right; 3px dotted road along left edge.
- **Why `.rm-*` CSS classes instead of Tailwind placement utilities:** Tailwind's static scanner cannot detect dynamic class names built with template literals (e.g. `` `xl:col-start-${i+1}` ``). Those classes are purged and never reach the browser. Without explicit `grid-column`, every grid item falls back to auto-placement. The road SVG spans all 5 columns of row 2, causing milestones to auto-place into columns 6–10, creating 5 extra tiny implicit tracks and cards ≈115px wide. The fix: all `.rm-*` placement rules live in `globals.css` (never purged) and use CSS custom properties set per element via inline `style`.
- **Data attributes for testing:** `data-roadmap` on the `<ol>`, `data-roadmap-card="i"` on each card inner div, `data-roadmap-milestone="i"` on each desktop milestone, `data-roadmap-connector="i"` on each connector.
- **STEP pill:** `whitespace-nowrap shrink-0` — never wraps. Top row is `flex flex-nowrap items-center gap-2`.
- **Wave SVG:** `viewBox="0 0 1000 200"`, `preserveAspectRatio="none"`. Three strokes: track (#ECE8DF, w=34), ghost dashed route (orange/25, `1 13` dash), progress route (orange gradient, clipped by Framer Motion `clipPath inset`).
- **Scroll progress:** `useScroll({ target: olRef, offset: ["start 75%","end 45%"] })`. Desktop: `clipPath inset(0 {100-p}% 0 0)` reveals wave left-to-right. Tablet/mobile: `scaleY` on the dotted overlay line. `useMotionValueEvent` computes `activeIndex` without re-renders per frame.
- **Milestones:** 54px (desktop), 44px (tablet), 36px (mobile); brand gradient fill; navy number; `scale(0.85) opacity(0.55)` when unreached. Pulse ring via `animate-ping` on the latest-reached milestone.
- **Card structure:** OUTER `motion.div` (Framer entrance only); INNER `div` with `data-roadmap-card` (CSS hover + 3D writes `style.transform`). Icon (lucide: MessageCircle/PenTool/Code2/Rocket/Headphones), "STEP 0n" pill, `<h3>` title, description.
- **CSS hover fallback** (`@media (hover:hover)`): `translateY(-6px)`, orange border/shadow, icon box turns brand gradient. Disabled (transform only) when `data-3d="on"` on the `<ol>`.
- **3D eligibility:** checked client-side: matchMedia xl+hover+fine, NOT reduced-motion, NOT saveData, hardwareConcurrency>4, deviceMemory>4, WebGL available, section near viewport (IntersectionObserver rootMargin 300px). All conditions must be true; any failure → CSS-only.
- **Accessibility:** `role="list"`, `role="listitem"`, `<h3>` titles, road/milestones/pills `aria-hidden`. `prefers-reduced-motion`: final state shown immediately, no animations.
- **END labels:** START pill (navy bg, white text) + GO LIVE ✳ pill (amber bg, navy text) decorative, `aria-hidden`.

#### ProcessRoadmap3D component (`components/ProcessRoadmap3D.js`)
- **Type:** `"use client"`. Loaded only via `next/dynamic({ ssr: false })` from ProcessRoadmap. Never touches SSR.
- **Canvas:** `@react-three/fiber v8` orthographic (`zoom: 1` → 1 world unit = 1 CSS px), `dpr [1,1.5]`, `alpha: true`, `powerPreference: "low-power"`. Absolutely positioned over the `<ol>`, `pointer-events: none`, `aria-hidden`, `tabIndex: -1`.
- **Frame loop:** `useFrame` only. No React state updated per frame. Card inner elements' `style.transform` is written directly.
- **Moving cards:** idle float `y=sin(t*0.8+i*1.3)*5px`, `rotateZ=sin(t*0.6+i)*0.35deg`. Hover: `perspective(900px) translate3d … rotateX(ptr.y*8deg) rotateY(ptr.x*10deg) scale(1.03) translateZ(36px)`. Other cards while hovering: `scale(0.985)`.
- **Twin planes:** `ShapeGeometry` rounded rect (card size +16px, r=22). Orange (even steps) or navy (odd) fill, opacity 0.10 idle → 0.24 hover. Moves opposite to pointer on hover. Additive glow `Sprite` fades in behind on hover.
- **Orb:** `CurvePath` of 6 `CubicBezierCurve3` matching the SVG wave in pixel space. Amber core mesh + orange halo `Sprite`. 18-item comet trail ring buffer. Ping `RingGeometry` spawned when `activeIndex` increases.
- **Particles:** 60 `Points`, orange/amber/navy, `opacity 0.25`, drift upward with sine wobble, pointer parallax.
- **Error boundary:** `class ErrBound extends Component` silently unmounts on any error.
- **Pause:** `frameloop="never"` when the section is not intersecting or tab is hidden.
- **Dispose:** all geometries/materials/textures cleaned up on unmount.

#### Build verification
- `three` lives in `_app-pages-browser_components_ProcessRoadmap3D_js.js` (lazy chunk, ~7MB uncompressed), NOT in the shared bundle.
- First Load JS for `/`: 167 kB (was 162 kB — 5 kB increase from ProcessRoadmap.js own code, not three).
- `@react-three/drei` NOT installed (as specified). Named imports only from `three`.

### Phase 15 — ProcessRoadmap Desktop Grid Bug Fix

**Root cause:** Template-literal Tailwind class names (`` `xl:col-start-${i+1}` ``, `` `xl:row-start-2` `` inside dynamic arrays) were purged from the compiled CSS because Tailwind's static scanner cannot detect them. Without explicit `grid-column`, all grid items fell back to auto-placement. The road `<li>` spanning all 5 columns of row 2 caused milestones to auto-place into columns 6–10, creating 5 extra tiny implicit tracks. Cards ended up ≈115px wide and the STEP pill wrapped to two lines.

**Fix:**
- All desktop grid placement moved to `.rm-*` CSS classes in `globals.css` (never purged). CSS custom properties (`--col`, `--row`, `--card-align`, `--ms-top`, `--conn-align`) are set via inline `style` per element.
- `whitespace-nowrap shrink-0` added to STEP pill; top row changed to `flex flex-nowrap`.
- `data-roadmap`, `data-roadmap-card`, `data-roadmap-milestone`, `data-roadmap-connector` attributes added for DevTools verification.
- Tablet and mobile layouts unchanged.

**CSS verification (compiled output):** `.rm-ol`, `.rm-li`, `.rm-item`, `.rm-card`, `.rm-ms`, `.rm-conn`, `.rm-road`, `.rm-start`, `.rm-golive`, `repeat(5`, `grid-column:var(--col)`, `grid-row:var(--row)` — all confirmed present.

**Files changed:** `components/ProcessRoadmap.js`, `app/globals.css`, `docs/LIFTSKY24_PROJECT_DOCUMENTATION.md`

**Build:** ✓ 0 errors, 27/27 pages.

---

## 15. Known Issues, TODOs and Next Steps

### Critical — Must Fix Before Launch

| # | Issue | File | Fix needed |
|---|---|---|---|
| 1 | OG image file doesn't exist | `public/images/og-image.png` | Create 1200×630 branded PNG |
| 2 | Blog thumbnail images don't exist | `public/images/blog/` | Create or add: `website-cost.jpg`, `speed-seo.jpg`, `social-vs-digital.jpg` |
| 3 | Social icons on Contact page all `href="#"` | `app/contact/page.js` | Add real social profile URLs |
| 4 | "Get Directions" link is generic | `app/contact/page.js` | Replace `https://maps.app.goo.gl/TaxilaBusinessSchoolJaipur` with real Google Maps share link |
| 5 | Newsletter form has no backend | `components/Footer.js` | Connect to Mailchimp / ConvertKit / any email service |
| 6 | All service images use `hero.svg` or `demo.png` | `data/images.js → IMG.services` | Add real photography/illustrations per service |

### Content — Owner Input Required

| # | Item | Where | Value needed |
|---|---|---|---|
| 1 | Real stats | `data/site-config.js → STATS` | Replace 5+/30+/7/24h |
| 2 | Real testimonials | `data/site-config.js → TESTIMONIALS` | 4 real client reviews |
| 3 | Real prices | `data/site-config.js → PRICING` | Starting prices for all 3 plans |
| 4 | Real team names/roles | `lib/data.js → team` | Replace placeholders |
| 5 | Real portfolio projects | `data/site-config.js → PORTFOLIO` | Add real client work |
| 6 | YouTube channel URL | `data/site-config.js → SOCIAL.youtube` | Add when ready |
| 7 | Twitter/X URL | `data/site-config.js → SOCIAL.twitter` | Add when ready |
| 8 | Verify social URLs | `data/site-config.js → SOCIAL` | Confirm Instagram/LinkedIn/Facebook handles |
| 9 | AboutHero stats | `components/AboutHero.jsx` (hardcoded) | Hardcoded: 500+ Clients, 120+ Projects, 5+ Years — update separately |

### Technical Improvements

| # | Suggestion | Priority |
|---|---|---|
| 1 | Switch Inter font to `next/font/google` instead of `<link>` in layout.js | Medium |
| 2 | `ServicesShowcase` uses plain `<img>` — migrate to `next/image` | Medium |
| 3 | `faqSchema()` and `serviceSchema()` helpers defined but not injected on pages | Low |
| 4 | Add `lint` script to `package.json` | Low |
| 5 | Blog: add individual blog post pages under `/blog/[slug]` for future posts | Medium |
| 6 | Portfolio: build `/portfolio/[slug]` detail page (structure exists, no template yet) | Low (when projects added) |
| 7 | AboutHero stat numbers are hardcoded (500, 120, 5) — should use `STATS` config | Low |
| 8 | About page renders `AboutHero` then `PageHero` back-to-back (two hero sections) — consider removing duplicate | Medium |
| 9 | Deploy to Vercel, add domain `liftsky24.com` | High |

---

## 16. AI Handoff Summary

```
PROJECT: LiftSky24 — digital agency website
STATUS: Pre-launch demo, real data not yet populated

TECH STACK:
- Next.js 14.2.15 (App Router, JS, no TypeScript)
- Tailwind CSS 3.4.14 + custom globals.css
- framer-motion 11.11.0 (ONLY animation library — no GSAP, no AOS)
- lucide-react 0.454.0 (icons)
- Path alias: @/* → ./

THEME — DO NOT CHANGE ANY OF THESE:
- Background: #f7f6f2 (--paper), body color: #10111a (--ink)
- Primary accent: #6557ff (--purple), Secondary: #ff4fa3 (--pink), Orange: #ff6338
- Brand gradient: linear-gradient(110deg,#6557ff,#ff4fa3) (class: bg-brand-gradient)
- Dark section bg: radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b (inline style only — not Tailwind class)
- Hero wash bg: radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%) (inline style only)
- Font: Inter (Google Fonts, weights 400-900). Other fonts only in specific components.
- Tailwind brand tokens: brand.DEFAULT=#6557ff, brand.light=#ede9ff, navy.900=#10111a

SERVICES (exactly 7, exact names, never change or add):
1. Website Development → /services/website-development
2. App Development → /services/app-development
3. Software Development → /services/software-development
4. Social Media Management → /services/social-media-management
5. Search Engine Optimization (SEO) → /services/seo
6. Graphic Design → /services/graphic-design
7. Digital Marketing → /services/digital-marketing
REMOVED (301 redirects exist): AI & ML, Cloud Solutions, IT Consulting, UI/UX Design (standalone)

SINGLE SOURCE OF TRUTH: data/site-config.js
- Edit BRAND, CONTACT, SOCIAL, STATS, SERVICES, PRICING, FAQS, TESTIMONIALS, PROCESS, WHY, INDUSTRIES, BLOG_POSTS, PORTFOLIO here

PAGES (26 static, all working):
/, /about, /services, /services/[7 slugs], /portfolio, /industries, /pricing, /blog,
/blog/[3 posts], /contact, /privacy-policy, /terms, /not-found
+ /api/contact (POST, dynamic)
+ /sitemap.xml, /robots.txt (auto-generated)

KEY DESIGN RULES:
- All background gradients use inline style (not Tailwind class) to prevent purging
- Buttons use either Button component (ui.js, 3 variants) or CSS classes in globals.css
- Cards: rounded-2xl, border-slate-100, bg-white, shadow-card on hover
- Section wrapper: Section component from Sections.js (py-14 lg:py-18, max-w-7xl)
- All animations: Framer Motion only. Respect useReducedMotion(). No AOS, no GSAP.

DO NOT CHANGE:
- tailwind.config.js color tokens
- globals.css CSS variables (:root block)
- The 7 service names or their slugs
- BRAND.tagline ("Rise Higher. Go Further.") — shown in hero eyebrow and footer
- components/ui.js exports (Reveal, Counter, Stagger, StaggerItem, Button, ParallaxImage)
- data/site-config.js exports structure (only values inside)
```
