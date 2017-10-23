// /**
//  * Created by pobo on 2016/12/12.
//  */
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// module.exports = {
//     entry:{
//         main:'./main.js',
//         // chunk:["./chunk1.js","./chunk2.js"]//插件中name,filename必须以这个key为值
//         main1:'./main1.js',
//         common1:['jquery'],
//         common2:['vue']
//     },
//     output:{
//         path:__dirname+'/dist',
//         filename:'[name].js'//不使用[name]，并且插件中没有filename，这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
//     },
//     plugin:[
//         new CommonsChunkPlugin({
//             name:["chunk","common1","common2"],//页面上使用的时候common2 //必须最先加载
//             // filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
//             minChunks:2
//         })
//     ]
// }

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        jquery: ['jquery'],
        // vue: ['vue']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'//不使用[name]，并且插件中没有filename，
        //这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ["jquery"],//页面上使用的时候common2
            //必须最先加载
            // filename:"chunk.js"//忽略则以name为输出文件的名字，
            //否则以此为输出文件名字
            // minChunks: Infinity//chunk1和chunk2都打包到main.js,main1.js里
            minChunks: 2,//打包公共模块-chunk1和chunk2
            chunks:["main","main1"]
        })
    ]
};