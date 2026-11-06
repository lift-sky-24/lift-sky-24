/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    // pages/ does not exist in this project (App Router only)
  ],
  theme: {
    extend: {
      colors: {
        ink:   "#10111a",
        paper: "#f7f6f2",
        muted: "#686a76",
        dark:  "#11121b",
        brand: {
          DEFAULT: "#6557ff",
          light:   "#ede9ff",
          purple:  "#6557ff",
          cyan:    "#35d9ff",
          lime:    "#c7ff5e",
          pink:    "#ff4fa3",
          orange:  "#ff6338",
          violet:  "#7c3aed",
        },
        navy: { 900: "#10111a", 800: "#11121b", 700: "#30264a" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        // ── Existing tokens (keep exactly as-is) ─────────────────────
        "brand-gradient": "linear-gradient(110deg,#6557ff,#ff4fa3)",
        "cta-gradient":   "radial-gradient(ellipse at 12% 70%,#6535c8,transparent 36%),radial-gradient(ellipse at 90% 20%,#d94b7b,transparent 35%),#11121b",
        "hero-wash":      "radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%)",
        "dark-section":   "radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b",

        // ── New tokens: home hero background (reference design) ──────
        "hero-bg-wash":   "radial-gradient(ellipse at 76% 25%, #e2d9ff99, transparent 37%), radial-gradient(ellipse at 45% 75%, #d6f7ff85, transparent 35%)",
        "hero-bg-aurora": "conic-gradient(#ff7148, #ff4fa3, #7357ff, #40e0ff, #d4ff62, #ff7148)",
        "hero-bg-glow":   "conic-gradient(#ff4fa3, #7357ff, #40e0ff, #d4ff62, #ff7148, #ff4fa3)",
        "hero-bg-dots":   "radial-gradient(#10101930 .7px, transparent .7px)",
      },
      backgroundSize: {
        "hero-bg-dots": "8px 8px",
      },
      boxShadow: {
        card:     "0 10px 30px -12px rgba(101,87,255,.25)",
        "card-lg":"0 25px 60px rgba(41,32,71,.15)",
      },
      keyframes: {
        // ── New: home hero aurora blob ─────────────────────────────
        "hero-bg-aurora": {
          to: { transform: "translate(-25px, 20px) scale(1.07)" },
        },
        // ── New: glow ring spin ────────────────────────────────────
        "hero-bg-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        // ── New: home hero animations ──────────────────────────────
        "hero-bg-aurora": "hero-bg-aurora 12s ease-in-out infinite alternate",
        "hero-bg-spin":   "hero-bg-spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
