/**
 * Created by pobo on 2017/2/9.
 */
var net = require('net'),
    server = net.createServer(function (socket) {
        socket.on('data',function (data) {//当读取到新数据时处理的data事件
            socket.write(data);//数据被写回到客户端
        })
    });
server.listen(8888);