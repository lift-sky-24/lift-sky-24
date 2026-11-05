import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Sections";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/ui";
import { meta } from "@/lib/seo";

export const metadata = meta("Contact Us", "Contact LiftSky24 to discuss your web, mobile or AI project. Get a free quote within one business day.", "/contact");

const info = [
  {
    icon: MapPin,
    t: "Our Office",
    d: "Flat No. 91/109, Sector 9, Mandir Marg, Patel Marg, Mansarovar, Jaipur – 302020",
    sub: "Landmark: In front of Taxila Business School",
  },
  { icon: Mail,  t: "Email Us", d: "contact.liftsky24@gmail.com", href: "mailto:contact.liftsky24@gmail.com" },
  { icon: Phone, t: "Call Us",  d: "+91 88757 96652",             href: "tel:+918875796652" },
];

const social = [
  { i: Facebook,  n: "Facebook"  },
  { i: Twitter,   n: "Twitter"   },
  { i: Linkedin,  n: "LinkedIn"  },
  { i: Instagram, n: "Instagram" },
];

// Google Maps embed for Taxila Business School, Mansarovar, Jaipur
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.0!2d75.7449!3d26.8651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af3e91fcb1d%3A0x9c03af2a73e7b2a!2sTaxila%20Business%20School!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export default function Contact() {
  return (
    <>
      <PageHero
        title="Let's Build Something"
        accent="Great Together"
        sub="Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you soon."
        image="/images/hero.svg"
        alt="Contact LiftSky24 illustration"
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
                    {i.href ? (
                      <a href={i.href} className="text-sm text-slate-600 hover:text-brand">{i.d}</a>
                    ) : (
                      <p className="text-sm text-slate-600">{i.d}</p>
                    )}
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

      <Section title="Our Location" tone="soft">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Google Map embed */}
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
                Mon to Sat, 10:00 AM to 7:00 PM IST.
                <br />We reply to every message within one business day.
              </p>
              <a
                href="https://maps.app.goo.gl/TaxilaBusinessSchoolJaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                Get Directions ↗
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
