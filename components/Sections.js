import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal, Button, Stagger, StaggerItem } from "./ui";

// Lazy-loaded animation wrappers (client-only, zero cost on server)
// We use a thin import wrapper so server components stay server components
import dynamic from "next/dynamic";
const TiltCard     = dynamic(() => import("@/components/animation/TiltCard"),     { ssr: false });
const SpotlightCard = dynamic(() => import("@/components/animation/SpotlightCard"), { ssr: false });

/* ─────────────────────── Section wrapper ───────────────────────── */
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

/* ─────────────────────── IconCards ─────────────────────────────── */
export function IconCards({ items, cols = "lg:grid-cols-3" }) {
  return (
    <Stagger className={`card-grid grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((s, idx) => {
        const body = (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand-gradient group-hover:text-white group-hover:scale-110 group-hover:rotate-[-6deg] duration-300">
              {s.icon && <s.icon size={22} />}
            </span>
            <h3 className="mt-4 font-semibold text-navy-900 group-hover:text-brand transition-colors duration-200">{s.t}</h3>
            {s.d && <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>}
          </>
        );

        const cardCls = "card-item group block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-card";

        return (
          <StaggerItem key={s.t}>
            <TiltCard className="h-full">
              {s.href
                ? <Link href={s.href} className={cardCls} data-aos="fade-up" data-aos-delay={idx * 60}>{body}</Link>
                : <div className={cardCls} data-aos="fade-up" data-aos-delay={idx * 60}>{body}</div>
              }
            </TiltCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ─────────────────────── MiniCards ─────────────────────────────── */
export function MiniCards({ items, cols = "md:grid-cols-4" }) {
  return (
    <Stagger className={`card-grid grid grid-cols-2 gap-4 ${cols}`}>
      {items.map((w, idx) => (
        <StaggerItem key={w.t}>
          <TiltCard className="h-full" maxDeg={6}>
            <div
              className="card-item flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center transition hover:shadow-card"
              data-aos="zoom-in"
              data-aos-delay={idx * 70}
            >
              {w.icon && (
                <w.icon
                  className="text-brand transition-transform duration-300 group-hover:scale-110"
                  size={26}
                />
              )}
              <h3 className="mt-3 text-sm font-semibold text-navy-900">{w.t}</h3>
              {w.d && <p className="mt-1 text-xs leading-relaxed text-slate-500">{w.d}</p>}
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ─────────────────────── Steps ─────────────────────────────────── */
export function Steps({ items }) {
  return (
    <Stagger as="ol" className={`card-grid grid gap-5 sm:grid-cols-2 ${items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <StaggerItem key={s.t}>
          <SpotlightCard className="card-item h-full rounded-2xl border border-slate-100 bg-white p-6 transition hover:shadow-card" data-aos="fade-up" data-aos-delay={i * 80}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{i + 1}</span>
            <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ─────────────────────── TechGrid ──────────────────────────────── */
const hues = ["bg-indigo-100 text-indigo-700", "bg-violet-100 text-violet-700", "bg-fuchsia-100 text-fuchsia-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"];

export function TechGrid({ items }) {
  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((t, i) => (
        <StaggerItem key={t}>
          <TiltCard maxDeg={8} className="h-full" scaleOnHover={1.04}>
            <div
              className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white text-sm font-semibold text-navy-900 transition hover:border-brand/30 hover:shadow-card"
              data-aos="zoom-in"
              data-aos-delay={i * 40}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold transition-transform duration-300 hover:scale-110 ${hues[i % hues.length]}`}>{t[0]}</span>
              {t}
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ─────────────────────── CTABand ───────────────────────────────── */
export function CTABand({ title, sub, button = "Get a Free Quote", href = "/contact" }) {
  return (
    <section className="px-4 pb-14 sm:px-6 lg:px-8">
      <Reveal>
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl p-8 text-white sm:p-10 md:flex-row md:items-center"
          style={{ background: "radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b" }}
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

/* ─────────────────────── CheckList ─────────────────────────────── */
export function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((p, i) => (
        <li key={p} className="flex items-center gap-3 text-sm text-white/90" data-aos="fade-right" data-aos-delay={i * 60}>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300"><Check size={13} /></span>{p}
        </li>
      ))}
    </ul>
  );
}
