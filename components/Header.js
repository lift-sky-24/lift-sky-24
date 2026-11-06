"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/data/site-config";

export default function Header() {
  const [open,    setOpen]    = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const headerRef = useRef(null);
  const path      = usePathname();

  useEffect(() => { setOpen(false); setOpenSub(null); }, [path]);

  // Direct DOM classList manipulation — no React state on scroll, no re-renders
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Skip hide-on-scroll on touch devices to prevent flicker
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let rafId  = null;
    let lastScrollY = 0;

    const update = () => {
      const y    = window.scrollY;
      const diff = y - lastScrollY;
      lastScrollY = y;
      rafId = null;

      if (y > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      if (!isTouch) {
        if (y > 80) {
          if (diff > 6)  header.classList.add("hidden");
          if (diff < -4) header.classList.remove("hidden");
        } else {
          header.classList.remove("hidden");
        }
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const isActive = (h) => h === "/" ? path === "/" : path.startsWith(h);

  return (
    <header ref={headerRef} className="header-wrap" role="banner">
      <div className="header-inner">

        {/* Logo */}
        <Link href="/" aria-label="LiftSky24 — Home" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/LiftSky24Logo.png"
            alt="LiftSky24"
            width={160}
            height={52}
            style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="h-nav" aria-label="Main navigation">
          {NAV.map((l) =>
            l.children ? (
              <div key={l.label} className="h-dropdown" role="none">
                <Link
                  href={l.href}
                  className={`h-link h-drop-link${isActive(l.href) ? " active" : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                  <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.5, marginLeft: 3 }}>▾</span>
                </Link>
                <div className="h-drop-menu" role="menu" aria-label={`${l.label} submenu`}>
                  {l.children.filter((c) => c.label !== "All Services").map((c) => (
                    <Link key={c.href} href={c.href} role="menuitem" className="h-drop-item">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className={`h-link${isActive(l.href) ? " active" : ""}`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="h-cta" aria-label="Get a free quote">
          Get a Free Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className="h-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>✕</motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>☰</motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid rgba(16,17,26,.08)", background: "var(--paper)" }}
          >
            <div className="m-menu-inner">
              {NAV.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                >
                  {l.children ? (
                    <>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Link
                          href={l.href}
                          className={`m-link${isActive(l.href) ? " active" : ""}`}
                          style={{ flex: 1, borderBottom: "none", paddingRight: 0 }}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(l.href) ? "page" : undefined}
                        >
                          {l.label}
                        </Link>
                        <button
                          onClick={() => setOpenSub(openSub === l.label ? null : l.label)}
                          aria-expanded={openSub === l.label}
                          aria-label={`${openSub === l.label ? "Collapse" : "Expand"} ${l.label} submenu`}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "12px 8px", color: "var(--muted)", lineHeight: 1,
                            borderBottom: "1px solid rgba(16,17,26,.08)",
                          }}
                        >
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: openSub === l.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ fontSize: 13, display: "inline-block" }}
                          >
                            ▾
                          </motion.span>
                        </button>
                      </div>
                      <AnimatePresence>
                        {openSub === l.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="m-sub">
                              {l.children.map((c) => (
                                <Link key={c.href} href={c.href} className="m-sub-link" onClick={() => setOpen(false)}>
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={l.href}
                      className={`m-link${isActive(l.href) ? " active" : ""}`}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV.length * 0.04 }}>
                <Link href="/contact" className="m-cta" onClick={() => setOpen(false)}>Get a Free Quote</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
