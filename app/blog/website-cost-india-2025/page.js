import Link          from "next/link";
import Breadcrumbs   from "@/components/Breadcrumbs";
import { CTABand }   from "@/components/Sections";
import { meta }      from "@/lib/seo";
import { BRAND }     from "@/data/site-config";

export const metadata = meta(
  "How Much Does a Business Website Cost in India?",
  "A practical breakdown of website costs in India — what affects pricing, what to expect at each budget level, and how to avoid overpaying for your next website.",
  "/blog/website-cost-india-2025"
);

export default function Post() {
  return (
    <>
      <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
        <Breadcrumbs items={[
          { name: "Blog", href: "/blog" },
          { name: "Website Cost in India" },
        ]} />

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Website Development</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
            How Much Does a Business Website Cost in India?
          </h1>
          <p className="mt-3 text-sm text-slate-500">15 October 2025 &nbsp;·&nbsp; 5 min read &nbsp;·&nbsp; By the {BRAND.name} team</p>
        </header>

        <div className="prose-content mt-10 space-y-5 text-sm leading-relaxed text-slate-600">
          <p className="text-base">If you've tried getting a website quote in India, you've probably seen prices that range from ₹5,000 to ₹5,00,000 for what sounds like the same thing. Here's what's actually going on — and how to figure out what's right for your business.</p>

          <h2 className="text-xl font-bold text-navy-900">The Short Answer</h2>
          <p>A basic business website in India typically costs between <strong>₹8,000 and ₹30,000</strong>. A professionally designed, custom-built site runs <strong>₹30,000 to ₹1,50,000</strong>. E-commerce and complex web applications start at <strong>₹1,00,000</strong> and go up from there.</p>
          <p>The gap is that wide because "website" means very different things at different price points.</p>

          <h2 className="text-xl font-bold text-navy-900">What You Get at Each Price Point</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy-900">Budget</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">What you typically get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Under ₹15,000", "Template-based, minimal customisation, basic hosting, often slow and hard to update"],
                  ["₹15,000 – ₹40,000", "Custom design, responsive layout, contact form, basic SEO, CMS for self-editing"],
                  ["₹40,000 – ₹1,50,000", "Full custom design, advanced features, e-commerce, integrations, faster performance"],
                  ["₹1,50,000+", "Complex web applications, custom CMS, API integrations, large e-commerce platforms"],
                ].map(([range, desc]) => (
                  <tr key={range}>
                    <td className="px-4 py-3 font-medium text-navy-900 whitespace-nowrap">{range}</td>
                    <td className="px-4 py-3 text-slate-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-navy-900">The 5 Biggest Factors That Affect Cost</h2>
          <ol className="ml-5 list-decimal space-y-3">
            <li><strong>Number of pages</strong> — A 5-page brochure site costs far less than a 30-page service site. Simple.</li>
            <li><strong>Custom design vs template</strong> — A template is cheaper upfront but often harder to differentiate and slower to customise later. Custom design costs more but is built for your brand.</li>
            <li><strong>Features and integrations</strong> — A booking system, payment gateway, CRM sync or live chat each adds cost. Be clear about what you actually need at launch vs "nice to have later".</li>
            <li><strong>CMS (Content Management System)</strong> — If you want to update the site yourself, you need a CMS. WordPress is common; headless CMS options like Sanity or Contentful are more flexible but cost more to set up.</li>
            <li><strong>SEO setup</strong> — A cheap website with no SEO setup is essentially invisible on Google. Factor in at least basic on-page SEO as part of your build budget.</li>
          </ol>

          <h2 className="text-xl font-bold text-navy-900">What to Watch Out For</h2>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Recurring fees</strong> — Ask what's included in the quote vs what you'll pay monthly (hosting, maintenance, plugin licences). Some very cheap quotes have high recurring costs.</li>
            <li><strong>Who owns the code</strong> — Always confirm you get the source code and all logins on delivery. Some agencies retain "ownership" and charge you to move.</li>
            <li><strong>Revision rounds</strong> — Unlimited revisions usually means very slow turnaround. Ask how many are included and what happens beyond that.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-900">How to Get an Accurate Quote</h2>
          <p>The clearer your brief, the more accurate the quote. Before approaching any agency, note down:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>What your website needs to do (inform, sell, capture leads, book appointments?)</li>
            <li>Rough number of pages</li>
            <li>Any specific features you need</li>
            <li>Your timeline and budget range</li>
          </ul>
          <p>You don't need a perfect brief — but even a rough one will get you a much more useful quote than "I need a website".</p>

          <h2 className="text-xl font-bold text-navy-900">The Bottom Line</h2>
          <p>A good business website is an investment, not just an expense. The question isn't "how cheap can I get it?" but "what does it need to do, and what's the realistic cost of doing it properly?" A site that loads slowly, looks dated or can't be found on Google will cost you more in lost business than you saved on the build.</p>

          <p className="rounded-xl bg-brand-light p-4 text-brand font-medium">
            At {BRAND.name}, our starting price for a professionally built business website is <strong>₹15,000</strong>. <Link href="/contact" className="underline">Get a free quote</Link> — we'll give you a clear breakdown before any work starts.
          </p>
        </div>
      </article>

      <CTABand title="Ready to Build Your Website?" sub="Get a clear, itemised quote — free, with no obligation." />
    </>
  );
}
