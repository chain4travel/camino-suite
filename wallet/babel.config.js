module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@vue/cli-plugin-babel/preset",
  ],
  plugins: [
    ["@babel/proposal-decorators", { legacy: true }],
    ["@babel/proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
  ],
};
