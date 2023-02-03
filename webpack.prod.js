const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js')
const deps = require('./package.json').dependencies

let timestamp = Date.now()
const publicPath = process.env.PUBLIC_PATH
const explorerPath = process.env.EXPLORER_PATH
const walletPath = process.env.WALLET_PATH
const dist = process.env.DIST

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',

    output: {
        publicPath: publicPath,
        filename: 'js/[name].[fullhash:8].' + timestamp + '.js',
        chunkFilename: 'js/[name].[fullhash:8].' + timestamp + '.js',
        path: __dirname + '/' + dist,
        clean: true,
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'host_react',
            filename: 'remoteEntry.js',
            remotes: {
                Explorer: 'Explorer@' + explorerPath + '/remoteEntry.js',
                wallet: 'wallet@' + walletPath + '/remoteEntry.js',
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

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})
