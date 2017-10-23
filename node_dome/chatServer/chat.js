/**
 * Created by pobo on 2017/2/15.
 * 创建新的TCP服务器
 */
var net = require('net'),
    chatServer = net.createServer();
/* chatServer.on('connection',function (client) {
 client.write('Hi!\n');
 client.write('Bye!\n');

 client.end();
 }).listen(9000);*/
chatServer.on('connection',function (client) {
    client.write('hi\n');
    client.on('data',function (data) {
        console.log(data)
    })
}).listen(9000);
