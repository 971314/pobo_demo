var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    cache = {};

function send404(response) {//所请求的文件不存在时发送404错误的
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error 404 : resource not found1.');
    response.end()
}

function sendFile(response,filePath,fileContents) {//数提供文件数据服务
    response.writeHead(
        200,
        {'content-type':mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

function serveStatic(response,cache,absPath) {//确定文件是否缓存了
    if(cache[absPath]){//检查文件是否缓存在内存中
        sendFile(response,absPath,cache[absPath]);//从内存中返回文件
    }else{
        fs.exists(absPath,function (exists) {//检查文件是否存在
            if(exists){
                fs.readFile(absPath,function (err,data) {
                    if(err){
                        console.log('1111')
                        send404(response)
                    }else{
                        cache[absPath] = data;
                        sendFile(response,absPath,data);//从硬盘中读取文件并返回
                    }
                })
            }else{
                console.log('222')
                send404(response);//发送HTTP 404响应
            }
        })
    }
}

var server = http.createServer(function (request,response) {//创建HTTP服务器，用匿名函数定义对每个请求的处理行为
    var filePath = false;
    if(request.url == '/'){
        filePath = 'public/index.html';//确定返回的默认HTML文件
    }else{
        filePath = 'public' + request.url;//将URL路径转为文件的相对路径
    }
    var absPath = './' + filePath;
    serveStatic(response,cache,absPath);//返回静态文件
});

server.listen(3000,function () {
    console.log('Server listening on port 3000.')
});

var chatServer = require('./lib/chat_server');//加载一个定制的Node模块
chatServer.listen(server)