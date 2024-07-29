/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage : {
        'banner': "url('/banner.jpg')",
      }
    },
  },
  plugins: [],
};
