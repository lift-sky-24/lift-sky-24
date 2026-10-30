import Image from "next/image";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Sections";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta("Contact Us", "Contact LiftSky24 to discuss your web, mobile or AI project. Get a free quote within one business day.", "/contact");

const info = [
  { icon: MapPin, t: "Our Office", d: "Jaipur, Rajasthan, India" },
  { icon: Mail, t: "Email Us", d: "hello@liftsky24.com", href: "mailto:hello@liftsky24.com" },
  { icon: Phone, t: "Call Us", d: "+91 98765 43210", href: "tel:+919876543210" },
];
const social = [{ i: Facebook, n: "Facebook" }, { i: Twitter, n: "Twitter" }, { i: Linkedin, n: "LinkedIn" }, { i: Instagram, n: "Instagram" }];

export default function Contact() {
  return (
    <>
      <PageHero title="Let's Build Something" accent="Great Together"
        sub="Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you soon."
        image="/images/hero.svg" alt="Contact LiftSky24 illustration" />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-4">
              {info.map((i) => (
                <li key={i.t} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand"><i.icon size={20} /></span>
                  <div><h3 className="font-semibold text-navy-900">{i.t}</h3>
                    {i.href ? <a href={i.href} className="text-sm text-slate-600 hover:text-brand">{i.d}</a> : <p className="text-sm text-slate-600">{i.d}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </Section>
      <Section title="Our Location" tone="soft">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-100 bg-sky-50" role="img" aria-label="Map placeholder showing the LiftSky24 office in Jaipur">
            <svg viewBox="0 0 600 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="600" height="300" fill="#EAF2FF" />
              <path d="M0 210 L600 150 M120 0 L220 300 M380 0 L330 300 M0 90 L600 120" stroke="#fff" strokeWidth="14" />
              <path d="M0 210 L600 150 M120 0 L220 300 M380 0 L330 300 M0 90 L600 120" stroke="#CBD5E1" strokeWidth="2" />
              <rect x="430" y="190" width="110" height="70" rx="10" fill="#D1FAE5" />
              <g transform="translate(300 120)"><path d="M0 40 C-30 5 -26 -26 0 -26 C26 -26 30 5 0 40Z" fill="#EF4444" /><circle cy="-8" r="8" fill="#fff" /></g>
            </svg>
          </div>
          <Reveal>
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <h3 className="font-semibold text-navy-900">Follow Us</h3>
              <ul className="mt-4 flex gap-3">
                {social.map((s) => (<li key={s.n}><a href="#" aria-label={s.n} className="grid h-10 w-10 place-items-center rounded-full bg-brand-light text-brand transition hover:bg-brand-gradient hover:text-white"><s.i size={16} /></a></li>))}
              </ul>
              <p className="mt-6 text-sm text-slate-600">Mon to Sat, 10:00 AM to 7:00 PM IST. We reply to every message within one business day.</p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
