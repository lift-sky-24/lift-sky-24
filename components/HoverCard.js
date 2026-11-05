"use client";
import { motion } from "framer-motion";

/**
 * HoverCard — thin client wrapper that adds a spring lift on hover.
 * Used in Sections.js as an optional enhancement. Card content is
 * always server-rendered; this wrapper is purely decorative.
 */
export default function HoverCard({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(101,87,255,.12)" }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}
