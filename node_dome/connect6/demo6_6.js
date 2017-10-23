/**
 * Created by pobo on 2017/2/14.
 */
// 实现HTTP Basic认证的中间件组件
function restrict(req,res,next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' '),
        secheme = parts[0],
        auth = new Buffer(parts[1],'base64').toString().split(':'),
        user = auth[0],
        pass = auth[1];

    authenticateWithDatabase(user,pass,function (err) {//根据数据库中的记录检查认证信息的函数
        if (err) return next(err);//告诉分派器出错了
        next();//如果认证信息有效，不带参数调用next()
    })
}