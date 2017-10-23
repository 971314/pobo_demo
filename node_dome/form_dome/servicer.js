/**
 * Created by pobo on 2017/2/13.
 */
//支持GET和POST的HTTP服务器
var http = require('http'),
    items = [],
    server = http.createServer(function (req,res) {
        if('/' == req.url){
            switch(req.method){
                case 'GET':
                    show(res);
                    break;
                case 'POST':
                    add(req,res);
                    break;
                default:
                    badRequest(res);
            }
        }else{
            notFound(res);
        }
    });
server.listen(3000);

function show(res) {
    var html = '<html><head><title>Todo List</title></head><body>'
                +'<h1>Todo List</h1>'//对简单的程序而言，用嵌入的HTML取代模板引擎一样好用
                +'<ul>'
                +items.map(function (item) {
                    return '<li>' + item + '</li>'
                }).join('')
                +'</ul>'
                +'<form method="post" action="/">'
                +'<p><input type="text" name="item"/></p>'
                +'<p><input type="submit" value="Add Item"/></p>'
                +'</form>'
                +'</body></html>';
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}

//notFound()函数接收响应对象，将状态码设为404，响应主体设为Not Found
function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type','text/pint');
    res.end('Not Found');
}

//返回400 Bad Request响应的函数实现起来跟notFound()几乎一样，向客户端指明该请求无效
function badRequest(res) {
    res.stalusCode = 400;
    res.setHeader('Content-Type','text/plain');
    res.end('Bad request');
}

// 程序最后还要实现add()函数，它会接收req和res两个对象
var qs = require('querystring');

function add(req,res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data',function (chunk) {
        body += chunk;
    });
    req.on('end',function () {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    })
}