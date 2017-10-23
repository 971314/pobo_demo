/**
 * Created by pobo on 2017/2/10.
 */
/*
*POST请求体字符串缓存
* 用字符串OK和Node的默认状态码200结束响应
* */
var http = require('http'),
    url = require('url'),
    items = [],//用一个常规的JavaScript数组存放数据
    server = http.createServer(function (req,res) {
        switch(req.method){//req.method 是请求所用的HTTP方法
            case 'POST':
                var item = '';//为进来的事项设置字符串缓存
                req.setEncoding('utf8');//将进来的data事件编码为UTF-8字符串
                req.on('data',function (chunk) {
                    item += chunk;//将数据块拼接到缓存上
                });
                req.on('end',function () {
                    items.push(item);//将完整的新事项压入事项数组中
                    res.end('OK\n');
                });
                break;
            case 'GET':
                /*items.forEach(function (item,i) {
                    res.write(i + ')' + item + '\n');
                });
                res.end();*/
                var body = items.map(function (item,i) {
                    return i + ')' + item;
                }).join('\n');
                res.setHeader('Content-Length',Buffer.byteLength(body));
                res.setHeader('Content-Type','text/plain;charset="utf-8"');
                res.end(body);
                break;
            case 'DELETE'://在switch语句中添加DELETE case
                var path = url.parse(req.url).pathname,
                    i = parseInt(path.slice(1),10);
                if(isNaN(i)){//检查数字是否有效
                    res.statusCode = 400;
                    res.end('Invalid item id');
                }else if(!items[i]){//确保请求的索引存在
                    res.statusCode = 404;
                    res.end('Item not found');
                }else{//删除请求的事项
                    items.splice(i,1);
                    res.end('OK\n');
                }
        }
    }).listen(3000);