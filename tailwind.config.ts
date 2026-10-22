import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5fa",
          100: "#e1ecf6",
          200: "#c7dcf0",
          300: "#9ec4e5",
          400: "#6fa6d6",
          500: "#4988c5",
          600: "#366eab",
          700: "#2d578b",
          800: "#284a74",
          900: "#163355",
          950: "#0b1a30",
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
        luxury: "0 10px 30px -10px rgba(15, 23, 42, 0.25), 0 4px 6px -4px rgba(212, 175, 55, 0.1)",
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
