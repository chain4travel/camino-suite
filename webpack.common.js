const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const { execSync } = require('child_process')

const getGitInformation = () => {
    try {
        const commit = execSync('git rev-parse --short HEAD').toString().trim()
        const repo = execSync('git config --get remote.origin.url').toString().trim()
        const tag = execSync('git describe --tags --always').toString().trim()
        console.log('Debug: Tag = ', tag)
        return { commit, repo, tag }
    } catch (e) {
        return { commit: '', repo: '', tag: '' }
    }
}

const gitInfo = getGitInformation()

module.exports = {
    resolve: {
        extensions: ['.vue', '.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

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
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
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
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env.GIT_COMMIT_HASH': JSON.stringify(gitInfo.commit),
            'process.env.VERSION': JSON.stringify(gitInfo.tag),
            'process.env.RELEASES_PAGE': JSON.stringify(gitInfo.repo),
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: 'public/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: path.resolve(__dirname, 'dist'),
                    globOptions: {
                        ignore: ['**/index.html', '**/favicon.ico'],
                    },
                },
            ],
        }),
    ],
}
