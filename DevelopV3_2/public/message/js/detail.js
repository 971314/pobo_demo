var config, params = location.search.substr(1).split("&"), syncCode, message;

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && (msg.functionNO == 111 || msg.functionNO == 112) && msg.requestNO == syncCode) {
        pbSYS.stopLoading();
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        if(msg.functionNO == 111) {
            message = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
            if(message.msgid)
                loadCut();
        }else {
            message = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
            loadData();
        }
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && (msg.functionNO == 111 || msg.functionNO == 112) && msg.requestNO == syncCode) {
        pbSYS.stopLoading();
        if(msg.functionNO == 111)
            alert("同步数据超时！");
        else {
            alert("获取详细内容超时！");
            loadData();
        }
    }
}

function loadCut() {
    if(message.cut == "1") {
        isReady(function(){
            syncCode = pbMSG.ytzGetMsgInfo(message.msgid);
            pbSYS.startLoading();
        }, function(){
            alert("请求消息详细内容失败！");
            loadData();
        })
    }else
        loadData();
}

function loadData() {
    var msg = message;
    if(msg.readed == 0) {
        pbMSG.ytzUpdateReaded(msg.msgid);
        pbMSG.ytzCloudReportOnMsgReadedStatus(msg.msgid,"");
    }
    msg.time = msg.time.substr(0, 4) + "-" + msg.time.substr(4, 2) + "-" + msg.time.substr(6, 2)
    + " " + msg.time.substr(8, 2) + ":" + msg.time.substr(10, 2);
    var template = (config.types[params[1]] && config.types[params[1]].detailTemplate) || "DEFAULT"; 
    TEMPLATES_DETAIL[template].props = ["item"];

    new Vue({
        el:"#app",
        data: {
            msg: msg
        },
        components: {
            detail: TEMPLATES_DETAIL[template]
        }
    })
    $("#app").show();
}

function init(types) {
    var cfg = config;
    types = types || getMsgTypes(false);
    if(types.length == 0) {
        alert("加载数据失败");
        return;
    }
    var title = "其他消息";
    for(var i=0;i<types.length;i++){
        if(types[i].typeid == params[1]) {
            title = types[i].types;
            break;
        }
    }
    $("#navtxt").html(title);
    
    message = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
    if(message.msgid)
        loadCut();
    else {
        isReady(function(){
            if((syncCode = pbMSG.ytzHandleMsgHistoryQuery(params[1]-0, "")) >= 0)
                pbSYS.startLoading();
            else 
                alert("请求数据同步失败！");
        })
    }
}

getConf("../", function(cfg){
    config = cfg;
    if(cfg.hides.indexOf(params[1]) != -1)
        return;
    var types = getMsgTypes(false);
    if(types.length == 0)
        isReady(init, init);
    else
        init(types);
});