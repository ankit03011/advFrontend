/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B0F1A",     // Deep Burgundy
        secondary: "#D4AF37",   // Gold
        cream: "#FFF8E7",       // Warm Cream Background
        dark: "#2B2B2B",        // Charcoal
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(107, 15, 26, 0.15)",
        gold: "0 10px 30px -10px rgba(212, 175, 55, 0.25)",
      }
    },
  },
  plugins: [],
}
