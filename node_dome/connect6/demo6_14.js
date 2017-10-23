/**
 * Created by pobo on 2017/2/15.
 * 不暴露非必要数据的错误处理组件
 */
function errorHandler(err,req,res,next) {
    console.error(err.stack);
    res.setHeader('Content-Type','application/json');
    if(err.notFound){
        res.statusCode = 404;
        res.end(JSON.stringify({error:err.message}));
    }else{
        res.statusCode = 500;
        res.end(JSON.stringify({error:'Internal Server Error'}));
    }
}