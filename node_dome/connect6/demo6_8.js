/**
 * Created by pobo on 2017/2/14.
 */
//可配置的Connect中间件组件logger
function setup(format) {//setup函数可以用不同的配置调用多次
    var regexp = /:(\w+)/g;//logger组件用正则表达式匹配请求属性
    return function logger(req,res,next) {//Connect使用的真实logger组件
        var str = format.replace(regexp,function (match,property) {//用正则表达式格式化请求的日志条目
            return req[property];
        });
        console.log(str);//将日志条目输出到控制台

        next();//将控制权交给下一个中间件组件
    }
}

module.exports = setup;//直接导出logger的setup函数