/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0A1440", 800: "#0F1D5C", 700: "#1B2A7A" },
        brand: { DEFAULT: "#4F46E5", light: "#EEF2FF", violet: "#7C3AED", pink: "#D946EF" },
        ink: "#111A3E",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg,#4F46E5 0%,#7C3AED 55%,#D946EF 100%)",
        "hero-wash": "radial-gradient(60% 60% at 85% 10%,#E0E7FF 0%,transparent 70%),radial-gradient(40% 50% at 0% 0%,#F3E8FF 0%,transparent 70%)",
      },
      boxShadow: { card: "0 10px 30px -12px rgba(79,70,229,.25)" },
    },
  },
  plugins: [],
};
