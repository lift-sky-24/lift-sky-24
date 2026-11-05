"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Youtube, Twitter } from "lucide-react";
import { BRAND, CONTACT, SOCIAL, SERVICES } from "@/data/site-config";

const SOCIAL_ICONS = [
  { key: "instagram", Icon: Instagram, label: "Instagram" },
  { key: "linkedin",  Icon: Linkedin,  label: "LinkedIn"  },
  { key: "facebook",  Icon: Facebook,  label: "Facebook"  },
  { key: "youtube",   Icon: Youtube,   label: "YouTube"   },
  { key: "twitter",   Icon: Twitter,   label: "X / Twitter" },
];

const h4Style = {
  fontSize: 11, margin: "5px 0 14px", color: "#fff",
  fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em",
};
const colStyle = { fontSize: 13, lineHeight: 1.8, color: "#b4b5c1" };

const quickLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Portfolio",  href: "/portfolio" },
  { label: "Blog",       href: "/blog" },
  { label: "Pricing",    href: "/pricing" },
  { label: "Contact",    href: "/contact" },
];

/* Roll-on-hover link */
function RollLink({ href, children, style = {} }) {
  return (
    <Link
      href={href}
      className="footer-link"
      style={{ overflow: "hidden", position: "relative", display: "block", ...style }}
    >
      <motion.span
        style={{ display: "block" }}
        whileHover={{ y: "-100%" }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        style={{
          display: "block", position: "absolute", top: "100%", left: 0,
          color: "#ff4fa3", width: "100%",
        }}
        initial={{ y: 0 }}
        whileHover={{ y: "-100%" }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg,   setMsg]   = useState({ ok: false, text: "" });

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setMsg({ ok: false, text: "Enter a valid email address." });
    setMsg({ ok: true, text: "Subscribed! We'll be in touch." });
    setEmail("");
  };

  return (
    <footer style={{ background: "#10111a", color: "#fff", paddingTop: 0, overflow: "hidden" }}>

      {/* ── Big animated brand word ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ borderTop: "1px solid rgba(255,255,255,.05)", overflow: "hidden", lineHeight: 1 }}
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <motion.p
          style={{
            fontSize: "clamp(4rem,14vw,12rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,.08)",
            userSelect: "none",
            padding: "0 min(60px,4vw)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {BRAND.name}
        </motion.p>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────── */}
      <div style={{ width: "min(1200px,calc(100% - 40px))", margin: "auto", padding: "48px 0 0" }}>
        <div className="footer-grid">

          {/* Brand col */}
          <div data-aos="fade-up" data-aos-delay="0">
            <Link href="/" aria-label="LiftSky24 home" style={{ display: "inline-flex", marginBottom: 16 }}>
              <motion.div
                style={{ background: "#fff", borderRadius: 10, padding: "6px 12px", display: "inline-flex" }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <img src="/images/LiftSky24Logo.png" alt="LiftSky24" style={{ height: 34, width: "auto", objectFit: "contain" }} />
              </motion.div>
            </Link>
            <p style={{ ...colStyle, maxWidth: 240, marginBottom: 10, fontStyle: "italic", fontSize: 14, color: "#8080a0" }}>
              &ldquo;{BRAND.tagline}&rdquo;
            </p>
            <p style={{ ...colStyle, fontSize: 12 }}>
              Web, apps, software, SEO, social media, graphic design and digital marketing — all under one roof.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {SOCIAL_ICONS.filter(({ key }) => SOCIAL[key]).map(({ key, Icon, label }, i) => (
                <motion.a
                  key={key}
                  href={SOCIAL[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.09)", display: "grid", placeItems: "center" }}
                  whileHover={{ scale: 1.15, background: "linear-gradient(135deg,#6557ff,#ff4fa3)" }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div data-aos="fade-up" data-aos-delay="80">
            <h4 style={h4Style}>Quick Links</h4>
            {quickLinks.map((x) => (
              <RollLink key={x.label} href={x.href}>{x.label}</RollLink>
            ))}
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="140">
            <h4 style={h4Style}>Services</h4>
            {SERVICES.map((s) => (
              <RollLink key={s.slug} href={s.href}>{s.name}</RollLink>
            ))}
          </div>

          {/* Contact + newsletter */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 style={h4Style}>Contact</h4>
            <p style={{ ...colStyle, fontSize: 12, marginBottom: 10 }}>
              {CONTACT.address.line1},<br />
              {CONTACT.address.line2},<br />
              {CONTACT.address.city} – {CONTACT.address.pin}
            </p>
            <a href={`mailto:${CONTACT.email}`} className="footer-link">{CONTACT.email}</a>
            <a href={CONTACT.phoneTel}          className="footer-link">{CONTACT.phone}</a>
            <p style={{ ...colStyle, fontSize: 11, marginTop: 4, marginBottom: 16 }}>{CONTACT.hours}</p>

            <p style={{ ...colStyle, fontSize: 12, marginBottom: 8 }}>Newsletter</p>
            <form onSubmit={subscribe} noValidate style={{ display: "flex", gap: 6 }}>
              <label htmlFor="footer-newsletter" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                Email address
              </label>
              <motion.input
                id="footer-newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 99, padding: "8px 14px", fontSize: 12, color: "#fff", outline: "none" }}
                whileFocus={{ scale: 1.02, borderColor: "rgba(101,87,255,.5)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                type="submit"
                style={{ background: "linear-gradient(110deg,#6557ff,#ff4fa3)", color: "#fff", border: "none", borderRadius: 99, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
                whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(101,87,255,.4)" }}
                whileTap={{ scale: 0.96 }}
              >
                Subscribe
              </motion.button>
            </form>
            {msg.text && (
              <motion.p
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 11, marginTop: 6, color: msg.ok ? "#6ee7b7" : "#fca5a5" }}
              >
                {msg.text}
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          style={{ borderTop: "1px solid rgba(255,255,255,.06)", marginTop: 40, padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6b6d7d", fontSize: 12, flexWrap: "wrap", gap: 10 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy-policy" className="footer-link" style={{ margin: 0 }}>Privacy Policy</Link>
            <Link href="/terms"          className="footer-link" style={{ margin: 0 }}>Terms &amp; Conditions</Link>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
