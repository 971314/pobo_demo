var Chat = function (socket) {//初始化时可用传入一个Socket.IO的参数socket
    this.socket = socket;
};

Chat.prototype.sendMessage = function (room,text) {//发送聊天消息
    var message = {
        room:room,
        text:text
    };
    this.socket.emit('message',message);
};

Chat.prototype.changeRoom = function (room) {//变更房间
    this.socket.emit('join',{
        newRoom:room
    })
};

Chat.prototype.processCommand = function (command) {
    var words = command.split(' '),
        command = words[0].substring(1,words[0].length).toLowerCase(),//从第一个单词开始解析命令
        message = false;
    switch(command){
        case 'join'://处理房间的变换/创建
            words.shift();
            var room = words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick'://处理更名尝试
            words.shift();
            var name = words.join(' ');
            this.socket.emit('nameAttempt',name);
            break;
        default:
            message = 'Unrecognized command.';
            break;
    };

    return message;
};