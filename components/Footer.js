"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Youtube, Twitter } from "lucide-react";
import { BRAND, CONTACT, SOCIAL, SERVICES } from "@/data/site-config";
import FooterWatermark from "@/components/FooterWatermark";

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
        display: "block", padding: "5px 0", fontSize: 13,
        color: "#b4b5c1", textDecoration: "none",
        transition: "color .2s", lineHeight: 1.6,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#FC6E04")}
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

  const addressLine1 = CONTACT.address.line1
    .replace(/Flat No\.\s*/i, "")
    .replace(/Flat no\.\s*/i, "");

  return (
    <footer style={{ position: "relative", background: "#10111a", color: "#fff", overflow: "hidden" }}>

      <FooterWatermark />

      <div style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ width: "min(1200px,calc(100% - 40px))", margin: "auto", padding: "52px 0 0" }}>

          <div className="footer-grid">

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
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {SOCIAL_ICONS.filter(({ key }) => SOCIAL[key]).map(({ key, Icon, label }, i) => (
                  <motion.a
                    key={key}
                    href={SOCIAL[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.09)", display: "grid", placeItems: "center" }}
                    whileHover={{ scale: 1.15, background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}
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

            <div>
              <h4 style={h4Style}>Quick Links</h4>
              {quickLinks.map((x) => (
                <FooterLink key={x.label} href={x.href}>{x.label}</FooterLink>
              ))}
            </div>

            <div>
              <h4 style={h4Style}>Services</h4>
              {SERVICES.map((s) => (
                <FooterLink key={s.slug} href={s.href}>{s.name}</FooterLink>
              ))}
            </div>

            <div>
              <h4 style={h4Style}>Contact</h4>
              <p style={{ ...colStyle, fontSize: 12, marginBottom: 10 }}>
                {addressLine1},<br />
                {CONTACT.address.line2},<br />
                {CONTACT.address.city} – {CONTACT.address.pin}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{ ...colStyle, fontSize: 13, display: "block", margin: "4px 0", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FC6E04")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b4b5c1")}
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneTel}
                style={{ ...colStyle, fontSize: 13, display: "block", margin: "4px 0 12px", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FC6E04")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b4b5c1")}
              >
                {CONTACT.phone}
              </a>
              <p style={{ ...colStyle, fontSize: 11, marginBottom: 16 }}>{CONTACT.hours}</p>

              <p style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: "#fff", marginBottom: 8 }}>Newsletter</p>
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
                  style={{ background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)", color: "#0C1323", border: "none", borderRadius: 99, padding: "8px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
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
