/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts, css}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: '#0C71B4',
        'emerald-dark': '#0A5E96',
      },
    },
  },
  plugins: [],
}

