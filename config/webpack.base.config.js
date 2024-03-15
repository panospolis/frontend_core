const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: [/node_modules/, /src_/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    output: {
        filename: 'main_react.js',
        path: path.resolve(__dirname, '../../static/js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './../templates/frontend/index.html',
            filename: './index.html'
        })
    ],stats: {
        children: true, // Enable detailed output for child compilations
    },
}