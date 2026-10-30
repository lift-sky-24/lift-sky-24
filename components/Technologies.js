import { Reveal, SectionHeading } from "./ui";

const tech = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Flutter", "Swift", "Kotlin", "Python", "AWS", "Figma", "Firebase"];

export default function Technologies() {
  return (
    <section aria-labelledby="tech-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading title="Technologies We Use" sub="Modern, battle-tested tools chosen for performance and scale." />
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tech.map((t, i) => (
          <li key={t}>
            <Reveal delay={(i % 6) * 0.05} y={14}>
              <div className="flex h-20 items-center justify-center rounded-2xl border border-slate-100 bg-white text-sm font-semibold text-navy-900 transition hover:-translate-y-1 hover:border-brand/30 hover:text-brand hover:shadow-card">
                {t}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
