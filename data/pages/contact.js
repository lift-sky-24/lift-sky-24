/**
 * data/pages/contact.js — Contact page content.
 * Sensitive credentials (email, phone, address) stay in data/site-config.js → CONTACT.
 */

// ── Page hero ─────────────────────────────────────────────────────
export const contactPageHero = {
  title:   "Let's Build Something",
  accent:  "Great Together",
  sub:     "Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you soon.",
  image:   "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&q=80",
  alt:     "Professional team in a modern creative office discussing a project",
};

// ── Form labels ───────────────────────────────────────────────────
export const contactFormLabels = {
  name:    "Your Name *",
  email:   "Email Address *",
  details: "Project Details *",
  submit:  "Send Message",
  sending: "Sending…",
};

// ── Form placeholders ─────────────────────────────────────────────
export const contactFormPlaceholders = {
  name:    "Enter your name",
  email:   "Enter your email",
  details: "Tell us about your project",
};

// ── Info section labels ───────────────────────────────────────────
export const contactInfoLabels = {
  office:    "Our Office",
  email:     "Email Us",
  phone:     "Call Us",
  hours:     "Business Hours",
  location:  "Our Location",
  followUs:  "Follow Us",
  directions:"Get Directions ↗",
  getDirectionsHref: "https://maps.app.goo.gl/TaxilaBusinessSchoolJaipur",
};

// ── Success / error messages ──────────────────────────────────────
export const contactMessages = {
  success:       "Message Received!",
  successDetail: "Thanks for reaching out. We've saved your enquiry and will get back to you within one business day.",
  sendAnother:   "Send another message",
  networkError:  "Network error. Please check your connection and try again.",
  genericError:  "Something went wrong. Please try again.",
};

// ── Location section ──────────────────────────────────────────────
export const contactLocationSection = {
  title: "Our Location",
  tone:  "soft",
};

// ── CTA is not shown on this page (form is the CTA itself) ────────
