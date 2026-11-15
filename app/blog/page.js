import Link         from "next/link";
import { Section }  from "@/components/Sections";
import { Stagger, StaggerItem, Reveal } from "@/components/ui";
import { meta }     from "@/lib/seo";
import { BRAND, BLOG_POSTS } from "@/data/site-config";
import { blogArticlesSection } from "@/data/pages/blog";
import FloatingHero from "@/components/FloatingHero";
import { heroElements } from "@/data/hero-elements";

export const metadata = meta(
  "Blog & Resources",
  `Practical guides on website development, SEO, social media and digital marketing from the ${BRAND.name} team in Jaipur.`,
  "/blog"
);

export default function Blog() {
  return (
    <>
      <FloatingHero
        eyebrow="BLOG & RESOURCES"
        title="Practical Guides to Help Your Business Grow Online"
        titleAccent="Grow Online"
        description="Straight-talking articles on web development, SEO, digital marketing and social media — written by the LiftSky24 team in Jaipur."
        ctas={[
          { text: "Start a Project", href: "/contact",  variant: "primary"   },
          { text: "Our Services",    href: "/services", variant: "secondary" },
        ]}
        centerIcon={heroElements.blog.centerIcon}
        centerLabel={heroElements.blog.centerLabel}
        floatingElements={heroElements.blog.elements}
      />

      <Section title={blogArticlesSection.title}>
        <Stagger className={`grid gap-6 ${blogArticlesSection.cols}`}>
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="blog-card group block h-full">
                <div className="h-44 bg-brand-light flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand/60">{post.category}</span>
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-medium text-muted">
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    &nbsp;·&nbsp;{post.readMin} min read
                  </p>
                  <h2 className="text-base font-bold leading-snug text-navy-900 group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    Read article &rarr;
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
