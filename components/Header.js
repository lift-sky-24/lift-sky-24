"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV } from "@/data/site-config";

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [openSub,  setOpenSub]  = useState(null);
  const lastY = useRef(0);
  const path  = usePathname();

  const { scrollY } = useScroll();

  useEffect(() => { setOpen(false); setOpenSub(null); }, [path]);

  // Scroll shadow + hide-on-down / show-on-up
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 10);
    const diff = y - lastY.current;
    if (y > 80) {
      if (diff > 6)  setHidden(true);   // scrolling down → hide
      if (diff < -4) setHidden(false);  // scrolling up  → show
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  const isActive = (h) => h === "/" ? path === "/" : path.startsWith(h);

  return (
    <>
      <style>{`
        .header-wrap {
          position: sticky; top: 0; z-index: 50;
          background: rgba(247,246,242,0.96);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(16,17,26,.10);
          transition: box-shadow .3s, transform .35s cubic-bezier(.4,0,.2,1);
        }
        .header-wrap.scrolled { box-shadow: 0 2px 20px rgba(16,17,26,.09); }
        .header-wrap.hidden   { transform: translateY(-100%); }
        .header-inner {
          width: min(1200px, calc(100% - 40px));
          margin: auto; height: 70px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }
        .h-nav { display: flex; align-items: center; gap: 4px; }
        .h-link {
          font-size: 13px; font-weight: 700;
          color: var(--ink); opacity: .75;
          transition: opacity .15s, color .15s;
          text-decoration: none;
          padding: 6px 10px; border-radius: 8px;
          white-space: nowrap; position: relative;
        }
        .h-link::after {
          content: ""; position: absolute; bottom: 2px; left: 10px; right: 10px;
          height: 2px; border-radius: 2px;
          background: linear-gradient(90deg,#6557ff,#ff4fa3);
          transform: scaleX(0); transform-origin: right;
          transition: transform .25s cubic-bezier(.4,0,.2,1);
        }
        .h-link:hover, .h-link.active { opacity: 1; color: var(--purple); }
        .h-link:hover::after, .h-link.active::after { transform: scaleX(1); transform-origin: left; }
        .h-dropdown { position: relative; }
        .h-drop-trigger {
          font-size: 13px; font-weight: 700;
          color: var(--ink); opacity: .75;
          transition: opacity .15s, color .15s;
          padding: 6px 10px; border-radius: 8px;
          display: flex; align-items: center; gap: 4px;
          cursor: default; user-select: none;
          background: none; border: none; font-family: inherit;
        }
        .h-drop-trigger.active, .h-dropdown:hover .h-drop-trigger { opacity: 1; color: var(--purple); }
        .h-drop-menu {
          visibility: hidden; opacity: 0; pointer-events: none;
          position: absolute; top: calc(100% + 6px); left: 0;
          min-width: 240px; background: #fff;
          border: 1px solid rgba(16,17,26,.10);
          border-radius: 16px; padding: 8px;
          box-shadow: 0 20px 50px rgba(41,32,71,.14);
          transition: opacity .18s, visibility .18s, transform .2s;
          transform: translateY(-6px);
          z-index: 110;
        }
        .h-dropdown:hover .h-drop-menu,
        .h-dropdown:focus-within .h-drop-menu {
          visibility: visible; opacity: 1; pointer-events: auto;
          transform: translateY(0);
        }
        .h-drop-item {
          display: block; padding: 9px 13px; font-size: 13px; font-weight: 600;
          border-radius: 10px; color: var(--ink); transition: background .12s, color .12s, transform .12s;
          text-decoration: none;
        }
        .h-drop-item:hover { background: #f0edff; color: var(--purple); transform: translateX(4px); }
        .h-drop-item.all { font-weight: 800; border-bottom: 1px solid rgba(16,17,26,.07); margin-bottom: 4px; padding-bottom: 11px; }
        .h-cta {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 99px;
          font-size: 13px; font-weight: 800;
          background: linear-gradient(110deg,#6557ff,#ff4fa3); color: #fff;
          border: none; transition: transform .2s, box-shadow .2s;
          text-decoration: none; white-space: nowrap; cursor: pointer;
        }
        .h-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(101,87,255,.35); }
        .h-toggle {
          display: none; border: 1px solid rgba(16,17,26,.13);
          background: white; border-radius: 50%;
          height: 40px; width: 40px; font-size: 18px; cursor: pointer;
          align-items: center; justify-content: center; flex-shrink: 0;
          transition: background .2s;
        }
        .h-toggle:hover { background: #f0edff; }
        .m-menu-inner {
          width: min(1200px,calc(100% - 40px));
          margin: auto; padding: 14px 0 18px;
        }
        .m-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 4px;
          border-bottom: 1px solid rgba(16,17,26,.08);
          font-size: 14px; font-weight: 700;
          color: var(--ink); text-decoration: none;
        }
        .m-link.active { color: var(--purple); }
        .m-sub { margin-left: 14px; border-left: 2px solid rgba(101,87,255,.2); padding-left: 12px; margin-bottom: 4px; }
        .m-sub-link { display: block; padding: 7px 0; font-size: 13px; color: var(--muted); text-decoration: none; }
        .m-sub-link:hover { color: var(--purple); }
        .m-cta {
          margin-top: 14px; display: block; text-align: center;
          background: linear-gradient(110deg,#6557ff,#ff4fa3);
          color: #fff; padding: 13px; border-radius: 99px;
          font-size: 14px; font-weight: 800; text-decoration: none;
        }
        @media(max-width:1080px){
          .h-nav, .h-cta { display: none !important; }
          .h-toggle { display: inline-flex !important; }
        }
      `}</style>

      <motion.header
        className={`header-wrap${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}
        role="banner"
      >
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" aria-label="LiftSky24 — Home">
            <motion.img
              src="/images/LiftSky24Logo.png"
              alt="LiftSky24"
              style={{ height: 42, width: "auto", objectFit: "contain" }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="h-nav" aria-label="Main navigation">
            {NAV.map((l) =>
              l.children ? (
                <div key={l.label} className="h-dropdown" role="none">
                  <button
                    className={`h-drop-trigger${isActive(l.href) ? " active" : ""}`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {l.label}{" "}
                    <motion.span
                      aria-hidden="true"
                      style={{ fontSize: 10, opacity: 0.6 }}
                      animate={{ rotate: 0 }}
                      whileParent={{ rotate: 180 }}
                    >
                      ▾
                    </motion.span>
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
          <motion.button
            className="h-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>✕</motion.span>
              ) : (
                <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>☰</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
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
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(16,17,26,.08)", background: "var(--paper)" }}
            >
              <div className="m-menu-inner">
                {NAV.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
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
                                {l.children.map((c, ci) => (
                                  <motion.div
                                    key={c.href}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ci * 0.03 }}
                                  >
                                    <Link href={c.href} className="m-sub-link">{c.label}</Link>
                                  </motion.div>
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
                      >
                        {l.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV.length * 0.04 }}
                >
                  <Link href="/contact" className="m-cta">Get a Free Quote</Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
