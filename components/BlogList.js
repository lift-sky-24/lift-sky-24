"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { posts, blogCats } from "@/lib/data";

const PER = 6;

export default function BlogList() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const list = useMemo(() => posts.filter((p) => (cat === "All" || p.c === cat) && p.t.toLowerCase().includes(q.toLowerCase())), [cat, q]);
  const pages = Math.max(1, Math.ceil(list.length / PER));
  const shown = list.slice((page - 1) * PER, page * PER);
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
          {blogCats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => { setCat(c); setPage(1); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${cat === c ? "bg-brand-gradient text-[#101114]" : "bg-brand-light text-brand hover:bg-[#FFD4B3]"}`}>{c}</button>
          ))}
        </div>
        <label className="relative block md:w-64">
          <span className="sr-only">Search articles</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search articles…" className="w-full rounded-full border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        </label>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">No articles match your search. Try a different keyword or category.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.t}>
              <article className="group h-full overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-card">
                <div className="overflow-hidden"><Image src={p.img} alt={`${p.t} cover`} width={480} height={320} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-brand">{p.c} · {p.d}</p>
                  <h3 className="mt-2 font-semibold leading-snug text-navy-900">{p.t}</h3>
                  <a href="/contact" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">Read More</a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
          <button aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-full border border-slate-200 p-2 disabled:opacity-40"><ChevronLeft size={16} /></button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} aria-current={page === i + 1} onClick={() => setPage(i + 1)} className={`h-9 w-9 rounded-full text-sm font-medium ${page === i + 1 ? "bg-brand-gradient text-[#101114]" : "hover:bg-brand-light"}`}>{i + 1}</button>
          ))}
          <button aria-label="Next page" disabled={page === pages} onClick={() => setPage(page + 1)} className="rounded-full border border-slate-200 p-2 disabled:opacity-40"><ChevronRight size={16} /></button>
        </nav>
      )}
    </div>
  );
}
