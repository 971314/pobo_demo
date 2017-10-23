var fs = require("fs");

// 阻塞代码实例

// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
//
// console.log('程序执行结束');

// ========================================================

// 非阻塞代码实例

// fs.readFile('input.txt',function (err,data) {
//     if(err) return console.log(err);
//     console.log(data.toString());
// });
//
// console.log('程序执行结束');

// ========================================================

// 事件驱动程序

// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();
//
// // 创建事件处理程序
// var connectHandler = function connected() {
//     console.log('连接成功。');
//
//     // 触发 data_received 事件
//     eventEmitter.emit('data_received');
// }
//
// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);
//
// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function(){
//     console.log('数据接收成功。');
// });
//
// // 触发 connection 事件
// eventEmitter.emit('connection');
//
// console.log("程序执行完毕。");

// ========================================================

// EventEmitter 类的应用

// var events = require('events');
// var eventEmitter = new events.EventEmitter();
//
// // 监听器 #1
// var listener1 = function listener1() {
//     console.log('监听器 listener1 执行。');
// }
//
// // 监听器 #2
// var listener2 = function listener2() {
//     console.log('监听器 listener2 执行。');
// }
//
// // 绑定 connection 事件，处理函数为 listener1
// eventEmitter.addListener('connection', listener1);
//
// // 绑定 connection 事件，处理函数为 listener2
// eventEmitter.on('connection', listener2);
//
// var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
//
// // 处理 connection 事件
// eventEmitter.emit('connection');
//
// // 移除监绑定的 listener1 函数
// eventEmitter.removeListener('connection', listener1);
// console.log("listener1 不再受监听。");
//
// // 触发连接事件
// eventEmitter.emit('connection');
//
// eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
//
// console.log("程序执行完毕。");

// ========================================================

// 从流中读取数据（Stream）

// var fs = require("fs");
// var data = '';
//
// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
//
// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');
//
// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//     data += chunk;
// });
//
// readerStream.on('end',function(){
//     console.log(data);
// });
//
// readerStream.on('error', function(err){
//     console.log(err.stack);
// });
//
// console.log("程序执行完毕");

// ========================================================

// 写入流

// var fs = require("fs");
// var data = '菜鸟教程官网地址：www.runoob.com';
//
// // 创建一个可以写入的流，写入到文件 output.txt 中
// var writerStream = fs.createWriteStream('output.txt');
//
// // 使用 utf8 编码写入数据
// writerStream.write(data,'UTF8');
//
// // 标记文件末尾
// writerStream.end();
//
// // 处理流事件 --> data, end, and error
// writerStream.on('finish', function() {
//     console.log("写入完成。");
// });
//
// writerStream.on('error', function(err){
//     console.log(err.stack);
// });
//
// console.log("程序执行完毕");

// ========================================================

// 管道流

// var fs = require("fs");
//
// // 创建一个可读流
// var readerStream = fs.createReadStream('input.txt');
//
// // 创建一个可写流
// var writerStream = fs.createWriteStream('output.txt');
//
// // 管道读写操作
// // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writerStream);
//
// console.log("程序执行完毕");


// ========================================================

// 创建模块

// var hello = require('./hello');
// hello.world();

// var Hello = require('./hello');
// hello = new Hello();
// hello.setName('BYVoid');
// hello.sayHello();


// ========================================================

// 输出全局变量 __filename 的值表示当前正在执行的脚本的文件名。
// 它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。
// 如果在模块中，返回的值是模块文件的路径。

// console.log( __filename );

// ========================================================

// 输出全局变量 __dirname 的值 __dirname 表示当前执行脚本所在的目录。

// console.log( __dirname );

// ========================================================

// function printHello(){
//     console.log( "Hello, World!");
// }
// //两秒后执行以上函数

// setTimeout(printHello, 2000);


// ========================================================

// function printHello(){
//     console.log( "Hello, World!");
// }
// // 两秒后执行以上函数
// var t = setTimeout(printHello, 2000);
//
// // 清除定时器
// clearTimeout(t);

// ========================================================

// function printHello(){
//     console.log( "Hello, World!");
// }
// // 两秒后执行以上函数
// setInterval(printHello, 2000);


// ========================================================

// console.info("程序开始执行：");
//
// var counter = 10;
// console.log("计数: %d", counter);
//
// console.time("获取数据");
// //
// // 执行一些代码
// //
// console.timeEnd('获取数据');
//
// console.info("程序执行完毕。")

// ========================================================

// process
// process.on('exit', function(code) {
//
//     // 以下代码永远不会执行
//     setTimeout(function() {
//         console.log("该代码不会执行");
//     }, 0);
//
//     console.log('退出码为:', code);
// });
// console.log("程序执行结束");

// ========================================================
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

// 获取执行路局
console.log(process.execPath);


// 平台信息
console.log(process.platform);

// ========================================================

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());