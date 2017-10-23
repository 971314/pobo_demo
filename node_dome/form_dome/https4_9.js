/**
 * Created by pobo on 2017/2/13.
 */
//秘钥通常都是放在别处，一般是 ~/.ssh。
var https = require('https'),
    fs = require('fs'),
    option = {//作为配置项的SSL秘钥和证书
        key:fs.readFileSync('./key.pem'),
        cert:fs.readFileSync('./key-cert.pem')
    };
https.createServer(option,function (req,res) {//第一个传入的就是配置项对象
    res.writeHead(200);//https 和 http 模块的API几乎一样
    res.end('hello world\n');
}).listen(3000);