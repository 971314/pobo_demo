/**
 * Created by pobo on 2017/2/9.
 */
var http = require('http'),
    fs = require('fs');

http.createServer(function (req,res) {//创建HTTP服务器并用回调定义响应逻辑
    if(req.url == '/'){
        fs.readFile('./title.json',function (err,data) {//读取JSON文件并用回调定义如何处理其中的内容
            if(err){//如果出错，输出错误日志，并给客户端返回“Server Error”
                console.error(err);
                res.end('Server Error');
            }else{
                var titles = JSON.parse(data.toString());//从JSON文本中解析数据
                fs.readFile('./index.html',function (err,data) {//读取HTML模板，并在加载完成后使用回调
                    if(err){
                        console.error(err);
                        res.end('Server Error');
                    }else{
                        var tmpl = data.toString();

                        var html = tmpl.replace('%',titles.join('<li></li>'));//组装HTML页面以显示博客标题
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.end(html);//将HTML页面发送给用户
                    }
                })
            }
        })
    }
}).listen(8000,'127.0.0.1');