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
        glow: "0 0 0 1px rgba(45, 212, 191, 0.18), 0 24px 80px rgba(15, 118, 110, 0.18)"
      },
      backgroundImage: {
        "subtle-grid":
          "linear-gradient(rgba(20, 184, 166, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.09) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
