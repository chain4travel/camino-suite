const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let timestamp = Date.now();

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    publicPath: 'https://playground.suite-explorer.camino.foundation/',
    filename: 'js/[name].[fullhash:8].' + timestamp + '.js',
    chunkFilename: 'js/[name].[fullhash:8].' + timestamp + '.js',
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
