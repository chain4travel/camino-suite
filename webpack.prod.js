const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js')
const deps = require('./package.json').dependencies

const publicPath = process.env.PUBLIC_PATH
const explorerPath = process.env.EXPLORER_PATH
const walletPath = process.env.WALLET_PATH

module.exports = merge(common, {
    mode: 'production',

    output: {
        publicPath: publicPath,
        filename: 'js/[name].[fullhash:8].js',
        chunkFilename: 'js/[name].[fullhash:8].js',
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'host_react',
            filename: 'remoteEntry.js',
            remotes: {
                Explorer: 'Explorer@' + explorerPath + 'remoteEntry.js',
                wallet: 'wallet@' + walletPath + 'remoteEntry.js',
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            maxSize: 250000,
        },
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})
