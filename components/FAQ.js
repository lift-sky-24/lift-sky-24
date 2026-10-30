"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./ui";

const faqs = [
  { q: "How long does a typical website project take?", a: "Most business websites take 4 to 8 weeks from kickoff to launch. Larger web apps are planned in phases with a clear timeline up front." },
  { q: "Do you build both iOS and Android apps?", a: "Yes. We build native and cross-platform apps with Flutter, Swift and Kotlin, depending on what fits your product and budget." },
  { q: "Will my website be SEO-friendly?", a: "Every site we build uses semantic markup, fast loading and clean metadata, so search engines can crawl and rank it well." },
  { q: "Do you offer support after launch?", a: "Yes. We offer maintenance plans covering updates, monitoring, security patches and small improvements." },
  { q: "How do I get a quote?", a: "Send us a short brief using the contact form. We reply within one business day with questions or a first estimate." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-20">
      <Reveal className="text-center"><h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Frequently Asked Questions</h2></Reveal>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-2xl border border-slate-100 bg-white">
              <h3>
                <button id={`faq-btn-${i}`} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900">
                  {f.q}
                  <Plus size={18} className={`shrink-0 text-brand transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
