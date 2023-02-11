const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    resolve: {
        extensions: ['.vue', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    cache: false,

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: 'public/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/manifest.json'),
                    to: path.resolve(__dirname, 'dist/manifest.json'),
                },
                {
                    from: path.resolve(__dirname, 'public/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
                {
                    from: path.resolve(__dirname, 'public/fonts'),
                    to: path.resolve(__dirname, 'dist/fonts'),
                },
                {
                    from: 'public/img',
                    to: path.resolve(__dirname, 'dist/img'),
                },
                {
                    from: 'public/gif',
                    to: path.resolve(__dirname, 'dist/gif'),
                },
            ],
        }),
    ],
}
