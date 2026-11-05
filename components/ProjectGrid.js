"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FolderOpen, Sparkles } from "lucide-react";
import { PORTFOLIO } from "@/data/site-config";
import dynamic from "next/dynamic";

const TiltCard = dynamic(() => import("@/components/animation/TiltCard"), { ssr: false });

const ALL_CATS = ["All", "Web Apps", "Mobile Apps", "Software", "Design"];

export default function ProjectGrid({ filters = false, limit, cols = "lg:grid-cols-3" }) {
  const [active, setActive] = useState("All");

  let list = PORTFOLIO.filter((p) => active === "All" || p.category === active);
  if (limit) list = list.slice(0, limit);

  // ── Empty state (current) ──────────────────────────────────────────
  if (PORTFOLIO.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated icon */}
        <motion.div
          className="empty-state-icon"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FolderOpen size={36} className="text-brand opacity-70" aria-hidden="true" />
        </motion.div>

        {/* Floating sparkles */}
        {[[-30, -20], [30, -15], [-20, 20], [25, 25]].map(([x, y], i) => (
          <motion.span
            key={i}
            aria-hidden
            style={{ position: "absolute", color: "#6557ff", opacity: 0.3 }}
            animate={{ y: [y, y - 10, y], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >
            <Sparkles size={i % 2 === 0 ? 14 : 10} />
          </motion.span>
        ))}

        <h3 className="text-xl font-bold text-navy-900">Our case studies are on the way</h3>
        <p className="max-w-sm text-sm text-slate-500">
          We&apos;re documenting our recent work. Check back soon — or start your own project with us today.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link href="/contact" className="btn-dark-pill">Start your project</Link>
        </motion.div>
      </motion.div>
    );
  }

  // ── Grid (ready for when projects are added) ──────────────────────
  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {ALL_CATS.map((c) => (
            <motion.button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${active === c ? "bg-brand-gradient text-white" : "bg-brand-light text-brand hover:bg-indigo-100"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {c}
            </motion.button>
          ))}
        </div>
      )}

      <motion.ul layout className={`card-grid grid gap-5 sm:grid-cols-2 ${cols}`}>
        <AnimatePresence mode="popLayout">
          {list.map((p, idx) => (
            <motion.li
              key={p.slug}
              layout
              className="card-item"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <TiltCard className="h-full" maxDeg={6}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:shadow-card"
                  data-cursor-label="View"
                >
                  <div className="overflow-hidden">
                    <motion.div whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }}>
                      <Image
                        src={p.image}
                        alt={`${p.title} — ${p.category} project`}
                        width={480} height={320} loading="lazy"
                        className="h-auto w-full"
                      />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold text-navy-900 group-hover:text-brand transition-colors">{p.title}</h3>
                      <p className="text-xs text-slate-500">{p.category}</p>
                    </div>
                    <motion.span
                      className="text-slate-400 group-hover:text-brand"
                      animate={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </motion.span>
                  </div>
                </Link>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
