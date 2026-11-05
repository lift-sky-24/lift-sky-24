"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV } from "@/data/site-config";

export default function Header() {
  const [open,    setOpen]    = useState(false);
  const [scrolled,setScrolled]= useState(false);
  const [hidden,  setHidden]  = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const lastY  = useRef(0);
  const path   = usePathname();

  // Close menu on route change (useEffect, not useState)
  useEffect(() => { setOpen(false); setOpenSub(null); }, [path]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 10);
    const diff = y - lastY.current;
    if (y > 80) {
      if (diff > 6)  setHidden(true);
      if (diff < -4) setHidden(false);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  const isActive = (h) => h === "/" ? path === "/" : path.startsWith(h);

  // Classes from globals.css — no inline <style>
  const headerCls = `header-wrap${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`;

  return (
    <header className={headerCls} role="banner">
      <div className="header-inner">

        {/* Logo — larger */}
        <Link href="/" aria-label="LiftSky24 — Home" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/LiftSky24Logo.png"
            alt="LiftSky24"
            width={160}
            height={52}
            style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }}
          />
        </Link>

        {/* Desktop nav — classes from globals.css */}
        <nav className="h-nav" aria-label="Main navigation">
          {NAV.map((l) =>
            l.children ? (
              <div key={l.label} className="h-dropdown" role="none">
                <button
                  className={`h-drop-trigger${isActive(l.href) ? " active" : ""}`}
                  aria-haspopup="true"
                >
                  {l.label} <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.55 }}>▾</span>
                </button>
                <div className="h-drop-menu" role="menu">
                  {l.children.map((c, i) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      role="menuitem"
                      className={`h-drop-item${i === 0 ? " all" : ""}`}
                    >
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
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>☰</motion.span>
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
                      <button
                        className={`m-link${isActive(l.href) ? " active" : ""}`}
                        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                        onClick={() => setOpenSub(openSub === l.label ? null : l.label)}
                        aria-expanded={openSub === l.label}
                      >
                        {l.label}
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: openSub === l.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ fontSize: 12, opacity: 0.5, display: "inline-block" }}
                        >
                          ▾
                        </motion.span>
                      </button>
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
                                <Link key={c.href} href={c.href} className="m-sub-link">{c.label}</Link>
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
