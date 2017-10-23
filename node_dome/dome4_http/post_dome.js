/**
 * Created by pobo on 2017/2/10.
 */
var http = require('http'),
    server = http.createServer(function (req,res) {
        /*req.on('data',function (chunk) {//只要读入了新的数据块，就触发data事件
            console.log('parsed',chunk);//数据块默认是个Buffer对象（字节数组）
        });*/

        /*
        * data事件会提供Buffer对象(是Node版的字节数组)
        * 可以通过调用req.setEncoding(encoding)方法设定
        * */
        req.setEncoding('utf8');
        req.on('data',function (chunk) {
            console.log(chunk);
        });
        req.on('end',function () {//数据全部读完之后触发end事件
            console.log('done parsing');
            res.end()
        });
    });