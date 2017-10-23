var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
var webpack = require('webpack');
module.exports = {
    entry: [
        'babel-polyfill',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'./app/main.js')
    ],
    output: {
        filename: "[name].js",
        path: __dirname + '/build'
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            // {
            //     test: /\.js[x]?$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader?presets[]=es2015&presets[]=react',
            // },
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        HtmlWebpackPluginConfig
    ]
}