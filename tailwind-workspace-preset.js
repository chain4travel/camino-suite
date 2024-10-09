// tailwind-workspace-preset.js
const { colors } = require('./libs/styles/src');

module.exports = {
  mode: 'jit',
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
