import { meta } from "@/lib/seo";
import { BRAND, CONTACT } from "@/data/site-config";

export const metadata = meta("Terms & Conditions", `Terms governing use of ${BRAND.name} services and website.`, "/terms");

const updated = "1 November 2025";

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <h1 className="text-3xl font-extrabold text-navy-900">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

      <Section h="1. Agreement">
        <p>By using the {BRAND.name} website or engaging our services you agree to these Terms. If you do not agree, please do not use our site or services.</p>
      </Section>

      <Section h="2. Services">
        <p>{BRAND.name} provides digital services including website development, app development, software development, SEO, social media management, graphic design and digital marketing. The specific scope, timeline and deliverables for each project are agreed in writing before work begins.</p>
      </Section>

      <Section h="3. Payment">
        <p>Our standard payment terms are 50% upon project commencement and 50% upon completion and delivery. For retainer or ongoing engagements, invoices are issued monthly. We reserve the right to pause work if payments are overdue by more than 14 days.</p>
      </Section>

      <Section h="4. Intellectual Property">
        <p>Upon receipt of full payment, you own all custom deliverables we create for your project — source code, design files and content. We retain the right to mention the project in our portfolio and marketing materials unless you request otherwise in writing.</p>
        <p>Any third-party software, fonts, stock assets or open-source libraries included in your deliverables remain subject to their original licences.</p>
      </Section>

      <Section h="5. Revisions">
        <p>The number of revision rounds included is stated in your project proposal. Revisions beyond the agreed scope will be quoted and agreed in writing before work begins.</p>
      </Section>

      <Section h="6. Confidentiality">
        <p>We treat all client information and project details as confidential. We will not share your business information with third parties without your consent, except as required by law or to deliver the service (e.g. sub-contractors under NDA).</p>
      </Section>

      <Section h="7. Limitation of Liability">
        <p>{BRAND.name}'s liability for any claim arising from our services is limited to the total fees paid by you for the relevant project. We are not liable for indirect or consequential losses including loss of business, revenue or profits.</p>
      </Section>

      <Section h="8. Website Use">
        <p>You may use the {BRAND.name} website for lawful purposes only. You must not attempt to disrupt, damage or gain unauthorised access to our systems. We reserve the right to terminate access to any user who violates these terms.</p>
      </Section>

      <Section h="9. Third-Party Links">
        <p>Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>
      </Section>

      <Section h="10. Governing Law">
        <p>These Terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts of {CONTACT.address.city}, {CONTACT.address.state}.</p>
      </Section>

      <Section h="11. Changes">
        <p>We may update these Terms at any time. Continued use of our site or services after changes are posted constitutes acceptance. For questions, contact us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
      </Section>
    </article>
  );
}

function Section({ h, children }) {
  return (
    <section className="mt-9">
      <h2 className="text-lg font-bold text-navy-900">{h}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 [&_a]:text-brand [&_a:hover]:underline">
        {children}
      </div>
    </section>
  );
}
