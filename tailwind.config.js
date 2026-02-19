module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C81',
        accent: '#2A9D8F',
        highlight: '#E9C46A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
