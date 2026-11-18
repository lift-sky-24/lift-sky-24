"use client";

/**
 * ServicePageTemplate — shared layout for all service pages.
 * Data-driven: each page passes its own `data` object.
 *
 * Sections rendered:
 *   1. Hero
 *   2. Services Cards
 *   3. Why (2-col: left heading + right feature cards)
 *   4. Process Timeline
 *   5. Portfolio / Coming Soon
 *   6. FAQ
 *   7. Final CTA
 *
 * Pages that need EXTRA custom sections inject them via
 * the `extraSections` prop (array of React elements, inserted
 * after the services cards section).
 */

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useInView, useReducedMotion,
  useScroll, useTransform,
} from "framer-motion";
import {
  Check, ChevronDown, ArrowRight, Search,
  /* icons used by data files */
  Globe, Smartphone, Code2, Share2, Palette, TrendingUp,
  MapPin, Settings, FileText, PenTool, ShoppingCart,
  Link2, Target, ShieldCheck, BarChart3, Layers,
  SlidersHorizontal, Wrench, MessageCircle, Users,
  Fingerprint, Package, Megaphone, BookOpen, CreditCard,
  Layout, Eye, MessageSquare, Repeat, Rocket, Gem,
  ShoppingBag, Building2, GraduationCap, Utensils,
  Bot, Headphones, UserPlus, GitBranch, Mic, Briefcase,
  FileSearch, Zap, RefreshCw, CheckCircle, Database,
  Server, Workflow, Camera, Play, Star, Calendar,
  MousePointerClick, Mail, ArrowRightLeft,
  Monitor, Presentation,
} from "lucide-react";
import ServicePricingSection from "@/components/ServicePricingSection";

/* ─── Icon resolver ──────────────────────────────────────────── */
const ICON_MAP = {
  Globe, Smartphone, Code2, Share2, Palette, TrendingUp,
  MapPin, Settings, FileText, PenTool, ShoppingCart,
  Link2, Target, ShieldCheck, BarChart3, Layers,
  SlidersHorizontal, Wrench, MessageCircle, Users,
  Fingerprint, Package, Megaphone, BookOpen, CreditCard,
  Layout, Eye, MessageSquare, Repeat, Rocket, Gem,
  ShoppingBag, Building2, GraduationCap, Utensils,
  Bot, Headphones, UserPlus, GitBranch, Mic, Briefcase,
  FileSearch, Zap, RefreshCw, CheckCircle, Database,
  Server, Workflow, Camera, Play, Star, Calendar,
  MousePointerClick, Mail, ArrowRightLeft, Search,
  Monitor, Presentation,
};
function Icon({ name, size = 20, ...rest }) {
  const C = ICON_MAP[name] ?? Globe;
  return <C size={size} {...rest} />;
}

/* ─── Reveal ─────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref     = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0,
        y: direction==="up" ? 40 : direction==="down" ? -40 : 0,
        x: direction==="left" ? 40 : direction==="right" ? -40 : 0 }}
      animate={isInView ? { opacity:1, y:0, x:0 } : {}}
      transition={{ duration: reduced?0:0.6, delay: reduced?0:delay, ease:[0.25,0.1,0.25,1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader({ heading, subheading, light=false, center=true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight lg:text-5xl"
          style={{ color: light?"#fff":"#171717" }}>
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-lg leading-relaxed"
            style={{ color: light?"#9CA3AF":"#6B6B70",
              maxWidth: center?"42rem":undefined,
              margin: center?"1rem auto 0":"1rem 0 0" }}>
            {subheading}
          </p>
        )}
      </Reveal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════════ */
function HeroSection({ hero, breadcrumb = [] }) {
  const reduced = useReducedMotion();
  const words   = (hero.title || "").split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 lg:py-28"
      style={{ background:"linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background:"rgba(252,110,4,0.10)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background:"rgba(255,138,31,0.08)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ backgroundImage:"repeating-linear-gradient(0deg,rgba(252,110,4,0.025) 0px,rgba(252,110,4,0.025) 1px,transparent 1px,transparent 40px)" }} />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-40px)]">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                {i < breadcrumb.length-1
                  ? <a href={item.href} style={{color:"rgba(255,255,255,0.50)",textDecoration:"none"}} className="hover:text-white transition-colors">{item.name}</a>
                  : <span style={{color:"#FC6E04"}} aria-current="page">{item.name}</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        <motion.p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{color:"#FC6E04"}}
          initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}
          transition={{duration:reduced?0:0.5}}>
          {hero.eyebrow}
        </motion.p>

        {/* H1 word stagger */}
        <h1 className="mt-5 text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span key={i} className="mr-[0.22em] inline-block"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}}
              transition={{duration:reduced?0:0.6,delay:reduced?0:i*0.08,ease:[0.22,1,0.36,1]}}>
              {word === "Jaipur" ? (
                <span className="bg-clip-text text-transparent"
                  style={{backgroundImage:"linear-gradient(90deg,#FF8A1F,#FC6E04)"}}>
                  {word}
                </span>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{color:"#9CA3AF"}}
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{duration:reduced?0:0.5,delay:reduced?0:0.6}}>
          {hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div className="mt-8 flex flex-wrap gap-4"
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{duration:reduced?0:0.5,delay:reduced?0:0.8}}>
          <Link href={hero.primaryCta.href} className="btn-cta-pill">
            {hero.primaryCta.text} <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href={hero.secondaryCta.href} className="btn-outline-light">
            {hero.secondaryCta.text}
          </Link>
        </motion.div>

        {/* Highlights */}
        <div className="mt-12 flex flex-wrap gap-3">
          {hero.highlights.map((h, i) => (
            <motion.span key={h}
              className="flex items-center gap-2 rounded-full border-l-2 px-4 py-2 text-sm"
              style={{background:"#1A1A1F",borderColor:"#FC6E04",color:"#D1D5DB"}}
              initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
              transition={{duration:reduced?0:0.4,delay:reduced?0:1+i*0.1}}>
              <Check size={14} style={{color:"#FC6E04",flexShrink:0}} aria-hidden />
              {h}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SERVICE CARDS
══════════════════════════════════════════════════════════════ */
function ServicesSection({ services }) {
  const cols = services.items.length <= 4
    ? "grid-cols-1 md:grid-cols-2 gap-8"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
  return (
    <section className="py-24" style={{background:"#F8F7F4"}}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={services.heading} subheading={services.subheading} />
        <div className={`mt-16 grid ${cols}`}>
          {services.items.map((item, i) => (
            <Reveal key={item.number} delay={i*0.08}>
              <motion.div
                className="group relative cursor-default overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300"
                style={{borderColor:"#EAE5DF"}}
                whileHover={{y:-8}}
                onMouseEnter={(e)=>{e.currentTarget.style.borderColor="#FC6E04";e.currentTarget.style.boxShadow="0 20px 40px rgba(252,110,4,0.15)";}}
                onMouseLeave={(e)=>{e.currentTarget.style.borderColor="#EAE5DF";e.currentTarget.style.boxShadow="none";}}>
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{background:"linear-gradient(135deg,rgba(252,110,4,0.05),transparent)"}} />
                <span aria-hidden className="pointer-events-none absolute right-4 top-4 select-none text-6xl font-black"
                  style={{color:"rgba(252,110,4,0.10)",lineHeight:1}}>
                  {item.number}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#FC6E04]"
                  style={{background:"#FFF0E4"}}>
                  <Icon name={item.icon} size={22} style={{color:"#FC6E04",transition:"color .3s"}} className="group-hover:text-white" aria-hidden />
                </span>
                <h3 className="relative mt-4 text-lg font-bold" style={{color:"#171717"}}>{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed" style={{color:"#6B6B70"}}>{item.description}</p>
                {item.tags && (
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map(t=>(
                      <span key={t} className="rounded-full border px-2 py-1 text-xs transition-colors duration-300 group-hover:border-[#FFD4B3] group-hover:bg-[#FFF0E4] group-hover:text-[#C2410C]"
                        style={{background:"#F8F7F4",borderColor:"#EAE5DF",color:"#6B6B70"}}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — WHY
══════════════════════════════════════════════════════════════ */
function WhySection({ why }) {
  const dark = why.dark === true;
  return (
    <section className="py-24" style={{background: dark?"#101114":"#fff"}}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        {dark ? (
          <>
            <SectionHeader heading={why.heading} subheading={why.subheading} light center />
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {why.items.map((item, i) => (
                <Reveal key={item.title} delay={i*0.1}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
                    style={{background:"rgba(255,255,255,0.05)",borderColor:"rgba(255,255,255,0.10)"}}
                    whileHover={{scale:1.03}}
                    onMouseEnter={(e)=>{e.currentTarget.style.borderColor="rgba(252,110,4,0.50)";e.currentTarget.style.background="rgba(252,110,4,0.08)";}}
                    onMouseLeave={(e)=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.10)";e.currentTarget.style.background="rgba(255,255,255,0.05)";}}>
                    <div aria-hidden className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{background:"rgba(252,110,4,0.10)"}} />
                    <div aria-hidden className="absolute bottom-6 left-0 top-6 w-[3px] origin-top rounded-full transition-transform duration-300 group-hover:scale-y-100"
                      style={{background:"#FC6E04",transform:"scaleY(0)"}} />
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#FC6E04]"
                      style={{background:"rgba(252,110,4,0.15)"}}>
                      <Icon name={item.icon} size={20} style={{color:"#FC6E04"}} className="group-hover:text-[#101114] transition-colors duration-300" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    {item.description && <p className="mt-2 text-sm leading-relaxed" style={{color:"#9CA3AF"}}>{item.description}</p>}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <div className="relative">
                <div aria-hidden className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl"
                  style={{background:"rgba(252,110,4,0.10)"}} />
                <p className="text-sm font-semibold uppercase tracking-[0.15em]" style={{color:"#FC6E04"}}>Why LiftSky24</p>
                <h2 className="mt-4 text-3xl font-bold leading-tight lg:text-5xl" style={{color:"#171717"}}>
                  {why.heading}
                </h2>
                {why.subheading && <p className="mt-6 text-lg leading-relaxed" style={{color:"#6B6B70"}}>{why.subheading}</p>}
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              {why.items.map((item, i) => (
                <Reveal key={item.title} direction="left" delay={i*0.12}>
                  <div className="group relative flex items-start gap-4 overflow-hidden rounded-xl border-l-[3px] p-5 transition-all duration-300"
                    style={{background:"transparent",borderLeftColor:"transparent"}}
                    onMouseEnter={(e)=>{e.currentTarget.style.background="#FFF0E4";e.currentTarget.style.borderLeftColor="#FC6E04";}}
                    onMouseLeave={(e)=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderLeftColor="transparent";}}>
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#FC6E04]"
                      style={{background:"#101114"}}>
                      <Icon name={item.icon} size={18} style={{color:"#fff"}} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold" style={{color:"#171717"}}>{item.title}</p>
                      {item.description && <p className="mt-1 text-sm leading-relaxed" style={{color:"#6B6B70"}}>{item.description}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — PROCESS
══════════════════════════════════════════════════════════════ */
function ProcessSection({ process }) {
  const sectionRef = useRef(null);
  const reduced    = useReducedMotion();
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start 70%","end 50%"] });
  const lineWidth = useTransform(scrollYProgress, [0,1], ["0%","100%"]);
  return (
    <section className="py-24" style={{background:"#F8F7F4"}} ref={sectionRef}>
      <div className="mx-auto w-[min(1200px,100%-40px)]">
        <SectionHeader heading={process.heading} subheading={process.subheading} />
        {/* Desktop */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div aria-hidden className="absolute top-7 left-0 right-0 h-[2px]" style={{background:"#EAE5DF"}} />
            <motion.div aria-hidden className="absolute top-7 left-0 h-[2px]"
              style={{background:"linear-gradient(90deg,#FF8A1F,#FC6E04)",width:reduced?"100%":lineWidth}} />
            <div className={`relative grid gap-4`} style={{gridTemplateColumns:`repeat(${process.steps.length},1fr)`}}>
              {process.steps.map((step, i) => (
                <Reveal key={step.number} delay={i*0.12}>
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all duration-500"
                      style={{borderColor:"#EAE5DF",color:"#6B6B70"}}
                      initial={reduced?false:{scale:0}}
                      whileInView={{scale:1}}
                      viewport={{once:true,margin:"-40px"}}
                      transition={{type:"spring",stiffness:300,damping:20,delay:i*0.12}}>
                      {step.number}
                    </motion.div>
                    <p className="mt-4 text-sm font-bold" style={{color:"#171717"}}>{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed" style={{color:"#6B6B70"}}>{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className="mt-10 lg:hidden">
          <div className="relative ml-[19px] border-l-2" style={{borderColor:"#EAE5DF"}}>
            {process.steps.map((step, i) => (
              <Reveal key={step.number} delay={i*0.1}>
                <div className="relative mb-8 pl-10">
                  <span className="absolute -left-[27px] flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-sm font-bold"
                    style={{borderColor:"#EAE5DF",color:"#6B6B70"}}>
                    {step.number}
                  </span>
                  <p className="font-bold" style={{color:"#171717"}}>{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{color:"#6B6B70"}}>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — PORTFOLIO / COMING SOON
══════════════════════════════════════════════════════════════ */
function PortfolioSection({ portfolio }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...(portfolio.categories||[])];
  return (
    <section className="py-24" style={{background:"#fff"}}>
      <div className="mx-auto w-[min(900px,100%-40px)]">
        <SectionHeader heading={portfolio.heading} subheading={portfolio.subheading} />
        {portfolio.note && <Reveal delay={0.15}><p className="mt-4 text-center text-sm italic" style={{color:"#6B6B70"}}>{portfolio.note}</p></Reveal>}

        {/* Category filters */}
        {portfolio.categories && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={()=>setActiveCategory(cat)}
                className="rounded-full border px-4 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FC6E04] focus-visible:ring-offset-2"
                style={{borderColor:activeCategory===cat?"#FC6E04":"#EAE5DF",background:activeCategory===cat?"#FC6E04":"transparent",color:activeCategory===cat?"#fff":"#6B6B70"}}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Coming-soon card */}
        <Reveal delay={0.2}>
          <motion.div
            className="relative mt-10 overflow-hidden rounded-2xl px-10 py-16 text-center"
            style={{background:"linear-gradient(135deg,#101114,#2A160D)"}}
            initial={{scale:0.95,opacity:0}}
            whileInView={{scale:1,opacity:1}}
            viewport={{once:true}}
            transition={{duration:0.6}}>
            <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 select-none font-black text-white opacity-[0.02]"
              style={{fontSize:"16rem",lineHeight:1}}>✦</span>
            <Rocket size={52} style={{color:"#FC6E04",margin:"0 auto"}} aria-hidden />
            <h3 className="mt-6 text-2xl font-bold text-white">{portfolio.comingSoonTitle || "Projects Coming Soon"}</h3>
            <p className="mx-auto mt-3 max-w-lg" style={{color:"#9CA3AF"}}>
              {portfolio.comingSoonDesc || "We're documenting our work. Contact us to discuss your project."}
            </p>
            <Link href={portfolio.cta?.href || "/contact"} className="btn-cta-pill mt-8 inline-flex">
              {portfolio.cta?.text || "Contact Us"} <ArrowRight size={15} aria-hidden />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — FAQ
══════════════════════════════════════════════════════════════ */
function FaqSection({ faqs, heading }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="py-24" style={{background:"#F8F7F4"}}>
      <div className="mx-auto w-[min(768px,100%-40px)]">
        <SectionHeader heading={heading || "Frequently Asked Questions"} />
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i*0.06}>
                <div className="overflow-hidden rounded-xl border bg-white transition-all duration-300"
                  style={{borderColor:isOpen?"#FC6E04":"#EAE5DF",borderLeftWidth:isOpen?3:1}}>
                  <button id={`faq-btn-${i}`} type="button" aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={()=>setOpenIndex(isOpen?-1:i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6E04] focus-visible:ring-inset">
                    <span className="font-semibold transition-colors duration-200"
                      style={{color:isOpen?"#FC6E04":"#171717"}}>
                      {faq.question}
                    </span>
                    <ChevronDown size={18} className="shrink-0 transition-transform duration-300"
                      style={{color:isOpen?"#FC6E04":"#9CA3AF",transform:isOpen?"rotate(180deg)":"rotate(0deg)"}} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-panel-${i}`} role="region"
                        aria-labelledby={`faq-btn-${i}`} key="content"
                        initial={{height:0,opacity:0}}
                        animate={{height:"auto",opacity:1}}
                        exit={{height:0,opacity:0}}
                        transition={{duration:0.3,ease:[0.04,0.62,0.23,0.98]}}
                        className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-relaxed" style={{color:"#6B6B70"}}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — FINAL CTA
══════════════════════════════════════════════════════════════ */
function FinalCtaSection({ finalCta }) {
  const parts = (finalCta.heading||"").split(finalCta.accentWord||"|||");
  return (
    <section className="relative overflow-hidden py-24"
      style={{background:"linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)"}}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{background:"rgba(252,110,4,0.08)"}} />
      <div className="relative z-10 mx-auto w-[min(900px,100%-40px)] text-center">
        <Reveal>
          <motion.div initial={{scale:0.95,opacity:0}} whileInView={{scale:1,opacity:1}}
            viewport={{once:true}} transition={{duration:0.6}}>
            <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl">
              {parts[0]}
              {finalCta.accentWord && (
                <span className="bg-clip-text text-transparent"
                  style={{backgroundImage:"linear-gradient(90deg,#FF8A1F,#FC6E04)"}}>
                  {finalCta.accentWord}
                </span>
              )}
              {parts[1]}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{color:"#9CA3AF"}}>
              {finalCta.description}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href={finalCta.primaryCta.href} className="btn-cta-pill">
                {finalCta.primaryCta.text} <ArrowRight size={15} aria-hidden />
              </Link>
              <Link href={finalCta.secondaryCta.href} className="btn-outline-light">
                {finalCta.secondaryCta.text}
              </Link>
            </div>
            {finalCta.supportingText && (
              <p className="mt-8 text-sm uppercase tracking-wider" style={{color:"#6B7280"}}>
                {finalCta.supportingText}
              </p>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════ */
export default function ServicePageTemplate({
  data,
  breadcrumb = [],
  extraSections = [],  // array of React elements inserted after ServicesSection
  slug = "",           // service slug for pricing data lookup
}) {
  return (
    <main>
      <HeroSection hero={data.hero} breadcrumb={breadcrumb} />
      <ServicesSection services={data.services} />
      {extraSections}
      {data.why     && <WhySection     why={data.why}         />}
      {data.process && <ProcessSection process={data.process} />}
      {data.portfolio && <PortfolioSection portfolio={data.portfolio} />}
      {slug && <ServicePricingSection slug={slug} />}
      {data.faqs?.length > 0 && <FaqSection faqs={data.faqs} heading={data.faqHeading} />}
      {data.finalCta && <FinalCtaSection finalCta={data.finalCta} />}
    </main>
  );
}

/* Re-export sub-components for pages that need them in extraSections */
export { Reveal, SectionHeader, Icon };
