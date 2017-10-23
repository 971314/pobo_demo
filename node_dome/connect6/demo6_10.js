/**
 * Created by pobo on 2017/2/14.
 */
// 简单的路由中间件
var parse = require('url').parse;
module.exports = function (obj) {
    return function (req,res,next) {
        if (!obj[req.method]){//检查以确保req.method定义了
            next();
            return;//如果未定义，调用next()，并停止一切后续操作
        }
        var routes = obj[req.method],//查找req.method对应的路径
            url = parse(req.url),//解析URL，以便跟pathname匹配
            paths = Object.keys(routes);//将req.method对应的路径存放到数组中

        for(var i = 0; i < paths.lenth;i++){//遍历路径
            var path = paths[i],
                fn = routes[path];
            path = path.replace(/\//g,'\\/').replace(/:(\w+)/g,'([^\\/]+)');//构造正则表达式
            var re = new RegExp('^' + path + '$'),
                captures = url.pathname.match(re);
            if (captures){//尝试跟pathname匹配
                var args = [req,res].concat(captures.slice(1));//传递被捕获的分组
                fn.apply(null,args);
                return;//当有相匹配的函数时，返回，以防止后续的next()调用
            }
        }
        next();
    }
};