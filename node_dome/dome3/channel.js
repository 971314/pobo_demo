/**
 * Created by pobo on 2017/2/9.
 */
var EventEmitter = require('events').EventEmitter,
    channel = new EventEmitter();

channel.on('join',function () {
    console.log('Welcome!');
});
channel.emit('join');