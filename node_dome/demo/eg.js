/**
 * Created by pobo on 2017/2/10.
 */
/*
//作用域是如何导致bug出现的
function asyncFuntion(callback) {
    setTimeout(callback,200);
}

var color = 'blue';

asyncFuntion(function () {
    console.log('The color is' + color);
});

color = 'green';*/

/*// 用匿名函数保留全局变量的值
function asyncFunction(callback) {
    setTimeout(callback,200);
}
var color = 'blue';
(function (color) {
    asyncFunction(function () {
        console.log('The color is' + color);
    })
})(color);

color = 'green';*/

// 什么时候使用串行流程控制
setTimeout(function () {
    console.log('I execute first.');
    setTimeout(function () {
        console.log('I execute next.');
        setTimeout(function () {
            console.log('I execute last.');
        },100)
    },500)
},1000);