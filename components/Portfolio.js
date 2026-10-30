"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./ui";

const cats = ["All", "Web Apps", "Mobile Apps", "UI/UX"];
const projects = [
  { t: "E-Commerce Platform", c: "Web Apps", img: "/images/project-1.svg" },
  { t: "Healthcare App", c: "Mobile Apps", img: "/images/project-2.svg" },
  { t: "Real Estate Website", c: "Web Apps", img: "/images/project-3.svg" },
  { t: "Travel Booking App", c: "Mobile Apps", img: "/images/project-4.svg" },
  { t: "Finance Dashboard", c: "UI/UX", img: "/images/project-2.svg" },
  { t: "Food Delivery App", c: "UI/UX", img: "/images/project-4.svg" },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const list = projects.filter((p) => active === "All" || p.c === active);
  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading title="Featured Projects" sub="A selection of work we are proud of." />
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={active === c} onClick={() => setActive(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${active === c ? "bg-brand-gradient text-white" : "bg-brand-light text-brand hover:bg-indigo-100"}`}>
            {c}
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li key={p.t} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3 }}>
              <a href="#contact" className="group relative block overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="overflow-hidden">
                  <Image src={p.img} alt={`${p.t} project preview`} width={480} height={320} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div><h3 className="font-semibold text-navy-900">{p.t}</h3><p className="text-xs text-slate-500">{p.c}</p></div>
                  <ArrowUpRight className="text-slate-400 transition group-hover:text-brand" size={18} />
                </div>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
