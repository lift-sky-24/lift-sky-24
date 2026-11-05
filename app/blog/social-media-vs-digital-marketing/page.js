import Link        from "next/link";
import Breadcrumbs  from "@/components/Breadcrumbs";
import { CTABand }  from "@/components/Sections";
import { meta }     from "@/lib/seo";
import { BRAND }    from "@/data/site-config";

export const metadata = meta(
  "Social Media Management vs Digital Marketing: What's the Difference?",
  "Many business owners use these terms interchangeably — but they're not the same thing. Here's what each covers and which one your business actually needs right now.",
  "/blog/social-media-vs-digital-marketing"
);

export default function Post() {
  return (
    <>
      <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
        <Breadcrumbs items={[
          { name: "Blog", href: "/blog" },
          { name: "Social Media vs Digital Marketing" },
        ]} />

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Digital Marketing</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
            Social Media Management vs Digital Marketing: What&apos;s the Difference?
          </h1>
          <p className="mt-3 text-sm text-slate-500">20 September 2025 &nbsp;·&nbsp; 5 min read &nbsp;·&nbsp; By the {BRAND.name} team</p>
        </header>

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-slate-600">
          <p className="text-base">We hear this often: a business owner says they "do digital marketing" when they mean they post on Instagram three times a week. Or they ask for "social media" when they actually want leads from Google Ads. The two terms overlap, but they're not the same — and confusing them can mean you spend money on the wrong thing.</p>

          <h2 className="text-xl font-bold text-navy-900">Social Media Management: What It Is</h2>
          <p>Social media management is the ongoing work of maintaining your presence on platforms like Instagram, Facebook and LinkedIn. It includes:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Creating and scheduling posts (graphics, captions, reels, stories)</li>
            <li>Responding to comments and DMs</li>
            <li>Growing your follower count organically</li>
            <li>Maintaining a consistent brand voice and visual identity</li>
            <li>Reporting on reach, engagement and follower growth</li>
          </ul>
          <p>The goal is <strong>visibility and trust</strong>. It's a long game — consistent posting builds familiarity with your audience over months, not days.</p>

          <h2 className="text-xl font-bold text-navy-900">Digital Marketing: What It Is</h2>
          <p>Digital marketing is a broader umbrella that covers every online channel used to reach and convert customers. It includes social media, but also:</p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>Paid advertising (Google Ads, Meta Ads, YouTube Ads)</li>
            <li>Search engine optimisation (SEO)</li>
            <li>Email marketing</li>
            <li>Content marketing (blog posts, videos, guides)</li>
            <li>Conversion rate optimisation (improving your website to convert more visitors)</li>
            <li>Analytics and attribution tracking</li>
          </ul>
          <p>The goal is <strong>generating measurable business outcomes</strong> — leads, sales, bookings. It's more performance-oriented than social media management.</p>

          <h2 className="text-xl font-bold text-navy-900">The Key Difference</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy-900">Social Media Management</th>
                  <th className="px-4 py-3 font-semibold text-navy-900">Digital Marketing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Organic reach (mostly free platforms)", "Paid + organic channels"],
                  ["Brand awareness and community", "Leads, conversions, sales"],
                  ["Instagram, Facebook, LinkedIn", "Google, email, all platforms"],
                  ["Long-term brand building", "Short to medium-term results"],
                  ["Content creation + posting", "Strategy + paid spend + analytics"],
                ].map(([a, b], i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-slate-600">{a}</td>
                    <td className="px-4 py-3 text-slate-600">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-navy-900">Which One Does Your Business Need?</h2>
          <p>The honest answer: it depends on where you are and what you need right now.</p>
          <ul className="ml-5 list-disc space-y-3">
            <li>
              <strong>Just launching or rebranding?</strong> — Start with social media management to build credibility and a consistent presence. Potential customers will check your Instagram before deciding whether to contact you.
            </li>
            <li>
              <strong>Need leads quickly?</strong> — Digital marketing (Google Ads, Meta Ads) can generate results faster than organic social. You're paying for reach, but you get it immediately.
            </li>
            <li>
              <strong>Want long-term organic growth?</strong> — Invest in SEO alongside social. Ranking on Google takes months but the traffic is free and compounds over time.
            </li>
            <li>
              <strong>Established business wanting to scale?</strong> — You probably need both: a consistent social presence <em>and</em> a paid digital strategy working together.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-navy-900">The Bottom Line</h2>
          <p>Social media management is one piece of digital marketing. If you're only doing social media, you're leaving other channels untapped. If you're running ads without a social presence, you're missing the credibility check most customers do before they buy.</p>
          <p>The best approach combines both — but what matters is that you start with a clear goal, not just "we should be on Instagram".</p>

          <p className="rounded-xl bg-brand-light p-4 text-brand font-medium">
            {BRAND.name} offers both social media management and full digital marketing. <Link href="/contact" className="underline">Talk to us</Link> — we'll tell you honestly which one makes sense for your business right now.
          </p>
        </div>
      </article>

      <CTABand title="Not Sure Where to Start?" sub="We'll help you figure out the right digital strategy for your business — free call, no jargon." />
    </>
  );
}
