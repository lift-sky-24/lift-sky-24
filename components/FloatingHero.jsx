"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3, Code2, Smartphone, Zap, Shield, TrendingUp, Users, Globe,
  Globe2, Layers, Share2, Search, Palette, Megaphone, Mail, Phone,
  MessageSquare, MapPin, Clock, Handshake, IndianRupee, CheckCircle,
  Rocket, Wrench, Target, Heart, GraduationCap, Building2, ShoppingCart,
  Factory, Landmark, Utensils, Award, Monitor, ShoppingBag, Settings,
  BookOpen, Lightbulb, MessageCircle, Store, Building, ArrowRight,
  RefreshCw, ShieldCheck, Layout,
} from "lucide-react";
import FloatingCard from "@/components/FloatingCard";

/* ─── Icon resolver ───────────────────────────────────────────── */
const ICON_MAP = {
  BarChart3, Code2, Smartphone, Zap, Shield, TrendingUp, Users, Globe,
  Globe2, Layers, Share2, Search, Palette, Megaphone, Mail, Phone,
  MessageSquare, MapPin, Clock, Handshake, IndianRupee, CheckCircle,
  Rocket, Wrench, Target, Heart, GraduationCap, Building2, ShoppingCart,
  Factory, Landmark, Utensils, Award, Monitor, ShoppingBag, Settings,
  BookOpen, Lightbulb, MessageCircle, Store, Building, RefreshCw,
  ShieldCheck, Layout,
};

/* ─── CSS orbit spin injected once ───────────────────────────── */
const ORBIT_CSS = `
@keyframes prm-orbit-spin { to { transform: rotate(360deg); } }
.prm-orbit-1 { animation: prm-orbit-spin 30s linear infinite; }
.prm-orbit-2 { animation: prm-orbit-spin 45s linear infinite reverse; }
`;

export default function FloatingHero({
  eyebrow      = "",
  title        = "",
  titleAccent  = "",
  description  = "",
  ctas         = [],
  centerIcon   = "Globe",
  centerLabel  = "",
  floatingElements = [],
  stats        = [],
}) {
  const reduced     = useReducedMotion();
  const heroRef     = useRef(null);
  const centerRef   = useRef(null);
  const rafRef      = useRef(null);

  /* ── mouse parallax (desktop only) ── */
  const onMouseMove = useCallback((e) => {
    if (reduced || !heroRef.current || !centerRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const mx   = e.clientX - rect.left - rect.width  / 2;
    const my   = e.clientY - rect.top  - rect.height / 2;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!centerRef.current) return;
      /* center element */
      centerRef.current.style.transform = `translate(${-mx * 0.012}px,${-my * 0.012}px)`;
      /* floating cards — applied via CSS vars per depth layer */
      heroRef.current.style.setProperty("--parallax-x", `${mx}px`);
      heroRef.current.style.setProperty("--parallax-y", `${my}px`);
    });
  }, [reduced]);

  useEffect(() => {
    const el  = heroRef.current;
    const mq  = typeof window !== "undefined" && window.matchMedia("(pointer:fine)");
    if (!mq?.matches || reduced) return;
    el?.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      el?.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, reduced]);

  /* ── Title — split on accent ── */
  const titleParts = titleAccent
    ? title.split(titleAccent)
    : [title, ""];
  const titleWords = (str) => str.trim().split(" ").filter(Boolean);

  const CenterIcon = ICON_MAP[centerIcon] ?? Globe;

  return (
    <>
      {/* Inject orbit keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: ORBIT_CSS }} />

      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "85vh",
          background: "#F8F7F4",
          "--parallax-x": "0px",
          "--parallax-y": "0px",
        }}
      >
        {/* Background decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(252,110,4,0.06)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(255,138,31,0.05)" }}
        />
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #FC6E04 1px, transparent 1px)",
            backgroundSize:  "32px 32px",
          }}
        />

        {/* Inner layout */}
        <div
          className="relative mx-auto flex min-h-[85vh] w-[min(1200px,100%-40px)] flex-col items-center gap-12 py-20 lg:flex-row lg:items-center lg:gap-0"
        >
          {/* ════ LEFT — text content ════ */}
          <div className="z-10 flex-1 lg:pr-8">
            {/* Eyebrow */}
            {eyebrow && (
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#FC6E04" }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.2 }}
              >
                {eyebrow}
              </motion.p>
            )}

            {/* Title with word-by-word stagger */}
            <h1 className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {/* Words before accent */}
              {titleWords(titleParts[0]).map((word, i) => (
                <motion.span
                  key={`pre-${i}`}
                  className="mr-[0.22em] inline-block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              {/* Accent words */}
              {titleAccent && titleAccent.split(" ").map((word, i, arr) => (
                <motion.span
                  key={`acc-${i}`}
                  className="mr-[0.22em] inline-block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)" }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    delay: reduced ? 0 : 0.4 + (titleWords(titleParts[0]).length + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
              {/* Words after accent */}
              {titleParts[1] && titleWords(titleParts[1]).map((word, i) => (
                <motion.span
                  key={`post-${i}`}
                  className="mr-[0.22em] inline-block"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    delay: reduced ? 0 : 0.4 + (titleWords(titleParts[0]).length + (titleAccent?.split(" ").length ?? 0) + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: "#6B6B70" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.8 }}
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1 }}
            >
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className={
                    cta.variant === "secondary" ? "btn-light-pill" : "btn-cta-pill"
                  }
                >
                  {cta.text}
                  {cta.variant !== "secondary" && (
                    <ArrowRight size={15} aria-hidden="true" className="ml-1" />
                  )}
                </Link>
              ))}
            </motion.div>

            {/* Stats strip */}
            {stats.length > 0 && (
              <motion.div
                className="mt-12 flex flex-wrap gap-8 border-t pt-8"
                style={{ borderColor: "#EAE5DF" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.2 }}
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.2 + i * 0.1 }}
                  >
                    <p className="text-2xl font-black" style={{ color: "#FC6E04" }}>{s.number}</p>
                    <p className="text-sm" style={{ color: "#6B6B70" }}>{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ════ RIGHT — center element + floating cards ════ */}
          <div
            className="relative flex h-[420px] w-full shrink-0 items-center justify-center sm:h-[480px] lg:h-[520px] lg:w-[45%]"
          >
            {/* Orbit rings — CSS animated (not Framer, keeps JS thread free) */}
            <div
              aria-hidden="true"
              className="prm-orbit-1 pointer-events-none absolute rounded-full"
              style={{
                width: 288, height: 288,
                border: "1.5px dashed rgba(252,110,4,0.22)",
              }}
            />
            <div
              aria-hidden="true"
              className="prm-orbit-2 pointer-events-none absolute rounded-full"
              style={{
                width: 384, height: 384,
                border: "1px dashed rgba(252,110,4,0.12)",
              }}
            />

            {/* Center circle */}
            <motion.div
              ref={centerRef}
              aria-hidden="true"
              className="relative z-20 flex flex-col items-center justify-center rounded-full"
              style={{
                width: 160, height: 160,
                background:  "linear-gradient(135deg,#FF8A1F,#FC6E04 55%,#E04F00)",
                boxShadow:   "0 0 60px rgba(252,110,4,0.30), 0 0 0 8px rgba(252,110,4,0.08)",
                willChange:  "transform",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.3, type: "spring", stiffness: 200, damping: 20 }}
            >
              <CenterIcon size={48} color="#fff" aria-hidden="true" />
              {centerLabel && (
                <p className="mt-2 text-center text-sm font-bold leading-tight" style={{ color: "rgba(255,255,255,0.90)" }}>
                  {centerLabel}
                </p>
              )}
            </motion.div>

            {/* Floating cards — desktop: all; mobile: first 4 */}
            <div className="absolute inset-0" aria-hidden="true">
              {floatingElements.map((el, i) => {
                /* On mobile (<640px) only show first 4 */
                const mobileHide = i >= 4 ? "hidden sm:block" : "block";
                return (
                  <div key={i} className={mobileHide}>
                    <FloatingCard
                      icon={el.icon}
                      label={el.label}
                      description={el.description}
                      type={el.type ?? "icon"}
                      delay={el.delay ?? i * 0.2}
                      floatDuration={el.floatDuration ?? 4}
                      floatDistance={el.floatDistance ?? 10}
                      position={el.position ?? {}}
                      size={el.size ?? "sm"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
