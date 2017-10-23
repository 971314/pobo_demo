/**
 * Created by pobo on 2017/2/14.
 */
//路由admin请求
function admin(req,res,next) {
    switch (req.url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}