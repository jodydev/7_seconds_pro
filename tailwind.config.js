/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '1400px',
    'xl': '1920px',
    '2xl': '2440px'
  },
  plugins: [require("flowbite/plugin")],
};
