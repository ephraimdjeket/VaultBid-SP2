/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  safelist: [
    "max-w-cards-250", "pl-7", "py-9", "w-40",
    "h-9",
    "mt-5", "bg-white",
    "rounded-xl",
    "max-w-cards-250",
    "mt-16", "rounded-t-xl", "block", "w-full", "object-cover", "w-1/3", "text-ellipsis", "overflow-hidden", "text-clip"
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        charcoal: "#333333",
        "golden-yellow": "#FFBF00",
        "slate-blue": "#6A5ACD",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      maxWidth: {
        "screen-1200": "1200px",
        "screen-850": "850px",
        "screen-550": "550px",
        "cards-250": "250px",
      },
      width: {
        '450': '28.125rem',
      },
    },
  },
  plugins: [],
};


