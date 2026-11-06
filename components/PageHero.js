import Image  from "next/image";
import { Reveal, Button, Counter } from "./ui";

export default function PageHero({
  title,
  accent,
  sub,
  image   = "/images/hero.svg",
  alt,
  ctas    = [],
  badges  = [],
  stats   = [],
  eyebrow,
}) {
  const isExternal = image.startsWith("http");

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 25%, rgba(252,110,4,0.08), transparent 34%), radial-gradient(ellipse at 48% 75%, rgba(255,138,31,0.05), transparent 35%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold text-brand">
              {eyebrow}
            </p>
          )}

          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl"
          >
            {title}{" "}
            {accent && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {accent}
              </span>
            )}
          </h1>

          {sub && (
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">
              {sub}
            </p>
          )}

          {badges.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li key={b} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand shadow-sm">
                  {b}
                </li>
              ))}
            </ul>
          )}

          {ctas.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-7 flex flex-wrap gap-3">
                {ctas.map((c, i) => (
                  <Button key={c.label} href={c.href} variant={i === 0 ? "primary" : "outline"}>
                    {c.label}
                  </Button>
                ))}
              </div>
            </Reveal>
          )}

          {stats.length > 0 && (
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <dd className="text-2xl font-bold text-navy-900 sm:text-3xl">
                    <Counter to={s.n} suffix={s.s} />
                  </dd>
                  <dt className="text-xs text-slate-500">{s.l}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="relative">
          {isExternal ? (
            <Image
              src={image}
              alt={alt || `${title} illustration`}
              width={640}
              height={460}
              priority
              className="h-auto w-full rounded-3xl shadow-card object-cover"
            />
          ) : (
            <Image
              src={image}
              alt={alt || `${title} illustration`}
              width={640}
              height={460}
              priority
              className="h-auto w-full rounded-3xl shadow-card"
            />
          )}
        </div>
      </div>
    </section>
  );
}
