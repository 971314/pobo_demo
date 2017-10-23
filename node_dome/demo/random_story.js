/**
 * Created by pobo on 2017/2/10.
 */
/*
    request模块是个经过简化的HTTP客户端，你可以用它获取RSS数据。htmlparser模块能
    把原始的RSS数据转换成JavaScript数据结构。

     在一个简单的程序中实现串行化流程控制
*/
var fs = require('fs'),
    request = require('request'),
    htmlparser = require('htmlparser'),
    configFilename = './rss_feeds.txt';

function checkForRSSFile() {//任务1：确保包含RSS预订源URL列表的文件存在
    fs.exists(configFilename,function (exists) {
        if(!exists){
            return next(new Error('Missing Rss file: ' + configFilename));//只要有错误就尽早返回
        }
        next(null,configFilename);
    });
}

function readRSSFile(configFilename) {//任务2：读取并解析包含预订源URL的文件
    fs.readFile(configFilename,function (err,feadList) {
        if(err) return next(err);
        feadList = feedList
            .toString()
            .replace(/^\s+|\s+$/g,'')
            .split("\n");//将预订源URL列表转换成字符串，然后分隔成一个数组
        var random = Math.floor(Math.random() * feadList.length);//从预订源URL数组中随机选择一个预订源URL
        next(null,feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) {//任务3：向选定的预订源发送HTTP请求以获取数据
    request({uri:feedUrl},function (err,res,body) {
        if(err) return next(err);
        if(res.statusCode != 200) return next(new Error('Abnormal response status code'));
        next(null,body);
    })
}

function parseRSSFeed(rss) {//任务4：将预订源数据解析到一个条目数组中
    var handler = new htmlparser.RssHandler(),
        parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.items.length) return next(new Error('No RSS item found'));
    var item = handler.dom.items.shift();
    console.log(item.title);//如果有数据，显示第一个预订源条目的标题和URL
    console.log(item.link);
}
var tasks = [//把所有要做的任务按执行顺序添加到一个数组中
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];
function next(err,result) {//负责执行任务的next函数
    if(err) throw err;//如果任务出错，则抛出异常

    var currentTask = tasks.shift();//从任务数组中取出下个任务
    if(currentTask){
        currentTask(result);//执行当前任务
    }
}

next();//开始任务的串行化执行
