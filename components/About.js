import { Target, Eye, Lightbulb, ShieldCheck, Users, Heart } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const mv = [
  { icon: Target, t: "Our Mission", d: "To deliver innovative digital solutions that drive measurable growth and lasting value for every client." },
  { icon: Eye, t: "Our Vision", d: "To be a trusted global partner in IT services, known for quality, integrity and customer success." },
];
const values = [
  { icon: Lightbulb, t: "Innovation" },
  { icon: ShieldCheck, t: "Integrity" },
  { icon: Users, t: "Collaboration" },
  { icon: Heart, t: "Customer First" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading title="Building Digital Solutions, Together" sub="We are a passionate team of developers, designers and IT professionals dedicated to creating innovative products for quality, innovation and customer success." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {mv.map((m, i) => (
          <Reveal key={m.t} delay={i * 0.1}>
            <div className="flex h-full gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><m.icon size={22} /></span>
              <div><h3 className="font-semibold text-navy-900">{m.t}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{m.d}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {values.map((v, i) => (
          <li key={v.t}>
            <Reveal delay={i * 0.08}>
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 text-sm font-medium text-navy-900">
                <v.icon size={18} className="text-brand" /> {v.t}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
