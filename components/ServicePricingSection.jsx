"use client";

/**
 * ServicePricingSection
 * Reusable pricing section — works for any service.
 * Pass the service slug and it pulls its own data from service-pricing.js.
 *
 * Layout:
 *   - Section header (heading + description + billing type badge)
 *   - Note bar (if any)
 *   - Pricing cards grid (2 / 3 / 4 cols responsive)
 *   - Consultation box
 *   - Disclaimer
 */

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, MessageCircle, ArrowRight, Info, Phone } from "lucide-react";
import { servicePricingData, commonPricingFooter } from "@/data/service-pricing";
import { CONTACT } from "@/data/site-config";

/* ─── Reveal helper ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref     = useRef(null);
  const reduced = useReducedMotion();
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0,
        y: direction === "up"    ?  32 : direction === "down"  ? -32 : 0,
        x: direction === "left"  ?  32 : direction === "right" ? -32 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Single plan card ───────────────────────────────────────── */
function PlanCard({ plan, index, reduced }) {
  const isCustom  = plan.price === "Custom";
  const isPopular = plan.popular === true;

  /* WhatsApp URL */
  const waUrl = `https://wa.me/${CONTACT.whatsapp?.replace(/\D/g,"") || "918875796652"}?text=${encodeURIComponent(commonPricingFooter.consultationBox.secondaryCta.whatsappText)}`;

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background:  isPopular ? "#101114" : "#fff",
        border:      isPopular
          ? "1.5px solid rgba(252,110,4,0.60)"
          : "1.5px solid #EAE5DF",
        boxShadow:   isPopular
          ? "0 0 0 4px rgba(252,110,4,0.08), 0 20px 48px rgba(16,17,20,0.22)"
          : "0 4px 24px rgba(16,17,20,0.06)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Popular badge — top-right corner, inside card */}
      {isPopular && (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]"
          style={{ background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)", color: "#101114" }}
        >
          ✦ {plan.badge || "Most Popular"}
        </span>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Plan name */}
        <p className="text-[11px] font-black uppercase tracking-[0.14em]"
          style={{ color: isPopular ? "rgba(255,255,255,0.45)" : "#929292" }}>
          {plan.name}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1.5">
          {isCustom ? (
            <span className="text-4xl font-black" style={{ color: isPopular ? "#FC6E04" : "#171717" }}>
              Custom
            </span>
          ) : (
            <span className="text-4xl font-black" style={{ color: isPopular ? "#FC6E04" : "#171717" }}>
              {plan.price}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs" style={{ color: isPopular ? "rgba(255,255,255,0.40)" : "#929292" }}>
          {plan.billing}
        </p>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed"
          style={{ color: isPopular ? "rgba(255,255,255,0.65)" : "#6B6B70" }}>
          {plan.description}
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full"
          style={{ background: isPopular ? "rgba(255,255,255,0.08)" : "#EAE5DF" }} />

        {/* Features */}
        <ul className="flex flex-1 flex-col gap-2.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm"
              style={{ color: isPopular ? "rgba(255,255,255,0.78)" : "#474747" }}>
              <Check size={14} className="mt-0.5 shrink-0"
                style={{ color: "#FC6E04" }} aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-7">
          {plan.ctaType === "whatsapp" ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background:  isPopular
                  ? "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)"
                  : "#101114",
                color:       isPopular ? "#101114" : "#FC6E04",
                boxShadow:   isPopular ? "0 6px 20px rgba(252,110,4,0.30)" : "none",
              }}
            >
              <MessageCircle size={15} aria-hidden />
              {plan.ctaLabel}
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background:  isPopular
                  ? "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)"
                  : "#101114",
                color:       isPopular ? "#101114" : "#FC6E04",
                boxShadow:   isPopular ? "0 6px 20px rgba(252,110,4,0.30)" : "none",
              }}
            >
              {plan.ctaLabel} <ArrowRight size={14} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function ServicePricingSection({ slug }) {
  const pricing  = servicePricingData[slug];
  const footer   = commonPricingFooter;
  const reduced  = useReducedMotion();

  /* No pricing data for this service — render nothing */
  if (!pricing) return null;

  const plans     = pricing.plans || [];
  /* Grid cols: ≤3 plans → 3 cols max, 4+ plans → 4 cols max */
  const gridCols  = plans.length <= 3
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  /* WhatsApp URL */
  const waUrl = `https://wa.me/${CONTACT.whatsapp?.replace(/\D/g,"") || "918875796652"}?text=${encodeURIComponent(footer.consultationBox.secondaryCta.whatsappText)}`;

  return (
    <section className="py-24" style={{ background: "#F8F7F4" }} aria-labelledby="pricing-heading">
      <div className="mx-auto w-[min(1280px,100%-40px)]">

        {/* ── Section header ── */}
        <div className="text-center">
          <Reveal>
            {/* Billing type badge */}
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ borderColor: "rgba(252,110,4,0.30)", background: "#FFF0E4", color: "#C2410C" }}>
              {pricing.billingType}
            </span>

            <h2 id="pricing-heading"
              className="mt-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: "#171717" }}>
              {pricing.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "#6B6B70" }}>
              {pricing.description}
            </p>
          </Reveal>
        </div>

        {/* ── Note bar ── */}
        {pricing.note && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl rounded-xl border px-5 py-4"
              style={{ borderColor: "rgba(252,110,4,0.25)", background: "#FFF7F0" }}>
              <div className="flex items-start gap-3">
                <Info size={16} className="mt-0.5 shrink-0" style={{ color: "#FC6E04" }} aria-hidden />
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B70" }}>
                  <strong style={{ color: "#C2410C", fontWeight: 700 }}>Note: </strong>
                  {pricing.note}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Plan cards ── */}
        <div className={`mt-12 grid gap-6 ${gridCols}`}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} reduced={reduced} />
          ))}
        </div>

        {/* ── Consultation box ── */}
        <Reveal delay={0.15}>
          <div
            className="mx-auto mt-14 max-w-3xl rounded-2xl px-8 py-10 text-center"
            style={{
              background: "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)",
              boxShadow:  "0 20px 48px rgba(16,17,20,0.20)",
            }}
          >
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {footer.consultationBox.heading}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "rgba(255,255,255,0.65)" }}>
              {footer.consultationBox.description}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href={footer.consultationBox.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                  color: "#101114",
                  boxShadow: "0 8px 24px rgba(252,110,4,0.30)",
                }}
              >
                {footer.consultationBox.primaryCta.label} <ArrowRight size={15} aria-hidden />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(252,110,4,0.45)" }}
              >
                <MessageCircle size={15} aria-hidden />
                {footer.consultationBox.secondaryCta.label}
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Disclaimer ── */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl rounded-xl border px-6 py-5"
            style={{ borderColor: "#EAE5DF", background: "#fff" }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: "#929292" }}>
              {footer.disclaimerTitle}
            </p>
            <ul className="space-y-1.5">
              {footer.disclaimers.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed"
                  style={{ color: "#6B6B70" }}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "#FC6E04" }} aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
