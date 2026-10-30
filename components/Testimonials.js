"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "./ui";

const items = [
  { q: "LiftSky24 rebuilt our storefront in six weeks and our checkout conversion rose noticeably. Communication was clear throughout.", n: "Amit Sharma", r: "Founder, RetailNest" },
  { q: "Their team understood our healthcare workflows quickly and delivered a mobile app our staff actually enjoy using.", n: "Priya Singh", r: "CTO, MediTrack" },
  { q: "Great design sense and solid engineering. They handled launch and post-launch support without any drama.", n: "Rahul Verma", r: "Director, UrbanKey Realty" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, []);
  const go = (d) => setI((v) => (v + d + items.length) % items.length);
  const t = items[i];
  return (
    <section aria-label="Testimonials" className="bg-slate-50/70 py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="text-center"><h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">What Our Clients Say</h2></Reveal>
        <div className="relative mt-10 rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-card sm:p-12" aria-live="polite">
          <Quote className="mx-auto text-brand/40" />
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <blockquote className="mt-4 text-lg leading-relaxed text-slate-700">{t.q}</blockquote>
              <figcaption className="mt-6">
                <span className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-brand-gradient font-bold text-white">{t.n[0]}</span>
                <p className="font-semibold text-navy-900">{t.n}</p>
                <p className="text-sm text-slate-500">{t.r}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full border border-slate-200 bg-white p-2 hover:bg-brand-light"><ChevronLeft size={18} /></button>
          <div className="flex gap-2">
            {items.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-brand" : "w-2 bg-slate-300"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full border border-slate-200 bg-white p-2 hover:bg-brand-light"><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
