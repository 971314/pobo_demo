/**
 * Created by pobo on 2017/3/8.
 */
var webpack = require('webpack'),
    path = require('path');

let config = {
    entry:{
        main:'./src/index.js',
        // common:['vue']
    },
    output:{
        path:path.join(__dirname,'./'),
        publicPath:'',
        filename:'js/[name].js'
    },
    module:{
        loaders:[
            {test:/\.vue$/,loader:'vue-loader'},
            {test: /\.html$/, loader: "html?minimize=false" }
        ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    plugins:[
        // new webpack.optimize.CommonsChunkPlugin({name:'common',filename:'js/common.js'})
    ]
};

module.exports = config;