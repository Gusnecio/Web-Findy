/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastel: "#FF7674",
      },
      fontFamily: {
        balsamiq: ["'Balsamiq Sans'", "sans-serif"],
      },
      backgroundImage: {
        "nav-bg": "url('/icons/nav.png')",
      },
    },
  },

  plugins: [],
};
