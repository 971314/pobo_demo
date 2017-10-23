var isApp = typeof pbE != 'undefined';
if( typeof pbE == 'undefined'){
  window.pbE = {
    WT:function () {
     var obj = {
       wtGetCurrentConnectionCID:function () {
         
       },wtQueryStockRe:function () {

       },
       wtGetHQInfo:function () {

       },
       wtSynFlash:function () {

       },
       wtQueryMoney:function() {
         var data = {
           moduleId: 90002,
           functionNO: 6012,
           jData: {
             data: [
               {
                 '56': 0,
                 '97': 99999999,
                 // '96': 999999,
                 '111': 98797987,
                 '152': 3453543,
                 '345': '32',
                 '182':1499,
                 '102':123
               }
             ],
             '223':5
           }
         };
         callback(JSON.stringify(data));
       },
       wtGetMSSL:function () {
         
       },
       wtLoginRe:function () {
         return '{"data":[{"51":123,"74":"刘"}]}';
       }
     }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {

        },
        startLoading:function () {
          
        }
      }
      return obj1;
    },
    HQ:function () {
      var obj2 = {
        hqGetPriceRate:function () {
          
        },
        hqGetLastBasePrice:function () {
          
        },
        hqSubscribe:function () {

        }
      }
      return obj2;
    }
  }
  $('#total-PL').removeClass();
  $('#total-PL').addClass('c3');
  $('#total-PL').html('+' + 888888 + '元');
}
// if(!pbE.WT()){
//
// }
//订阅行情数据市场合约代码
var symbolData = {};
//市场合约代码集合，存储需要订阅的市场合约代码
var marketData = [];
//订阅字段
/*var column = [{'6': '29'}, {'6': '24'}];*/
//持仓信息(存储合约代码相关属性：合约代码，成本价，持仓数，放大倍数，每手数量，买卖方向，浮动盈亏)
var stockInfo = [];
//合约代码去重使用
var unique = [];
//货币单位
var unit;
//市场信息
var marketInfo, totalPL = 0, refreshFlag = 1;
var CID = pbE.WT().wtGetCurrentConnectionCID();
//平仓浮动盈亏
var closePl;

function fresh() {
  close = 0, plFlag = 0;
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  tradePart(CID);
}

function refresh() {
  close = 0, plFlag = 0;
  pbE.SYS().startLoading();
  refreshFlag = 0;
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  pbE.WT().wtSynFlash(CID);
}

function tradePart(CID) {
  var CONTENTS1 = pbE.WT().wtQueryStockRe(CID);
  if (CONTENTS1) {
    var data = JSON.parse(CONTENTS1).data;
    if (data.length > 0) {
      symbolData = {}, marketData = [], unique = [];
      stockInfo = [];
      marketInfo = [];
      for (var i = 0; i < data.length; i++) {
        var market = data[i]['54'],
            code = data[i]['63'];
        var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
        marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
        if (code.indexOf('&') >= 0) symbol = 1;
        if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(data[i]['136'])) || symbol) {
          continue;
        }
        var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
            handNum =  pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
            base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket); //获取基准价
        //合约代码
        obj['1'] = marketInfo.HQCode;
        //买入均价
        obj['2'] = data[i]['136'] - 0;
        //当前数量
        obj['3'] = data[i]['135'] - 0;
        //放大倍数
        obj['4'] = rate;
        //每手数量
        obj['5'] = handNum;
        //买卖方向
        obj['6'] = data[i]['112'];
        //基准价
        obj['8'] = base;
        obj['9'] = marketInfo.HQMarket;
        obj['10'] = data[i]['503'];
        obj['11'] = data[i]['1101'];
        obj['12'] = data[i]['1102'];
        //存入持仓信息
        stockInfo.push(obj);
        //去重数组不包含当前合约代码
        if (unique.indexOf(marketInfo.HQCode) < 0) {
          //存入去重数组
          unique.push(marketInfo.HQCode);
          //存入市场合约代码集合
          marketData.push({
            '2': marketInfo.HQMarket,
            '3': marketInfo.HQCode
          });
        }
      }

      symbolData['1'] = marketData;
      /*symbolData['5'] = column;*/
      symbolData['7'] = '1';
      pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
    } else if (data.length <= 0) {
      pbE.SYS().stopLoading();
        stockInfo = [];
        plFlag = 1;
        totalPL = 0;
        if (close) {
          var profit = closePl - 0;
          if (profit > 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c3');
          $('#total-PL').html('+' + profit + '元');
        } else if (profit < 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c4');
          $('#total-PL').html(profit + '元');
        } else {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c1 bolder');
          $('#total-PL').html('0' + '元');
        }  
      }
    }
  }
}

function hqPart(msg) {
  var data = msg.jData.Data;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    for (var j = 0, ll = data.length; j < ll; j++) {
      if (stockInfo[i]['1'] == data[j]['10']) {
        if (data[j]['29'] && !isNaN(data[j]['29'])) {
          stockInfo[i]['price'] = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价 
          stockInfo[i]['8'] = pbE.HQ().hqGetLastBasePrice(stockInfo[i]['1'], stockInfo[i]['9']);
          //计算当日盈亏
          if (stockInfo[i]['10'] == '1') {  //今仓，现价-开仓均价
            if (stockInfo[i]['price'] && !isNaN(stockInfo[i]['price'])) {
              stockInfo[i]['dayPl'] = ((stockInfo[i]['price'] - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
              if (stockInfo[i]['6'] == '1') {
                stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
              }
            }
          } else if (stockInfo[i]['10'] == '2') { //昨仓，现价-基准价
            if (stockInfo[i]['price'] && !isNaN(stockInfo[i]['price']) && stockInfo[i]['8'] && !isNaN(stockInfo[i]['8'])) {
              stockInfo[i]['dayPl'] = ((stockInfo[i]['price'] - stockInfo[i]['8'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
              if (stockInfo[i]['6'] == '1') {
                stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
              }
            }
          } else if (stockInfo[i]['10'] == '0') {  //不分今昨仓，拆仓，1101字段代表今仓数量
            if (stockInfo[i]['11'] == stockInfo[i]['3']) {  //没有昨仓,现价-今仓开仓成本
              if (stockInfo[i]['price'] && !isNaN(stockInfo[i]['price'])) {
                stockInfo[i]['dayPl'] = ((stockInfo[i]['price'] - stockInfo[i]['12'] - 0).toFixed(4) - 0) * stockInfo[i]['11'] * stockInfo[i]['5'];
                if (stockInfo[i]['6'] == '1') {
                  stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
                }
              }
            } else if (stockInfo[i]['11'] < stockInfo[i]['3']) {
              if (stockInfo[i]['price'] && !isNaN(stockInfo[i]['price']) && stockInfo[i]['8'] && !isNaN(stockInfo[i]['8'])) {
                stockInfo[i]['dayPl'] = ((stockInfo[i]['price'] - stockInfo[i]['12'] - 0).toFixed(4) - 0) * stockInfo[i]['11'] * stockInfo[i]['5'] + ((stockInfo[i]['price'] - stockInfo[i]['8'] - 0).toFixed(4) - 0) * (stockInfo[i]['3'] - stockInfo[i]['11'] - 0) * stockInfo[i]['5'];
                if (stockInfo[i]['6'] == '1') {
                  stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
                }
              }
            }
          }
        } else {
          stockInfo[i]['dayPl'] = 0;
        }
        stockInfo[i]['7'] = stockInfo[i]['dayPl'];
        break;
      }
    }
  }

  var complete = false;
  totalPL = 0, sumPl = 0;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    if (typeof stockInfo[i]['7'] == 'undefined' || isNaN(stockInfo[i]['7'])) {
      complete = false;
      break;
    } else {
      totalPL = totalPL + (stockInfo[i]['7'] - 0);
      complete = true;
    }
  }

  if (complete) {
    plFlag = 1;
    if (close) {
      sumPl = ((totalPL-0) + (closePl-0)).toFixed(2);
      if (sumPl > 0) {
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c3');
        $('#total-PL').html('+' + sumPl + '元');
      } else if (sumPl < 0) {
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c4');
        $('#total-PL').html(sumPl + '元');
      } else {
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c1 bolder');
        $('#total-PL').html('0' + '元');
      }
    }
  }
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90002) {
    if (msg.functionNO == 6012) {
      pbE.SYS().stopLoading();
      var data = msg.jData.data[0];
      close = 1;
      closePl = data['102'] - 0;
      if (plFlag) {
        sumPl = ((totalPL-0) + (closePl-0)).toFixed(2);
        if (sumPl > 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c3');
          $('#total-PL').html('+' + sumPl + '元');
        } else if (sumPl < 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c4');
          $('#total-PL').html(sumPl + '元');
        } else {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c1 bolder');
          $('#total-PL').html('0' + '元');
        }
      }
      unit = getUnit(data['56']);
      data['97'] = pbUtils.doubleToStr(data['97']);
      data['152'] = pbUtils.doubleToStr(data['152']);
      data['111'] = pbUtils.doubleToStr(data['111']);
      $('#total-asset').html(data['97'] + unit);
      $('#guarantee').html(data['152'] + unit);
      if((data['345'] + '').indexOf('%') >= 0){
        $('#risk').html(data['345']);
      }else{
        $('#risk').html(pbUtils.doubleToPecent(data['345']));
      }
      $('#available').html(data['111'] + unit);
    } else if (msg.functionNO == 56004 && msg.reservId == CID) {
      if (msg.jData['223'] == 5) {
        if (!refreshFlag) {
          pbE.SYS().stopLoading();
          refreshFlag = 1;
        }
        fresh();
      } 
    } else if (msg.functionNO == 56005 && msg.reservId == CID) {
      fresh();
    } else if (msg.functionNO == 56006 && msg.reservId == CID) {
      fresh();
    } else if (msg.functionNO == 56014 && msg.reservId == CID) {
      fresh();
    }
  } else if (msg.moduleId == 90000) {
    totalPL = 0;
    hqPart(msg);
  }
}

function reload() {
  close = 0, plFlag = 0;
  pbE.SYS().startLoading();
  CID = pbE.WT().wtGetCurrentConnectionCID();
  loginInfo = JSON.parse(pbE.WT().wtLoginRe(CID));
  /*$('#accnum').html(loginInfo.data[0]['51'].substr(0, 3) + '*****' + loginInfo.data[0]['51'].substr(-3));*/
  $('#accnum').html(loginInfo.data[0]['51']);
    if (reg.test(loginInfo.data[0]['74'].substr(0, 1))) {
        $('#name').addClass('hide');
    } else {
        $('#name').removeClass('hide');
        $('#name').html(loginInfo.data[0]['74'].substr(0, 1) + '先生/女士');
    }
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  tradePart(CID);
}

function doShow(flag) {
  if (!flag) pbE.SYS().stopLoading();
}

var close = 0, plFlag = 0, sumPl = 0;
pbE.SYS().startLoading();
var loginInfo = JSON.parse(pbE.WT().wtLoginRe(CID));
$('#accnum').html(loginInfo.data[0]['51']);
var reg = new RegExp("^[A-Za-z]+$");
if (reg.test(loginInfo.data[0]['74'].substr(0, 1))) {
    $('#name').addClass('hide');
} else {
    $('#name').removeClass('hide');
    $('#name').html(loginInfo.data[0]['74'].substr(0, 1) + '先生/女士');
}
pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
if(isApp){
  process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
}else{
  $.get('conf/future.json',process);
}
tradePart(CID);


function process(data) {
  var dat = data.index;
  var e = "",r = "",v = 0;

  dat.stacked.forEach(function (d) {
    if(d.url == undefined){
      if(d.menu == undefined){
        e += "<li>" +
            "<a>"+d.name+"</a>" +
            "</li>";
      }else{
        e +="<li><a>"+d.name+"<img class='more' src='images/more.png' alt='详细'></a>" +
            "</li>"+
            "<ul class='hide'>";
        for(var i= 0;i < d.menu.length;i++){
          if(d.menu[i].tip == undefined){
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"</a></li>"
          }else{
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"<span class='tip'>"+d.menu[i].tip+"</span></a></li>"
          }
        }
        e += "</ul>";
      }
    }else{
      if(d.menu == undefined){
        e += "<li>" +
            "<a href='"+d.url+"' id='tip'>"+d.name+"</a>" +
            "</li>";
      }else{
        e +="<li><a>"+d.name+"<img class='more' src='images/more.png' alt='详细'></a>" +
            "</li>"+
            "<ul class='hide'>";
        for(var i= 0;i < d.menu.length;i++){
          if(d.menu[i].tip == undefined){
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"</a></li>"
          }else{
            e +="<li><div><a href='"+d.menu[i].url+"'  id='tip'>"+d.menu[i].name+"</a><span class='tip'>"+d.menu[i].tip+"</span></div></li>"
          }
        }
        e += "</ul>";
      }
    }

  });
  $('.nav-stacked').html(e);
  $('.nav-stacked>li').each(function (i,e) {
    $(e).on('click',function () {
      $(this).next('ul').toggleClass('hide');
      if(!$(this).next('ul').is('.hide')){
        $(this).find('img').attr('src','images/arrow-down.png').css({
          "width":"auto",
          "height":"auto"
        })
      }else{
        $(this).find('img').attr('src','images/more.png').css({
          "width":"7px",
          "height":"16px"
        })
      }
    })
  });
}
