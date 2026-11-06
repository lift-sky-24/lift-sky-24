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
  fontSize: 10, margin: "0 0 14px", color: "#fff",
  fontWeight: 900, textTransform: "uppercase", letterSpacing: ".12em",
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

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "5px 0",
        fontSize: 13,
        color: "#b4b5c1",
        textDecoration: "none",
        transition: "color .2s",
        lineHeight: 1.6,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B01")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#b4b5c1")}
    >
      {children}
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

  // Address: remove "Flat no." — start from 91/109
  const addressLine1 = CONTACT.address.line1.replace(/Flat No\.\s*/i, "").replace(/Flat no\.\s*/i, "");

  return (
    <footer style={{ background: "#10111a", color: "#fff", paddingTop: 0, overflow: "hidden" }}>

      {/* ── Big brand word — outline only, very subtle ─────────────── */}
      <div
        aria-hidden="true"
        style={{ overflow: "hidden", lineHeight: 1, borderTop: "1px solid rgba(255,255,255,.05)" }}
      >
        <motion.p
          style={{
            fontSize: "clamp(3.5rem,12vw,10rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,.07)",
            userSelect: "none",
            padding: "0 min(48px,4vw)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {BRAND.name}
        </motion.p>
      </div>

      {/* ── Links area — LiftSky24 watermark as background ──────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/*
          Watermark: LIFTSKY24 repeating diagonally behind the links columns.
          Orange tint — very subtle so links stay readable.
        */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
            opacity: 0.035,
          }}
        >
          {/* Repeat the brand name in a large diagonal pattern */}
          {[...Array(6)].map((_, row) => (
            <div
              key={row}
              style={{
                display: "flex",
                gap: "3rem",
                whiteSpace: "nowrap",
                transform: `translateX(${row % 2 === 0 ? "-3rem" : "0"}) translateY(${row * 4}rem)`,
                marginBottom: "0.5rem",
              }}
            >
              {[...Array(4)].map((_, col) => (
                <span
                  key={col}
                  style={{
                    fontSize: "clamp(2.5rem,5vw,4rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#FF6B01",
                    userSelect: "none",
                    display: "inline-block",
                  }}
                >
                  {BRAND.name}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Orange glow — subtle, top-right of links area */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-60px",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,1,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            width: "min(1200px,calc(100% - 40px))",
            margin: "auto",
            padding: "48px 0 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="footer-grid">

            {/* Brand col */}
            <div>
              <Link href="/" aria-label="LiftSky24 home" style={{ display: "inline-flex", marginBottom: 18 }}>
                <motion.div
                  style={{ background: "#fff", borderRadius: 10, padding: "6px 12px", display: "inline-flex" }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <img src="/images/LiftSky24Logo.png" alt="LiftSky24" style={{ height: 34, width: "auto", objectFit: "contain" }} />
                </motion.div>
              </Link>
              <p style={{ ...colStyle, maxWidth: 240, marginBottom: 10, fontStyle: "italic", fontSize: 13, color: "#7070a0" }}>
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
                    whileHover={{ scale: 1.15, background: "linear-gradient(135deg,#FF6B01,#ff4fa3)" }}
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
            <div>
              <h4 style={h4Style}>Quick Links</h4>
              {quickLinks.map((x) => (
                <FooterLink key={x.label} href={x.href}>{x.label}</FooterLink>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4 style={h4Style}>Services</h4>
              {SERVICES.map((s) => (
                <FooterLink key={s.slug} href={s.href}>{s.name}</FooterLink>
              ))}
            </div>

            {/* Contact + newsletter */}
            <div>
              <h4 style={h4Style}>Contact</h4>
              {/* Address — "Flat No." removed, starts from 91/109 */}
              <p style={{ ...colStyle, fontSize: 12, marginBottom: 10 }}>
                {addressLine1},<br />
                {CONTACT.address.line2},<br />
                {CONTACT.address.city} – {CONTACT.address.pin}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{ ...colStyle, fontSize: 13, display: "block", margin: "4px 0", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B01")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b4b5c1")}
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneTel}
                style={{ ...colStyle, fontSize: 13, display: "block", margin: "4px 0 12px", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B01")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b4b5c1")}
              >
                {CONTACT.phone}
              </a>
              <p style={{ ...colStyle, fontSize: 11, marginBottom: 16 }}>{CONTACT.hours}</p>

              <p style={{ ...colStyle, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#fff", marginBottom: 8 }}>Newsletter</p>
              <form onSubmit={subscribe} noValidate style={{ display: "flex", gap: 6 }}>
                <label htmlFor="footer-newsletter" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                  Email address
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 99, padding: "8px 14px", fontSize: 12, color: "#fff", outline: "none" }}
                />
                <motion.button
                  type="submit"
                  style={{ background: "linear-gradient(110deg,#FF6B01,#ff4fa3)", color: "#fff", border: "none", borderRadius: 99, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Subscribe
                </motion.button>
              </form>
              {msg.text && (
                <p role="status" aria-live="polite" style={{ fontSize: 11, marginTop: 6, color: msg.ok ? "#6ee7b7" : "#fca5a5" }}>
                  {msg.text}
                </p>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", marginTop: 40, padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6b6d7d", fontSize: 12, flexWrap: "wrap", gap: 10 }}>
            <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
            <span style={{ display: "flex", gap: 20 }}>
              <Link href="/privacy-policy" style={{ color: "#6b6d7d", textDecoration: "none", transition: "color .2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6d7d")}>Privacy Policy</Link>
              <Link href="/terms"          style={{ color: "#6b6d7d", textDecoration: "none", transition: "color .2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6d7d")}>Terms &amp; Conditions</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
