/**
 * Created by pobo on 2017/2/9.
 */
var net = require('net'),
    server = net.createServer(function (socket) {
        socket.once('data',function (data) {
            socket.write(data);
        })
    });
server.listen(8888);