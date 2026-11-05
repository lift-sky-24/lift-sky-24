"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "./ui";
import { PRICING } from "@/data/site-config";
import dynamic from "next/dynamic";

const TiltCard = dynamic(() => import("@/components/animation/TiltCard"), { ssr: false });

// TODO: set real prices in data/site-config.js → PRICING array

export default function PricingTable() {
  return (
    <Stagger className="card-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ overflow: "visible", paddingTop: "18px" }}>
      {PRICING.map((plan, idx) => (
        <StaggerItem key={plan.name}>
          <TiltCard maxDeg={4} scaleOnHover={1.02} className="h-full" style={{ overflow: "visible" }}>
            <PriceCard plan={plan} idx={idx} />
          </TiltCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function PriceCard({ plan, idx = 0 }) {
  const popular = plan.popular;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      data-aos="fade-up"
      data-aos-delay={idx * 100}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 28,
        padding: 32,
        background: popular
          ? "linear-gradient(145deg,#f0eeff 0%,#fff 60%)"
          : "#fff",
        border: popular ? "none" : "1px solid #f1f0f8",
        /* Glowing ring for popular */
        boxShadow: popular
          ? "0 0 0 2px #6557ff, 0 12px 40px rgba(101,87,255,.18)"
          : "0 2px 16px rgba(16,17,26,.06)",
        paddingTop: popular ? 44 : 32,
      }}
    >
      {/* Most Popular badge */}
      {popular && (
        <motion.span
          initial={{ y: -8, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 20 }}
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(110deg,#6557ff,#ff4fa3)",
            color: "#fff",
            padding: "4px 18px",
            borderRadius: 99,
            fontSize: 11,
            fontWeight: 800,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(101,87,255,.35)",
          }}
        >
          ✦ Most Popular
        </motion.span>
      )}

      {/* Plan name */}
      <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
        {plan.name}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        {plan.priceFrom === "Custom" ? (
          <span style={{ fontSize: 36, fontWeight: 900, color: "var(--ink)", letterSpacing: "-1px" }}>Custom</span>
        ) : (
          <>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>Starting from</span>
            <motion.span
              style={{ fontSize: 36, fontWeight: 900, color: "var(--ink)", letterSpacing: "-1px" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.08, duration: 0.45 }}
            >
              {plan.priceFrom}
            </motion.span>
          </>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>

      {/* Features */}
      <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {plan.features.map((f, i) => (
          <motion.li
            key={f}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#475569" }}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <span style={{ flexShrink: 0, marginTop: 2, color: "#22c55e" }}>
              <Check size={14} aria-hidden="true" />
            </span>
            {f}
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        style={{
          display: "block",
          textAlign: "center",
          borderRadius: 99,
          padding: "13px 24px",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          transition: "filter .2s, transform .2s",
          background: popular
            ? "linear-gradient(110deg,#6557ff,#ff4fa3)"
            : "transparent",
          color: popular ? "#fff" : "var(--purple)",
          border: popular ? "none" : "1.5px solid rgba(101,87,255,.35)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
