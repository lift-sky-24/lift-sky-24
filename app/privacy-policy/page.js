import { meta } from "@/lib/seo";
import { BRAND, CONTACT } from "@/data/site-config";

export const metadata = meta("Privacy Policy", `How ${BRAND.name} collects, uses and protects your personal data.`, "/privacy-policy");

const updated = "1 November 2025";

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <h1 className="text-3xl font-extrabold text-navy-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <Section h="1. Who We Are">
        <p>{BRAND.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a digital agency providing website development, app development, software development, SEO, social media management, graphic design and digital marketing services. Our registered office is at {CONTACT.address.line1}, {CONTACT.address.line2}, {CONTACT.address.city} – {CONTACT.address.pin}, {CONTACT.address.state}, {CONTACT.address.country}.</p>
        <p>Contact us at: <a href={`mailto:${CONTACT.email}`} className="text-brand hover:underline">{CONTACT.email}</a></p>
      </Section>

      <Section h="2. Information We Collect">
        <p>We collect information you provide directly when you:</p>
        <ul><li>Fill in the contact or enquiry form (name, email address, project details).</li><li>Subscribe to our newsletter (email address only).</li><li>Contact us by email, phone or WhatsApp.</li></ul>
        <p>We may also collect non-personal technical data (browser type, pages visited, time on site) through analytics tools such as Google Analytics. This data is aggregated and does not identify you personally.</p>
      </Section>

      <Section h="3. How We Use Your Information">
        <ul>
          <li>To respond to your enquiry and provide the services you requested.</li>
          <li>To send newsletters or updates, where you have opted in.</li>
          <li>To improve our website and services based on usage patterns.</li>
          <li>To comply with our legal obligations.</li>
        </ul>
        <p>We do not sell, rent or trade your personal information to third parties.</p>
      </Section>

      <Section h="4. Legal Basis for Processing">
        <p>We process your data on the basis of: (a) your consent (newsletter sign-up); (b) our legitimate interest in responding to enquiries and improving our services; and (c) contractual necessity when we have an engagement with you.</p>
      </Section>

      <Section h="5. Data Retention">
        <p>We retain contact form submissions and project correspondence for up to 3 years after the end of our engagement, for reference and legal purposes. Newsletter subscriptions are retained until you unsubscribe.</p>
      </Section>

      <Section h="6. Cookies">
        <p>Our website uses essential cookies to function correctly, and optional analytics cookies (Google Analytics) to understand how visitors use the site. You may disable non-essential cookies through your browser settings.</p>
      </Section>

      <Section h="7. Third-Party Services">
        <p>We may use third-party services including Google Analytics, Google Maps, and form submission tools. These services have their own privacy policies and we encourage you to review them.</p>
      </Section>

      <Section h="8. Your Rights">
        <p>You have the right to access, correct or request deletion of your personal data. To exercise these rights, contact us at <a href={`mailto:${CONTACT.email}`} className="text-brand hover:underline">{CONTACT.email}</a>. We will respond within 30 days.</p>
      </Section>

      <Section h="9. Security">
        <p>We take reasonable technical and organisational measures to protect your data. However, no online transmission is fully secure — we cannot guarantee absolute security.</p>
      </Section>

      <Section h="10. Changes to This Policy">
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with a revised date. Your continued use of our services after changes are posted constitutes acceptance.</p>
      </Section>
    </article>
  );
}

function Section({ h, children }) {
  return (
    <section className="mt-9">
      <h2 className="text-lg font-bold text-navy-900">{h}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-brand [&_a:hover]:underline [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
