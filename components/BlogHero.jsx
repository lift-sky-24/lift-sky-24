"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const BG_IMAGE = "/Bg/liftsky24-blog-hero.webp";

export default function BlogHero() {
  const reduced = useReducedMotion();

  return (
    <>
      <style>{`
        /* Tablet: shift slightly left so books stay visible */
        @media (max-width: 1199px) and (min-width: 768px) {
          #blog-hero { background-position: 70% center !important; }
        }
        /* Mobile */
        @media (max-width: 767px) {
          #blog-hero { background-position: 60% center !important; }
        }
      `}</style>

      <section
        id="blog-hero"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(520px,65vh,650px)",
          background: "#080A0D",
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient overlay — darkens left side for text contrast, fades toward the books */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(8,10,13,0.88) 0%, rgba(8,10,13,0.75) 35%, rgba(8,10,13,0.40) 60%, rgba(8,10,13,0.08) 100%)",
          }}
        />

        {/* Extra mobile overlay — heavier across the full width */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: "rgba(8,10,13,0.50)" }}
        />

        {/* Content */}
        <div
          className="relative z-10 mx-auto flex h-full w-[min(1200px,100%-40px)] flex-col justify-center py-20"
          style={{ minHeight: "inherit" }}
        >
          <div className="max-w-[560px]">

            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: "rgba(252,110,4,0.40)", background: "rgba(252,110,4,0.10)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 }}
            >
              <BookOpen size={12} style={{ color: "#FC6E04" }} aria-hidden="true" />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "#FF8A1F" }}
              >
                The LiftSky24 Blog
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mt-5 font-black leading-[1.07] tracking-tight"
              style={{ fontSize: "clamp(2rem,4vw,3.4rem)", color: "#fff" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Ideas That{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}
              >
                Inspire.
              </span>
              <br />
              Insights That Drive{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}
              >
                Growth.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-5 text-base leading-relaxed sm:text-[1.05rem]"
              style={{ color: "#B8B8BE", maxWidth: "46ch" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 }}
            >
              Explore practical insights, expert perspectives and the latest trends in technology,
              design, SEO and digital marketing to help your business grow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8 }}
            >
              {/* Primary */}
              <motion.div
                whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="#articles"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                  style={{
                    background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                    color: "#101114",
                    boxShadow: "0 8px 24px rgba(252,110,4,0.28)",
                  }}
                >
                  Explore Latest Articles <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Secondary */}
              <motion.div
                whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: "rgba(252,110,4,0.45)", color: "#fff" }}
                >
                  Discover Our Expertise
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
