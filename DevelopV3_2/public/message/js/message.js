var config, syncCode, syncCount, appVue, syncTm, maxMsgId, scrollH = $(document).height() - $("#navbar").height() - 41, loading = $("#loading"), timeout = $("#timeout"), isTimeout = false;

function sync() {
    syncCode = {}, syncCount = 0, isTimeout = false;
    for(var i=0;i<config.categories.length;i++){
        if(config.categories[i].data.length > 0)
            config.categories[i].data = [];
    }
    var ids = config.categories[0].id, code;
    for(var i=0;i<ids.length;i++){
        code = pbMSG.ytzHandleMsgHistoryQuery(ids[i]-0, "");
        if(code>=0) {
            syncCode[code] = 1;
            ++syncCount;
        }
    }
    if(syncCount == 0) {
        loadData(appVue.cat);  
        return;
    }
    loading.show();
    syncTm = setTimeout(function(){
        if(syncCount > 0) {
            syncCount = 0;
            syncCode = {};
            getMaxMsgId();
      //      showTimeout();
            loadData(appVue.cat);  
        }
    },25000);
}

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO in syncCode) {
        if(--syncCount <= 0) {
            clearTimeout(syncTm);
            getMaxMsgId();
            loadData(appVue.cat);    
        }
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO in syncCode) {
        isTimeout = true;
        if(--syncCount <= 0) {
            clearTimeout(syncTm);
            getMaxMsgId();
            loadData(appVue.cat);    
        }
    }
}

function getMaxMsgId() {
    var data = JSON.parse(pbMSG.ytzLoadProFileMsg(1, "")).Messages;
    if(data.length > 0)
        maxMsgId = data[0].msgid;
}

function loadData(i){
    loading.hide();
    var unread = 0, ids = config.categories[i].id, lastid = "", data = config.categories[i].data, data2;
    data.length>0 && (lastid=data[data.length-1].msgid);
    if(lastid=="") { 
        if(i == 0)
            unread = pbMSG.ytzGetUnReadMsgCount();
        else {
            for(var j =0;j<ids.length;j++)
              unread += pbMSG.ytzGetUnReadMsgCountByType(ids[j]-0);
        }
        config.categories[i].unread = unread;
    }
    if(i == 0)
        data2 = pbMSG.ytzLoadProFileMsg(10, lastid);
    else if(ids.length == 1)
        data2 = pbMSG.ytzLoadProfileTypeMsg(ids[0]-0, 10, lastid);
    else
        data2 = pbMSG.ytzLoadProfileTypesMsg(JSON.stringify({
            maxmsgcount: "10",
            latestid: lastid
        }));
    data2 = JSON.parse(data2).Messages;
    for(var j =0;j<data2.length;j++) {
        var d = data2[j];
        if(!config.types[d.typeid])
            config.types[d.typeid] = {listTemplate:"DEFAULT", noDetail:false};
        if(config.types[d.typeid].noDetail && d.readed == 0)
            updateUnread(i, d, false);
        data.push(d);
    }   
}


function updateUnread(i, d, clear) {
    pbMSG.ytzUpdateReaded(d.msgid);
    pbMSG.ytzCloudReportOnMsgReadedStatus(d.msgid,"");
    d.readed = 1;
    --config.categories[i].unread;
    for(var j = 0;j<config.categories.length;j++){
        if(j == i)
            continue;
        if(config.categories[j].id.indexOf(d.typeid)!=-1) {
            if(config.categories[j].data.length>0) {
                if(clear)
                    config.categories[j].data = [];
                else
                    --config.categories[j].unread;
            }
            break;
        }
    }
}

function d2(d) {
    return d < 10 ? "0"+d : d;
}

Vue.filter("msgTime", function(t){
    var date = new Date();
    var today = ""+date.getFullYear()+d2(date.getMonth()+1)+d2(date.getDate());
    date.setTime(date.getTime()-86400000);
    var yestorday = ""+date.getFullYear()+d2(date.getMonth()+1)+d2(date.getDate());
    try {
        if(t.indexOf(today) == 0)
            return t.substr(8,2)+":"+t.substr(10,2);
        else if(t.indexOf(yestorday) == 0)
            return "昨天";
        return t.substr(0,4)+"-"+t.substr(4,2)+"-"+t.substr(6,2);
    }catch(e){}    
    return t;
})

function init(types) {
    var cfg = config;
    types = types || getMsgTypes(true, cfg.hides);
    if(types.length == 0) {
        loading.hide();
        alert("数据加载失败");
        return;
    }
    cfg.categories = [];
    for(var k in TEMPLATES_LIST) {
        TEMPLATES_LIST[k].props = ["item"];
    }
    var otherIds = [], allIds = [], typeid, currentCat = 0, searchCat = location.search.substr(1);
    for(var i=0;i<types.length;i++){
        typeid = types[i].typeid;
        allIds.push(typeid);
        cfg.types[typeid] = $.extend({listTemplate:"DEFAULT", noDetail:false}, cfg.types[typeid]);
        if(types[i].other)
            otherIds.push(typeid);
        else {
            cfg.categories.push({name:types[i].types, id: [typeid], unread:0, data:[]});
            if(searchCat == typeid)
                currentCat = i+1;
        }
    }
    cfg.categories.push({name:"其他消息", id:otherIds, unread:0, data:[]});
    cfg.categories.unshift({name:"全部消息", id:allIds, unread:0, data:[]});
        
    $("#app").show();
    new Vue({
            el: "#app",               
            data: function(){         
                appVue = this;
                return {
                    cats: cfg.categories,
                    cat: currentCat,
                    types: cfg.types
                }
            },
            components: TEMPLATES_LIST,
            mounted: function(){
                var doc = $(document), w = Math.floor(doc.width()/4);
                var cats = $("#app .cats");
                cats.children().css("width", w*this.cats.length).children().css("width", w);
                new iScroll(cats[0],{
                    vScroll: false,
                    bounce: false, 
                    hScrollbar: false
                });
                $("#app .list").each(function(i){
                    $(this).css("height", scrollH + "px").children().css("minHeight", scrollH+"px");
                    new iScroll(this,  {
                        hScroll: false,
                        vScrollbar: false,
                        checkDOMChanges: true,
//                        onRefresh: function(){
//                            console.log("refresh");
//                        },
                        onTouchEnd: function(){
                            if(this.y < this.maxScrollY)
                                this.loadType = 1;
                            else if(this.y > 100)
                                this.loadType = 2;
                            else
                                this.loadType = 0;
                        },
                        onScrollEnd: function(){
                            if(this.loadType == 1)
                                loadData(i);
                            else if(this.loadType == 2) {
                                sync();
                            }
                        }
                    });
                });
                getMaxMsgId();
                isReady(sync, sync);
             },
             methods:{
                 changeCat: function(i) {
                     if(this.cat == i)
                         return;
                     this.cat = i;
                     if(this.cats[i].data.length==0)
                         loadData(i);
                 },
                 read: function(d) {
                     d.readed == 0 && updateUnread(this.cat, d, true);
                 }
             }
         });
}

getConf("", function(cfg) {
    config = cfg;
    var types = getMsgTypes(true, cfg.hides);
    if(types.length == 0) {
        isReady(init, init);
    }else
        init(types);
});

function reload() {
    if(!appVue || syncCount > 0)
        return;
    var oldId = maxMsgId;
    getMaxMsgId();
    if(oldId != maxMsgId)
        sync();
}

