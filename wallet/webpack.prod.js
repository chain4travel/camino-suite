const merge = require('webpack-merge')
const common = require('./webpack.common.js')

let timestamp = Date.now()

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',

    output: {
        publicPath: 'https://playground.suite-wallet.camino.foundation/',
        filename: 'js/[name].[fullhash:8].' + timestamp + '.js',
        chunkFilename: 'js/[name].[fullhash:8].' + timestamp + '.js',
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxSize: 512000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
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
})
