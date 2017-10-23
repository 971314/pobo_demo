// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
	entry: {
		index:path.resolve(__dirname, '../app/index/index.js'),
		vendors:[
			'Vue'
		]
	},
	// 输出配置
	output: {
		// 输出路径是 webpack-vuejs/output/static
		path: path.resolve(__dirname, '../output/static'),
		publicPath: 'static/',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue']
	},
	module: {
		loaders: [
			// 使用vue-loader 加载 .vue 结尾的文件
			{test:/\.vue$/,loader:'vue'},
			{test:/\.js$/, loader:'babel-loader',exclude:/node_modules/},
			{test: /\.css$/, loader: "style-loader!css-loader"},
			{test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader'},
			{test:/\.(png|jpg|gif|svg)$/,loader:'url',query:{limit:10000,name:'[name].[ext]?[hash:7]'}}
		]
	},
	vue:{
		loaders:{
			js: 'babel',
			sass: 'style!css!sass'
		}
	},
	babel:{
		presets: ['es2015','stage-0'],
		plugins: ['transform-runtime']
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: path.resolve(__dirname, '../app/index/index.html'),
			inject: true
		})
	]
}