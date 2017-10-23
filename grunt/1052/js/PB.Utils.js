/**
 * Created by pobo on 2016/11/3.
 */
(function () {

    var root = this;

    var pbUtils = function (obj) {
        if (obj instanceof pbUtils) return obj;
        if (!(this instanceof pbUtils)) return new pbUtils(obj);
    };


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = pbUtils;
        }
        exports.pbUtils = pbUtils;
    } else {
        root.pbUtils = pbUtils;
    }


    function ajax(type, requestData, success, fail, error) {
        var url = serviceUrl;
        setTimeout(function () {
            $.ajax({
                url: url,
                type: type,
                data: requestData,
                dataType: 'json',
                success: function (xmlHttp) {
                    if (xmlHttp && xmlHttp != "") {
                        if (xmlHttp.retHead == 0 && success) {
                            var data = xmlHttp.Data;
                            if (data && data != "") {
                                if (typeof data == "string") {
                                    try {
                                        data = JSON2.parse(xmlHttp.Data);
                                    } catch (e) {
                                    }
                                    success(data);
                                } else {
                                    success(xmlHttp.Data);
                                }
                                return;
                            } else {
                                success(data);
                                return;
                            }
                        }
                    }
                    fail && fail(xmlHttp);
                },
                error: function (xmlHttp, status, thrown) {
                    console.log(xmlHttp);
                    error && error(xmlHttp, status, thrown);
                }
            });
        }, 50);

    };

    pbUtils.post = function (requestData, success, fail, error) {
        return ajax("post", requestData, success, fail, error);
    };
    pbUtils.get = function (requestData, success, fail, error) {
        return ajax("get", requestData, success, fail, error);
    };

    /**
     * json转换(替换字符串中的非法字符)
     * @param text 参数名
     * @returns 转换json
     */
    pbUtils.parseJSON = function(text)
    {
        var tempStr = text.replace(/\r\n/g,"").replace(/\n/g,"").replace(/\\/g, "/");
        return JSON.parse(tempStr);
    }

    /**
     * 获取url参数
     * @param name 参数名
     * @returns 参数值
     */
    pbUtils.getQueryString = function(name) {
        var urls = decodeURI(window.location.search.substr(1));
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = urls.match(reg);
        if (r) return unescape(r[2]);return null;
    };


    pbUtils.doubleToStr = function(value,fix) {
        var fixed = fix || 2;
        if(!value)
            return "--";
        else
            return (value - 0).toFixed(fixed);
    };

    Number.prototype.toPercent = function(n) {
        n = n || 2;
        return ( Math.round( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
    };

    pbUtils.doubleToPecent = function(value,fix) {
        var fixed = fix || 2;
        if(!value)
            return "--";
        else
            return (value - 0).toPercent(fixed);
    };




    if (typeof define === 'function' && define.amd) {
        define('pbUtils', [], function() {
            return pbUtils;
        });
    }

}.call(this))