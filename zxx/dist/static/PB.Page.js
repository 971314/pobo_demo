/**
 * Created by pobo on 2016/11/3.
 */
!function (global) {

    var logOn = false;//是否打印日志
    var initState = false;
    var PBPage = function () {
    }

    PBPage.prototype = {
        initPage: function (option) {
            this.reload = [];
            if(option['reload'])
                this.reload.push(option['reload']);

            if(option['refresh'])
                this.refresh = option['refresh'];

            if(option['fresh'])
                this.fresh = option['fresh'];

            if(option['doShow'])
                this.doShow = option['doShow'];

            var _pCallbacks;
            if(option['callbacks'])
                _pCallbacks = option['callbacks'];
            else
                _pCallbacks = [];
            this.pCallbacks = {};

            for (var i = 0, j = _pCallbacks.length; i < j; i++) {
                if (_pCallbacks[i].fun && _pCallbacks[i].module) {
                    this.pCallbacks["M_" + _pCallbacks[i].module + "F_" + _pCallbacks[i].fun] = _pCallbacks[i].callback
                }
                else if (_pCallbacks[i].fun && !_pCallbacks[i].module) {
                    this.pCallbacks["F_" + _pCallbacks[i].fun] = _pCallbacks[i].callback
                }
                else if (!_pCallbacks[i].fun && _pCallbacks[i].module) {
                    this.pCallbacks["M_" + _pCallbacks[i].module] = _pCallbacks[i].callback
                }
            }
            initState = true;
        },

        addFunCallback: function (funNo, fun) {
            if(!initState) return;
            if (!this.pCallbacks['F' + "_" + funNo]) {
                this.pCallbacks['F' + "_" + funNo] = fun;
            }
        },

        addModuleCallback: function (moduleId, fun) {
            if(!initState) return;
            if (!this.pCallbacks['M' + "_" + moduleId]) {
                this.pCallbacks['M' + "_" + moduleId] = fun;
            }
        },

        addModuleFunCallback: function (moduleId, funNo, fun) {
            if(!initState) return;
            if (!this.pCallbacks["M_" + moduleId + "F_" + funNo]) {
                this.pCallbacks["M_" + moduleId + "F_" + funNo] = fun;
            }
        },

        addReloadFun: function (fun) {
            if(!initState) return;
            if (fun) {
                this.reload.push(fun);
            }
        },

        log:function(content)
        {
            if(logOn)
                console.log(content);
        },

        setLogOn:function(flag)
        {
            logOn = flag;
        },

        getInitState:function()
        {
            var state = initState;
            return state;
        }
    }

    var pbPage = new PBPage();

    function parseJSON(text)
    {
        var tempStr = text.replace(/\r\n/g,"").replace(/\n/g,"");
        return JSON.parse(tempStr);
    }

    /*原生调用的方法*/
    //返回调用
    function callback(message) {
        if(!initState) return;
        if(document.readyState !=  "complete")
            return;
        var msg = parseJSON(message);
        pbPage.log(msg);
        var key1 = 'M' + "_" + msg.moduleId,
            key2 = 'F' + "_" + msg.functionNO,
            key3 = 'M' + "_" + msg.moduleId + 'F' + "_" + msg.functionNO;
        if (msg.moduleId && msg.functionNO && pbPage.pCallbacks[key3]) {
            pbPage.pCallbacks[key3](msg);
        }
        else if (msg.functionNO && pbPage.pCallbacks[key2]) {
            pbPage.pCallbacks[key2](msg);
        }
        else if (msg.moduleId && pbPage.pCallbacks[key1]) {
            pbPage.pCallbacks[key1](msg);
        }
    }


    //重载
    function reload() {
        if(!initState) return;
        if(pbPage.reload && pbPage.reload.length>0)
        {
            for(var i=0; i<pbPage.reload.length; i++)
            {
                pbPage.reload[i]();
            }
        }
    }

    //主动刷新
    function refresh() {
        if(!initState) return;
        pbPage.refresh && pbPage.refresh();
    }

    //切换刷新
    function fresh() {
        if(!initState) return;
        pbPage.fresh && pbPage.fresh();
    }

    //显示
    function doShow(flag) {
        if(!initState) return;
        pbPage.doShow && pbPage.doShow(flag);
    }

    !global.callback && (global.callback = callback);
    !global.reload && (global.reload = reload);
    !global.refresh && (global.refresh = refresh);
    !global.fresh && (global.fresh = fresh);
    !global.doShow && (global.doShow = doShow);
    !global.pbPage && (global.pbPage = pbPage);

}(window)