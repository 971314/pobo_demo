/**
 * Created by pobo on 2017/2/9.
 */
//通过尽早返回减少嵌套的例子
var http = require('http'),
    fs = require('fs'),
    server = http.createServer(function (req,res) {
        getTitles(res);
    }).listen(8000,'127.0.0.1');

function getTitles(res) {
    fs.readFile('./title.json',function (err,data) {
        if(err) return hadError(err,res);//在这里不再创建一个else分支，而是直接return，因为如果出错的话，也没必要继续执行这个函数了
        getTemplate(JSON.parse(data.toString()),res);
    })
}

function getTemplate(titles,res) {
    fs.readFile('./index.html',function (err,data) {
        if(err) return hadError(err,res);
        formatHtml(titles,data.toString(),res)
    })
}

function formatHtml(titles,tmpl,res) {//formatHtml得到标题和模板，渲染一个响应给客户端
    var html = tmpl.replace('%',titles.join('<li></li>'));
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}

function hadError(err,res) {
    console.error(err);
    res.end('Server Error')
}function getTitles(res) {//获取标题，并将控制权转交给getTemplate
    fs.readFile('./title.json',function (err,data) {
        if(err) return hadError(err,res);
        getTemplate(JSON.parse(data.toString()),res);
    })
}

function getTemplate(titles,res) {//getTemplate读取模板文件，并将控制权转交给formatHtml
    fs.readFile('./index.html',function (err,data) {
        if(err) return hadError(err,res);
        formatHtml(titles,data.toString(),res);
    })
}

function formatHtml(titles,tmpl,res) {//formatHtml得到标题和模板，渲染一个响应给客户端
    var html = tmpl.replace('%',titles.join('<li></li>'));
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}

function hadError(err,res) {//如果这个过程中出现了错误，hadError会将错误输出到控制台，并给客户端返回“Server Error”
    console.error(err);
    res.end('Server Error');
}