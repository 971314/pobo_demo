var path = require('path')
var config = require('../config')
var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var glob = require('glob');
var entries = getEntry('./src/module/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: Object.assign(entries, {
    //用到什么公共lib（例如vue），就把它加进vendors去，目的是将公用库单独提取打包
    'vendors': ['./src/lib/pbe.js']
  }),
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vux-components': 'vux/src/components',
      'vue-router$': 'vue-router/dist/vue-router.common.js'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {test: /\.vue$/,loader: 'vue' },
      {test: /\.js$/,loader: 'babel',include: projectRoot,exclude: /node_modules/},
      {test: /\.json$/,loader: 'json'},
      {test: /\.css$/,loader : ExtractTextPlugin.extract( { fallbackLoader: 'style-loader', loader: 'css-loader' })},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.html$/,loader: 'vue-html'},
      {test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,loader: 'url?limit=10000&name=fonts/[name].[ext]'},
      {test: /\.(png|jpe?g|gif)(\?.*)?$/,loader: 'url',query: {limit: 10000,name: path.join(config.build.assetsSubDirectory, '[name].[hash:7].[ext]')}},
      {test: /vux.src.*?js$/,loader: 'babel'}]
  },
  vue: {
    loaders: cssLoaders()
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件
    new ExtractTextPlugin('css/main.css')
  ]
}
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    if (entry.split('/').length > 4) {
      tmp = entry.split('/').splice(-3);
      pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
       var fileName;
      fileName =  pathname+'/'+pathname.substr(7);
      entries[fileName] = entry;
    } else {
      entries[basename] = entry;
    }
  });
  return entries;
}
