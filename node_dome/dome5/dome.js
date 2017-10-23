/**
 * Created by pobo on 2017/2/10.
 */
/*
* 用STREAM.PIPE()优化数据传输
* Stream.pipe()。用这个方法可以极大简化服务器的代码
* */
var http = require('http'),
    parse = require('url').parse,
    join = require('path').join,
    fs = require('fs'),
    root = __dirname,
    /*server = http.createServer(function (req,res) {
        var url = parse(req.url),
            path = join(root,url.pathname),//构造绝对路径
            stream = fs.createReadStream(path);//创建fs.ReadStream
            stream.pipe(res);//res.end()会在stream.pipe()内部调用
        stream.on('data',function (chunk) {
            res.write(chunk);//将文件数据写到响应中
        });
        stream.on('end',function () {
            res.end();//文件写完后结束响应
        })
    });*/
    server = http.createServer(function (req,res) {
       var url = parse(req.url),//解析URL以获取路径名
           path = join(root,url.pathname),//构造绝对路径
           stream = fs.createReadStream(path);
       fs.stat(path,function (err,stat) {//检查文件是否存在//后加
           if(err){
               if('ENOENT' == err.code){//文件不存在
                   res.statusCode = 404;
                   res.end('Not Found');
               }else{//其他错误
                   res.statusCode = 500;
                   res.end('Internal Server Error');
               }
           }else{
               res.setHeader('Content-Length',stat.size);//用stat对象的属性设置Content-Length
               var stream = fs.createReadStream(path);
               stream.pipe(res);
               stream.on('error',function (err) {
                   res.statusCode = 500;
                   res.end('Internal Server Error');
               })
           }

       })
       /*stream.pipe(res);//res.end()会在stream.pipe()内部调用
        stream.on('error',function (err) {
            res.statusCode = 500;
            res.end('Internal Server Error.')
        })*/
    });
server.listen(3000);