var isPoboApp = typeof pbE != "undefined";

if(!isPoboApp) {
    var pbE = {
        MSG: function(){
            return {
                ytzCloudRequestOtherAccountBindRelateQuery: function(){
                    var no = 0;
                    if(no >= 0)
                        setTimeout(function(){
                            callback(JSON.stringify({moduleId:90007, functionNO:116, errorCode:0, jData:{"1":"0","content":[{"4":"123456789","5":"1","8":'张三1,8'},{"4":"123456","5":"1", "8":'张三2,6'}]}}));
                        }, 1000);
                    return no;
                },
                ytzCloudRequestBindOtherAccount: function(account, type, jdid, bind){
                    console.log(arguments);
                    var no = 0;
                    if(no >= 0)
                        setTimeout(function(){
                            callback(JSON.stringify({moduleId:90007, functionNO:115, errorCode:0, jData:{"1":"0","2":"2"}}));
                        }, 1000)
                    return no;    
                },
                ytzIsServiceReady: function(){
                    console.log("ready: " + (++this.count));
                    return this.count;
                },
                count:-2
            }
        },
        SYS: function(){
            return {
                getDeviceJsonInfo: function(){
                    return JSON.stringify({
                        jgid: 1000
                    });
                }
            }
        }
    }
}

var pbMSG = pbE.MSG(), pbSYS = pbE.SYS(), jgid = JSON.parse(pbSYS.getDeviceJsonInfo()).jgid+"";
var readyCount = 0;
function ready(cb){
    if(pbMSG.ytzIsServiceReady()>=0)
        cb();
    else {
        if(++readyCount>10) {
            alert("加载数据失败！");
            return;
        }
        setTimeout(function(){
            ready(cb);
        }, 1000);
    }
}

function m(s){
    if(s.length<6)
        return s;
    return s.substr(0,2) + s.substr(2,s.length-5).replace(/./g, "*") + s.substr(-3);
}
function m2(s){
    return s.substr(0,1) + s.substr(1).replace(/./g, "*");
}
function acctType(t){
    if(t == 8)
        return "期货";
    if(t == 6)
        return "期权";
    return t;
}
function callback(msg){
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && (msg.functionNO == 116 || msg.functionNO == 115)){
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        if(msg.functionNO == 116){
            var html = "", data = msg.jData.content, p;
            if(data.length == 0) {
                $("#none").show();
                $("#list").hide();
            }else {
                $("#none").hide();
                for(var i=0;i<data.length;i++){
                    p = data[i][8].split(",");
                    html += '<li><a href="unbind.html?' + data[i][4] + '&' + data[i][5] + '"><span class="t">' + acctType(p[1]) + '账号</span><br><span>' + m2(p[0]) + '</span>' + m(data[i][4]) 
                    + '</a></li>';
                }
                $("#list").html(html).show();
            }
        }else {
            goBackA.click();  
        }
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && (msg.functionNO == 116 || msg.functionNO == 115)){
        alert("请求超时！");
    }
}

function listView() {
    window.reload = function(){
        ready(function(){
            if(pbMSG.ytzCloudRequestOtherAccountBindRelateQuery(jgid, "") < 0)
              alert("请求数据失败！");
        });
    }
    reload();
}

function unbindView() {
    var params = location.search.substr(1).split("&");
    $("#mask a").eq(0).on("click", function(){
        if(pbMSG.ytzCloudRequestBindOtherAccount(params[0], params[1]-0, jgid, 2, "") < 0)
            alert("请求失败！");
    })
}