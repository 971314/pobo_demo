/**
 * Created by pobo on 2016/11/3.
 */
!(function () {
    var root = this;
    var pbApi = function (obj) {
        if (obj instanceof pbApi) return obj;
        if (!(this instanceof pbApi)) return new pbApi(obj);
    };


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = pbApi;
        }
        exports.pbApi = pbApi;
    } else {
        root.pbApi = pbApi;
    }

    if (typeof define === 'function' && define.amd) {
        define('pbApi', [], function() {
            return pbApi;
        });
    }

    var isPoboApp = typeof pbE != "undefined";

    var pbSYS,pbINFO,pbWT,pbHQ;

   if (isPoboApp) {
       pbSYS = pbE.SYS();
       pbINFO = pbE.INFO();
       pbWT = pbE.WT();
       /* this.pbMSG = pbE.MSG();*/
       pbHQ = pbE.HQ();
    }

    /***********系统类 Begin*************/

    /**
     * 开始加载
     * @returns 开始加载
     */
    pbApi.sys_startLoading = function () {
        if(isPoboApp)
            pbSYS.startLoading();
    };



    pbApi.sys_stopLoading = function () {
        if(isPoboApp)
            root.pbSYS.stopLoading();
    };

    /**
     * 获取app认证信息
     * @return 获取app认证信息
     */
    pbApi.sys_getAppCertifyInfo= function () {
        var AppCertifyInfo = {};
        if (isPoboApp) {
            AppCertifyInfo.LoginName = this.pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
            AppCertifyInfo.Token = this.pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_Token');
            AppCertifyInfo.UserId = this.pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');
        }
        return AppCertifyInfo;
    };

    pbApi.sys_storePrivateData= function (key, value) {
        if (isPoboApp) {
            pblog.info("sys_storePrivateData");
            return this.pbSYS.storePrivateData(key, value);
        } else {
            return false;
        }
    };

    pbApi.sys_getPrivateData= function (key) {
        if (isPoboApp) {
            pblog.info("sys_getPrivateData");
            return this.pbSYS.getPrivateData(key);
        } else {
            return null;
        }
    };

    //获取设备信息
    pbApi.sys_getDeviceJsonInfo= function () {
        var deviceJsonInfo = {};
        if (isPoboApp) {
            pblog.info("sys_getDeviceJsonInfo");
            deviceJsonInfo = JSON.parse(this.pbSYS.getDeviceJsonInfo());
        }
        return deviceJsonInfo;
    };

    /***********系统类 End*************/


    /***********交易类 Begin*************/

    /**
     * 交易类免掉CID参数，由累框架统一处理
     */

    pbApi.wt_getCurrentConnectionCID = function () {
        if(isPoboApp)
            return pbWT.wtGetCurrentConnectionCID();
        else
            return -1;
    }

    pbApi.wt_generalRequest = function (FunNum, datetime) {
        var CID = pbApi.wt_getCurrentConnectionCID();
        pblog.info("wt_GeneralRequest");
        if(isPoboApp)
            pbWT.wtGeneralRequest(CID, FunNum, datetime)
    }


    pbApi.wt_queryMoney = function(param){
        var CID =  pbApi.wt_getCurrentConnectionCID();
        if(isPoboApp)
            pbWT.wtQueryMoney(CID, param)
    };

    pbApi.wt_queryMoneyRe = function(){
        var CID =  pbApi.wt_getCurrentConnectionCID();
        if(isPoboApp)
            return pbWT.wtQueryMoneyRe(CID)
    };

    pbApi.wt_synFlash = function(){
        var CID =  pbApi.wt_getCurrentConnectionCID();
        pblog.info("wt_SynFlash");
        if(isPoboApp)
            pbWT.wtSynFlash(CID)
    };

    pbApi.wt_queryStockRe = function(){
        var CID =  pbApi.wt_getCurrentConnectionCID();
        if(isPoboApp)
           return pbWT.wtQueryStockRe(CID)
    };

    pbApi.wt_getHQInfo = function(code,market){
        if(isPoboApp)
            return pbWT.wtGetHQInfo(code,market)
        else
            return "";
    };

    pbApi.wt_getMSSL = function(code,market){
        if(isPoboApp)
            return pbWT.wtGetMSSL(code,market)
        else
            return 0;
    };

    /***********交易类 End*************/

    /***********行情类 Begin*************/
    pbApi.hq_subscribe = function(type,param){
        if(isPoboApp)
            pbHQ.hqSubscribe(type, param);
    };

    pbApi.hq_getGroupFlag = function(code,market){
        if(isPoboApp)
            return pbHQ.hqGetGroupFlag(code, market);
    };

    pbApi.hq_getPriceDecimal = function(code,market){
        if(isPoboApp)
            return pbHQ.hqGetPriceDecimal(code, market);
    };


    pbApi.hq_getNowPrice = function(code,market){
        if(isPoboApp)
            return pbHQ.hqGetNowPrice(code, market);
    };

    pbApi.hq_getLastBasePrice = function(code,market){
        if(isPoboApp)
           return pbHQ.hqGetLastBasePrice(code, market);
    };

    pbApi.hq_getPriceRate = function(code,market){
        if(isPoboApp)
            return pbHQ.hqGetPriceRate(code, market);
    };

    /***********行情类 End*************/


}.call(window));
