var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var precss = require('precss');
// var autoprefixer = require('autoprefixer');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: './', // path定义为项目目录，保证编译后的文件在正确的目录下，并且通过HtmlWebpackPlugin引入的路径正常
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      // ↓↓↓通过babel-loader编译时，如果采用es2015编码，需要加query配置项，表明采用的是es2015，stage-2,该配置参考vue-hackernews-2.0
      //    stage-2是为了可以编译对象扩展运算符
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {presets: [['es2015', {'modules': false}], 'stage-2']}},
      // // ↓↓↓css-loader的-url模式可以禁止css中的url被改变
      // {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?-url!postcss')},
      // // ↓↓↓url-loader 参数limit=8192(8kb)以下图片转为base64编码，name选项可以定义编译后文件位置和名字
      // {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url?limit=8192&name=images/[name].[ext]'},
      // ↓↓↓由于在网上看到关于base64编码图片的弊端，决定一律不转换base64编码使用file-loader
      {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'file?name=images/[name].[ext]'},
      // // ↓↓↓通过html-withimg-loader确保html中图片路径的正确性
      // {test: /\.html$/, loader: 'html-withimg'}
    ]
  },
  // ↓↓↓通过配置vue-loader并配合plugins中ExtractTextPlugin可以把.vue文件中的css抽出来合并为一个文件
  // vue: {
  //   loaders: {
  //     css: ExtractTextPlugin.extract('style', 'css?-url!postcss')
  //   }
  // },
  // postcss: function () {
  //   // ↓↓↓autoprefixer的browsers配置项可根据目标浏览器版本生成不同的前缀个数
  //   // return [autoprefixer({browsers: ['last 2 versions']}), precss];
  //   return [autoprefixer, precss];
  // },
  plugins: [
    // new ExtractTextPlugin('css/main.css'),
    // new webpack.optimize.CommonsChunkPlugin('main.js'),
    // new HtmlWebpackPlugin({         //根据模板插入css/js等生成最终HTML
    //   filename:'index.html',        //生成的html存放路径，相对于 path
    //   template:'html-withimg!index.back.html',   //html模板路径，相对于 path
    //   inject:true,                  //允许插件修改哪些内容，包括head与body
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // })
  ]
};