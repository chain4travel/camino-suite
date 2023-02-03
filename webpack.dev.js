const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin.js')
const common = require('./webpack.common.js')
const deps = require('./package.json').dependencies

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',

    output: {
        publicPath: 'http://localhost:3000/',
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
        static: './dist',
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'host_react',
            filename: 'remoteEntry.js',
            remotes: {
                Explorer: 'Explorer@http://localhost:3001/remoteEntry.js',
                wallet: 'wallet@http://localhost:3003/remoteEntry.js',
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
})
