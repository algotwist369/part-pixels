/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        geist: ["Geist Mono", "monospace"],
      },
      fontSize: {
        display: ["7rem", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "page-title": ["8rem", { lineHeight: "0.88", letterSpacing: "-0.055em" }],
        copy: ["0.875rem", { lineHeight: "1.75" }],
        interface: ["1rem", { lineHeight: "1.5" }],
        card: ["1.25rem", { lineHeight: "1.5" }],
      },
      fontWeight: {
        display: "700",
      },
    },
  },
  plugins: [],
}
