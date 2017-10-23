/**
 * Created by pobo on 2017/2/10.
 */
//用社区贡献的工具实现串行化控制 nimble
var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('I execute first.');
            callback();
        },1000)
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute next.');
            callback();
        },500)
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute last.');
            callback();
        },200)
    }
]);