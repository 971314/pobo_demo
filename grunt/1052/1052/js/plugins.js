'use strict';
//--------------------共通函数---start-------------------//
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
 * 计算两日期时间差
 * @param   interval 计算类型：D是按照天、H是按照小时、M是按照分钟、S是按照秒、T是按照毫秒
 * @param  date1 起始日期  格式为年月格式 为2012-06-20
 * @param  date2 结束日期
 * @return
 */
function countTimeLength(interval, date1, date2) {
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
      return '未知';
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
      return '未知';
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
      return '未知';
      break;
  }
}
/**
 * 替换json字符串非法字符
 */
function replaceJson(str) {
  str = str.replace(/\n/g, '<br>');
  str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  str = str.replace(/\s/g, '&nbsp;');
  return str;
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

//成交时间倒序排列，字段116
function sortDeal(arr) {
  // for (var i = 0; i < arr.length; i++) {
  //   if (arr[i]['173']) {
  //     continue;
  //   } else {
  //     break;
  //   }
  // }
  // if (i >= arr.length) {
  //   arr.sort(function (a, b) {
  //     return a['173'] + a['116'] < b['173'] + b['116'] ? 1 : -1;
  //   });
  //   return arr;
  // } else if (i < arr.length) {
  //   arr.sort(function (a, b) {
  //     return a['65'] < b['65'] ? 1 : -1;
  //   });
  //   return arr;
  // }
  var nightArr = arr.filter(function (item) {
    var timeStr = item['116'].replace(/\:/g, "");
    return timeStr > '195959';
  });
  var todayArr = arr.filter(function (item) {
    var timeStr = item['116'].replace(/\:/g, "");
    return timeStr < '200000';
  });
  nightArr = nightArr.sort(function (item1, item2) {
    var time1 = item1['116'].replace(/\:/g, "");
    var time2 = item2['116'].replace(/\:/g, "");
    return time2 - time1;
  });
  todayArr = todayArr.sort(function (item1, item2) {
    var time1 = item1['116'].replace(/\:/g, "");
    var time2 = item2['116'].replace(/\:/g, "");
    return time2 - time1;
  });
  var newArr = [];
  newArr = newArr.concat(todayArr, nightArr);
  return newArr;
}

//委托时间倒序排列，字段159
function sortEntrust(arr) {
  // for (var i = 0; i < arr.length; i++) {
  //   if (arr[i]['160']) {
  //     arr[i]['160'] = arr[i]['160'].replace(/\-/g, "");
  //     continue;
  //   } else {
  //     break;
  //   }
  // }
  // if (i >= arr.length) {
  //   arr.sort(function (a, b) {
  //     return a['160'] + a['159'] < b['160'] + b['159'] ? 1 : -1;
  //   });
  //   return arr;
  // } else if (i < arr.length) {
  //   arr.sort(function (a, b) {
  //     return a['65'] < b['65'] ? 1 : -1;
  //   });
  //   return arr;
  // }
  var nightArr = arr.filter(function (item) {
    var timeStr = item['159'].replace(/\:/g, "");
    return timeStr > '195959';
  });
  var todayArr = arr.filter(function (item) {
    var timeStr = item['159'].replace(/\:/g, "");
    return timeStr < '200000';
  });
  nightArr = nightArr.sort(function (item1, item2) {
    var time1 = item1['159'].replace(/\:/g, "");
    var time2 = item2['159'].replace(/\:/g, "");
    return time2 - time1;
  });
  todayArr = todayArr.sort(function (item1, item2) {
    var time1 = item1['159'].replace(/\:/g, "");
    var time2 = item2['159'].replace(/\:/g, "");
    return time2 - time1;
  });
  var newArr = [];
  newArr = newArr.concat(todayArr, nightArr);
  return newArr;
}

//持仓现价的小数保留，先保留五位 再去掉无效的0
function fiveDec(lastPrice) {
  if (lastPrice.substr(lastPrice.indexOf('.') + 5) == 0) {
    lastPrice = (lastPrice - 0).toFixed(4);
    if (lastPrice.substr(lastPrice.indexOf('.') + 4) == 0) {
      lastPrice = (lastPrice - 0).toFixed(3);
      if (lastPrice.substr(lastPrice.indexOf('.') + 3) == 0) {
        lastPrice = (lastPrice - 0).toFixed(2);
        if (lastPrice.substr(lastPrice.indexOf('.') + 2) == 0) {
          lastPrice = (lastPrice - 0).toFixed(1);
          if (lastPrice.substr(lastPrice.indexOf('.') + 1) == 0) {
            lastPrice = (lastPrice - 0).toFixed(0);
          }
        }
      }
    }
  }
  return lastPrice;
}
//保留小数点多少位
function floatToFixed(value, fixedNum) {
  return (value - 0).toFixed(fixedNum);
}
//持仓排序
function sortPosition(arr) {
  var arrLength = arr.length;
  for (var i=0; i<arrLength; i++) {
    var code = arr[i]['63'];
    for (var j=i+1; j<arrLength; j++) {
      if (arr[j]['63'] == code) {
        var temp = arr[j];
        if (arr[i]['503'] != '1' && arr[j]['503'] == '1'){
          arr.splice(j, 1);
          arr.splice(i, 0, temp);
          i++;
        } else {
          arr.splice(j, 1);
          arr.splice(i + 1, 0, temp);
        }
      }
    }
  }
  return arr;
}

//去掉字符两边空格
function trim(str){ //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 去除['163']备注信息左右两边空格
//--------------------共通函数---end-------------------//
var dayDeal = '当日成交',
    dayEntrust = '当日委托',
    historicalDeal = '历史成交',
    historicalEntrust = '历史委托',
    capitalStatus = '资金现状',
    stockName = '股票名称',
    direction = '方向',
    num = '数量',
    pri = '价格',
    dealName = '合约名称',
    pn = '价/量',
    dealTime = '成交时间',
    anarchy = '状态',
    entrustTime = '委托时间',
    buy = '买入',
    sold  = '卖出',
    buyOpen = '买开',
    sellFlat = '卖平',
    buyFla = '买平',
    sellOff = '卖开',
    dealloan = '成交金额',
    ynCovered = '是否备兑',
    contractCode = '合约编码',
    noteinfo = '备注信息',
    note = '备注',
    buyFlaDay = '买平今',
    sellFlatDay = '卖平今',
    entrustNum = '委托数量',
    secondMenu1 = '委托数量',
    secondMenu2 = '成交数量',
    secondMenu3 = '',
    secondMenu4 = '',
    operate = '操作方向',
    entrustpri = '委托价格',
    hasBecome = '已成',
    hasDeclare = '已报',
    Part = '部成',
    withdrawal = '部撤',
    BeingReported = '正报',
    revoke = '已撤';
//--------------------页面组件---start-------------------//
var NavHeader = React.createClass({
  displayName: 'NavHeader',

  render: function () {
    return React.createElement(
      'div',
      { className: 'container-fluid' },
      React.createElement(
        'div',
        { className: 'navbar-header' },
        React.createElement(
          'a',
          { href: 'goBack', className: 'navbar-brand' },
          React.createElement('img', { src: '../../images/goback.png', alt: '返回' })
        )
      ),
      React.createElement(
        'p',
        { className: 'navbar-text' },
        this.props.name
      )
    );
  }
});

var QueryOptions = React.createClass({
  displayName: 'QueryOptions',

  render: function () {
    return React.createElement(
      'ul',
      { className: 'nav nav-pills nav-stacked' },
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'options-day-deal.html' },
            dayDeal,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'options-day-entrust.html' },
            dayEntrust,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'options-history-deal.html' },
            historicalDeal,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'options-history-entrust.html' },
            historicalEntrust,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'options-fund-status.html' },
            capitalStatus,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      )
    );
  }
});

var QueryFutures = React.createClass({
  displayName: 'QueryFutures',

  render: function () {
    return React.createElement(
      'ul',
      { className: 'nav nav-pills nav-stacked' },
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'futures-day-deal.html' },
            dayDeal,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'futures-day-entrust.html' },
            dayEntrust,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'futures-history-deal.html' },
            historicalDeal,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'futures-history-entrust.html' },
            historicalEntrust,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: 'futures-fund-status.html' },
            capitalStatus,
          React.createElement('img', { className: 'more', src: '../images/more.png', alt: '详细' })
        )
      )
    );
  }
});

var DealTitle = React.createClass({
  displayName: 'DealTitle',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-2 text-left' },
          stockName
      ),
      React.createElement(
        'div',
        { className: 'col-my-2 text-center' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-6 text-center' },
          num
      ),
      React.createElement(
        'div',
        { className: 'col-my-1 text-center' },
          pri
      )
    );
  }
});

var DealTitleOptions = React.createClass({
  displayName: 'DealTitleOptions',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-18 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-3 text-center' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-16 text-center' },
          pn
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-center' },
          dealTime
      )
    );
  }
});

var DealTitleFutures = React.createClass({
  displayName: 'DealTitleFutures',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-11 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 text-right' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-right' },
        '成交价'
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 text-right' },
        '成交量'
      )
    );
  }
});

var EntrustTitle = React.createClass({
  displayName: 'EntrustTitle',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-1 text-left' },
          stockName
      ),
      React.createElement(
        'div',
        { className: 'col-my-6 text-right' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-5 text-center' },
          pn
      ),
      React.createElement(
        'div',
        { className: 'col-my-6 status text-center' },
        React.createElement(
          'span',
          null,
            anarchy
        ),
        React.createElement('span', { id: 'order' })
      )
    );
  }
});

var EntrustTitleOptions = React.createClass({
  displayName: 'EntrustTitleOptions',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-1 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-16 text-right' },
          entrustTime
      ),
      React.createElement(
        'div',
        { className: 'col-my-14 text-right' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-4 text-center' },
          pn
      ),
      React.createElement(
        'div',
        { className: 'col-my-12 status text-right' },
        React.createElement(
          'span',
          null,
            anarchy
        ),
        React.createElement('span', { id: 'order' })
      )
    );
  }
});

var EntrustTitleFutures = React.createClass({
  displayName: 'EntrustTitleFutures',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title' },
      React.createElement(
        'div',
        { className: 'col-my-11 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 text-right' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-center' },
          pn
      ),
      React.createElement(
        'div',
        { className: 'col-my-13 status text-right' },
        React.createElement(
          'span',
          null,
            anarchy
        ),
        React.createElement('span', { id: 'order' })
      )
    );
  }
});

var DealContents = React.createClass({
  displayName: 'DealContents',

  render: function () {
    var creatContents = function (content) {
      var direction = null;
      if (content['112'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c3 lh33' },
            buy
        );
      } else if (content['112'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c4 lh33' },
            sold
        );
      }
      return React.createElement(
        'div',
        { className: 'row content' },
        React.createElement(
          'div',
          { className: 'col-my-2 text-left' },
          React.createElement(
            'p',
            { className: 'c1' },
            content['64']
          ),
          React.createElement(
            'p',
            { className: 'd2' },
            content['116']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-2 text-center' },
          direction
        ),
        React.createElement(
          'div',
          { className: 'col-my-6 text-center' },
          React.createElement(
            'p',
            { className: 'b1 lh33' },
            content['113']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-1 text-center' },
          React.createElement(
            'p',
            { className: 'b1 lh33' },
            content['114']
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var DealContentsOptions = React.createClass({
  displayName: 'DealContentsOptions',

  fold: function (index) {
    $('#hideBox' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../images/arrow-up.png') $('#arrow' + index).attr('src', '../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../images/arrow-down.png') $('#arrow' + index).attr('src', '../images/arrow-up.png');
  },
  render: function () {
    var creatContents = function (content, index) {
      var direction = null;
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'b3 lh55' },
            buyOpen
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'b4 lh55' },
            sellFlat
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'b3 lh55' },
            buyFla
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'b4 lh55' },
            sellOff
        );
      }
      /*content['114'] = (content['114'] - 0).toFixed(2);*/
      content['133'] = (content['133'] - 0).toFixed(2);

      return React.createElement(
        'div',
        { className: 'folder-row' },
        React.createElement(
          'div',
          { className: 'row content', onClick: this.fold.bind(null, index) },
          React.createElement(
            'div',
            { className: 'col-my-18 text-left' },
            React.createElement(
              'p',
              { className: 'b1 display-table-row' },
              React.createElement(
                'span',
                { className: 'display-table-cell' },
                content['64']
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-3 text-center' },
            direction
          ),
          React.createElement(
            'div',
            { className: 'col-my-16 text-center' },
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              content['114']
            ),
            React.createElement(
              'p',
              { className: 'b1 lh27' },
              content['113']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-11 text-center' },
            React.createElement('img', { src: '../images/arrow-down.png', className: 'pd24t pull-right', alt: '更多', id: 'arrow' + index }),
            React.createElement(
              'p',
              { className: 'b1 lh55' },
              content['116']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row hide cfgHideBox', id: 'hideBox' + index },
            this.props.hides&&this.props.hides.indexOf(dealloan)!=-1?null:React.createElement(
              'div',
              { className: 'col-xs-6' },
              React.createElement(
                'span',
                null,
                  dealloan+'：'
              ),
              React.createElement(
                'span',
                null,
                content['133']
              )
            ),
            this.props.hides&&this.props.hides.indexOf(ynCovered)!=-1?null:React.createElement(
              'div',
              { className: 'col-xs-6' },
              React.createElement(
                'span',
                null,
                  ynCovered+'：'
              ),
              React.createElement(
                'span',
                null,
                content['126']
              )
            ),
            this.props.hides&&this.props.hides.indexOf(contractCode)!=-1?null:React.createElement(
              'div',
              { className: 'col-xs-6' },
              React.createElement(
                'span',
                null,
                  contractCode+'：'
              ),
              React.createElement(
                'span',
                null,
                content['63']
              )
            ),
            this.props.hides&&this.props.hides.indexOf(noteinfo)!=-1?null:React.createElement(
              'div',
              { className: 'col-xs-12' },
                note+'：',
              '备注信息备注信息备注信息备注信息备注信息备注信息备注信息'
            )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

var DealContentsFutures = React.createClass({
  displayName: 'DealContentsFutures',

  render: function () {
    var creatContents = function (content) {
      var direction = null,
          contract = null;
      var price = floatToFixed(content['114'], 2);
      var num = floatToFixed(content['113'],0);
      //开平仓标志117,1平仓，0开仓
      //买卖类别112,1卖出c4，0买入c3
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买开'
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖平'
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买平'
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖开'
        );
      } else if (content['112'] == 0 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            '买平今'
        );
      } else if (content['112'] == 1 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '卖平今'
        );
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }

      return React.createElement(
          'div',
          { className: 'row content' },
          React.createElement(
              'div',
              { className: 'col-my-11 text-left' },
              React.createElement(
                  'p',
                  { className: 'a1 name-row' },
                  React.createElement(
                      'span',
                      { className: 'display-table-cell' },
                      contract
                  )
              ),
              React.createElement(
                  'p',
                  { className: 'd1 time-row' },
                  React.createElement(
                      'span',
                      { className: 'display-table-cell' },
                      content['116']
                  )
              )
          ),
          React.createElement(
              'div',
              { className: 'col-my-13 text-right' },
              direction
          ),
          React.createElement(
              'div',
              { className: 'col-my-11 text-right' },
              React.createElement(
                  'p',
                  { className: 'b1 lh55' },
                  price
              )
          ),
          React.createElement(
              'div',
              { className: 'col-my-13 text-right' },
              React.createElement(
                  'p',
                  { className: 'b1 lh55' },
                  num
              )
          )
      );
    };
    return React.createElement(
        'div',
        null,
        this.props.contents.map(creatContents)
    );
  }
});

var EntrustDetails = React.createClass({
  displayName: 'EntrustDetails',

  render: function () {
    var name = decodeURI(GetQueryString('name'));
    var date = GetQueryString('date');
    var time = GetQueryString('time');
    var code = GetQueryString('code');
    var direction1 = GetQueryString('direction1');
    var direction2 = GetQueryString('direction2');
    var price = GetQueryString('price');
    var number = GetQueryString('number');
    var status = GetQueryString('status');
    var dealPrice = GetQueryString('dealPrice');
    var dealNumber = GetQueryString('dealNumber');
    var cover = GetQueryString('cover');
    var direction = null,
        deal = null,
        coverName = null,
        detail = null,
        strToday = null,
        dateToday = null;
    if (direction1 == 0 && direction2 == 0) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '买入 | 开仓'
      );
    } else if (direction1 == 0 && direction2 == 1) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '买入 | 平仓'
      );
    } else if (direction1 == 1 && direction2 == 0) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '卖出 | 开仓'
      );
    } else if (direction1 == 1 && direction2 == 1) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '卖出 | 平仓'
      );
    }
    if (date !== 'undefined') {
      strToday = date;
    } else {
      dateToday = new Date();
      dateToday = new Date(dateToday.getTime());
      strToday = dateToday.format('yyyy年MM月dd日');
    }
    if (cover == 0) {
      coverName = React.createElement(
        'span',
        null,
        '非备兑'
      );
    } else if (cover == 1) {
      coverName = React.createElement(
        'span',
        null,
        '备兑'
      );
    }
    if (status == 3) {
      deal = React.createElement(
        'span',
        { className: 'c3' },
        '成交'
      );
      detail = React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'b3 lh33' },
          name
        ),
        React.createElement(
          'p',
          null,
          '委托日期：',
          strToday
        ),
        React.createElement(
          'p',
          null,
            entrustTime+'：',
          time
        ),
        React.createElement(
          'p',
          null,
            contractCode+'：',
          code
        ),
        React.createElement(
          'p',
          null,
            operate+'：',
          direction
        ),
        React.createElement(
          'p',
          null,
            entrustpri+'：',
          price
        ),
        React.createElement(
          'p',
          null,
            entrustNum+'：',
          number
        ),
        React.createElement(
          'p',
          null,
          '是否成交：',
          deal
        ),
        React.createElement(
          'p',
          null,
          '成交数量：',
          dealNumber
        ),
        React.createElement(
          'p',
          null,
            ynCovered+'：',
          coverName
        )
      );
    } else {
      deal = React.createElement(
        'span',
        { className: 'c4' },
        '未成交'
      );
      detail = React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'b3 lh33' },
          name
        ),
        React.createElement(
          'p',
          null,
          '委托日期：',
          strToday
        ),
        React.createElement(
          'p',
          null,
            entrustTime+'：',
          time
        ),
        React.createElement(
          'p',
          null,
            contractCode+'：',
          code
        ),
        React.createElement(
          'p',
          null,
            operate+'：',
          direction
        ),
        React.createElement(
          'p',
          null,
            entrustpri+'：',
          price
        ),
        React.createElement(
          'p',
          null,
            entrustNum+'：',
          number
        ),
        React.createElement(
          'p',
          null,
          '是否成交：',
          deal
        )
      );
    }
    return detail;
  }
});

var DealDetails = React.createClass({
  displayName: 'DealDetails',

  render: function () {
    var name = decodeURI(GetQueryString('name'));
    var date = GetQueryString('date');
    var time = GetQueryString('time');
    var code = GetQueryString('code');
    var direction1 = GetQueryString('direction1');
    var direction2 = GetQueryString('direction2');
    var price = GetQueryString('price');
    var number = GetQueryString('number');
    var dealPrice = GetQueryString('dealPrice');
    var cover = GetQueryString('cover');
    var direction = null,
        deal = null,
        coverName = null,
        strToday = null,
        dateToday = null;
    if (direction1 == 0 && direction2 == 0) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '买入 | 开仓'
      );
    } else if (direction1 == 0 && direction2 == 1) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '买入 | 平仓'
      );
    } else if (direction1 == 1 && direction2 == 0) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '卖出 | 开仓'
      );
    } else if (direction1 == 1 && direction2 == 1) {
      direction = React.createElement(
        'span',
        { className: 'c1' },
        '卖出 | 平仓'
      );
    }
    if (cover == 0) {
      coverName = React.createElement(
        'span',
        null,
        '非备兑'
      );
    } else if (cover == 1) {
      coverName = React.createElement(
        'span',
        null,
        '备兑'
      );
    }
    if (date !== 'undefined') {
      strToday = date;
    } else {
      dateToday = new Date();
      dateToday = new Date(dateToday.getTime());
      strToday = dateToday.format('yyyy年MM月dd日');
    }
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        { className: 'b3 lh33' },
        name
      ),
      React.createElement(
        'p',
        null,
        '成交日期：',
        strToday
      ),
      React.createElement(
        'p',
        null,
          dealTime+'：',
        time
      ),
      React.createElement(
        'p',
        null,
          contractCode+'：',
        code
      ),
      React.createElement(
        'p',
        null,
          operate+'：',
        direction
      ),
      React.createElement(
        'p',
        null,
        '成交价格：',
        price
      ),
      React.createElement(
        'p',
        null,
        '成交数量：',
        number
      ),
      React.createElement(
        'p',
        null,
          dealloan+'：',
        dealPrice
      ),
      React.createElement(
        'p',
        null,
          ynCovered+'：',
        coverName
      )
    );
  }
});

var Withdrawals = React.createClass({
  displayName: 'Withdrawals',

  cancelOrder: function (content) {
    this.props.cancelOrder(content);
  },
  hideConfirm: function () {
    $('.my-modal').addClass('hide');
  },
  render: function () {
    var direction = null;
    if (this.props.content['112'] == 0) {
      direction = buy;
    } else if (this.props.content['112'] == 1) {
      direction = sold;
    }
    return React.createElement(
      'div',
      { className: 'my-modal hide' },
      React.createElement('div', { className: 'my-modal-backdrop' }),
      React.createElement(
        'div',
        { className: 'my-modal-dialog' },
        React.createElement(
          'p',
          { className: 'title' },
          '撤  单'
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                stockName+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['64']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
              '股票代码：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['63']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                operate+'：'
            ),
            React.createElement(
              'span',
              null,
              direction
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustTime+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['159']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustpri+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['129']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustNum+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['130']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row btn-bottom' },
          React.createElement('input', { className: 'btn btn-3d0', type: 'button', value: '是', onClick: this.cancelOrder.bind(null, this.props.content) }),
          React.createElement('input', { className: 'btn btn-6d1', type: 'button', value: '否', onClick: this.hideConfirm })
        )
      )
    );
  }
});

var WithdrawalsFutures = React.createClass({
  displayName: 'WithdrawalsFutures',

  cancelOrder: function (content) {
    var X = $('#cancel').offset().top;
    var Y = X + 150;
    $('#indicate').css('top', Y);
    this.props.cancelOrder(content);
  },
  hideConfirm: function () {
    $('.my-modal').addClass('hide');
    /*$('#contents').removeClass('contents-fixed');*/
  },
  render: function () {
    var direction = null;
    if (this.props.content['112'] == 0 && this.props.content['117'] == 0) {
      direction = buyOpen;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 0) {
      direction = sellOff;
    } else if (this.props.content['112'] == 0 && this.props.content['117'] == 1) {
      direction = buyFla;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 1) {
      direction = sellFlat;
    }
    return React.createElement(
      'div',
      { className: 'my-modal hide', id: 'cancel' },
      React.createElement('div', { className: 'my-modal-backdrop' }),
      React.createElement(
        'div',
        { className: 'my-modal-dialog' },
        React.createElement(
          'p',
          { className: 'title' },
          '撤  单'
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
                dealName+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['64']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
              '交易所：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['54']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
                entrustTime+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['159']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
                operate+'：'
            ),
            React.createElement(
              'span',
              null,
              direction
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-my-19' },
            React.createElement(
              'span',
              null,
                entrustpri+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['129']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-20' },
            React.createElement(
              'span',
              null,
                entrustNum+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['130']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row btn-bottom' },
          React.createElement('input', { className: 'btn btn-3d0', type: 'button', value: '是', onClick: this.cancelOrder.bind(null, this.props.content) }),
          React.createElement('input', { className: 'btn btn-6d1', type: 'button', value: '否', onClick: this.hideConfirm })
        )
      )
    );
  }
});

var WithdrawalsOptions = React.createClass({
  displayName: 'WithdrawalsOptions',

  cancelOrder: function (content) {
    var X = $('#cancel').offset().top;
    var Y = X + 150;
    $('#indicate').css('top', Y);
    this.props.cancelOrder(content);
  },
  hideConfirm: function () {
    $('.my-modal').addClass('hide');
  },
  render: function () {
    var direction = null;
    if (this.props.content['112'] == 0 && this.props.content['117'] == 0) {
      direction = buyOpen;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 0) {
      direction = sellOff;
    } else if (this.props.content['112'] == 0 && this.props.content['117'] == 1) {
      direction = buyFla;
    } else if (this.props.content['112'] == 1 && this.props.content['117'] == 1) {
      direction = sellOff;
    }
    return React.createElement(
      'div',
      { className: 'my-modal hide', id: 'cancel' },
      React.createElement('div', { className: 'my-modal-backdrop' }),
      React.createElement(
        'div',
        { className: 'my-modal-dialog' },
        React.createElement(
          'p',
          { className: 'title' },
          '撤  单'
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-12' },
            React.createElement(
              'span',
              null,
                dealName+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['64']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                operate+'：'
            ),
            React.createElement(
              'span',
              null,
              direction
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustTime+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['159']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustpri+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['129'] + '元'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-xs-6' },
            React.createElement(
              'span',
              null,
                entrustNum+'：'
            ),
            React.createElement(
              'span',
              null,
              this.props.content['130']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row btn-bottom' },
          React.createElement('input', { className: 'btn btn-3d0', type: 'button', value: '是', onClick: this.cancelOrder.bind(null, this.props.content) }),
          React.createElement('input', { className: 'btn btn-6d1', type: 'button', value: '否', onClick: this.hideConfirm })
        )
      )
    );
  }
});

var EntrustContents = React.createClass({
  displayName: 'EntrustContents',

  getDefaultProps: function () {
    return {
      history: false
    };
  },
  getInitialState: function () {
    return {
      content: {
        '64': '',
        '63': '',
        '159': '',
        '129': '',
        '112': '',
        '130': '',
        '156': ''
      }
    };
  },
  confirmCancel: function (content) {
    this.setState({ content: content });
    $('#cancel').removeClass('hide');
  },
  cancelOrder: function (content) {
    $('#cancel').addClass('hide');
    var data = {
      '65': content['65'],
      '160': content['160'],
      '52': content['52'],
      '54': content['54'],
      '161': content['161'],
      '162': content['162']
    };
    pbE.WT().wtCancelEntrust(CID, JSON.stringify(data));
  },
  render: function () {
    var creatContents = function (content) {
      var direction = null;
      var status = null;
      var contract = null;
      if (content['112'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c3 lh33' },
            buy
        );
      } else if (content['112'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c4 lh33' },
            sold
        );
      }
      if (content['156'] == 3) {
        status = React.createElement(
          'p',
          { className: 'b3 lh55' },
            hasBecome
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
          '已撤'
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
                hasDeclare
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
              hasDeclare
          );
        }
      } else if (content['156'] == 2) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
                Part
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
              Part
          );
        }
      } else if (content['156'] == 5) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
            withdrawal
        );
      } else if (content['156'] == 'e') {
        status = React.createElement(
          'p',
          { className: 'b1 lh55' },
          '废单'
        );
      } else if (content['156'] == 0) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '申报'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '申报'
          );
        }
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }
      return React.createElement(
        'div',
        { className: 'row content' },
        React.createElement(
          'div',
          { className: 'col-my-1 text-left' },
          React.createElement(
            'p',
            { className: 'c1' },
            contract
          ),
          React.createElement(
            'p',
            { className: 'd2' },
            content['159']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-6 text-right' },
          direction
        ),
        React.createElement(
          'div',
          { className: 'col-my-5 text-center' },
          React.createElement(
            'p',
            { className: 'b1' },
            content['129']
          ),
          React.createElement(
            'p',
            { className: 'e1' },
            content['130']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-6 text-center' },
          status
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this),
      React.createElement(Withdrawals, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

var EntrustContentsOptions = React.createClass({
  displayName: 'EntrustContentsOptions',

  getDefaultProps: function () {
    return {
      history: false
    };
  },
  getInitialState: function () {
    return {
      content: {
        '64': '',
        '54': '',
        '159': '',
        '129': '',
        '112': '',
        '117': '',
        '130': '',
        '156': '',
        '63': ''
      }
    };
  },
  confirmCancel: function (content, e) {
    /*$('#cancel').removeClass('hide');
    this.setState({content: content});
    e.preventDefault();*/
    pbE.WT().wtResetKeepAccOnlineTimer;
    this.setState({ content: content });
    /*$('#contents').addClass('contents-fixed');*/
    if (pbE.SYS().showFutureTradeConfirm()) {
      $('#cancel').removeClass('hide');
    } else {
      var X = $('#cancel').offset().top;
      var Y = X + 150;
      $('#indicate').css('top', Y);
      this.cancelOrder(content); //不需要bind
    }
  },
  cancelOrder: function (content) {
    $('#cancel').addClass('hide');
    var data = {
      '65': content['65'],
      '160': content['160'],
      '52': pbE.WT().wtGetGDZH(content['54']),
      '54': content['54'],
      '162': content['162'],
      '63': content['63'],
      '44': content['44'],
      '161': pbE.WT().wtGetXWH(content['54'])
    };
    var par = { 'Pbkey_Circle_CID': CID };
    pbE.SYS().showCircleView('Pbkey_Trade_WT_Circle', JSON.stringify(par));
    pbE.WT().wtCancelEntrust(CID, JSON.stringify(data));
  },
  fold: function (index) {
    $('#hideBox' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../images/arrow-up.png') $('#arrow' + index).attr('src', '../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../images/arrow-down.png') $('#arrow' + index).attr('src', '../images/arrow-up.png');
  },
  render: function () {
    var creatContents = function (content, index) {
      var direction = null;
      var status = null;
      var contract = null,
          price = null;
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'b3 lh55' },
            buyOpen
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'b4 lh55' },
            sellFlat
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'b3 lh55' },
            buyFla
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'b4 lh55' },
            sellOff
        );
      }
      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }
      if (content['127'] != undefined && content['127'] != 0) {
        price = "市价";
      } else {
        price = content['129'];
      }
      if (content['156'] == 3) {
        status = React.createElement(
          'p',
          { className: 'b3 lh55' },
            hasBecome
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
          '已撤'
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
                hasDeclare
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
              hasDeclare
          );
        }
      } else if (content['156'] == 2) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
                Part
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
              Part
          );
        }
      } else if (content['156'] == 5) {
        status = React.createElement(
          'p',
          { className: 'b4 lh55' },
            withdrawal
        );
      } else if (content['156'] == 'e') {
        status = React.createElement(
          'p',
          { className: 'b1 lh55' },
          '废单'
        );
      } else if (content['156'] == 0) {
        if (!this.props.history) {
          status = React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              '申报'
            ),
            React.createElement(
              'p',
              { className: 'lh27' },
              React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
            )
          );
        } else {
          status = React.createElement(
            'p',
            { className: 'b1 lh55' },
            '申报'
          );
        }
      }
      if (this.props.history) {
        return React.createElement(
          'div',
          { className: 'folder-row' },
          React.createElement(
            'div',
            { className: 'row content', onClick: this.fold.bind(null, index) },
            React.createElement(
              'div',
              { className: 'col-my-1 text-left' },
              React.createElement(
                'p',
                { className: 'c1 display-table-row' },
                React.createElement(
                  'span',
                  { className: 'display-table-cell' },
                  contract
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col-my-16 text-right' },
              React.createElement(
                'p',
                { className: 'e1 lh55' },
                content['160']
              )
            ),
            React.createElement(
              'div',
              { className: 'col-my-14 text-right' },
              direction
            ),
            React.createElement(
              'div',
              { className: 'col-my-18 text-center' },
              React.createElement(
                'p',
                { className: 'b1 lh28' },
                price
              ),
              React.createElement(
                'p',
                { className: 'b1 lh27' },
                React.createElement(
                  'span',
                  { className: 'b3' },
                  content['113']
                ),
                ' | ',
                content['130']
              )
            ),
            React.createElement(
              'div',
              { className: 'col-my-13 text-left' },
              React.createElement('img', { src: '../images/arrow-down.png', className: 'pd24t pull-right', alt: '更多' }),
              status
            )
          ),
          React.createElement(
            'div',
            { className: 'row hide cfgHideBox', id: 'hideBox' + index },
              this.props.hides&&this.props.hides.indexOf(entrustTime)!=-1?null:React.createElement(
                'div',
                { className: 'col-xs-6' },
                React.createElement(
                  'span',
                  null,
                    entrustTime+'：'
                ),
                React.createElement(
                  'span',
                  null,
                  content['159']
                )
              ),
              this.props.hides&&this.props.hides.indexOf(ynCovered)!=-1?null:React.createElement(
                'div',
                { className: 'col-xs-6' },
                React.createElement(
                  'span',
                  null,
                    ynCovered+'：'
                ),
                React.createElement(
                  'span',
                  null,
                  content['126']
                )
              ),
              this.props.hides&&this.props.hides.indexOf(contractCode)!=-1?null:React.createElement(
                'div',
                { className: 'col-xs-6' },
                React.createElement(
                  'span',
                  null,
                    contractCode+'：'
                ),
                React.createElement(
                  'span',
                  null,
                  content['63']
                )
              ),
              this.props.hides&&this.props.hides.indexOf(noteinfo)!=-1?null:React.createElement(
                'div',
                { className: 'col-xs-12' },
                  note+'：',
                '备注信息备注信息备注信息'
              )
          )
        );
      } else {
        return React.createElement(
          'div',
          { className: 'row content' },
          React.createElement(
            'div',
            { className: 'col-my-18 text-left' },
            React.createElement(
              'p',
              { className: 'b1 display-table-row' },
              React.createElement(
                'span',
                { className: 'display-table-cell' },
                contract
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-3 text-right' },
            React.createElement(
              'p',
              { className: 'b1 lh55' },
              content['159']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-14 text-right' },
            direction
          ),
          React.createElement(
            'div',
            { className: 'col-my-4 text-center' },
            React.createElement(
              'p',
              { className: 'b1 lh28' },
              price
            ),
            React.createElement(
              'p',
              { className: 'b1 lh27' },
              React.createElement(
                'span',
                { className: 'b3' },
                content['113']
              ),
              ' | ',
              content['130']
            )
          ),
          React.createElement(
            'div',
            { className: 'col-my-12 text-right' },
            status
          )
        );
      }
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this),
      React.createElement(WithdrawalsOptions, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

var EntrustContentsFutures = React.createClass({
  displayName: 'EntrustContentsFutures',

  fold: function (index) {
    $('#hideB' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../images/arrow-up.png') $('#arrow' + index).attr('src', '../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../images/arrow-down.png') $('#arrow' + index).attr('src', '../images/arrow-up.png');
  },
  getDefaultProps: function () {
    return {
      history: false
    };
  },
  getInitialState: function () {
    return {
      content: {
        '64': '',
        '54': '',
        '159': '',
        '129': '',
        '112': '',
        '117': '',
        '130': '',
        '156': '',
        '63': '',
        '113':'',
        '163':''
      }
    };
  },
  confirmCancel: function (content) {
    pbE.WT().wtResetKeepAccOnlineTimer;
    this.setState({ content: content });
    /*$('#contents').addClass('contents-fixed');*/
    if (pbE.SYS().showFutureTradeConfirm()) {
      $('#cancel').removeClass('hide');
    } else {
      var X = $('#cancel').offset().top;
      var Y = X + 150;
      $('#indicate').css('top', Y);
      this.cancelOrder(content); //不需要bind
    }
  },
  cancelOrder: function (content) {
    /*$('#contents').removeClass('contents-fixed');*/
    $('#cancel').addClass('hide');
    var data = {
      '65': content['65'],
      '160': content['160'],
      '52': pbE.WT().wtGetGDZH(content['54']),
      '54': content['54'],
      '162': content['162'],
      '63': content['63'],
      '44': content['44'],
      '161': pbE.WT().wtGetXWH(content['54'])
    };
    var par = { 'Pbkey_Circle_CID': CID };
    pbE.SYS().showCircleView('Pbkey_Trade_WT_Circle', JSON.stringify(par));
    pbE.WT().wtCancelEntrust(CID, JSON.stringify(data));
  },
  render: function () {
    var creatContents = function (content,index) {
      var direction = null;
      var status = null;
      var contract = null,
          price = null,
          notes = null;
      var buyNum = null,
          sellNum = null,
          information = content['163'];
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyOpen
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellOff
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyFla
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellFlat
        );
      } else if (content['112'] == 0 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b3 lh55' },
            buyFlaDay
        );
      } else if (content['112'] == 1 && content['117'] == 2) {
        direction = React.createElement(
            'p',
            { className: 'b4 lh55' },
            sellFlatDay
        );
      }

      if (content['156'] == 3) {
        status = React.createElement(
            'p',
            { className: 'b3 lh55' },
            hasBecome
        );
      } else if (content['156'] == 4) {
        status = React.createElement(
            'p',
            { className: 'b4 lh55' },
            revoke
        );
      } else if (content['156'] == 1) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  hasDeclare
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              hasDeclare
          );
        }
      }else if (content['156'] == 6) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '待撤'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '待撤'
          );
        }
      } else if (content['156'] == 8) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '待改'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '待改'
          );
        }
      } else if (content['156'] == 'h') {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '挂起'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '挂起'
          );
        }
      } else if (content['156'] == 'p') {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '本地开盘触发'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '本地开盘触发'
          );
        }
      } else if (content['156'] == 2) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '部成'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '部成'
          );
        }
      } else if (content['156'] == 5) {
        status = React.createElement(
            'p',
            { className: 'b4 lh55' },
            withdrawal
        );
      } else if (content['156'] == 0) {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '正报'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '正报'
          );
        }
      }else if (content['156'] == 'e') {
        status = React.createElement(
            'p',
            { className: 'b4 lh55' },
            '废单'
        );
      } else if (content['156'] == 'x') {
        if (!this.props.history) {
          status = React.createElement(
              'div',
              null,
              React.createElement(
                  'p',
                  { className: 'b1 lh28' },
                  '未知'
              ),
              React.createElement(
                  'p',
                  { className: 'lh27' },
                  React.createElement('input', { className: 'btn btn-my-xs bgc-fe0000', type: 'button', value: '撤单', onClick: this.confirmCancel.bind(null, content) })
              )
          );
        } else {
          status = React.createElement(
              'p',
              { className: 'b1 lh55' },
              '未知'
          );
        }
      }

      if (content['name']) {
        contract = content['name'];
      } else if(content['64']){
        contract = content['64'];
      }
      else {
        contract = content['63'];
      }

     /* if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }*/


      if (content['40'] != undefined && content['40'] != '2') {
        price = "市价";
      } else {
        price = floatToFixed(content['129'], 2);
      }
      buyNum = floatToFixed(content['113'], 0);
      sellNum = floatToFixed(content['130'], 0);
      if(content['163']){
        information = content['163'].replace(/(^\s*)|(\s*$)/g, "");
        notes = React.createElement(
            'div',
            { className: 'hide', id:'hideB'+index},
            React.createElement(
                'div',
                {className:'rowcol-xs-12 deal2'},
                note+'：',
                content['163']
            )
        )
      }

      return React.createElement(
          'div',
          { className: 'folder-row' },
          React.createElement(
              'div',
              { className: 'row content' ,onClick:this.fold.bind(null, index)},
              React.createElement(
                  'div',
                  { className: 'col-my-11 text-left' },
                  React.createElement(
                      'p',
                      { className: 'a1 name-row' },
                      React.createElement(
                          'span',
                          { className: 'display-table-cell' },
                          contract
                      )
                  ),
                  React.createElement(
                      'p',
                      { className: 'd2 time-row' },
                      React.createElement(
                          'span',
                          { className: 'display-table-cell' },
                          content['159']
                      )
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-13 text-right' },
                  direction
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-11 text-center' },
                  React.createElement(
                      'p',
                      { className: 'b1 lh28' },
                      price
                  ),
                  React.createElement(
                      'p',
                      { className: 'b1 lh27' },
                      React.createElement(
                          'span',
                          { className: 'b3' },
                          buyNum
                      ),
                      ' | ',
                      sellNum
                  )
              ),
              React.createElement(
                  'div',
                  { className: 'col-my-13 text-right' },
                  content['163'] != ''&&content['163']&&information.length > 0?React.createElement('img', { src: '../images/arrow-down.png', className: 'pd24t pull-right', alt: '更多',id: 'arrow' + index }):'',
                  status
              )
          ),
          content['163'] != ''&&content['163']&&information.length > 0?notes:''
      )

    };
    return React.createElement(
        'div',
        null,
        this.props.contents.map(creatContents, this),
        React.createElement(WithdrawalsFutures, { content: this.state.content, cancelOrder: this.cancelOrder })
    );
  }
});

var PositionTitleFutures = React.createClass({
  displayName: 'PositionTitleFutures',

  render: function () {
    var profit = null;
    if (isNaN(this.props.info['457'])) {
      profit = React.createElement(
        'p',
        { className: 'a1' },
        '--'
      );
    } else {
      if (this.props.info['457'] > 0) {
        profit = React.createElement(
          'p',
          { className: 'a3' },
          this.props.info['457'] + '元'
        );
      } else if (this.props.info['457'] < 0) {
        profit = React.createElement(
          'p',
          { className: 'a4' },
          this.props.info['457'] + '元'
        );
      } else if (this.props.info['457'] == 0) {
        profit = React.createElement(
          'p',
          { className: 'a1' },
          '0' + '元'
        );
      }
    }
    return React.createElement(
      'div',
      { className: 'position-row' },
      React.createElement(
        'div',
        { className: 'col-my-6 text-center pl' },
        React.createElement(
          'p',
          { className: 'c1' },
          '浮动盈亏'
        ),
        profit
      ),
      React.createElement(
        'div',
        { className: 'col-my-7 fund-left' },
        React.createElement(
          'div',
          { className: 'text-left fund-top' },
          React.createElement(
            'p',
            { className: 'e2' },
            '占用保证金'
          ),
          React.createElement(
            'p',
            { className: 'd1' },
            (this.props.info['346'] - 0).toFixed(2) + '元'
          )
        ),
        React.createElement(
          'div',
          { className: 'text-left' },
          React.createElement(
            'p',
            { className: 'e2' },
            '风险度'
          ),
          React.createElement(
            'p',
            { className: 'd1' },
            this.props.info['345']
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'col-my-7 fund-right' },
        React.createElement(
          'div',
          { className: 'text-left fund-top' },
          React.createElement(
            'p',
            { className: 'e2' },
            '总权益'
          ),
          React.createElement(
            'p',
            { className: 'd1' },
            (this.props.info['97'] - 0).toFixed(2) + '元'
          )
        ),
        React.createElement(
          'div',
          { className: 'text-left' },
          React.createElement(
            'p',
            { className: 'e2' },
            '可用资金'
          ),
          React.createElement(
            'p',
            { className: 'd1' },
            (this.props.info['93'] - 0).toFixed(2) + '元'
          )
        )
      )
    );
  }
});

var PositionContentsFutures = React.createClass({
  displayName: 'PositionContentsFutures',

  jump: function (content) {
    pbE.SYS().sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
  },

  render: function () {
    var creatContents = function (content) {
      var pl = null,
          path = null,
          pathStyle = "",
          status = null,
          price = null,
          contract = null;
      var href = 'pobo:uncheck=0&pageId=807003&market=' + content['market'] + '&code=' + content['code'] + '&groupflag=' + content['groupflag'] + '&hideflag=1';
      if (isNaN(content['profit'])) {
        pl = React.createElement(
          'p',
          { className: 'lh35' },
          React.createElement(
            'span',
            { className: 'b2' },
            '浮盈  ',
            React.createElement(
              'span',
              { className: 'a1 profit', id: "profit_"+content['code']+"_"+content['112']+"_"+content['503']},
              content['profit']
            )
          )
        );
      } else {
        if (content['profit'] > 0) {
          pl = React.createElement(
            'p',
            { className: 'lh35' },
            React.createElement(
              'span',
              { className: 'b2' },
              '浮盈  ',
              React.createElement(
                'span',
                { className: 'a3 profit', id: "profit_"+content['code']+"_"+content['112']+"_"+content['503']},
                '+' + content['profit']
              )
            )
          );
          pathStyle = "redbar";
        } else if (content['profit'] < 0) {
          pl = React.createElement(
            'p',
            { className: 'lh35' },
            React.createElement(
              'span',
              { className: 'b2' },
              '浮盈  ',
              React.createElement(
                'span',
                { className: 'a4 profit' , id: "profit_"+content['code']+"_"+content['112']+"_"+content['503']},
                content['profit']
              )
            )
          );
          pathStyle = "greenbar";
        } else if (content['profit'] == 0) {
          pl = React.createElement(
            'p',
            { className: 'lh35' },
            React.createElement(
              'span',
              { className: 'b2' },
              '浮盈  ',
              React.createElement(
                'span',
                { className: 'a1 profit' , id: "profit_"+content['code']+"_"+content['112']+"_"+content['503']},
                content['profit']
              )
            )
          );
        }
      }

      if (content['112'] == '0') {
        if (content['503'] == '1') {
          /*status = (<div className="e3 pull-right buy-sign">多今</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/duojin.png', alt: '多今', width: '21px', height: '42px' })
          );
        } else if (content['503'] == '2') {
          /*status = (<div className="e3 pull-right buy-sign">多昨</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/duozuo.png', alt: '多昨', width: '21px', height: '42px' })
          );
        } else {
          /*status = (<div className="e3 pull-right buy-sign">多仓</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/duocang.png', alt: '多仓', width: '21px', height: '42px' })
          );
        }
      } else if (content['112'] == '1') {
        if (content['503'] == '1') {
          /*status = (<div className="e4 pull-right buy-sign">空今</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/kongjin.png', alt: '空今', width: '21px', height: '42px' })
          );
        } else if (content['503'] == '2') {
          /*status = (<div className="e4 pull-right buy-sign">空昨</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/kongzuo.png', alt: '空昨', width: '21px', height: '42px' })
          );
        } else {
          /*status = (<div className="e4 pull-right buy-sign">空仓</div>);*/
          status = React.createElement(
            'div',
            { className: 'pull-left pd7t pd3zy' },
            React.createElement('img', { src: '../../images/kongcang.png', alt: '空仓', width: '21px', height: '42px' })
          );
        }
      }

      if (isNaN(content['price'])) {
        price = React.createElement(
          'p',
          { className: 'c2' },
          '现价 ',
          React.createElement(
            'span',
            { className: 'c1 price',id: "price_"+content['code']+"_"+content['112']+"_"+content['503'] },
            content['price']
          )
        );
      } else {
        price = React.createElement(
          'p',
          { className: 'c2' },
          '现价 ',
          React.createElement(
            'span',
            { className: 'c1 price',id: "price_"+content['code']+"_"+content['112']+"_"+content['503'] },
            content['price']
          )
        );
      }
      if (content['name']) {
        contract = content['name'];
      } else if(content['64']){
        contract = content['64'];
      }
      else {
        contract = content['63'];
      }

      return React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'nav-blank' }),
        React.createElement(
          'div',
          { className: 'position-row ' + pathStyle, onClick: this.jump.bind(null, content),id: content['code']+"_"+content['112']+"_"+content['503'] },
          React.createElement(
            'div',
            { className: 'details' },
            React.createElement(
              'div',
              { className: 'details-title' },
              React.createElement(
                'p',
                { className: 'a1' },
                contract
              ),
              pl
            ),
            React.createElement(
              'div',
              { className: 'details-content row' },
              status,
              React.createElement(
                'div',
                { className: 'col-my-10 details-top' },
                React.createElement(
                  'p',
                  { className: 'c2' },
                  '开仓均价 ',
                  React.createElement(
                    'span',
                    { className: 'c1' },
                    content['136']
                  )
                ),
                React.createElement(
                  'p',
                  { className: 'c2' },
                  '持仓数量 ',
                  React.createElement(
                    'span',
                    { className: 'c1' },
                    content['135']
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'pull-left col-my-6 details-top' },
                price,
                React.createElement(
                  'p',
                  { className: 'c2' },
                  '可用 ',
                  React.createElement(
                    'span',
                    { className: 'c1' },
                    content['available']
                  )
                )
              )
            )
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

var PositionContentsTrade = React.createClass({
  displayName: 'PositionContentsTrade',

  render: function () {
    var pl = null,
        path = null;
    var creatContents = function (content) {
      if (content['141'] > 0) {
        pl = React.createElement(
          'p',
          { className: 'c3 lh35 pull-right' },
          '+' + content['141']
        );
        path = "../images/redBar.png";
      } else if (content['141'] == 0) {
        pl = React.createElement(
          'p',
          { className: 'c1 lh35 pull-right' },
          content['141']
        );
      } else if (content['141'] < 0) {
        pl = React.createElement(
          'p',
          { className: 'c4 lh35 pull-right' },
          '-' + -(content['141'] - 0)
        );
        path = "../images/greenBar.png";
      }

      var dayToday = new Date();
      dayToday = new Date(dayToday.getTime());
      var strToday = dayToday.format('yyyy-MM-dd');

      return React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'nav-blank' }),
        React.createElement(
          'div',
          { className: 'position-row' },
          React.createElement(
            'div',
            { className: 'imageBar pull-left' },
            React.createElement('img', { src: path, alt: '盈利条' })
          ),
          React.createElement(
            'div',
            { className: 'details' },
            React.createElement(
              'div',
              { className: 'details-title' },
              React.createElement(
                'p',
                { className: 'd1 lh35' },
                content['64']
              ),
              pl
            ),
            React.createElement(
              'div',
              { className: 'details-content' },
              React.createElement(
                'div',
                { className: 'col-my-4 details-top' },
                React.createElement(
                  'p',
                  { className: 'e2' },
                  '现价 ',
                  React.createElement(
                    'span',
                    { className: 'd1' },
                    content['138']
                  )
                ),
                React.createElement(
                  'p',
                  { className: 'e2' },
                  '成本 ',
                  React.createElement(
                    'span',
                    { className: 'd1' },
                    content['139']
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'col-my-4 details-top' },
                React.createElement(
                  'p',
                  { className: 'e2' },
                  '持仓 ',
                  React.createElement(
                    'span',
                    { className: 'd1' },
                    content['135']
                  )
                ),
                React.createElement(
                  'p',
                  { className: 'e2' },
                  '可用 ',
                  React.createElement(
                    'span',
                    { className: 'd1' },
                    content['137']
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'details-date' },
                React.createElement(
                  'p',
                  { className: 'f2 pull-right' },
                  strToday
                )
              )
            )
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var BankAccount = React.createClass({
  displayName: 'BankAccount',

  render: function () {
    return React.createElement(
      'p',
      { className: 'e8 lh24' },
      '（主：',
      this.props.info['51'],
      '） ',
      this.props.info['216'],
      this.props.info['56'],
      '存管账户'
    );
  }
});

var FundsInfo = React.createClass({
  displayName: 'FundsInfo',

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row totalasset' },
        React.createElement('img', { className: 'pull-left', src: '../images/totalasset.png', alt: '总资产' }),
        React.createElement(
          'p',
          { className: 'e1' },
          '总资产：'
        ),
        React.createElement(
          'p',
          { className: 'a8' },
          this.props.info['97'] + this.props.info.unit
        )
      ),
      React.createElement(
        'div',
        { className: 'row funds-detail' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'e2' },
            '总市值'
          ),
          React.createElement(
            'p',
            { className: 'e1' },
            this.props.info['96'] + this.props.info.unit
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'e2' },
            '总盈亏'
          ),
          React.createElement(
            'p',
            { className: 'e1' },
            this.props.info['457'] + this.props.info.unit
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row funds-detail' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'e2' },
            '可取'
          ),
          React.createElement(
            'p',
            { className: 'e1' },
            this.props.info['95'] + this.props.info.unit
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'e2' },
            '可用'
          ),
          React.createElement(
            'p',
            { className: 'e1' },
            this.props.info['93'] + this.props.info.unit
          )
        )
      )
    );
  }
});

var FundsInfoFutures = React.createClass({
  displayName: 'FundsInfoFutures',

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row funds-detail' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'b2' },
            '当前权益'
          ),
          React.createElement(
            'p',
            { className: 'b1' },
            this.props.info['97'] + '元'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'b2' },
            '当日盈亏'
          ),
          React.createElement(
            'p',
            { className: 'b1', id: 'float' },
            this.props.info['sumPl'] + '元'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row funds-detail' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'b2' },
            '已用保证金'
          ),
          React.createElement(
            'p',
            { className: 'b1' },
            this.props.info['152'] + '元'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'b2' },
            '可用保证金'
          ),
          React.createElement(
            'p',
            { className: 'b1' },
            this.props.info['111'] + '元'
          )
        )
      )
    );
  }
});

var OpenTitle = React.createClass({
  displayName: 'OpenTitle',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title funds-title' },
      React.createElement(
        'div',
        { className: 'col-my-16 text-left' },
          stockName
      ),
      React.createElement(
        'div',
        { className: 'col-my-7 text-center' },
        '市价/成本价'
      ),
      React.createElement(
        'div',
        { className: 'col-my-16 text-center' },
          num
      ),
      React.createElement(
        'div',
        { className: 'col-my-7 text-right' },
        '浮动盈亏'
      )
    );
  }
});

var OpenTitleOptions = React.createClass({
  displayName: 'OpenTitleOptions',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title funds-title ' },
      React.createElement(
        'div',
        { className: 'col-my-17 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-3 text-right' },
        '持仓/可用'
      ),
      React.createElement(
        'div',
        { className: 'col-my-10 text-center' },
        '均价/现价'
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-right' },
        '浮动盈亏/到期日'
      )
    );
  }
});

var OpenTitleFutures = React.createClass({
  displayName: 'OpenTitleFutures',

  render: function () {
    return React.createElement(
      'div',
      { className: 'row four-title funds-title' },
      React.createElement(
        'div',
        { className: 'col-my-1 text-left' },
          dealName
      ),
      React.createElement(
        'div',
        { className: 'col-my-6 text-right' },
          direction
      ),
      React.createElement(
        'div',
        { className: 'col-my-4 text-center' },
          num
      ),
      React.createElement(
        'div',
        { className: 'col-my-11 text-center' },
        '持仓价/持仓盈亏'
      )
    );
  }
});

var OpenContents = React.createClass({
  displayName: 'OpenContents',

  render: function () {
    var price = null,
        pl = null;
    var creatContents = function (content) {
      if (content['141'] > 0) {
        price = React.createElement(
          'p',
          { className: 'c3' },
          content['138']
        );
        pl = React.createElement(
          'p',
          { className: 'd3 lh33' },
          content['141']
        );
      } else if (content['141'] == 0) {
        price = React.createElement(
          'p',
          { className: 'c1 bolder' },
          content['138']
        );
        pl = React.createElement(
          'p',
          { className: 'd1 lh33 bolder' },
          content['141']
        );
      } else if (content['141'] < 0) {
        price = React.createElement(
          'p',
          { className: 'c4' },
          content['138']
        );
        pl = React.createElement(
          'p',
          { className: 'd4 lh33' },
          -(content['141'] - 0)
        );
      }

      return React.createElement(
        'div',
        { className: 'row content funds-content' },
        React.createElement(
          'div',
          { className: 'col-my-16 text-left' },
          React.createElement(
            'p',
            { className: 'c1' },
            content['64']
          ),
          React.createElement(
            'p',
            { className: 'd2' },
            content['63']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-7 text-center cost' },
          price,
          React.createElement(
            'p',
            { className: 'c1' },
            content['139']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-16 text-center' },
          React.createElement(
            'p',
            { className: 'd1 lh33' },
            content['135']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-7 text-right' },
          pl
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

//期权委托查询的OpenContent类
var OpenContentsOptions = React.createClass({
  displayName: 'OpenContentsOptions',

  render: function () {
    var pl = null; //浮动盈亏
    var creatContents = function (content) {
      if (content['141'] >= 0) {
        pl = React.createElement(
          'p',
          { className: 'c3' },
          content['141']
        );
      } else if (content['141'] < 0) {
        pl = React.createElement(
          'p',
          { className: 'c4' },
          -(content['141'] - 0)
        );
      } else if (content['141'] == 0) {
        pl = React.createElement(
          'p',
          { className: 'c1 bolder' },
          content['141']
        );
      }
      return React.createElement(
        'div',
        { className: 'row content', id: 'funds-content' },
        React.createElement(
          'div',
          { className: 'col-my-7 text-left' },
          React.createElement('img', { src: '../images/right.png', alt: '权利', className: 'pull-left img-right' }),
          React.createElement(
            'p',
            { className: 'd1 img-right-text' },
            content['64']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-3 text-center' },
          React.createElement(
            'p',
            { className: 'c1' },
            content['135']
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            content['137']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-10 text-left' },
          React.createElement(
            'p',
            { className: 'c1' },
            content['136']
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            content['138']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-9 text-center' },
          pl,
          React.createElement(
            'p',
            { className: 'c1' },
            content['251']
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var OpenContentsFutures = React.createClass({
  displayName: 'OpenContentsFutures',

  render: function () {
    var pl = null,
        direction = null; //浮动盈亏
    var creatContents = function (content) {
      if (content['141'] >= 0) {
        pl = React.createElement(
          'p',
          { className: 'b3' },
          content['141']
        );
      } else if (content['141'] < 0) {
        pl = React.createElement(
          'p',
          { className: 'b4' },
          -(content['141'] - 0)
        );
      } else if (content['141'] == 0) {
        pl = React.createElement(
          'p',
          { className: 'b1 bolder' },
          content['141']
        );
      }
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c3 lh35' },
            buyOpen
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c4 lh35' },
            sellFlat
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
          'p',
          { className: 'c3 lh35' },
            buyFla
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
          'p',
          { className: 'c4 lh35' },
            sellOff
        );
      }
      return React.createElement(
        'div',
        { className: 'row content funds-content' },
        React.createElement(
          'div',
          { className: 'col-my-1 text-left' },
          React.createElement(
            'p',
            { className: 'c1' },
            content['64']
          ),
          React.createElement(
            'p',
            { className: 'd2' },
            content['147']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-6 text-right' },
          direction
        ),
        React.createElement(
          'div',
          { className: 'col-my-4 text-center' },
          React.createElement(
            'p',
            { className: 'b1 lh35' },
            content['135']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-my-11 text-center' },
          React.createElement(
            'p',
            { className: 'b1' },
            content['138']
          ),
          pl
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

// 列表日期title new
var TimeTitle = React.createClass({
  displayName: 'TimeTitle',

  getDefaultProps: function () {
    return {
      entrust: false,
      futures: false
    };
  },
  getInitialState: function () {
    return { flag: 1 };
  },
  changeDate: function (tabFlag) {
    if (tabFlag == this.state.flag) {
      return;
    }
    var contentsDom = document.getElementById('contents');
    $(contentsDom).empty();
    switch (tabFlag) {
      case 1:
        this.state.flag = 1;
        $('.active').removeClass('active');
        $('.tab-1').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.three,
          '172': this.props.times.yesterday
        };
        if (!this.props.entrust && !this.props.futures) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataThree }), contentsDom);
          }
        } else if (this.props.entrust && !this.props.futures) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataThree, history: true }), contentsDom);
          }
        } else if (!this.props.entrust && this.props.futures) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataThree }), contentsDom);
          }
        } else if (this.props.entrust && this.props.futures) {
          if (!dataThree) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataThree, history: true }), contentsDom);
          }
        }
        break;
      case 2:
        this.state.flag = 2;
        $('.active').removeClass('active');
        $('.tab-2').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.week,
          '172': this.props.times.yesterday
        };
        if (!this.props.entrust && !this.props.futures) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataWeek }), contentsDom);
          }
        } else if (this.props.entrust && !this.props.futures) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataWeek, history: true }), contentsDom);
          }
        } else if (!this.props.entrust && this.props.futures) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataWeek }), contentsDom);
          }
        } else if (this.props.entrust && this.props.futures) {
          if (!dataWeek) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataWeek, history: true }), contentsDom);
          }
        }
        break;
      case 3:
        this.state.flag = 3;
        $('.active').removeClass('active');
        $('.tab-3').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.month,
          '172': this.props.times.yesterday
        };
        if (!this.props.entrust && !this.props.futures) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataMonth }), contentsDom);
          }
        } else if (this.props.entrust && !this.props.futures) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataMonth, history: true }), contentsDom);
          }
        } else if (!this.props.entrust && this.props.futures) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataMonth }), contentsDom);
          }
        } else if (this.props.entrust && this.props.futures) {
          if (!dataMonth) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataMonth, history: true }), contentsDom);
          }
        }
        break;
      case 4:
        this.state.flag = 4;
        $('.active').removeClass('active');
        $('.tab-4').addClass('active');
        $('.two-date').removeClass('hide');
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        if (!this.props.entrust && !this.props.futures) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataRandom }), contentsDom);
          }
        } else if (this.props.entrust && !this.props.futures) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataRandom, history: true }), contentsDom);
          }
        } else if (!this.props.entrust && this.props.futures) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(DealContentsFutures, { contents: dataRandom }), contentsDom);
          }
        } else if (this.props.entrust && this.props.futures) {
          if (!dataRandom) {
            pbE.WT().wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
          } else {
            ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataRandom, history: true }), contentsDom);
          }
        }
        break;
      default:
        break;
    }
  },
  render: function () {
    return React.createElement(
        'ul',
        { className: 'nav nav-tabs date-tabs' },
        React.createElement(
            'li',
            { role: 'presentation', className: 'tab-1 active' },
            React.createElement(
                'a',
                { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 1) },
                '3 天'
            )
        ),
        React.createElement(
            'li',
            { role: 'presentation', className: 'tab-2' },
            React.createElement(
                'a',
                { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 2) },
                '1 周'
            )
        ),
        React.createElement(
            'li',
            { role: 'presentation', className: 'tab-3' },
            React.createElement(
                'a',
                { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 3) },
                '1 月'
            )
        ),
        React.createElement(
            'li',
            { role: 'presentation', className: 'tab-4' },
            React.createElement(
                'a',
                { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 4) },
                React.createElement('img', { src: '../images/calendar.png', alt: '日历' })
            )
        )
    );
  }
});

var DetlContents = React.createClass({
  displayName: 'DetlContents',

  render: function () {
    var creatContents = function (content) {
      var image = null;
      var amount = null;
      if (content['206'] == 1) {
        image = React.createElement('img', { src: '../images/up.png', alt: '' });
        amount = React.createElement(
          'p',
          { className: 'c3' },
          content['209']
        );
      } else if (content['206'] == 2) {
        image = React.createElement('img', { src: '../images/down.png', alt: '' });
        amount = React.createElement(
          'p',
          { className: 'c4' },
          content['209']
        );
      }
      return React.createElement(
        'div',
        { className: 'row timeline' },
        React.createElement(
          'div',
          { className: 'subtimeline' },
          image,
          React.createElement(
            'p',
            { className: 'c1' },
            content['207']
          ),
          React.createElement(
            'p',
            { className: 'c2' },
            content['201']
          ),
          amount
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var DetlTimeTitle = React.createClass({
  displayName: 'DetlTimeTitle',

  getInitialState: function () {
    return { flag: 1 };
  },
  changeDate: function (tabFlag) {
    if (tabFlag == this.state.flag) {
      return;
    }
    var contentsDom = document.getElementById('contents');
    $(contentsDom).empty();
    switch (tabFlag) {
      case 1:
        this.state.flag = 1;
        $('.active').removeClass('active');
        $('.tab-1').addClass('active');
        $('.two-date').addClass('hide');
        dataTime = {
          '171': this.props.times.today,
          '172': this.props.times.today
        };
        if (!dataToday) {
          pbE.WT().wtGeneralRequest(CID, 6093, JSON.stringify(dataTime));
        } else {
          ReactDOM.render(React.createElement(DetlContents, { contents: dataToday }), contentsDom);
        }
        break;
      case 2:
        this.state.flag = 2;
        $('.active').removeClass('active');
        $('.tab-2').addClass('active');
        $('.two-date').removeClass('hide');
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        if (!dataHistory) {
          pbE.WT().wtGeneralRequest(CID, 6093, JSON.stringify(dataTime));
        } else {
          ReactDOM.render(React.createElement(DetlContents, { contents: dataHistory }), contentsDom);
        }
        break;
      default:
        break;
    }
  },
  render: function () {
    return React.createElement(
      'ul',
      { className: 'nav nav-tabs detail-tabs' },
      React.createElement(
        'li',
        { role: 'presentation', className: 'tab-1 active' },
        React.createElement(
          'a',
          { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 1) },
          '今日明细',
          React.createElement(
            'span',
            { className: 'border-right' },
            ' '
          )
        )
      ),
      React.createElement(
        'li',
        { role: 'presentation', className: 'tab-2' },
        React.createElement(
          'a',
          { href: 'javascript:void(0);', onClick: this.changeDate.bind(null, 2) },
          '历史明细'
        )
      )
    );
  }
});

var MyFunds = React.createClass({
  displayName: 'MyFunds',

  render: function () {
    var creatContents = function (content) {
      var code = getCode(content['56']);
      return React.createElement(
        'div',
        { className: 'row content multilines' },
        React.createElement(
          'div',
          { className: 'col-xs-3 currency' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              { className: 'currency-sign' },
              code
            )
          ),
          React.createElement(
            'p',
            null,
            content['57']
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-6 pull-right' },
          React.createElement(
            'p',
            null,
            '可用资金'
          ),
          React.createElement(
            'p',
            { className: 'a3' },
            content['93']
          ),
          React.createElement(
            'p',
            null,
            '可取资金  ',
            React.createElement(
              'span',
              { className: 'd3' },
              content['95']
            )
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var RecContents = React.createClass({
  displayName: 'RecContents',

  render: function () {
    var creatContents = function (content) {
      var code = getCode(content['56']);
      var unit = getUnit(content['56']);
      var status = null;
      if (content['210'] == 2) {
        status = React.createElement(
          'span',
          { className: 'd3' },
          '成功'
        );
      } else if (content['210'] == 5) {
        status = React.createElement(
          'span',
          { className: 'd4' },
          '失败'
        );
      } else if (content['210'] == 1) {
        status = React.createElement(
          'span',
          { className: 'bolder' },
            hasDeclare
        );
      }
      return React.createElement(
        'div',
        { className: 'row content multilines' },
        React.createElement(
          'div',
          { className: 'col-xs-7' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              content['57'],
              '：'
            ),
            React.createElement(
              'span',
              null,
              content['220'] + unit
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              '时间：'
            ),
            React.createElement(
              'span',
              null,
              content['228']
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              '类型：'
            ),
            React.createElement(
              'span',
              null,
              content['207']
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
                anarchy+'：'
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              '流水号：'
            ),
            React.createElement(
              'span',
              null,
              content['221']
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              '银行：'
            ),
            React.createElement(
              'span',
              null,
              content['216']
            )
          )
        )
      );
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

// 转账记录
var RecContentsFutures = React.createClass({
  displayName: 'RecContentsFutures',

  render: function () {
    var creatContents = function (content) {

            var code = getCurrency(content['56']);
            var unit = getUnit(content['56']);
            var money = null,
                information = content['226'],
                styles,
                styles7,
                styles6,
                displeyWT = {display: 'inline-block', width: '29%', textAlign: 'right'},
                margin = {marginLeft: '10'},
                marginLine = {marginLeft: '10', lineHeight: '20px'};
            if(content['211'].length <= 7){
                styles = displeyWT;
            }else if(content['211'].length > 7 && content['211'].length < 22){
                styles = margin;
            }else if(content['211'].length > 22){
                styles = marginLine;
            }
            if(content['207'].length <= 7){
                styles7 = displeyWT
            }else if(content['207'].length > 7 && content['207'].length <= 22){
                styles7 = margin
            }else if(content['207'].length > 22 ){
                styles7 = marginLine;
            }
            if(content['226'] && content['226'].length <= 7){
                styles6 = displeyWT
            }else if(content['226'] && content['226'].length > 7 && content['226'].length <= 22){
                styles6 = margin
            }else if(content['226'] && content['226'].length > 22 ){
                styles6 = marginLine;
            }
            if (content['226']) {
                information = information.replace(/(^\s*)|(\s*$)/g, "");
            }
            if (!content['224'] && content['220']) {
                money = React.createElement(
                    'p',
                    null,
                    code + '：',
                    React.createElement('span', {className: 'right'}, content['220'] + unit)
                );
            } else if (content['224']) {
                money = React.createElement(
                    'p',
                    null,
                    code + '：',
                    React.createElement('span', {className: 'right'}, content['224'] + unit)
                );
            }
        var notes = React.createElement(
            'div',
            {className: 'row'},
            React.createElement(
                'div',
                {className: 'col-xs-12'},
                React.createElement('span', {style: {marginRight: '13px;'}}, '备'),
                React.createElement('span', null, '注：'),
                React.createElement(
                    'span',
                    {style:styles6},
                    content['226']
                )
            )
        );
            return React.createElement(
                'li',
                {className: 'transfer-item', style: {height:'auto'}},
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        money
                    ),
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '银'),
                            React.createElement('span', null, '行：'),
                            React.createElement('span', {className: 'right'}, content['216'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '时'),
                            React.createElement('span', null, '间：'),
                            React.createElement('span', {className: 'right'}, content['228'])
                        )
                    ),
                    React.createElement(
                        'div',
                        {className: 'col-xs-6'},
                        React.createElement(
                            'p',
                            null,
                            '流水号：',
                            React.createElement('span', {className: 'right'}, content['200'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'div',
                        {className: 'col-xs-12'},
                        React.createElement(
                            'p',
                            null,
                            React.createElement('span', {style: {marginRight: '13px;'}}, '类'),
                            React.createElement('span', null, '型：'),
                            React.createElement('span', {style:styles7}, content['207'])
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {className: 'row'},
                    React.createElement(
                        'p',
                        {className: 'col-xs-12'},
                        React.createElement('span', {style: {marginRight: '13px;'}}, '状'),
                        React.createElement('span', null, '态：'),
                        React.createElement(
                            'span',
                            {style: styles},
                            content['211']
                        )
                    )
                ),
                content['226'] && content['226'] != '' && information.length > 0 ? notes : ''
            );
        };
        return React.createElement(
            'ul',
            {className: 'nav nav-pills nav-stacked d1'},
            this.props.contents.map(creatContents)
        );
    }
});

var RecContentsOptions = React.createClass({
  displayName: 'RecContentsOptions',

  render: function () {
    var creatContents = function (content) {
      var code = getCode(content['56']);
      var unit = getUnit(content['56']);
      var status = null,
          type = null;
      if (content['210'] == 2) {
        status = React.createElement(
          'span',
          { className: 'c3' },
          '成功'
        );
      } else if (content['210'] == 5) {
        status = React.createElement(
          'span',
          { className: 'c4' },
          '失败'
        );
      } else if (content['210'] == 1) {
        status = React.createElement(
          'span',
          { className: 'bolder c1' },
            hasDeclare
        );
      }
      if (content['206'] == 1) {
        type = React.createElement(
          'span',
          null,
          '银行转期权'
        );
      } else if (content['206'] == 2) {
        type = React.createElement(
          'span',
          null,
          '期权转银行'
        );
      }
      if (content['200']) {
        return React.createElement(
          'li',
          { className: 'transfer-item' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                code + '：' + content['220'] + unit
              )
            ),
            React.createElement(
              'div',
              { className: 'col-xs-5' },
              React.createElement(
                'p',
                null,
                  anarchy+'：',
                status
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                '时间：',
                content['228'].slice(0, 2) + '：' + content['228'].slice(2, 4) + '：' + content['228'].slice(4, 6)
              )
            ),
            React.createElement(
              'div',
              { className: 'col-xs-5' },
              React.createElement(
                'p',
                null,
                '流水号：',
                content['200']
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                '类型：',
                type
              )
            ),
            React.createElement(
              'div',
              { className: 'col-xs-5' },
              React.createElement(
                'p',
                null,
                '银行：',
                content['216']
              )
            )
          )
        );
      } else if (content['200'] == null) {
        return React.createElement(
          'li',
          { className: 'transfer-item' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                code + '：' + content['220'] + unit
              )
            ),
            React.createElement(
              'div',
              { className: 'col-xs-5' },
              React.createElement(
                'p',
                null,
                  anarchy+'：',
                React.createElement(
                  'span',
                  { className: 'c4' },
                  '失败'
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                '时间：',
                content['228'].slice(0, 2) + '：' + content['228'].slice(2, 4) + '：' + content['228'].slice(4, 6)
              )
            ),
            React.createElement(
              'div',
              { className: 'col-xs-5' },
              React.createElement(
                'p',
                null,
                '银行：',
                content['216']
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-xs-7' },
              React.createElement(
                'p',
                null,
                '类型：查询银行余额'
              )
            )
          )
        );
      }
    };
    return React.createElement(
      'div',
      null,
      this.props.contents.map(creatContents)
    );
  }
});

var InfoList = React.createClass({
  displayName: 'InfoList',

  getDefaultProps: function () {
    return {
      dir: ''
    };
  },
  render: function () {
    var creatContents = function (content) {
      var href = this.props.dir + 'info/view/info-de.html?newsId=' + content.ID;
      var time = content.Pubtime.split(' ');
      return React.createElement(
          'a',
          { className: 'list-group-item clearfix', href: href },
          React.createElement('span', { className: 'title', dangerouslySetInnerHTML: { __html: content.Title } }),
          React.createElement(
              'span',
              { className: 'time' },
              time[0]
          )
      );
    };
    return React.createElement(
        'div',
        { className: 'list-group' },
        this.props.contents.map(creatContents, this)
    );
  }
});

var TradeAccount = React.createClass({
  displayName: 'TradeAccount',

  render: function () {
    return React.createElement(
      'p',
      { className: 'e8 lh24' },
      '（证券账户 *********** **）'
    );
  }
});

/*var CustButtonO = React.createClass({              
  change: function(index, image2) {
    $('#icon' + index).removeAttr('style');
    $('#icon' + index).css({'backgroundImage': 'url(images/' + image2 + ')', 'backgroundSize': '42px 42px'});
  },
  deChange: function(index, image1) {
    $('#icon' + index).css({'backgroundImage': 'url(images/' + image1 + ')', 'backgroundSize': '42px 42px'});
  },
  render: function() {
    var path = {backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px'};
    var creatContents = function(content, index) {
      var style = {backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px'};
      return (<div><a className="btn btn-default" style={style} onMouseDown={this.change.bind(null, index, content['image2'])} onMouseUp={this.deChange.bind(null, index, content['image1'])} id={'icon' + index} href={content['url']}><p>{content['title']}</p></a></div>);
    };
    return (<div className="area"><div className="btn-wrap"><div className="btn-group clearfix">{this.props.button.map(creatContents, this)}<div><a className="btn btn-default" style={path} href="pobo:pageId=900002"><p>添加</p></a></div></div></div></div>);
  }
});*/

var CustButtonO = React.createClass({
  displayName: 'CustButtonO',

  render: function () {
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          this.props.button.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});

var CustButtonT = React.createClass({
  displayName: 'CustButtonT',

  render: function () {
    var item = this.props.button;
    var item1 = item.slice(0, 4);
    var item2 = item.slice(4);
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item1.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item2.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});

var CustButtonTh = React.createClass({
  displayName: 'CustButtonTh',

  render: function () {
    var item = this.props.button;
    var item1 = item.slice(0, 4);
    var item2 = item.slice(4, 8);
    var item3 = item.slice(8);
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item1.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item2.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item3.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});

var CustButtonF = React.createClass({
  displayName: 'CustButtonF',

  render: function () {
    var item = this.props.button;
    var item1 = item.slice(0, 4);
    var item2 = item.slice(4, 8);
    var item3 = item.slice(8, 12);
    var item4 = item.slice(12);
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item1.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item2.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item3.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item4.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});

var CustButtonFi = React.createClass({
  displayName: 'CustButtonFi',

  render: function () {
    var item = this.props.button;
    var item1 = item.slice(0, 4);
    var item2 = item.slice(4, 8);
    var item3 = item.slice(8, 12);
    var item4 = item.slice(12, 16);
    var item5 = item.slice(16);
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item1.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item2.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item3.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item4.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item5.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});

var CustButtonS = React.createClass({
  displayName: 'CustButtonS',

  render: function () {
    var item = this.props.button;
    var item1 = item.slice(0, 4);
    var item2 = item.slice(4, 8);
    var item3 = item.slice(8, 12);
    var item4 = item.slice(12, 16);
    var item5 = item.slice(16, 20);
    var item6 = item.slice(20);
    var path = { backgroundImage: 'url(images/gengduo.png)', backgroundSize: '42px 42px' };
    var creatContents = function (content) {
      var style = { backgroundImage: 'url(images/' + content['image1'] + ')', backgroundSize: '42px 42px' };
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { className: 'btn btn-default', style: style, href: content['url'], id: content['id'] },
          React.createElement(
            'p',
            null,
            content['title']
          )
        )
      );
    };
    return React.createElement(
      'div',
      { className: 'area' },
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item1.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item2.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item3.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item4.map(creatContents)
        )
      ),
      React.createElement(
        'div',
        { className: 'btn-wrap' },
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item5.map(creatContents)
        ),
        React.createElement(
          'div',
          { className: 'btn-group clearfix' },
          item6.map(creatContents),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { className: 'btn btn-default', style: path, href: 'pobo:uncheck=0&index-add.html?pageId=900005' },
              React.createElement(
                'p',
                null,
                '添加'
              )
            )
          )
        )
      )
    );
  }
});
//--------------------页面组件---end-------------------//
