import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const title = "LiftSky24 | Web, Mobile, UI/UX & AI Development Company";
const description =
  "LiftSky24 is a leading IT services company delivering web development, mobile apps, UI/UX design, cloud solutions and digital marketing for growing businesses.";

export const metadata = {
  metadataBase: new URL("https://www.liftsky24.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "LiftSky24", type: "website", images: ["/images/hero.svg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/hero.svg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LiftSky24",
  url: "https://www.liftsky24.com",
  email: "hello@liftsky24.com",
  description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
