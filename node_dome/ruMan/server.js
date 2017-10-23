var http = require('http'),
    url = require('url');

// http.createServer(function(req,res){
//   res.writeHead(200,{'Content-Type':'text/plain'});
//   res.end('Hello world\n');
// }).listen(3000,'127.0.0.1');

//=========================给服务器增加头============================
// http.createServer(function(req,res){
//   res.writeHead(200,{'Content-Type':'text/plain'});
//   res.end('Hello world\n');
// }).listen(3000)

//=========================使用nodejs重定向============================
// http.createServer(function(req,res){
//   res.writeHead(301,{'Location':'http://www.homestarrunner.com/sbsite/'});
//   res.end();
// }).listen(3000)

//=========================给服务器加入路由============================
http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;

  switch(pathname){
    case '/':
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.end('Home Page\n');
    break;
    case '/about':
    res.writeHead(200,{'Content-Typt':'text/plain'});
    res.end('About Us\n')
    break;
    case '/redirect':
    res.writeHead(301,{'Location':'/'});
    res.end()
    break;
    default:
    res.writeHead(404,{'Content-Typt':'text/plain'});
    res.end('Page not found\n')
  }

  // if(pathname === '/'){
  //   res.writeHead(200,{'Content-Type':'text/plain'});
  //   res.end('Home Page\n');
  // }else if(pathname ==='/about'){
  //   res.writeHead(200,{'Content-Typt':'text/plain'});
  //   res.end('About Us\n')
  // }else if(pathname ==='/redirect'){
  //   res.writeHead(301,{'Location':'/'});
  //   res.end()
  // }else{
  //   res.writeHead(404,{'Content-Typt':'text/plain'});
  //   res.end('Page not found\n')
  // }
}).listen(3000)



console.log('Server running at http://127.0.0.1:3000');