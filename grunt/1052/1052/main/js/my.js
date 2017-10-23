var isPoboApp = typeof pbE != "undefined";
if (isPoboApp) {
    var pbSYS = pbE.SYS(), pbMSG = pbE.MSG();
}
var config;

function processConfig(cfg) {
    if (!config || config.my.version != cfg.my.version) {
        var s = "";
        for (var i = 0; i < cfg.my.data.length; i++) {
            s += '<li' + (i == 0 ? ' style="margin-top:0;"' : '') + '><a href="'
                + cfg.my.data[i].url + '">' + cfg.my.data[i].name
                + '<img class="more" src="../../images/more.png" alt="详细"></a></li>';
        }
        $("#menus").html(s);
    }
    config = cfg;
}

function callback(msg){
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && msg.functionNO == 111){
        if(pbMSG.ytzGetUnReadMsgCount()>0)
            $("#msg").addClass("red");
        else
            $("#msg").removeClass("red");
    }
}

function reload() {
    if (isPoboApp) {
        var phone = pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');

        if (phone) {
            $('#info').show();
            $('#login').hide();
            $('#phone').html(phone.substr(0, 3) + '****' + phone.substr(-4));
        }
        else
        {
            $('#login').show();
            $('#info').hide();
        }


        processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")));
        
        if(pbMSG.ytzGetUnReadMsgCount()>0)
          $("#msg").addClass("red");
        else {
          $("#msg").removeClass("red");
          var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(1)).Messages;
          var types2 = JSON.parse(pbMSG.ytzLoadHDMsgTypes(2)).Messages;
          for(var i=0;i<types.length;i++) {
            pbMSG.ytzHandleMsgHistoryQuery(types[i].typeid-0, "");
          }
          for(var i=0;i<types2.length;i++) {
            pbMSG.ytzHandleMsgHistoryQuery(types2[i].typeid-0, "");
          }
        } 
    } else
        $.get("../conf/main.json?" + Date.now(), processConfig);
}

reload();