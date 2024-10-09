const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const workspacePreset = require('../../tailwind-workspace-preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [workspacePreset],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    '../../tailwind-workspace-preset.js',  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
