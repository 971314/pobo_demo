/**
 * Created by pobo on 2017/2/15.
 * 在数据库中搜索用户的组件
 */
var db = {
    users:[
        {name:'tobi'},
        {name:'loki'},
        {name:'jane'}
    ]
};

function users(req,res,next) {
    var match = req.url.match(/^\/user\/(.+)/);
    if(match){
        var user = db.users[match[1]];
        if(user){
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(user));
        }else{
            var err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    }else{
        next();
    }
}