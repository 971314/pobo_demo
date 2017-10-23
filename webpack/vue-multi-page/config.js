/**
 * Created by xiajing on 2017/3/6.
 */
var path = require('path');

module.exports = {
    build: {
        assetsRoot:path.resolve(__dirname, 'dist'),
        assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
        productionSourceMap: true,
        assetsSubDirectory: 'static',
    },
    dev: {
        port: 8000,
        assetsSubDirectory: 'static',
        assetsPublicPath: process.env.NODE_ENV === 'production' ? '../' : '/',
        proxyTable: {}
    }
}