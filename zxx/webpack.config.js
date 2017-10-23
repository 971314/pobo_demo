var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");

var browsers = ["Android >= 4.0", "iOS >= 7"];

//webpack基础配置
var basicConfig = {
    entry: { app: "./src/main.js" },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./[name].[hash].js"
    },
    resolve: {
        extensions: ["", ".js", ".vue"]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: "vue"
        }, {
        test: /\.js$/,
    loader: "babel",
    include: path.resolve(__dirname, "./src"),
    exclude: /node_modules/
}, {
    test: /\.css$/,
        loader: "style!css"
}, {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
        limit: 30000,
            name: './img/[name].[hash:7].[ext]'
    }
}]
},
vue: {
    postcss: [
        autoprefixer({
            browsers: browsers
        })
    ]
},
postcss: [
    autoprefixer({
        browsers: browsers
    })
    ],

}

//webpack开发环境配置
var devConfig = {
    entry: { app: ["./src/main.js", "webpack-hot-middleware/client?noInfo=true&reload=true"] },
    devtool: '#eval-source-map',
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "vue-style!css!less!postcss"
        }]
    },
    vue: {
        loaders: {
            css: "vue-style!css",
            less: "vue-style!css!less"
        },
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        //开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        })
    ]
}

//webpack生产环境配置
var proConfig = {
    module: {
        loaders: [{
            //配合ExtractTextPlugin使用
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("css!less!postcss")
        }]
    },
    vue: {
        loaders: {
            //配合ExtractTextPlugin使用
            css: ExtractTextPlugin.extract("css"),
            less: ExtractTextPlugin.extract("css!less")
        },
    },
    plugins: [
        //css单独出个文件
        new ExtractTextPlugin("./style.[contenthash].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 分js打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        }),
        //正式环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}

module.exports = merge(basicConfig, process.env.NODE_ENV === "dev" ? devConfig : proConfig);
