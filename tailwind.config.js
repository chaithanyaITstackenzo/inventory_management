/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", "-apple-system", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#DBEAFE",
        },
        accent: {
          DEFAULT: "#14B8A6",
          light: "#CCFBF1",
        },
        sidebar: "#0F172A",
      },
    },
  },
  plugins: [],
};
