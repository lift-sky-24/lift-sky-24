"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const avatars = [
  { i: "A", c: "from-amber-400 to-orange-500" },
  { i: "P", c: "from-pink-400 to-rose-500" },
  { i: "R", c: "from-sky-400 to-indigo-500" },
  { i: "N", c: "from-emerald-400 to-teal-500" },
];

/* Image ke edges ko section ke gradient mein fade karta hai (hard box line nahi dikhti) */
const IMAGE_MASK = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7F5FF] to-[#F3EEFF]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:py-16">
        {/* ---------------- Left: content ---------------- */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Modern IT Solutions for a Better Tomorrow
          </motion.span>

          {/* Heading hamesha 2 lines mein */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 text-[clamp(1.6rem,3.3vw,3rem)] font-extrabold leading-[1.12] tracking-tight text-navy-900"
          >
            <span className="block whitespace-nowrap">Elevating Businesses</span>
            <span className="block whitespace-nowrap">
              Through{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Technology</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 max-w-md leading-relaxed text-slate-600"
          >
            LiftSky24 is a leading IT services company, delivering innovative web solutions, mobile apps, and digital transformation services to help businesses grow in the digital world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-indigo-300 bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50 active:scale-95"
            >
              Our Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            <ul className="flex -space-x-2">
              {avatars.map((a) => (
                <li
                  key={a.i}
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${a.c} text-xs font-bold text-white`}
                  aria-hidden="true"
                >
                  {a.i}
                </li>
              ))}
            </ul>
            <p className="text-xs leading-snug text-slate-600">
              Trusted by <strong className="text-navy-900">500+</strong> businesses
              <br />
              worldwide
            </p>
          </motion.div>
        </div>

        {/* ---------------- Right: image (no animation, background blended) ---------------- */}
        <div className="relative mx-auto aspect-[1000/680] w-full max-w-[640px]">
          <Image
            src="/images/home_hero.png"
            alt="LiftSky24 IT solutions illustration"
            fill
            priority
            unoptimized
            sizes="(min-width:1024px) 600px, 100vw"
            draggable={false}
            className="select-none object-contain mix-blend-multiply"
            style={IMAGE_MASK}
          />
        </div>
      </div>
    </section>
  );
}