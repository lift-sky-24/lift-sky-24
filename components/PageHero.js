/**
 * PageHero — server component.
 * Content is fully server-rendered — always visible.
 * AOS handles the scroll reveal. No GSAP, no masks, no hidden text.
 */
import Image  from "next/image";
import dynamic from "next/dynamic";
import { Reveal, Button, Counter } from "./ui";

const ParallaxSection = dynamic(
  () => import("@/components/animation/ParallaxSection"),
  { ssr: false }
);

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
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          {eyebrow && (
            <p
              className="mb-3 text-sm font-semibold text-brand"
              data-aos="fade-right"
            >
              {eyebrow}
            </p>
          )}

          {/* H1 — plain text, always visible, AOS fades it in */}
          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {title}{" "}
            {accent && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {accent}
              </span>
            )}
          </h1>

          {sub && (
            <p
              className="mt-4 max-w-lg leading-relaxed text-slate-600"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              {sub}
            </p>
          )}

          {badges.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="150">
              {badges.map((b) => (
                <li key={b} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand shadow-sm">
                  {b}
                </li>
              ))}
            </ul>
          )}

          {ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="180">
              {ctas.map((c, i) => (
                <Button key={c.label} href={c.href} variant={i === 0 ? "primary" : "outline"}>
                  {c.label}
                </Button>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <dl
              className="mt-9 grid max-w-md grid-cols-3 gap-4"
              data-aos="fade-up"
              data-aos-delay="220"
            >
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

        {/* Image with optional parallax — always visible via <Image priority> */}
        <div data-aos="zoom-in" data-aos-delay="100">
          <ParallaxSection speed={0.06}>
            <Image
              src={image}
              alt={alt || `${title} illustration`}
              width={640}
              height={460}
              priority
              className="h-auto w-full rounded-3xl shadow-card"
            />
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}
