import type { Config } from "tailwindcss";

/**
 * Theme tokens for TriNurture.
 * Tailwind CSS v4 reads colors primarily from `@theme` in `app/globals.css`.
 * This file documents the design tokens and stays available if you add
 * plugins or migrate tooling later.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6B8F71",
          dark: "#557A5B",
          light: "#E8F0E9",
        },
        secondary: {
          DEFAULT: "#C4785A",
          dark: "#A86248",
          light: "#F7EBE6",
        },
        background: {
          DEFAULT: "#FAF6F1",
          warm: "#F5EBE0",
        },
        surface: "#FFFFFF",
        text: {
          DEFAULT: "#3D3632",
          muted: "#6B635C",
        },
        border: "#E8DFD4",
      },
      fontFamily: {
        heading: ["var(--font-nunito)", "ui-rounded", "system-ui", "sans-serif"],
        sans: [
          "var(--font-plus-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 30px rgb(61 54 50 / 0.06)",
        card: "0 4px 24px rgb(61 54 50 / 0.05)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
