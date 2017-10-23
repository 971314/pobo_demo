function status(typeid) {
    for(var i=0;i<statuses.length;i++){
        if(statuses[i]["4"] == typeid) {
            return statuses[i]["5"];
        }
    }
    return "0";
}

function callback(msg) {
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && (msg.functionNO == 113 || msg.functionNO == 110)){
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        if(msg.functionNO == 113) {
            statuses = msg.jData.content;
            var html = "", typeid;
            for(var i=0;i<types.length;i++){
                typeid = types[i].typeid;
                if(types[i].isoff == "1") 
                    html += "<li>" + types[i].types + "<span _id='" + typeid + "'" + (status(typeid)=="0"?" class='on'":"") + "><i></i></span></li>";
            }
            $("#ul").html(html).on("click", "span", function(){
                var t = $(this);
                if(pbMSG.ytzCloudRequestOffLineMsg(t.attr("_id")-0, !t.hasClass("on")) < 0)
                    alert("请求设置失败！");
            });
        }else {
            $("#ul span[_id="+msg.jData["2"]+"]")[msg.jData["3"]=="1"?"addClass":"removeClass"]("on");
        }
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && (msg.functionNO == 113 || msg.functionNO == 110))
        alert(msg.functionNO == 113 ? "请求超时！" : "设置超时！");
}

var config, types, statuses;

function reload() {
    if(!types)
        types = getMsgTypes(false, config.hides);
    if($("#ul").html() == "") {
        if(pbMSG.ytzCloudRequestInquire() < 0)
            alert("请求数据失败！");
    }
}

getConf("../", function(cfg){
    config = cfg;
    isReady(reload);
});