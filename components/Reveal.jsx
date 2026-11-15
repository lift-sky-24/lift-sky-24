"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function Reveal({ children, delay = 0, direction = "up" }) {
  const ref     = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up"    ?  40 : direction === "down"  ? -40 : 0,
        x: direction === "left"  ?  40 : direction === "right" ? -40 : 0,
      }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
