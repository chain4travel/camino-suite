const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { VueLoaderPlugin } = require('vue-loader')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const path = require('path')
const deps = require('./package.json').dependencies
module.exports = {
    output: {
        publicPath: 'http://localhost:3003/',
        // where images are stored
        assetModuleFilename: 'public/[hash][ext][query]',
    },

    devServer: {
        port: 3003,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                include: /src/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                type: 'asset/resource',
                include: [
                    //     // Add the paths to the folders that contain your icons
                    path.resolve(__dirname, 'src/assets'),
                ],
            },
            {
                test: /\.(scss|css|sass)$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.vue', '.jsx', '.js', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            '@': path.resolve(__dirname, 'src'),
        },
    },

    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new NodePolyfillPlugin(),
        new ModuleFederationPlugin({
            name: 'wallet',
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {
                './store': './src/store/index.ts',
                './mountApp': './src/bootloader.ts',
            },
            shared: {
                ...deps,
                vue: {
                    singleton: true,
                    eager: true,
                    version: deps.vue,
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            favicon: './public/favicon.ico',
        }),
    ],
}
