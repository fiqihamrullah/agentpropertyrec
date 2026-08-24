/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12161F",
          panel: "#1A2030",
          border: "#2A3244",
        },
        brass: {
          DEFAULT: "#C89B5C",
          soft: "#D9B888",
          dim: "#8A6C3F",
        },
        teal: {
          DEFAULT: "#4FA69C",
        },
        parchment: "#EFE7D8",
        slate: {
          DEFAULT: "#9BA6BA",
          dim: "#6B7488",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
