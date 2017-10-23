var path = require('path');
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var cssLoaders = require('./css-loaders')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: path.join(config.build.assetsSubDirectory, '[name].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, '[id].js')
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
})

function getEntry(globPath) {
  var entries = {},
      basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
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
  });
  return entries;
}
var pages = getEntry(['./src/module/*.html','./src/module/**/*.html']);
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename:  pathname+'.html',
    template: pages[pathname],   // 模板路径
    inject: true              // js插入位置
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}













