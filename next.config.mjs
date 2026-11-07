/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Three.js uses ESM-only imports — must be transpiled by Next.js
  transpilePackages: ["three"],

  // Permanent redirects for removed / renamed service routes
  async redirects() {
    return [
      { source: "/services/ai-ml",          destination: "/services",                  permanent: true },
      { source: "/services/mobile-apps",     destination: "/services/app-development",  permanent: true },
      { source: "/services/ui-ux-design",    destination: "/services/graphic-design",   permanent: true },
      { source: "/services/web-development", destination: "/services/website-development", permanent: true },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com"   },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com"   },
    ],
  },
};

export default nextConfig;
