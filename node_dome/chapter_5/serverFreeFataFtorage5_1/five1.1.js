/**
 * Created by pobo on 2017/2/13.
 */
var http = require('http'),
    counter = 0,
    server = http.createServer(function (req,res) {
        counter++;
        res.write('I have been accessed '+ counter + ' times.');
        res.end();
    }).listen(8888);