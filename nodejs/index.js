/**
 * Created by pobo on 2016/12/7.
 */
var server = require("./server");
var router = require("./router");

server.start(router.route);