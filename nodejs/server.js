// var http = require('http');

// http.createServer(function (request, response) {
//
//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//
//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);
//
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

// ===============================================================

// var http = require("http");
// var url = require("url");
//
// function start(route) {
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log("Request for " + pathname + " received.");
//
//         route(pathname);
//
//         response.writeHead(200, {"Content-Type": "text/plain"});
//         response.write("Hello World");
//         response.end();
//     }
//
//     http.createServer(onRequest).listen(8888);
//     console.log("Server has started.");
// }
//
// exports.start = start;

// ======================================================getq请求

// var http = require('http');
// var url = require('url');
// var util = require('util');
//
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(util.inspect(url.parse(req.url, true)));
// }).listen(3000);

// =================================获取POST请求内容

// var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
//
// http.createServer(function(req, res){
//     var post = '';     //定义了一个post变量，用于暂存请求体的信息
//
//     req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
//         post += chunk;
//     });
//
//     req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
//         post = querystring.parse(post);
//         res.end(util.inspect(post));
//     });
// }).listen(3000);

// =============================使用 Node 创建 Web 服务器

// var http = require('http');
// var fs = require('fs');
// var url = require('url');
//
//
// // 创建服务器
// http.createServer( function (request, response) {
//     // 解析请求，包括文件名
//     var pathname = url.parse(request.url).pathname;
//
//     // 输出请求的文件名
//     console.log("Request for " + pathname + " received.");
//
//     // 从文件系统中读取请求的文件内容
//     fs.readFile(pathname.substr(1), function (err, data) {
//         if (err) {
//             console.log(err);
//             // HTTP 状态码: 404 : NOT FOUND
//             // Content Type: text/plain
//             response.writeHead(404, {'Content-Type': 'text/html'});
//         }else{
//             // HTTP 状态码: 200 : OK
//             // Content Type: text/plain
//             response.writeHead(200, {'Content-Type': 'text/html'});
//
//             // 响应文件内容
//             response.write(data.toString());
//         }
//         //  发送响应数据
//         response.end();
//     });
// }).listen(8081);
//
// // 控制台会输出以下信息
// console.log('Server running at http://127.0.0.1:8081/');


// ======================================GET 方法
// var express = require('express');
// var app = express();
//
// app.use(express.static('public'));
//
// app.get('/index.html', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.html" );
// })
//
// app.get('/process_get', function (req, res) {
//
//     // 输出 JSON 格式
//     response = {
//         first_name:req.query.first_name,
//         last_name:req.query.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })

// ============================post
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
//
// // 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//
// app.use(express.static('public'));
//
// app.get('/index.html', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.html" );
// })
//
// app.post('/process_post', urlencodedParser, function (req, res) {
//
//     // 输出 JSON 格式
//     response = {
//         first_name:req.body.first_name,
//         last_name:req.body.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })

// ====================文件上传

// var express = require('express');
// var app = express();
// var fs = require("fs");
//
// var bodyParser = require('body-parser');
// var multer  = require('multer');
//
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).array('image'));
//
// app.get('/index.html', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.html" );
// })
//
// app.post('/file_upload', function (req, res) {
//
//     console.log(req.files[0]);  // 上传的文件信息
//
//     var des_file = __dirname + "/" + req.files[0].originalname;
//     fs.readFile( req.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//             if( err ){
//                 console.log( err );
//             }else{
//                 response = {
//                     message:'File uploaded successfully',
//                     filename:req.files[0].originalname
//                 };
//             }
//             console.log( response );
//             res.end( JSON.stringify( response ) );
//         });
//     });
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })

//

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

// =================================创建 RESTful/获添加用户

// var express = require('express');
// var app = express();
// var fs = require("fs");
//
// //添加的新用户数据
// var user = {
//     "user4" : {
//         "name" : "mohit",
//         "password" : "password4",
//         "profession" : "teacher",
//         "id": 4
//     }
// }
//
// app.get('/addUser', function (req, res) {
//     // 读取已存在的数据
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         data = JSON.parse( data );
//         data["user4"] = user["user4"];
//         console.log( data );
//         res.end( JSON.stringify(data));
//     });
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })

// =================================创建 RESTful/显示用户详情

// var express = require('express');
// var app = express();
// var fs = require("fs");
//
// app.get('/:id', function (req, res) {
//     // 首先我们读取已存在的用户
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//         data = JSON.parse( data );
//         var user = data["user" + req.params.id]
//         console.log( user );
//         res.end( JSON.stringify(user));
//     });
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })

// =================================创建 RESTful/删除用户

// var express = require('express');
// var app = express();
// var fs = require("fs");
//
// var id = 2;
//
// app.get('/deleteUser', function (req, res) {
//
//     // First read existing users.
//     fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
//         data = JSON.parse(data);
//         delete data["user" + 2];
//
//         console.log(data);
//         res.end(JSON.stringify(data));
//     });
// })
//
// var server = app.listen(8081, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })