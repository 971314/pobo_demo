/**
 * Created by pobo on 2016/11/3.
 */
!function (global) {
    var PBPage = function () {
    }

    PBPage.prototype = {
        initPage: function (option) {
            this.reload = option['reload'];
            this.refresh = option['refresh'];
            this.fresh = option['fresh'];
            this.doShow = option['doShow'];
            var _pCallbacks = option['callbacks'];
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
        },

        addFunCallback: function (funNo, fun) {
            if (!this.pCallbacks['F' + "_" + funNo]) {
                this.pCallbacks['F' + "_" + funNo] = fun;
            }
        },

        addModuleCallback: function (moduleId, fun) {
            if (!this.pCallbacks['M' + "_" + moduleId]) {
                this.pCallbacks['M' + "_" + moduleId] = fun;
            }
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
        var msg = parseJSON(message);
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
        pbPage.reload && pbPage.reload();
    }

    //主动刷新
    function refresh() {
        pbPage.refresh && pbPage.refresh();
    }

    //切换刷新
    function fresh() {
        pbPage.fresh && pbPage.fresh();
    }

    //显示
    function doShow(flag) {
        pbPage.doShow && pbPage.doShow(flag);
    }


    !global.callback && (global.callback = callback);
    !global.reload && (global.reload = reload);
    !global.refresh && (global.refresh = refresh);
    !global.fresh && (global.fresh = fresh);
    !global.doShow && (global.doShow = doShow);
    !global.pbPage && (global.pbPage = pbPage);

}(window)