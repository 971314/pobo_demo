/**
 * Created by pobo on 2017/2/10.
 */
var fs = require('fs'),
    completedTasks = 0,
    tasks = [],
    wordCounts = {},
    filesDir = './text';

function checkIfComplete() {
    completedTasks++;
    if(completedTasks == tasks.length){
        for(var index in wordCounts){//当所有任务全部完成后，列出文件中用到的每个单词以及用了多少次
            console.log(index + ': ' + wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for(var index in words){//对文本中出现的单词计数
        var word = words[index];
        if(word){
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(filesDir,function (err,files) {//得出text目录中的文件列表
    if(err) throw err;
    for(var index in files){
        var task = (function (files) {//定义处理每个文件的任务。每个任务中都会调用一个异步读取文件的函数并对文件中使用的单词计数
            return function () {
                fs.readFile(files,function (err,text) {
                    if(err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir + '/' + files[index]);
        tasks.push(task);//把所有任务都添加到函数调用数组中
    }
    for(var task in tasks){//开始并行执行所有任务
        tasks[task]();
    }
});

