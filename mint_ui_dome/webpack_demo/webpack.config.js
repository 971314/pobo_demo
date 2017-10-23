var webpack = require('webpack');
module.exports = {
    entry:'./src/app.js',
    output:{
        path:'./bin',
        filename:'app.bundle.js'
    },
    module:{
        loaders:[
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/}
        ]
    },
    plugins:[
        new webpack.BannerPlugin('菜牛'),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            output:{
                comments:false
            }
        })
    ]
};
