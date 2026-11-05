"use client";
/**
 * PageTransition — simple fade-in on route change.
 * Using motion.div with animate-only (no exit) so content is ALWAYS
 * immediately in the DOM and never hidden during transition.
 * Library: Framer Motion.
 */
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
