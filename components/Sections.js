import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal, Button, Stagger, StaggerItem } from "./ui";

export function Section({ title, sub, children, tone = "white", id, center = false }) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 lg:py-18 ${tone === "soft" ? "bg-slate-50/70" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <Reveal className={`mb-9 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{title}</h2>
            {sub && <p className="mt-2 text-slate-600">{sub}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function IconCards({ items, cols = "lg:grid-cols-3" }) {
  return (
    <Stagger className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((s) => {
        const body = (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand-gradient group-hover:text-white"><s.icon size={22} /></span>
            <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
            {s.d && <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>}
          </>
        );
        const cls = "group block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-card";
        return (
          <StaggerItem key={s.t}>
            {s.href ? <Link href={s.href} className={cls}>{body}</Link> : <div className={cls}>{body}</div>}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function MiniCards({ items, cols = "md:grid-cols-4" }) {
  return (
    <Stagger className={`grid grid-cols-2 gap-4 ${cols}`}>
      {items.map((w) => (
        <StaggerItem key={w.t}>
          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-card">
            {w.icon && <w.icon className="text-brand" size={26} />}
            <h3 className="mt-3 text-sm font-semibold text-navy-900">{w.t}</h3>
            {w.d && <p className="mt-1 text-xs leading-relaxed text-slate-500">{w.d}</p>}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Steps({ items }) {
  return (
    <Stagger as="ol" className={`grid gap-5 sm:grid-cols-2 ${items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <StaggerItem key={s.t}>
          <div className="h-full rounded-2xl border border-slate-100 bg-white p-6">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{i + 1}</span>
            <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const hues = ["bg-indigo-100 text-indigo-700", "bg-violet-100 text-violet-700", "bg-fuchsia-100 text-fuchsia-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"];
export function TechGrid({ items }) {
  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((t, i) => (
        <StaggerItem key={t}>
          <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white text-sm font-semibold text-navy-900 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
            <span className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold ${hues[i % hues.length]}`}>{t[0]}</span>
            {t}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function CTABand({ title, sub, button = "Get a Free Quote", href = "/contact" }) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-navy-800 via-indigo-700 to-brand-violet p-8 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            {sub && <p className="mt-2 max-w-xl text-white/80">{sub}</p>}
          </div>
          <Button href={href} variant="light" className="shrink-0">{button}</Button>
        </div>
      </Reveal>
    </section>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-center gap-3 text-sm text-white/90">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300"><Check size={13} /></span>{p}
        </li>
      ))}
    </ul>
  );
}
