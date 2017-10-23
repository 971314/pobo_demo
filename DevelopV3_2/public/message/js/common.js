var isPoboApp = typeof pbE != "undefined";

function getConf(path, cb) {
    if(isPoboApp) {
        cb(JSON.parse(pbE.SYS().readConfig("message/conf/message.json")));
    }else {
        $.get(path + "conf/message.json?" + Date.now(), cb);
    }
}

if(!isPoboApp) {
    var pbE = {
        MSG: function(){
            return {
               ytzLoadHDMsgTypes: function(flag) {
                   var types;
                   if(flag==1)
                       types = [{"typeid":"1","types":"通知公告","isoff":"1"},
                       {"typeid":"3","types":"产品消息","isoff":"1"},
                       {"typeid":"2","types":"预警消息","isoff":"1"},
                       {"typeid":"4","types":"条件单","isoff":"1"}];
                   else
                       types = [
                       {"typeid":"5","types":"每日资讯","isoff":"1"},
                       {"typeid":"6","types":"重要警示","isoff":"1"},
                       {"typeid":"7","types":"成交回报","isoff":"1"}];
                   return JSON.stringify(
                       {"Messages":types}
                       );   
               },
               ytzLoadProFileMsg: function(count, id){
                   var msg = [], time = Date.now();
                   id = id - 0;
                   for(var i=0;i<count;i++){
                       msg.push({msgid:++id, typeid:i%7+"", title:"消息标题"+id, cont:"消息内容<"+id+" "+time+"",readed:i%2+"",time:"20170103195218",par:i%7==1?"text,http://<lin\"k":""});
                   }
                   return JSON.stringify({
                       Messages:msg
                   });
               },
               ytzLoadProfileTypeMsg: function(type, count, id){
                   var msg = [];
                   id = id - 0;
                   for(var i=0;i<count;i++){
                       msg.push({msgid:++id, typeid:type+"", title:"消息标题"+id, cont:"消息内容<"+id+"\ntest",readed:i%2+"",time:"20161213195218",par:""});
                   }
                   return JSON.stringify({
                       Messages:msg
                   });
               },
               ytzLoadProfileTypesMsg: function(json){
                   json = JSON.parse(json);
                   return this.ytzLoadProfileTypeMsg(1, json.maxmsgcount-0, json.latestid);
               },
               ytzGetUnReadMsgCount: function() {
                   return 10;
               },
               ytzGetUnReadMsgCountByType: function(i){
                   return i;   
               },
               ytzUpdateReaded: function(){
                   
               },
               ytzGetProFileMsg: function(){
                //   return "{}";
                    return JSON.stringify({msgid:1, typeid:"1", title:"消息标题", cont:"       消息内容\n消息内容消息内容消息内容消息内容消息内容消息内容https://www.baidu.com消息内容消息内容消息内容消息内容消息内容http://172.234.34.2:80/test/test?id=sdf&id2=lkj\n消息内容",par:"l\"ink", readed:0,time:"20161213195218", cut:"1"});
               },
               ytzGetMsgInfo: function() {
                   var no = ++this.requestNo;
                   if(no >= 0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:112, requestNO: no, errorCode:0, jData:{"1":"0"}}));
                       },1000);
                   return this.requestNo;
               },
               ytzCloudRequestInquire: function(){
                   if(++this.requestNo>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:113, errorCode:0, jData:{"1":"0","content":[{"4":"1","5":"0"},{"4":"2","5":"0"},{"4":"3","5":"0"},{"4":"4","5":"0"},{"4":"5","5":"1"},{"4":"6","5":"0"},{"4":"7","5":"0"},{"4":"8","5":"0"}]}}));
                       },1000);
                   return this.requestNo;
               },
               ytzCloudRequestOffLineMsg: function(typeid, b){
                   if(++this.requestNo>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:110, errorCode:0, jData:{"0":"110","1":"0","2":typeid+"","3":b?"1":"2"}}));
                       }, 500)
                   return this.requestNo;
               },
               ytzHandleMsgHistoryQuery: function(typeid) {
                   console.log("sync:" + typeid);
                   var no = ++this.requestNo;
                   if(no>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({
                           functionNO:111,
                           moduleId:90007,
                           requestNO:no,
                           errorCode:0,       
                           jData:{
                               "1":"0"
                           }       
                       }))}, 1000);
                   return no;
               },
               ytzIsServiceReady: function(){
                    console.log("ready: " + (++this.count));
                    return this.count;
               },
               ytzCloudReportOnMsgReadedStatus: function(){
      
               },
               count:-2,
               requestNo:0  
            }
        },
        SYS: function(){
            return {
                startLoading: function(){
                    console.log("start loading");  
                },
                stopLoading: function(){
                    console.log("stop loading");
                }
            }
        }
    }
}

var pbMSG = pbE.MSG(), pbSYS = pbE.SYS();

function getMsgTypes(flag, hides) {
    var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(1)).Messages;
    if(flag) {
        var types2 = JSON.parse(pbMSG.ytzLoadHDMsgTypes(2)).Messages;
        for(var i=0;i<types2.length;i++){
            types2[i].other = true;
            types.push(types2[i]);
        }
    }
    if(hides && hides.length > 0) {
        for(var i=types.length-1;i>=0;i--){
            if(hides.indexOf(types[i].typeid) != -1)
                types.splice(i, 1);
        }
    }
    return types;
}

function isReady(cb, cb2){
    var readyCount = 0;
    function a() {
        if(pbMSG.ytzIsServiceReady()>=0)
            cb();
        else {
            if(++readyCount>8) {
                cb2 = cb2 || function() {
                    alert("加载数据失败！");
                }; 
                cb2();
                return;
            }
            setTimeout(a, 1000);
        }
    }
    a();
}

//function genMsgCon(item, detail) { 
//    item.par = item.par == "" ? [] : item.par.replace(/</g, "&lt;").replace(/>/g, "&gt;").split(",");
//    item.cont = item.cont.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//    if(!detail)
//        item.cont = item.cont.replace(/\{\d*$/, "...");
//    for(var i=0;i<item.par.length;i++) {
//        var a = item.par[i];
//        if(a.indexOf("http") == 0) {
//            a = a.replace(/"/g, "");
//            a = '<a href="pobo:pageId=900003&url=' + a + '">'+a+"</a>";
//        }
//        item.cont = item.cont.replace("{" + i + "}", a);
//    }
//}

