/**
 * Created by pobo on 2017/2/10.
 */
/*
 res.setHeader(field, value)//设置
 res.getHeader(field)//获取
 res .removeHeader(field)//删除
 res.statusCode = 302//设定HTTP响应的状态码

var http = require('http'),
    server = http.createServer(function (req,res) {
        res.end('hello World');
    }).listen(3000);
*/
var http = require('http'),
    server = http.createServer(function (req,res) {
        var body = 'Hello World';
        res.setHeader('Content-length',body.length);
        res.setHeader('Content-Type','text/plain');
        res.end(body);
    }).listen(3000);