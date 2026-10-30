"use client";
import Link from "next/link";
import { motion, useInView, useReducedMotion, animate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function ParallaxImage({ children }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 40]);
  return (
    <motion.div style={{ y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", as = "ul" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      {children}
    </Tag>
  );
}
export const StaggerItem = ({ children, className = "" }) => (
  <motion.li className={className} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
    {children}
  </motion.li>
);

export function Button({ href = "/contact", children, variant = "primary", className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95";
  const styles = {
    primary: "bg-brand-gradient text-white shadow-card hover:brightness-110",
    outline: "border border-brand/30 bg-white text-brand hover:bg-brand-light",
    light: "bg-white text-navy-900 hover:bg-brand-light",
  };
  return <Link href={href} className={`${base} ${styles[variant]} ${className}`}>{children}</Link>;
}
