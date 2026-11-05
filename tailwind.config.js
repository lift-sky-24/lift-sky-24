/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:   "#10111a",
        paper: "#f7f6f2",
        muted: "#686a76",
        dark:  "#11121b",
        // brand palette — keep EXACTLY as defined in the theme session
        brand: {
          DEFAULT: "#6557ff",   // added so `border-brand`, `text-brand`, `bg-brand-light` work
          light:   "#ede9ff",   // added so `bg-brand-light` works
          purple:  "#6557ff",
          cyan:    "#35d9ff",
          lime:    "#c7ff5e",
          pink:    "#ff4fa3",
          orange:  "#ff6338",
          violet:  "#7c3aed",   // added so `to-brand-violet` in CTABand works
        },
        // legacy names kept so nothing breaks
        navy: { 900: "#10111a", 800: "#11121b", 700: "#30264a" },
        slate: {                 // ensure slate-50/70 works (Tailwind has these by default)
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(110deg,#6557ff,#ff4fa3)",
        "cta-gradient":   "radial-gradient(ellipse at 12% 70%,#6535c8,transparent 36%),radial-gradient(ellipse at 90% 20%,#d94b7b,transparent 35%),#11121b",
        "hero-wash":      "radial-gradient(ellipse at 80% 25%,#e2d9ffb8,transparent 34%),radial-gradient(ellipse at 48% 75%,#d5f5ff9c,transparent 35%)",
        "dark-section":   "radial-gradient(ellipse at 78% 10%,#39256d,transparent 34%),radial-gradient(ellipse at 0 90%,#17394b,transparent 32%),#11121b",
      },
      boxShadow: {
        card:    "0 10px 30px -12px rgba(101,87,255,.25)",
        "card-lg":"0 25px 60px rgba(41,32,71,.15)",
      },
    },
  },
  plugins: [],
};
