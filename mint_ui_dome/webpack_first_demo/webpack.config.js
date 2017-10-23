var webpack = require('webpack'),
    path = require('path');// NodeJS中的Path对象，用于处理目录的对象，提高开发效率。

module.exports = {
    entry:'./src/main',
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'[name].js',
        publicPath: '/dist/'// 公共文件生成的地址
    },
    devServer:{
        historyApiFallback:true,
        hot:false,
        inline:true,
        progress:true
    },
    module:{
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader!autoprefixer'
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader?limit=8192'
            },
            {
                test:/\.(html|tpl)$/,
                loader:'html-loader'
            }
        ]
    },
    resolve:{// require时省略的扩展名，如：require('module') 不需要module.js
        extensions:['','.js','.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        /*alias:{
            filter:path.join(__dirname,'./src/filters'),
            components:path.join(__dirname,'./src/components')
        }*/
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    // devtool:'eval-source-map',
    plugins:[
        new webpack.BannerPlugin('这里是打包文件头部注释!')
    ]
};