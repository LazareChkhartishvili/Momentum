/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8338EC",
      },
      fontFamily: {
        FiraGo: ["FiraGo", "sans-serif"],
        heading: ["Fredoka", "sans-serif"],
      },
    },
  },
  plugins: [],
};
