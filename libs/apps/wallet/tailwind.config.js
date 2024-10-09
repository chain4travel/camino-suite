const { join } = require('path');

const workspacePreset = require('../../../tailwind-workspace-preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
  theme: {
    extend: {},
  },
  plugins: [],
};