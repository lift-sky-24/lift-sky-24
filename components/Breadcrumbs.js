import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";

/**
 * items: [{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "SEO" }]
 * Last item has no href (current page).
 */
export default function Breadcrumbs({ items }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(all)) }} />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="breadcrumb-sep" aria-hidden="true" />}
            {item.href
              ? <Link href={item.href}>{item.name}</Link>
              : <span aria-current="page" style={{ color: "var(--ink)" }}>{item.name}</span>
            }
          </span>
        ))}
      </nav>
    </>
  );
}
