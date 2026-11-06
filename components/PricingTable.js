"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "./ui";
import { PRICING } from "@/data/site-config";
import dynamic from "next/dynamic";

const TiltCard = dynamic(() => import("@/components/animation/TiltCard"), { ssr: false });

export default function PricingTable() {
  return (
    <Stagger className="card-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ overflow: "visible", paddingTop: "18px" }}>
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
        paddingTop: popular ? 44 : 32,
        /* Popular: dark bg; others: white */
        background: popular ? "#101114" : "#fff",
        border: popular ? "none" : "1px solid #EAE5DF",
        boxShadow: popular
          ? "0 0 0 2px #FC6E04, 0 16px 40px rgba(252,110,4,0.20)"
          : "0 2px 16px rgba(16,17,20,.05)",
      }}
    >
      {/* Most Popular badge — orange */}
      {popular && (
        <motion.span
          initial={{ y: -8, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 20 }}
          style={{
            position: "absolute", top: -14, left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
            color: "#101114",
            padding: "4px 18px", borderRadius: 99,
            fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(252,110,4,0.35)",
          }}
        >
          ✦ Most Popular
        </motion.span>
      )}

      {/* Plan name */}
      <p style={{
        fontSize: 11, fontWeight: 800, letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: popular ? "rgba(255,255,255,0.5)" : "#929292",
        marginBottom: 12,
      }}>
        {plan.name}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        {plan.priceFrom === "Custom" ? (
          <span style={{ fontSize: 36, fontWeight: 900, color: popular ? "#FC6E04" : "#171717", letterSpacing: "-1px" }}>
            Custom
          </span>
        ) : (
          <>
            <span style={{ fontSize: 11, fontWeight: 600, color: popular ? "rgba(255,255,255,0.4)" : "#929292" }}>
              Starting from
            </span>
            <motion.span
              style={{ fontSize: 36, fontWeight: 900, color: popular ? "#FC6E04" : "#171717", letterSpacing: "-1px" }}
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
      <p style={{
        fontSize: 14, lineHeight: 1.6, marginBottom: 24,
        color: popular ? "rgba(255,255,255,0.65)" : "#6B6B70",
      }}>
        {plan.desc}
      </p>

      {/* Features */}
      <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {plan.features.map((f, i) => (
          <motion.li
            key={f}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14,
              color: popular ? "rgba(255,255,255,0.80)" : "#475569" }}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.06 }}
          >
            <span style={{ flexShrink: 0, marginTop: 2, color: popular ? "#FC6E04" : "#22c55e" }}>
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
          display: "block", textAlign: "center",
          borderRadius: 99, padding: "13px 24px",
          fontSize: 14, fontWeight: 700, textDecoration: "none",
          transition: "background .22s, color .22s, transform .2s, box-shadow .2s",
          background: popular ? "#FC6E04" : "#101114",
          color: popular ? "#101114" : "#FC6E04",
          border: popular ? "none" : "1.5px solid #101114",
        }}
        onMouseEnter={(e) => {
          if (popular) {
            e.currentTarget.style.background = "#FF8A1F";
          } else {
            e.currentTarget.style.background = "#FC6E04";
            e.currentTarget.style.color = "#101114";
            e.currentTarget.style.borderColor = "#FC6E04";
          }
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(252,110,4,0.28)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = popular ? "#FC6E04" : "#101114";
          e.currentTarget.style.color = popular ? "#101114" : "#FC6E04";
          e.currentTarget.style.borderColor = popular ? "none" : "#101114";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
