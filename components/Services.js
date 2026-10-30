"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, PenTool, Cloud, Megaphone, Cpu, Headset, Clock, Layers, Smile } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const services = [
  { icon: Monitor, t: "Web Development", d: "Fast, secure and SEO-friendly websites and web apps." },
  { icon: Smartphone, t: "Mobile Apps", d: "Native and cross-platform iOS and Android apps." },
  { icon: PenTool, t: "UI/UX Design", d: "User-centred interfaces that convert visitors into customers." },
  { icon: Cloud, t: "Cloud Solutions", d: "Scalable, secure cloud infrastructure and migration." },
  { icon: Megaphone, t: "Digital Marketing", d: "Data-driven SEO, ads and social campaigns." },
  { icon: Cpu, t: "AI & ML", d: "Smart automation, chatbots and predictive analytics." },
];
const why = [
  { icon: Headset, t: "Expert Team", d: "Senior engineers and designers on every project." },
  { icon: Clock, t: "On-Time Delivery", d: "Clear milestones and reliable timelines." },
  { icon: Layers, t: "Flexible Engagement", d: "Fixed-price, hourly or dedicated team models." },
  { icon: Smile, t: "Client Satisfaction", d: "Support that continues long after launch." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-slate-50/70 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Services" sub="End-to-end digital solutions that drive real business results." />
        <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <motion.li key={s.t} variants={item}>
              <a href="#contact" className="group block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand transition group-hover:bg-brand-gradient group-hover:text-white"><s.icon size={22} /></span>
                <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-16">
          <SectionHeading title="Why Choose LiftSky24?" />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto]">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {why.map((w, i) => (
                <li key={w.t}>
                  <Reveal delay={i * 0.08}>
                    <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 text-center">
                      <w.icon className="mx-auto text-brand" size={26} />
                      <h3 className="mt-3 text-sm font-semibold text-navy-900">{w.t}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{w.d}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-gradient p-6 text-white lg:w-72">
                <p className="text-lg font-bold">Ready to Start Your Project?</p>
                <p className="mt-1 text-sm text-white/80">Let&apos;s turn your idea into reality.</p>
                <a href="#contact" className="mt-4 inline-flex w-fit rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-brand-light">Get a Free Quote</a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
