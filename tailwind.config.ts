import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        gold: {
          50: "#fdfbf3",
          100: "#fdf6db",
          200: "#fbebb6",
          300: "#f7dc87",
          400: "#f2c755",
          500: "#d4af37",
          600: "#c59b27",
          700: "#a67c1c",
          800: "#85601a",
          900: "#6d4e19",
          950: "#3e2a09",
        },
        navy: {
          800: "#0d2b45",
          900: "#091e32",
          950: "#05111d",
        },
        ivory: {
          50: "#fdfdfb",
          100: "#faf9f5",
          200: "#f4f1ea",
          300: "#ece7dc",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
        amiri: ["var(--font-amiri)", "serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(6, 78, 59, 0.15), 0 4px 6px -4px rgba(212, 175, 55, 0.1)",
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
