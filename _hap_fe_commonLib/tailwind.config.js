/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#86B3E0',
        secondary: '#DFEDE7',
        tertiary: '#FFEDD7',
        'bold-primary': '#0B3966',
        'bold-secondary': '#28B53E',
        'bold-tertiary': '#B9F8AE',
        'light-navy': '#184A7A',
        'white-smoke': '#F6F6F6',
      },
    },
  },
  plugins: [],
}
