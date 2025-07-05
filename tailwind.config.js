/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#F5F5DC",
          light: "#FAF9F6",
        },
        charcoal: {
          DEFAULT: "#232323",
          light: "#333",
        },
        gold: {
          DEFAULT: "#D4AF37",
        },
        purple: {
          DEFAULT: "#A259F7", // main accent
          dark: "#6C2BD7",
        },
        lavender: {
          DEFAULT: "#E6E6FA",
          light: "#F3E8FF",
        },
        primary: "#A259F7", // purple accent
        background: "#FAF9F6", // warm light
      },
      fontFamily: {
        sans: [
          "Aeonik",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: ["Aeonik", "sans-serif"],
        michroma: ["Michroma", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 8px 32px 0 rgba(44, 44, 84, 0.12)",
        gold: "0 4px 24px 0 rgba(212, 175, 55, 0.10)",
      },
      borderRadius: {
        xl: "1.25rem",
        luxury: "2rem",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
