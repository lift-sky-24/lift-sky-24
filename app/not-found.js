"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/data/site-config";
import dynamic from "next/dynamic";

const MagneticButton = dynamic(() => import("@/components/animation/MagneticButton"), { ssr: false });

export const metadata = { title: `Page Not Found | ${BRAND.name}` };

const floaters = [
  { emoji:"🚀", x:-120, y:-60,  delay:0 },
  { emoji:"⚡", x: 140, y:-80,  delay:0.3 },
  { emoji:"✦",  x:-160, y: 80,  delay:0.6 },
  { emoji:"◆",  x: 130, y: 100, delay:0.9 },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Floating shapes */}
      {floaters.map((f, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute text-2xl select-none pointer-events-none"
          style={{ opacity: 0.15, color: "#FC6E04" }}
          animate={{ y: [f.y, f.y - 14, f.y], rotate: [0, 12, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
          initial={{ x: f.x, y: f.y }}
        >
          {f.emoji}
        </motion.span>
      ))}

      {/* Big 404 */}
      <motion.p
        className="text-[9rem] font-black text-brand select-none leading-none"
        style={{ opacity: 0.13 }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.13 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        aria-hidden="true"
      >
        404
      </motion.p>

      <motion.h1
        className="text-3xl font-extrabold text-navy-900 -mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="mt-3 max-w-sm text-slate-500"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
      >
        This page doesn&apos;t exist or may have moved. Use the links below to get back on track.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      >
        <MagneticButton>
          <Link href="/" className="btn-dark-pill">Go Home</Link>
        </MagneticButton>
        <Link href="/services" className="btn-light-pill">Our Services</Link>
        <Link href="/contact" className="btn-light-pill">Contact Us</Link>
      </motion.div>
    </section>
  );
}
