/**
 * Created by pobo on 2017/2/14.
 */
var connect = require('connect');

connect().use(function hello(req,res) {
    foo();
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
}).listen(3000);