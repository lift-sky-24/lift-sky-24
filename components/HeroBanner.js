"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* One layer of the uploaded illustration (same 1000x680 canvas, stacked on top of each other). */
function Layer({ name, animate, transition, initial, delay = 0 }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={initial ?? { opacity: 0, y: 24 }}
      whileInView={undefined}
      animate={animate}
      transition={transition}
      style={{ willChange: "transform" }}
    >
      <Image src={`/images/hero-layers/${name}.svg`} alt="" fill unoptimized priority sizes="(min-width:1024px) 600px, 100vw" className="select-none object-contain" draggable={false} />
    </motion.div>
  );
}

/* ---------- visual (right side): your uploaded SVG, split into layers and animated ---------- */
function HeroVisual() {
  const reduce = useReducedMotion();
  // looping float + one-time entrance
  const float = (y, dur, delay = 0) =>
    reduce
      ? { animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } }
      : {
          animate: { opacity: 1, y: [0, -y, 0] },
          transition: {
            opacity: { duration: 0.6, delay },
            y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
          },
        };
  const enter = (d) => ({ initial: { opacity: 0, scale: 0.85, y: 10 }, delay: d });

  return (
    <div className="relative mx-auto aspect-[1000/680] w-full max-w-[640px]" role="img" aria-label="LiftSky24 illustration: laptop and phone with web development, mobile apps and AI solutions">
      <Layer name="base" initial={{ opacity: 0, y: 30 }} {...float(7, 6)} />
      <Layer name="phone" initial={{ opacity: 0, y: 40 }} {...float(12, 4.4, 0.25)} />
      <Layer name="card" initial={{ opacity: 0, x: -30 }} {...float(9, 4.8, 0.4)} />
      <Layer name="web" {...enter(0.6)} {...float(8, 3.6, 0.6)} />
      <Layer name="mobile" {...enter(0.75)} {...float(8, 4.1, 0.75)} />
      <Layer name="ai" {...enter(0.9)} {...float(8, 4.6, 0.9)} />
      <Layer
        name="glints"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
        transition={reduce ? { duration: 0.4 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- main component ---------- */
const avatars = [
  { i: "A", c: "from-amber-400 to-orange-500" },
  { i: "P", c: "from-pink-400 to-rose-500" },
  { i: "R", c: "from-sky-400 to-indigo-500" },
  { i: "N", c: "from-emerald-400 to-teal-500" },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7F5FF] to-[#F3EEFF]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-16">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Modern IT Solutions for a Better Tomorrow
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl">
            Elevating Businesses Through{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Technology</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-5 max-w-md leading-relaxed text-slate-600">
            LiftSky24 is a leading IT services company, delivering innovative web solutions, mobile apps, and digital transformation services to help businesses grow in the digital world.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95">
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="inline-flex items-center rounded-full border border-indigo-300 bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50 active:scale-95">
              Our Services
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 flex items-center gap-3">
            <ul className="flex -space-x-2">
              {avatars.map((a) => (
                <li key={a.i} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${a.c} text-xs font-bold text-white`} aria-hidden="true">{a.i}</li>
              ))}
            </ul>
            <p className="text-xs leading-snug text-slate-600">Trusted by <strong className="text-navy-900">500+</strong> businesses<br />worldwide</p>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
