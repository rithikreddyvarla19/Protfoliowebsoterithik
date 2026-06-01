/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52, 211, 153, 0.22), 0 24px 80px rgba(5, 150, 105, 0.18)"
      },
      backgroundImage: {
        "subtle-grid":
          "linear-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.07) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
