/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Black + Orange system ───────────────────────────
        ink:   "#171717",
        paper: "#F8F7F4",
        muted: "#6B6B70",
        dark:  "#101114",
        brand: {
          DEFAULT: "#FC6E04",
          dark:    "#E04F00",
          light:   "#FFF0E4",
          orange:  "#FC6E04",
          warm:    "#FF8A1F",
        },
        navy: { 900: "#171717", 800: "#101114", 700: "#2A160D" },
        // Border helpers
        border: {
          DEFAULT: "#EAE5DF",
          orange:  "#FFD4B3",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        // ── Brand gradients ───────────────────────────────────────
        "brand-gradient":  "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
        "brand-gradient-r":"linear-gradient(110deg,#E04F00,#FC6E04,#FF8A1F)",
        "cta-gradient":    "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)",
        "dark-section":    "linear-gradient(135deg,#101114 0%,#1B1714 55%,#2A160D 100%)",
        "hero-wash":       "radial-gradient(ellipse at 80% 25%,rgba(252,110,4,0.08),transparent 34%),radial-gradient(ellipse at 48% 75%,rgba(255,138,31,0.06),transparent 35%)",

        // ── Hero background tokens ────────────────────────────────
        "hero-bg-wash":   "radial-gradient(ellipse at 76% 25%, rgba(252,110,4,0.10), transparent 37%), radial-gradient(ellipse at 45% 75%, rgba(255,138,31,0.07), transparent 35%)",
        "hero-bg-aurora": "conic-gradient(#FF8A1F, #FC6E04, #E04F00, #FF8A1F, #FFC680, #FF8A1F)",
        "hero-bg-glow":   "conic-gradient(#FC6E04, #E04F00, #FF8A1F, #FFC680, #FC6E04, #E04F00)",
        "hero-bg-dots":   "radial-gradient(#10111420 .7px, transparent .7px)",
      },
      backgroundSize: {
        "hero-bg-dots": "8px 8px",
      },
      boxShadow: {
        card:     "0 10px 30px -12px rgba(252,110,4,0.18)",
        "card-lg":"0 25px 60px rgba(20,12,4,0.12)",
        "orange": "0 8px 24px rgba(252,110,4,0.28)",
      },
      keyframes: {
        "hero-bg-aurora": {
          to: { transform: "translate(-25px, 20px) scale(1.07)" },
        },
        "hero-bg-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "hero-bg-aurora": "hero-bg-aurora 12s ease-in-out infinite alternate",
        "hero-bg-spin":   "hero-bg-spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
