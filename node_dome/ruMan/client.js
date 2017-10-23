var http = require('http');
//=========================nodejs编写html客户端============================
var options = {
  host:'www.baidu.com',//IP 域名 主机
  port:80,//端口
  path:'/'//路径
};
http.get(options,function(res){
  console.log(res.statusCode)
  if(res.statusCode == 200){
    console.log('The site is up!');
  }else{
    console.log('The site is down!');
  }
}).on('error',function(e){
  console.log('There was an error : ' + e.message)
})