/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: ["Silkscreen", "cursive"], // adding Silkscreen
      },
    },
  },
  plugins: [],
};
