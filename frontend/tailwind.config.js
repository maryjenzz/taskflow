/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-grape': '#4a4063',
        'thistle': '#bfacc8',
        'pale-slate': '#c8c6d7',
        'velvet-orchid': '#783f8e',
        'indigo-custom': '#4f1271',
      },
    },
  },
  plugins: [],
}
