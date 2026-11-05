"use client";
/**
 * PageTransition — lightweight route change indicator.
 * NO opacity:0 initial — content never hidden, no flicker, no CLS.
 * Only a subtle translateY entrance so users feel navigation happened.
 * key=pathname still remounts, but content is visible immediately.
 */
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
