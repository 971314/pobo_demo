/**
 * 获取url参数
 * @param name 参数名
 * @returns 参数值
 */

function GetQueryString(name) {
  var urls = decodeURI(window.location.search.substr(1));
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = urls.match(reg);
  if (r) return unescape(r[2]);return null;
}
/**
 * 日期格式化
 */
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
/**
 * 币种代码
 */
function getCode(code) {
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
      return 'CNY';
      break;
  }
}
/**
 * 币种字典
 */
function getCurrency(code) {
  code = code - 0;
  switch (code) {
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
      return '人民币';
      break;
  }
}
/**
 * 币种单位字典
 */
function getUnit(code) {
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
/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
 * 为空返回true，否则返回false
 */
function isEmpty(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
};
/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法只检测对象本身的属性，不检测从原型继承的属性。
 * 为空返回true，否则返回false
 */
function isOwnEmpty(obj) {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
};
/*
 * 判断是否为手机号
 */
function isPhoneNum(val) {
  var phoneReg = !!val.match(/^[0-9]{11}$/);
  return phoneReg;
}
/*
 * 判断密码输入是否符合规则
 */
function isRightPwd(val) {
  var pwdReg = !!val.match(/^(?!\D+$)(?!\d+$)[a-zA-Z0-9]{6,16}$/);
  return pwdReg;
}
/*
 * 判断是否为空
 */
function isNull(val) {
  if ($.trim(val).length == 0) {
    return true;
  }
  return false;
}
/*
 * 获取验证码按钮
 */
function sendOTPBtn(seconds) {
  var countdown = seconds;
  var i = setInterval(function(){
    if(countdown == 0){
      $('#btn-send').removeClass('disabled');
      $('#btn-send').val('获取校验码');
      clearInterval(i);
    }else{
      $('#btn-send').val('(' + countdown +  'S)');
      $('#btn-send').addClass('disabled');
    }
    countdown--;
  },1000);
}
/*
 * 获取发送验证码时间
 * 判断是否超过时间
 * 未超过时间则不能重新发送
 * 超过时间能重新发送
 */
function checkOTPTime() {
  if ($('#btn-send')[0]) {
    var time = new Date().getTime();
    var sendOTPTime = pbE.SYS().getPrivateData('sendOTPTime');
    if (sendOTPTime) {
      var period = time - sendOTPTime;
      if (period > (120 * 1000)) {
        //延时器，120秒后可以重发校验码
        sendOTPBtn(120);
        //存储发送验证码时间，防止用户刷新重新发送验证码
        pbE.SYS().storePrivateData('sendOTPTime', time + '');
      } else {
        sendOTPBtn(120 - Math.round(period / 1000));
        return;
      }
    } else {
        sendOTPBtn(120);
        pbE.SYS().storePrivateData('sendOTPTime', time + '');
    }
  }
}

//json转换 去掉非法字符
function parseJSON(text) {
  var tempStr = text.replace(/\r\n/g,"").replace(/\n/g,"").replace(/\\/g, "/");
  return JSON.parse(tempStr);
}
//安卓点击输入框页面上