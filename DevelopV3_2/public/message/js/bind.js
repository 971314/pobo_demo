(function(){
    var isPoboApp = typeof pbE != "undefined", el;
    if (isPoboApp) {
        var pbSYS = pbE.SYS(), pbMSG = pbE.MSG();
    }
    
    function isMSGReady(cb){
      if(pbMSG.ytzIsServiceReady()>=0)
        cb();
      else
        setTimeout(function(){
            isMSGReady(cb);
        }, 1000);
    } 
    
    function callback(msg){
        msg = JSON.parse(msg);
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        $("#binding").html(msg.jData.content.length==0?"未关联":"已关联");
    }
    
    function reload() {
        if($("#bindLi").length == 0) {
            $(el).append('<li id="bindLi"><a href="../../message/view/binds.html">账户关联<span class="pull-right"><span id="binding"></span><img class="more" src="../images/more.png"></span></a></li>');
        }
        if(pbMSG)      
            isMSGReady(function(){
                pbMSG.ytzCloudRequestOtherAccountBindRelateQuery(JSON.parse(pbSYS.getDeviceJsonInfo()).jgid+"", "");
            })
    }
    
    window.initMsgBind = function(id){
        el = id;
        function init(){
            if(pbPage.getInitState()) {
                pbPage.addModuleFunCallback(90007, 116, callback);
                pbPage.addReloadFun(reload);
            }else {
                pbPage.initPage({
                    reload: reload,
                    callbacks:[{module:90007, fun:116, callback:callback}]
                });
            }
            reload();
        }
        
        if(isPoboApp) {
            JSON.parse(pbSYS.readConfig("main/conf/main.json")).my.msg && init();
        }else {
            $.get("../../main/conf/main.json", function(cfg){
                cfg.my.msg && init();
            })
        }
    }
})()


      
    
      
      
    