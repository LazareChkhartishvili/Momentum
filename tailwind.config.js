/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8338EC",
        darkGray: "#212529",
      },
      fontFamily: {
        FiraGo: ["FiraGo", "sans-serif"],
        heading: ["Fredoka", "sans-serif"],
      },
    },
  },
  plugins: [],
};
