module.exports = {
  devtool:'eval-source-map',
  entry:__dirname + '/app/main.js',
  output:{
    path:__dirname + '/public',
    filename:'bundle.js'
  },
  module:{
    loaders:[
      {
        test:/\.json$/,
        loader:'json-loader'
      },
      {
        test:/.js$/,
        exclude:/node_modules/,
        loader:''
      }
    ]
  },
  devServer:{
    contentBase:'./public',
    color:true,
    historyApiFallback:true,
    inline:true
  }
}