/**
 * Created by pobo on 2017/2/14.
 */
//使用router中间组件
var connect = require('connect'),
    router = require('./middleware/router'),
    routes = {
    GET:{
        '/users':function (req,res) {
            res.end('tobi,loki,ferret');
        },
        '/user/:id':function (req,res,id) {
            res.end('user ' + id);
        }
    },
        DELETE:{
        '/user/:id':function (req,res,id) {
            res.end('deleted user ' + id);
        }
        }
    };

connect()
.use(router(routes))
.listen(3000);