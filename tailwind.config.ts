import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        bg:       "#0A0A0A",
        surface:  "#111111",
        surface2: "#181818",
        primary:  "#F0EAD8",
        muted:    "#555555",
        dim:      "#333333",
        accent:   "#2A6B4A",
        accent2:  "#4AAD7A",
        border: "rgba(255,255,255,0.06)",
        input:  "rgba(255,255,255,0.06)",
        ring:   "#2A6B4A",
        background: "#0A0A0A",
        foreground: "#F0EAD8",
        card: {
          DEFAULT:    "#111111",
          foreground: "#F0EAD8",
        },
        popover: {
          DEFAULT:    "#111111",
          foreground: "#F0EAD8",
        },
        secondary: {
          DEFAULT:    "#181818",
          foreground: "#F0EAD8",
        },
        destructive: {
          DEFAULT:    "#7F1D1D",
          foreground: "#F0EAD8",
        },
      },
      borderRadius: {
        DEFAULT: "0px",
        sm:      "1px",
        md:      "2px",
        lg:      "2px",
        xl:      "2px",
        "2xl":   "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
