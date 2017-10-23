/**
 * Created by pobo on 2017/3/13.
 */
var webpack = require('webpack');

module.exports = {
    entry:'./entry.js',
    output:{
        path:__dirname,
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    plugins:[
        new webpack.BannerPlugin('这是文件头部注释信息')
    ]
}