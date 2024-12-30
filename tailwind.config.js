/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        "charcoal": "#333333",
        "golden-yellow": "#FFBF00",
        "slate-blue": "#6A5ACD",
      },

      fontFamily: {
        "roboto": ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif']
      }
    },

    maxWidth: {
      "screen-1200": "1200px",
      "screen-850": "850px",

    }
  },
  plugins: [],
}

