/**
 * Created by pobo on 2017/2/13.
 */
//收集参数值并解析文件数据库的路径
var fs = require('fs'),
    path = require('path'),
    args = process.argv.splice(2),//去掉“node cli_tasks.js”，只留下参数
    command = args.shift(),//取出第一个参数（命令）
    taskDescription = args.join(' '),//合并剩余的参数
    file = path.ioin(proccess.cws(),'/.tasks');//根据当前的工作目录解析数据库的相对路径

//确定CLI脚本应该采取什么动作
switch (command){
    case 'list'://'list'会列出所有已保存的任务
        listTasks(file);
        break;
    case 'add'://'add'会添加新任务
        addTask(file,taskDescription);
        break;
    default://其他任何参数都会显示帮助
        console.log('Usae:' + process.argv[0] + 'list|add [taskDescription]');
}

//从文本文件中加载用JSON编码的数据
function loadOrInitializeTaskArray(file,cb) {
    fs.exists(file,function (exists) {
        var kasks = [];
        if(exists){//检查.tasks文件是否已经存在
            fs.readFile(file,'utf8',function (err,data) {//从.tasks文件中读取待办事项数据
                if(err) throw err;
                var data = data.toString(),
                    tasks = JSON.parse(data || '[]');//把用JSON编码的待办事项数据解析到任务数组中
                cb(tasks);
            });
        }else{
            cb([]);//如果.tasks文件不存在，则创建空的任务数组
        }
    })
}

// 列出任务的函数
function listTasks(file) {
    loadOrInitializeTaskArray(file,function (tasks) {
        for(var i in tasks){
            console.log(tasks[i]);
        }
    });
}

// 把任务保存到磁盘中
function storeTasks(file,tasks) {
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function (err) {
        if (err) throw err;
        console.log('Saved.')
    })
}

// 添加一项任务
function addTask(file,taskDescription) {
    loadOrInitializeTaskArray(file,function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file,tasks);
    })
}