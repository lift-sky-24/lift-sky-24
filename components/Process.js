import { Reveal, SectionHeading } from "./ui";

const steps = [
  { t: "Discover", d: "We understand your goals, users and constraints." },
  { t: "Design", d: "Wireframes and prototypes you can react to early." },
  { t: "Develop", d: "Clean, tested code shipped in short iterations." },
  { t: "Launch", d: "Deployment, monitoring and ongoing support." },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-slate-50/70 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Process We Follow" sub="A simple, transparent workflow from first call to launch day." />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 font-semibold text-navy-900">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
