"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Rocket, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const isActive = (h) => (h === "/" ? path === "/" : path.startsWith(h));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-navy-900" aria-label="LiftSky24 home">
        <img width={120} height={30} src="images/logo.png" />
      
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((l) => (
            <li key={l.label} className="group relative">
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex items-center gap-1 border-b-2 py-5 text-sm font-medium transition hover:text-brand ${isActive(l.href) ? "border-brand text-brand" : "border-transparent text-slate-700"}`}>
                {l.label}{l.children && <ChevronDown size={14} />}
              </Link>
              {l.children && (
                <ul className="invisible absolute left-0 top-full w-56 translate-y-1 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-card transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {l.children.map((c) => (
                    <li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-light hover:text-brand">{c.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/blog" aria-label="Search articles" className="rounded-full p-2 text-slate-600 hover:bg-brand-light hover:text-brand"><Search size={18} /></Link>
          <Link href="/contact" className="rounded-full bg-brand-gradient px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110">Get a Free Quote</Link>
        </div>

        <button className="rounded-lg p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-100 bg-white lg:hidden">
            <ul className="space-y-1 px-4 py-4">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={`block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-light ${isActive(l.href) ? "text-brand" : "text-slate-700"}`}>{l.label}</Link>
                  {l.children && (
                    <ul className="ml-4 border-l border-slate-100 pl-3">
                      {l.children.slice(1).map((c) => (<li key={c.href}><Link href={c.href} className="block py-1.5 text-sm text-slate-500 hover:text-brand">{c.label}</Link></li>))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-2"><Link href="/contact" className="block rounded-full bg-brand-gradient px-5 py-3 text-center text-sm font-semibold text-white">Get a Free Quote</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
