import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Sections";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/ui";
import { meta } from "@/lib/seo";
import { CONTACT } from "@/data/site-config";
import { contactPageHero, contactInfoLabels, contactLocationSection } from "@/data/pages/contact";

export const metadata = meta(
  "Contact Us",
  "Contact LiftSky24 to discuss your web, mobile or digital project. Get a free quote within one business day.",
  "/contact"
);

const info = [
  {
    icon: MapPin,
    t: contactInfoLabels.office,
    d: `${CONTACT.address.line1}, ${CONTACT.address.line2}, ${CONTACT.address.city} – ${CONTACT.address.pin}`,
    sub: `Landmark: ${CONTACT.address.landmark}`,
  },
  { icon: Mail,  t: contactInfoLabels.email, d: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Phone, t: contactInfoLabels.phone, d: CONTACT.phone, href: CONTACT.phoneTel },
];

const social = [
  { i: Facebook,  n: "Facebook"  },
  { i: Twitter,   n: "Twitter"   },
  { i: Linkedin,  n: "LinkedIn"  },
  { i: Instagram, n: "Instagram" },
];

const MAP_EMBED = CONTACT.address.mapEmbed;

export default function Contact() {
  return (
    <>
      <PageHero
        title={contactPageHero.title}
        accent={contactPageHero.accent}
        sub={contactPageHero.sub}
        image={contactPageHero.image}
        alt={contactPageHero.alt}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="space-y-4">
              {info.map((i) => (
                <li key={i.t} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                    <i.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{i.t}</h3>
                    {i.href
                      ? <a href={i.href} className="text-sm text-slate-600 hover:text-brand">{i.d}</a>
                      : <p className="text-sm text-slate-600">{i.d}</p>
                    }
                    {i.sub && <p className="mt-1 text-xs text-slate-400">{i.sub}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section title={contactLocationSection.title} tone={contactLocationSection.tone}>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-100">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LiftSky24 Office Location — Mansarovar, Jaipur"
            />
          </div>
          <Reveal>
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <h3 className="font-semibold text-navy-900">Follow Us</h3>
              <ul className="mt-4 flex gap-3">
                {social.map((s) => (
                  <li key={s.n}>
                    <a
                      href="#"
                      aria-label={s.n}
                      className="grid h-10 w-10 place-items-center rounded-full bg-brand-light text-brand transition hover:bg-brand-gradient hover:text-white"
                    >
                      <s.i size={16} />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-slate-600">
                {CONTACT.hours}.<br />We reply to every message within one business day.
              </p>
              <a
                href={contactInfoLabels.getDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                {contactInfoLabels.directions}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
