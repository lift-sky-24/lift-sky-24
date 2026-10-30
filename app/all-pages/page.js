import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, CTABand } from "@/components/Sections";
import { Stagger, StaggerItem } from "@/components/ui";
import { allPages } from "@/lib/data";
import { meta } from "@/lib/seo";

export const metadata = meta("All Pages at a Glance", "A complete map of the LiftSky24 website: every page, section and service in one place.", "/all-pages");

export default function AllPages() {
  return (
    <>
      <PageHero title="All Pages at a Glance" accent="Complete Website Structure"
        sub="Explore all pages of the LiftSky24 website. Clean, modern and easy to navigate."
        image="/images/hero.svg" alt="Website structure illustration" />
      <Section title="Website Map">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allPages.map((p, i) => (
            <StaggerItem key={p.href}>
              <Link href={p.href} className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-light text-sm font-bold text-brand">{i + 1}</span>
                <h3 className="mt-3 font-semibold text-navy-900">{p.t}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{p.d}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-brand">Open <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTABand title="Let's Build Something Amazing" sub="Tell us your idea and get a free quote." button="Get a Free Quote" />
    </>
  );
}
