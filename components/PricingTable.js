"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui";
import { plans } from "@/lib/data";

export default function PricingTable() {
  const [yearly, setYearly] = useState(false);
  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-3 text-sm font-medium">
        <span className={yearly ? "text-slate-500" : "text-navy-900"}>Monthly</span>
        <button role="switch" aria-checked={yearly} aria-label="Bill yearly" onClick={() => setYearly(!yearly)}
          className={`relative h-7 w-14 rounded-full transition ${yearly ? "bg-brand-gradient" : "bg-slate-300"}`}>
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${yearly ? "left-8" : "left-1"}`} />
        </button>
        <span className={yearly ? "text-navy-900" : "text-slate-500"}>Yearly</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Save 20%</span>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = p.custom ? "Custom" : `$${yearly ? Math.round(p.monthly * 0.8) : p.monthly}`;
          return (
            <motion.li key={p.name} whileHover={{ y: -6 }} className={`relative rounded-3xl border bg-white p-7 ${p.popular ? "border-brand shadow-card" : "border-slate-100"}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">Most Popular</span>}
              <h3 className="font-semibold text-navy-900">{p.name}</h3>
              <p className="mt-3 text-4xl font-extrabold text-navy-900">{price}{!p.custom && <span className="text-base font-medium text-slate-500">/month</span>}</p>
              {!p.custom && yearly && <p className="mt-1 text-xs text-slate-500">Billed yearly</p>}
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-brand" />{f}</li>
                ))}
              </ul>
              <Button href="/contact" variant={p.popular ? "primary" : "outline"} className="mt-7 w-full">{p.cta}</Button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
