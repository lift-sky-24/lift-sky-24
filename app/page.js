import Link from "next/link";
import dynamic from "next/dynamic";
import HeroBanner   from "@/components/HeroBanner";
import PageHero     from "@/components/PageHero";
import { Section, MiniCards, CTABand, Steps } from "@/components/Sections";
import ServicesShowcase from "@/components/Servicesshowcase";
import ProjectGrid  from "@/components/ProjectGrid";
import Testimonials from "@/components/Testimonials";
import FAQ          from "@/components/FAQ";
import PricingTable from "@/components/PricingTable";
import { Button, Reveal } from "@/components/ui";
import { why, processSteps } from "@/lib/data";
import { BRAND } from "@/data/site-config";
import { meta } from "@/lib/seo";

const MarqueeRow     = dynamic(() => import("@/components/animation/MarqueeRow"),     { ssr: false });
const MagneticButton = dynamic(() => import("@/components/animation/MagneticButton"), { ssr: false });

export const metadata = {
  ...meta(
    `Website, App, SEO & Digital Marketing Agency | ${BRAND.name}`,
    `${BRAND.name} — website development, app development, software, SEO, social media management, graphic design and digital marketing for startups and growing businesses in Jaipur, India.`,
    "/"
  ),
  title: `${BRAND.name} | Website, App, SEO & Digital Marketing Agency in Jaipur`,
};

const MARQUEE_ITEMS = [
  "React", "Next.js", "Node.js", "React Native", "Flutter",
  "Tailwind CSS", "MongoDB", "PostgreSQL", "AWS", "Figma",
  "Google Ads", "Meta Ads", "SEO", "Mailchimp", "Firebase",
  "TypeScript", "Vercel", "Docker", "WordPress", "Shopify",
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroBanner />

      {/* Tech stack marquee — appears right below hero, full-width */}
      <div className="border-y border-slate-100 bg-white/60 py-4 overflow-hidden">
        <MarqueeRow items={MARQUEE_ITEMS} duration={35} />
      </div>

      {/* 2. About snippet */}
      <PageHero
        title="We're More Than Just a"
        accent="Tech Company"
        eyebrow={BRAND.tagline}
        sub="LiftSky24 started as a small team of freelancers who kept getting asked the same question: 'Can you also handle our marketing?' We could — and we did. Today we're a full-service digital team: developers, designers and marketers who work together on every project, not in separate silos. We work directly with founders, marketing heads and small business owners who want real results without agency jargon."
        image="/images/team.svg"
        alt="LiftSky24 team working together on digital projects"
        ctas={[{ label: "Meet the Team", href: "/about" }, { label: "Get a Free Quote", href: "/contact" }]}
      />

      {/* 3. Services (tabbed showcase) */}
      <ServicesShowcase />

      {/* 4. Why Choose Us */}
      <Section title="Why Choose LiftSky24?" tone="soft">
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
          <MiniCards items={why} cols="md:grid-cols-3" />
          <Reveal>
            <div
              className="flex h-full flex-col justify-center rounded-2xl p-7 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#6557ff,#ff4fa3)" }}
              data-aos="zoom-in"
            >
              {/* Animated background shimmer */}
              <div aria-hidden style={{ position:"absolute",inset:0,background:"linear-gradient(105deg,transparent 40%,rgba(255,255,255,.08) 50%,transparent 60%)",backgroundSize:"200% 100%",animation:"marquee-scroll 3s linear infinite" }} />
              <p className="text-xl font-bold leading-tight relative z-10">Ready to Start<br />Your Project?</p>
              <p className="mt-2 text-sm text-white/80 relative z-10">Talk to the team today — free call, no commitment.</p>
              <div className="mt-5 w-fit relative z-10">
                <MagneticButton>
                  <Button href="/contact" variant="light">Get a Free Quote</Button>
                </MagneticButton>
              </div>
              <p className="mt-3 text-xs text-white/60 relative z-10">Or message us on WhatsApp for a quick response.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5. Process */}
      <Section title="How We Work" sub="A clear, five-step process. No surprises.">
        <Steps items={processSteps} />
      </Section>

      {/* 6. Featured Projects */}
      <Section title="Featured Projects" tone="soft">
        <ProjectGrid limit={6} cols="lg:grid-cols-3" />
        <div className="mt-6 text-right">
          <Link href="/portfolio" className="text-sm font-semibold text-brand hover:underline">
            View All Projects →
          </Link>
        </div>
      </Section>

      {/* Reverse marquee */}
      <div className="border-y border-slate-100 bg-white/60 py-4 overflow-hidden">
        <MarqueeRow items={["Website Development","App Development","Software Development","Social Media Management","SEO","Graphic Design","Digital Marketing","Branding","UI Design","Web Apps","Mobile Apps","E-Commerce","SEO Audit","Google Ads","Content Strategy"]} duration={28} reverse />
      </div>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Pricing preview */}
      <Section title="Simple, Transparent Pricing" sub="Starting prices — every project is scoped before work begins." center>
        <PricingTable />
        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-brand hover:underline">
            See full pricing details →
          </Link>
        </div>
      </Section>

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Final CTA */}
      <CTABand
        title="Ready to Build Something Great?"
        sub="Tell us about your project — we'll get back within 24 hours with a free consultation."
      />
    </>
  );
}
