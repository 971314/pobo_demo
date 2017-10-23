/**
 * Created by pobo on 2016/12/12.
 */
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkplugin('common.js');

module.exports = {
    //插件项
    plugins:[commonsPlugin],//插件项 CommonsChunkPlugin插件-用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
    //页面入口配置文件
    entry:{//页面入口文件配置
        index:'./src/js/page/index.js'
    },
    //入口文件输出配置
    output:{//output 是对应输出项配置
        path:'dist/js/page',
        filename:'[name].js'
    },
    module:{//module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理。 所有加载器需要使用npm来加载
        //加载配置器
        loaders:[
            {test:/\.css$/,loader:'style-loader!css-loader'},
            {test:/\.js$/,loader:'jsx-loader?harmony'},
            {test:/\.scss$/,loader:'style!css!sass?sourceMap'},
            {test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
        ]
    },
    //其他解决方案配置
    resolve:{//resolve 配置，配置查找模块的路径和扩展名和别名（方便书写）
        root:'E:/github/flux-example/src',//绝对路径
        extensions:['','.js','.json','.scss'],
        alias:{
            AppStore:'js/stores/AppStores.js',
            ActionType:'js/actions/ActionType.js',
            AppAction:'js/actions/AppAction.js'
        }
    }

}