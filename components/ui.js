"use client";
import Link from "next/link";
import { motion, useInView, useReducedMotion, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fade + slide up on scroll, once only.
 * Uses `amount: 0.1` (10% visible) to avoid triggering before element is in view.
 */
export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counter — animates 0 → value when scrolled into view.
 * SSR renders final value so no flash. Resets to 0 on client before animating.
 */
export function Counter({ to, suffix = "" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [v, setV] = useState(to); // SSR: render final value

  useEffect(() => {
    if (!inView) return;
    setV(0); // reset before animation
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => c.stop();
  }, [inView, to]);

  return <span ref={ref}>{v}{suffix}</span>;
}

/**
 * ParallaxImage — subtle scroll parallax on images.
 */
export function ParallaxImage({ children }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 40]);
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Stagger — staggered entrance for card grids.
 * `once: true` + `amount: 0.05` means it fires as soon as the container
 * enters the viewport, preventing premature triggers.
 */
export function Stagger({ children, className = "", as = "ul" }) {
  const Tag = motion[as] ?? motion.ul;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {children}
    </Tag>
  );
}

export const StaggerItem = ({ children, className = "" }) => (
  <motion.li
    className={className}
    variants={{
      hidden: { opacity: 0, y: 18 },
      show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    }}
  >
    {children}
  </motion.li>
);

/**
 * Button — link-based button, 3 variants.
 */
export function Button({ href = "/contact", children, variant = "primary", className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95";
  const styles = {
    primary: "bg-brand-gradient text-white shadow-card hover:brightness-110",
    outline: "border border-brand/30 bg-white text-brand hover:bg-brand-light",
    light:   "bg-white text-navy-900 hover:bg-brand-light",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
