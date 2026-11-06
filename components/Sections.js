import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal, Button, Stagger, StaggerItem } from "./ui";

/* ── Section wrapper ──────────────────────────────────────────────── */
export function Section({ title, sub, children, tone = "white", id, center = false }) {
  const bgMap = {
    white: "",
    soft:  "bg-gradient-to-b from-white to-[#FFF7F0]",
  };

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-14 lg:py-18 ${tone === "soft" ? bgMap.soft : ""}`}
    >
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

/* ── IconCards ────────────────────────────────────────────────────── */
export function IconCards({ items, cols = "lg:grid-cols-3" }) {
  return (
    <Stagger className={`card-grid grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((s) => {
        const body = (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-[#101114] group-hover:scale-110 group-hover:rotate-[-6deg]">
              {s.icon && <s.icon size={22} />}
            </span>
            <h3 className="mt-4 font-semibold text-navy-900 transition-colors duration-200 group-hover:text-brand">{s.t}</h3>
            {s.d && <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>}
          </>
        );
        const cardCls = "card-item group relative overflow-hidden block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-card hover:border-transparent transition-all duration-300";
        return (
          <StaggerItem key={s.t}>
            {s.href
              ? <Link href={s.href} className={cardCls}>{body}</Link>
              : <div className={cardCls}>{body}</div>
            }
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ── MiniCards ────────────────────────────────────────────────────── */
export function MiniCards({ items, cols = "md:grid-cols-4" }) {
  return (
    <Stagger className={`card-grid grid grid-cols-2 gap-4 ${cols}`}>
      {items.map((w) => (
        <StaggerItem key={w.t}>
          <div className="card-item flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center hover:-translate-y-1 hover:shadow-card transition-all duration-300">
            {w.icon && <w.icon className="text-brand" size={26} />}
            <h3 className="mt-3 text-sm font-semibold text-navy-900">{w.t}</h3>
            {w.d && <p className="mt-1 text-xs leading-relaxed text-slate-500">{w.d}</p>}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ── Steps (kept for ServiceDetailPage per-service process) ──────── */
export function Steps({ items }) {
  return (
    <Stagger as="ol" className={`card-grid grid gap-5 sm:grid-cols-2 ${items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <StaggerItem key={s.t}>
          <div className="card-item h-full rounded-2xl border border-slate-100 bg-white p-6 hover:-translate-y-1 hover:shadow-card transition-all duration-300">
            <h3 className="font-semibold text-navy-900">{s.t}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ── TechGrid ─────────────────────────────────────────────────────── */
const hues = [
  "bg-[#FFF0E4] text-[#E04F00]", "bg-[#FFF0E4] text-[#FC6E04]",
  "bg-[#FFF0E4] text-[#FF8A1F]", "bg-[#FFF0E4] text-[#E04F00]",
  "bg-emerald-50 text-emerald-700", "bg-amber-50 text-amber-700",
];
export function TechGrid({ items }) {
  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((t, i) => (
        <StaggerItem key={t}>
          <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white text-sm font-semibold text-navy-900 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card transition-all duration-300">
            <span className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold ${hues[i % hues.length]}`}>{t[0]}</span>
            {t}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ── CTABand ──────────────────────────────────────────────────────── */
export function CTABand({ title, sub, button = "Get a Free Quote", href = "/contact" }) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <Reveal>
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl p-8 text-white sm:p-10 md:flex-row md:items-center"
          style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            {sub && <p className="mt-2 max-w-xl text-white/80">{sub}</p>}
          </div>
          <div className="relative z-10 shrink-0">
            <Button href={href} variant="light">{button}</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── CheckList ────────────────────────────────────────────────────── */
export function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-center gap-3 text-sm text-white/90">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
            <Check size={13} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}
