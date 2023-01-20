const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin.js");
const deps = require("./package.json").dependencies;

module.exports = merge(common, {
  mode: "production",
  devtool: "inline-source-map",

  output: {
    publicPath: "https://playground.suite.camino.foundation/",
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host_react",
      filename: "remoteEntry.js",
      remotes: {
        Explorer:
          "Explorer@https://playground.suite-explorer.camino.foundation/remoteEntry.js",
        wallet:
          "wallet@https://playground.suite-wallet.camino.foundation/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
