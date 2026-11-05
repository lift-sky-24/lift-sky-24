/**
 * data/pages/about.js — About page section content.
 * Team data removed per Task 1 (Meet the Team section removed from About page).
 */
import { STATS } from "@/data/site-config";

// ── About Hero (the animated hero at top of About page) ───────────
export const aboutHeroData = {
  // AboutHero.jsx has its own internal stats hardcoded at 500/120/5
  // Those are separate from STATS — kept as-is for now
};

// ── PageHero (second hero — company story block) ──────────────────
export const aboutPageHero = {
  title:   "About",
  accent:  "We Build. We Design. We Grow.",
  eyebrow: "Rise Higher. Go Further.",
  sub:     "LiftSky24 started as a small group of freelancers in Jaipur who kept getting asked the same thing: 'Can you handle our marketing too?' We could — and we did. Today we're a full-service team of developers, designers and digital marketers who work together on every project. No silos, no handoff chaos. Just one team that cares about your results.",
  image:   "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=640&q=80",
  alt:     "LiftSky24 team at work in a modern collaborative workspace",
  ctas:    [{ label: "Work With Us", href: "/contact" }],
  // stats come from STATS in site-config (passed dynamically in the page)
};

// ── Mission & Vision ──────────────────────────────────────────────
export const aboutMissionVisionSection = {
  title: "Our Mission & Vision",
};

// ── Values ────────────────────────────────────────────────────────
export const aboutValuesSection = {
  title: "Our Values",
  tone:  "soft",
};

// ── Final CTA ─────────────────────────────────────────────────────
export const aboutCTA = {
  title:  "Let's Build Something Together",
  sub:    "Whether you have a brief or just an idea — get in touch for a free call.",
  button: "Start the Conversation",
  href:   "/contact",
};
