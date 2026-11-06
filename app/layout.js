import "./globals.css";
import "aos/dist/aos.css";
import Header              from "@/components/Header";
import Footer              from "@/components/Footer";
import WhatsAppFAB         from "@/components/WhatsAppFAB";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import AOSProvider          from "@/components/animation/AOSProvider";
import ScrollProgressBar    from "@/components/animation/ScrollProgressBar";
import PageTransition       from "@/components/animation/PageTransition";
import { BRAND, CONTACT, LOCAL_SEO, SERVICES } from "@/data/site-config";

const title       = `${BRAND.name} | Website, App, SEO & Digital Marketing Agency in ${LOCAL_SEO.city}`;
const description = `${BRAND.name} — website development, app development, software development, social media management, SEO, graphic design and digital marketing services for startups and growing businesses in ${LOCAL_SEO.city}, ${LOCAL_SEO.region}.`;

export const metadata = {
  metadataBase: new URL(BRAND.url),
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: { title, description, url: "/", siteName: BRAND.name, type: "website", images: [{ url: BRAND.ogImage, width: 1200, height: 630 }] },
  twitter:   { card: "summary_large_image", title, description, images: [BRAND.ogImage] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name:        BRAND.name,
  url:         BRAND.url,
  email:       CONTACT.email,
  telephone:   CONTACT.phone,
  description,
  address: {
    "@type":         "PostalAddress",
    streetAddress:   `${CONTACT.address.line1}, ${CONTACT.address.line2}`,
    addressLocality: CONTACT.address.city,
    addressRegion:   CONTACT.address.state,
    postalCode:      CONTACT.address.pin,
    addressCountry:  "IN",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: { "@type": "Service", name: s.name, description: s.desc, url: `${BRAND.url}${s.href}` },
    })),
  },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon — explicit tag for maximum browser compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Skip-to-content */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-card">
          Skip to main content
        </a>

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* ── Animation global layer ── */}
        <SmoothScrollProvider>
          <AOSProvider>
            {/* Scroll progress bar */}
            <ScrollProgressBar />

            <Header />
            <main id="main">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <WhatsAppFAB />
          </AOSProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
