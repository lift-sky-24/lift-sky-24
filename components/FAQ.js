"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui";
import { FAQS } from "@/data/site-config";

export default function FAQ({ items, title = "Frequently Asked Questions", className = "" }) {
  const data = items ?? FAQS;
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-20 ${className}`}>
      <Reveal className="text-center">
        <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">{title}</h2>
      </Reveal>

      <div className="mt-10 space-y-3">
        {data.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={f.q}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white relative"
              animate={{ borderColor: isOpen ? "rgba(101,87,255,.3)" : "rgba(226,232,240,1)" }}
              transition={{ duration: 0.25 }}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              {/* Hover highlight bar */}
              <motion.div
                aria-hidden
                style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                  background: "linear-gradient(180deg,#6557ff,#ff4fa3)",
                  borderRadius: "2px 0 0 2px",
                  transformOrigin: "top",
                }}
                animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <h3>
                <button
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900"
                >
                  <motion.span
                    animate={{ color: isOpen ? "#6557ff" : "#10111a" }}
                    transition={{ duration: 0.2 }}
                  >
                    {f.q}
                  </motion.span>

                  {/* Plus → Minus morph */}
                  <motion.span
                    aria-hidden="true"
                    className="shrink-0 grid h-6 w-6 place-items-center rounded-full"
                    animate={{ background: isOpen ? "#6557ff" : "transparent", rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ border: "1.5px solid", borderColor: isOpen ? "#6557ff" : "#e2e8f0", color: isOpen ? "#fff" : "#6557ff" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <rect x="5" y="0" width="2" height="12" rx="1" />
                      <rect x="0" y="5" width="12" height="2" rx="1" />
                    </svg>
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="px-5 pb-5 text-sm leading-relaxed text-slate-600"
                      initial={{ y: 8 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.05, duration: 0.25 }}
                    >
                      {f.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
