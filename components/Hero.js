"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, Counter } from "./ui";

const stats = [
  { n: 500, s: "+", l: "Happy Clients" },
  { n: 120, s: "+", l: "Projects Completed" },
  { n: 5, s: "+", l: "Years Experience" },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  return (
    <section className="relative overflow-hidden bg-hero-wash">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            We&apos;re More Than Just a{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">Tech Company</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
            LiftSky24 is a leading IT services company delivering innovative web, mobile and AI solutions that help growing businesses scale with confidence.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">Get a Free Quote</Button>
            <Button href="#services" variant="outline">Explore Our Services</Button>
          </motion.div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl font-bold text-navy-900 sm:text-3xl"><Counter to={s.n} suffix={s.s} /></dd>
                <p className="text-xs text-slate-500">{s.l}</p>
              </div>
            ))}
          </dl>
        </div>
        <motion.div style={{ y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <Image src="/images/hero.svg" alt="LiftSky24 team building web and mobile products" width={640} height={460} priority className="h-auto w-full rounded-3xl shadow-card" />
        </motion.div>
      </div>
    </section>
  );
}
