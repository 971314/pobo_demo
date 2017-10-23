var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var glob = require('glob');
module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: path.join(  '[name].js'),
    chunkFilename: path.join( '[id].js')
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin(['../dist']), //清空生成目录
    new webpack.optimize.OccurrenceOrderPlugin(),
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
        //console.log(pathname)
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
    filename: pathname+'.html',
    template: pages[pathname],   // 模板路径
    inject: true,           // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
  };
  if (pathname in module.exports.entry) {
    console.log(pathname)
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}


















