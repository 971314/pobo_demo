var http = require('http'),
    fs = require('fs')
//     urls = ['shapeshed.com','www.baidu.com','edition.cnn.com'];

//     function fetchPage(url){
//       var start = new Date();
//       http.get({host:url},function(res){
//         console.log('Got response from: ' + url);
//         console.log('Request took:',new Date() - start, 'ms')
//       });
//     }
//     for(var i = 0; i < urls.length;i++){
//       fetchPage(urls[i])
//     }

// function haveBreakfast(food,drink,callback){
//   console.log('Have breakfast of ' + food + ',' + drink);
//   if(callback && typeof(callback) === 'function'){
//     callback();
//   }
// }

// haveBreakfast('toast','coffee',function(){
//   console.log('Finished breakfast.Time to go to work!');
// })

// =======================================================================
// http.get({host:'shapeshed.com'},function(res){
//   console.log('Got a response from shappeshed.com');
// }).on('error',function(e){
//   console.log('There was an error from shapeshed.com');
// });

// fs.readFile('file1.txt','utf-8',function(err,data){
//   if(err) throw err;
//   console.log('File 1 read!');
// });

// http.get({host:'www.baidu.com'},function(res){
//   console.log('Got a response from www.baidu.com');
// }).on('error',function(e){
//   console.log('There was an error from www.baidu.com');
// });

// fs.readFile('file2.txt','utf-8',function(err,data){
//   if(err) throw err;
//   console.log('File 2 read!');
// });

// ================================同步（或者阻塞）代码==========================================
// function sleep(milliseconde){
//   var start = new Date().getTime();
//   while((new Date().getTime() - start) < milliseconde){}
// }

// function fetchPage(){
//   console.log('fetching page');
//   sleep(200);//simulate time to fetch a web page
//   console.log('data returned from requesting page');
// }

// function fetchApi(){
//   console.log('fetching api');
//   sleep(200);//simulate time to fetch from an api
//   console.log('data returned from the api');
// }

// fetchPage();
// fetchApi();

// ================================异步（或者阻塞）代码==========================================

function fetchPage(){
  console.log('fetching page');
  http.get({host:'trafficjamapp.herokuapp.com',path:'/?delay=2000'},function(res){
    console.log('data returned from requesting page');
  }).on('error',function(e){
    console.log('There was an error ' + e);
  });
}

function fetchApi(){
  console.log('fetching api');
  http.get({host:'trafficjamapp.herokuapp.com',path:'/?delay=2000'},function(res){
    console.log('data returned from the api');
  }).on('error',function(e){
    console.log('There was an error ' + e);
  })
}

fetchPage();
fetchApi();