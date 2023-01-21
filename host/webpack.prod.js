const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin.js");
const deps = require("./package.json").dependencies;

let timestamp = Date.now();

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  output: {
    publicPath: "https://playground.suite.camino.foundation/",
    filename: "js/[name].[fullhash:8]." + timestamp + ".js",
    chunkFilename: "js/[name].[fullhash:8]." + timestamp + ".js",
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

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxSize: 512000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
