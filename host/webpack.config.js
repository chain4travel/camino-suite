const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "https://playground.suite.camino.foundation/",
  },

  resolve: {
    extensions: [".vue", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
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
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: "./public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
        {
          from: path.resolve(__dirname, "public/fonts"),
          to: path.resolve(__dirname, "dist/fonts"),
        },
        {
          from: "../wallet/public/img",
          to: path.resolve(__dirname, "dist/img"),
        },
        {
          from: "../wallet/public/gif",
          to: path.resolve(__dirname, "dist/gif"),
        },
      ],
    }),
  ],
};
