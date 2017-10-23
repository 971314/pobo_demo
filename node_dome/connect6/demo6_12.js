/**
 * Created by pobo on 2017/2/14.
 */
//Connect中的错误处理中间件
function errorHandler() {
    var env = process.env.NODE_ENV || 'development';
    return function (err,req,res,next) {//错误处理中间件定义四个参数
        res.statusCode = 500;
        switch(env){
            case 'development'://errorHandler中间件组件根据NODE_ENV的值执行不同的操作
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('Srver error');
        }
    }
}