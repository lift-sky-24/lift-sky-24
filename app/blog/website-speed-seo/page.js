import Link        from "next/link";
import Breadcrumbs  from "@/components/Breadcrumbs";
import { CTABand }  from "@/components/Sections";
import { meta }     from "@/lib/seo";
import { BRAND }    from "@/data/site-config";

export const metadata = meta(
  "Why Website Speed Matters for SEO (and How to Fix It)",
  "Google uses page speed as a ranking factor. A slow website costs you traffic and conversions. Here are the most impactful fixes — explained in plain language.",
  "/blog/website-speed-seo"
);

export default function Post() {
  return (
    <>
      <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
        <Breadcrumbs items={[
          { name: "Blog", href: "/blog" },
          { name: "Website Speed & SEO" },
        ]} />

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">SEO</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
            Why Website Speed Matters for SEO (and How to Fix It)
          </h1>
          <p className="mt-3 text-sm text-slate-500">1 October 2025 &nbsp;·&nbsp; 4 min read &nbsp;·&nbsp; By the {BRAND.name} team</p>
        </header>

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-slate-600">
          <p className="text-base">If your website is slow, you're paying a double penalty: worse rankings on Google <em>and</em> more visitors leaving before the page loads. Here's what you need to know — and what you can do about it.</p>

          <h2 className="text-xl font-bold text-navy-900">How Google Uses Speed as a Ranking Factor</h2>
          <p>Since 2021, Google has used Core Web Vitals as a confirmed ranking signal. These are three measurements of how fast and stable your page feels to a real user:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>LCP (Largest Contentful Paint)</strong> — how quickly the main content loads. Target: under 2.5 seconds.</li>
            <li><strong>CLS (Cumulative Layout Shift)</strong> — how much the page jumps around as it loads. Target: under 0.1.</li>
            <li><strong>INP (Interaction to Next Paint)</strong> — how quickly the page responds to clicks and taps. Target: under 200ms.</li>
          </ul>
          <p>A site that fails these metrics can rank below a less comprehensive competitor simply because it's slower.</p>

          <h2 className="text-xl font-bold text-navy-900">The Business Impact</h2>
          <p>Speed isn't just an SEO issue. Research consistently shows that even a 1-second delay in load time can reduce conversions by a meaningful percentage. On mobile — where most Indian internet users browse — the effect is even more pronounced.</p>
          <p>If you're spending money on ads or social media to drive traffic to your site and the site is slow, you're paying to frustrate people.</p>

          <h2 className="text-xl font-bold text-navy-900">The Most Common Causes of a Slow Website</h2>
          <ol className="ml-5 list-decimal space-y-3">
            <li><strong>Unoptimised images</strong> — The single biggest culprit. A 4MB JPEG hero image that should be a 150KB WebP will tank your LCP score immediately.</li>
            <li><strong>No caching</strong> — Without browser and server-side caching, every visitor reloads everything from scratch.</li>
            <li><strong>Too many plugins (WordPress)</strong> — Each plugin adds HTTP requests, JavaScript and CSS. A site with 40 plugins is rarely fast.</li>
            <li><strong>Cheap shared hosting</strong> — ₹99/month hosting puts your site on a server shared with hundreds of others. When they spike, you slow down.</li>
            <li><strong>Render-blocking scripts</strong> — JavaScript loaded in the wrong place delays the browser from painting the page.</li>
            <li><strong>No CDN</strong> — If your server is in Mumbai but your visitor is in Delhi, a CDN (Content Delivery Network) serves files from a closer location.</li>
          </ol>

          <h2 className="text-xl font-bold text-navy-900">The Highest-Impact Fixes</h2>
          <p>Not all fixes are equal. These four give you the best return:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Convert all images to WebP and set correct dimensions</strong> — Use next/image (Next.js) or a plugin like ShortPixel. This alone often improves LCP by 30–50%.</li>
            <li><strong>Move to faster hosting or a serverless platform</strong> — Vercel, Netlify or a managed WordPress host (Cloudways, Kinsta) will outperform shared hosting significantly.</li>
            <li><strong>Remove unused plugins and scripts</strong> — Audit what's actually needed. Every script you remove speeds up the page.</li>
            <li><strong>Set up a CDN</strong> — Cloudflare's free tier is a good starting point for most small business sites.</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-900">How to Check Your Site Speed Right Now</h2>
          <p>Run your URL through <strong>Google PageSpeed Insights</strong> (pagespeed.web.dev). It will give you a score out of 100 for mobile and desktop, and list specific issues to fix in order of impact. Aim for 70+ on mobile as a minimum; 90+ is excellent.</p>

          <p className="rounded-xl bg-brand-light p-4 text-brand font-medium">
            All websites built by {BRAND.name} are optimised for Core Web Vitals by default — fast hosting, compressed images and clean code are part of every build. <Link href="/contact" className="underline">Talk to us</Link> if your current site is underperforming.
          </p>
        </div>
      </article>

      <CTABand title="Is Your Website Slow?" sub="We'll audit it for free and tell you exactly what to fix." button="Get a Free Audit" />
    </>
  );
}
