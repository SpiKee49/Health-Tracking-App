/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#00a6a6',
        hover: '#016363',
      },
    },
  },
  plugins: [],
};
