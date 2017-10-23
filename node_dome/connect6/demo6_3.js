/**
 * Created by pobo on 2017/2/14.
 */
// 错误：hello中间件组件在logger组件前面
var connect = require('connect');

function logger(req,res,next) {
    console.log('%s %s',req.method,req.url);
    next();
}

function hello(req,res) {
    res.setHeader('Content-Tyep','text/plain');
    res.end('hello world');
}

var app = connect().use(hello).use(logger).listen(3000);