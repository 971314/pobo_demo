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

    //从url中获取参数
    pbUtils.GetQueryString = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return decodeURI(r[2]); return null; //返回参数值
    }

    //保留小数
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
    //小数转百分数，保留小数
    pbUtils.doubleToPercent = function(value,fix) {
        var fixed = fix || 2;
        if(!value)
            return "--";
        else
            return (value - 0).toPercent(fixed);
    };
    
    //百分数转小数
    pbUtils.per2num = function (per) {
      return per.replace(/([0-9.]+)%/, function (a, b) {return +b / 100;})
    }

    function fmoney(s, n) {   
       n = n > 0 && n <= 20 ? n : 2;   
       s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
       var l = s.split(".")[0].split("").reverse(),   
       r = s.split(".")[1];   
       t = "";   
       for(i = 0; i < l.length; i ++ ) {   
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
       }   
       return t.split("").reverse().join("") + "." + r;   
    }

    //钱数加上逗号的表示方法
    pbUtils.comma = function (s, n) {
      n = n > 0 && n <= 20 ? n : 2; 
      if (s >= 0) {
        return fmoney(s, n);
      } else if (s < 0) {
        return '-' + fmoney((-(s - 0)), n);
      }
    }

    //币种单位字典
    pbUtils.getUnit = function (code) {
      code = code - 0;
      switch (code) {
        case 0:
          return '元';
          break;
        case 1:
          return '美元';
          break;
        case 2:
          return '港币';
          break;
        case 3:
          return '欧元';
          break;
        case 4:
          return '澳元';
          break;
        case 5:
          return '日元';
          break;
        case 6:
          return '台币';
          break;
        default:
          return '元';
          break;
      }
    }
    
    pbUtils.getCurrency = function (code) {
      code = code - 0;
      switch(code) {
          case 0:
              return '人民币';
              break;
          case 1:
              return '美元';
              break;
          case 2:
              return '港币';
              break;
          case 3:
              return '欧元';
              break;
          case 4:
              return '澳元';
              break;
          case 5:
              return '日元';
              break;
          case 6:
              return '台湾币';
              break;
          default:
              return '未知';
              break;
      }
  }
    
    pbUtils.getCode = function (code) {
      code = code - 0;
      switch (code) {
        case 0:
          return 'CNY';
          break;
        case 1:
          return 'USD';
          break;
        case 2:
          return 'HKD';
          break;
        case 3:
          return 'EUR';
          break;
        case 4:
          return 'AUD';
          break;
        case 5:
          return 'JPY';
          break;
        case 6:
          return 'TWD';
          break;
        default:
          return '未知';
          break;
      }
    }

    //开仓均价保留到价格精度加上一位
    pbUtils.decimalDec = function (decimal, price) {
      price = price + '';
      var decIndex = price.indexOf('.');
      var length = price.length;
      if (decIndex >= 0) {
        if (length - 1 - decIndex >= decimal + 1) {
          price = price.substr(0, price.indexOf('.') + decimal + 2);
        } else {
          price = (price - 0).toFixed(decimal + 1);
        }
      } else {
        price = (price - 0).toFixed(decimal + 1);
      }
      return price;
    }

    //最新价保留到价格精度
    pbUtils.decimalDecPrice = function (decimal, price) {
      price = price + '';
      var decIndex = price.indexOf('.');
      var length = price.length;
      if (decIndex >= 0) {
        if (length - 1 - decIndex >= decimal) {
          price = price.substr(0, price.indexOf('.') + decimal + 1);
        } else {
          price = (price - 0).toFixed(decimal);
        }
      } else {
        price = (price - 0).toFixed(decimal);
      }
      return price;
    }

    /*日期格式化*/
    Date.prototype.format = function (format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "D+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+|Y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    };

    //date是Date()对象,format是形如"yyyy-MM-dd"的字符串
    pbUtils.dateFormat = function (date, format) {
      return date.format(format);
    }

    //计算两日期时间差，interval是计算类型：D是按照天、H是按照小时、M是按照分钟、S是按照秒、T是按照毫秒，date1是起始日期，格式为“2012-06-20”，date2是结束日期
    pbUtils.countTimeLength = function (interval, date1, date2) {
      var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
      interval = interval.toUpperCase();
      var dt1 = Date.parse(date1.replace(/-/g, "/"));
      var dt2 = Date.parse(date2.replace(/-/g, "/"));
      try {
        return (dt2 - dt1) / objInterval[interval];
      } /*.toFixed(2)*/ //保留两位小数点
      catch (e) {
        return e.message;
      }
    }
    
    //保留小数点多少位
    pbUtils.floatToFixed = function (value, fixedNum) {
      return (value - 0).toFixed(fixedNum);
    }
    
    //成交或委托时间倒序排列，字段116/159，index传入字段
    pbUtils.sortDlEn = function (arr, index) {
      var nightArr = arr.filter(function (item) {
        var timeStr = item[index].replace(/\:/g, "");
        return timeStr > '195959';
      });
      var todayArr = arr.filter(function (item) {
        var timeStr = item[index].replace(/\:/g, "");
        return timeStr < '200000';
      });
      nightArr = nightArr.sort(function (item1, item2) {
        var time1 = item1[index].replace(/\:/g, "");
        var time2 = item2[index].replace(/\:/g, "");
        return time2 - time1;
      });
      todayArr = todayArr.sort(function (item1, item2) {
        var time1 = item1[index].replace(/\:/g, "");
        var time2 = item2[index].replace(/\:/g, "");
        return time2 - time1;
      });
      var newArr = [];
      newArr = newArr.concat(todayArr, nightArr);
      return newArr;
    }
    
    
    //判断输入是不是空
    pbUtils.JTrim = function (s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    }

    if (typeof define === 'function' && define.amd) {
        define('pbUtils', [], function() {
            return pbUtils;
        });
    }

}.call(this))