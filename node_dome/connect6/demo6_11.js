/**
 * Created by pobo on 2017/2/14.
 */
// 基于缩略名重写请求URL的中间件
var connert = requrie('connect'),
    url = require('url'),
    path = url.parse(req.url).pathname,
    app = connect().use(rewrite).use(showPost).listen(3000);

function rewrite(req,res,next) {
    var match = path.match(/^\/blog\/posts\/(.+)/);
    if(match){//只针对/blog/posts 请 求执行查找
        findPostIdBySlug(match[1],function (err,id) {
            if (err) return next(err);//如果查找出错，则通知错误处理器并停止处理
            if(!id) return next(new Error('User not found'));//如果没找到跟缩略名相对应的ID，则带着“Usernot found”的错误参数调用next()
            req.url = '/blog/posts' + id;//重写req.url属性，以便后续中间件可以使用真实的ID
            next();
        });
    }else{
        next();
    }
}