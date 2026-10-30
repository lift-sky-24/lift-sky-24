"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const cats = ["All", "Web Apps", "Mobile Apps", "UI/UX", "Software"];

export default function ProjectGrid({ filters = false, limit, cols = "lg:grid-cols-4" }) {
  const [active, setActive] = useState("All");
  let list = projects.filter((p) => active === "All" || p.c === active);
  if (limit) list = list.slice(0, limit);
  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={active === c} onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${active === c ? "bg-brand-gradient text-white" : "bg-brand-light text-brand hover:bg-indigo-100"}`}>{c}</button>
          ))}
        </div>
      )}
      <motion.ul layout className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li key={p.t} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3 }}>
              <Link href="/contact" className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:shadow-card">
                <div className="overflow-hidden">
                  <Image src={p.img} alt={`${p.t} project preview`} width={480} height={320} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div><h3 className="font-semibold text-navy-900">{p.t}</h3><p className="text-xs text-slate-500">{p.c}</p></div>
                  <ArrowUpRight size={18} className="text-slate-400 transition group-hover:text-brand" />
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
