if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {

                },
                wtQueryMoney: function () {

                },
                wtQueryMoneyRe: function () {
                    var data = {
                        moduleId: 90002,
                        functionNO: 6012,
                        jData: {
                            data: [
                                {
                                    '102': 10,
                                    '182': 20,
                                    '97': 30,
                                    '152': 111,
                                    '111': 10,
                                    '63': 'GTF'
                                }
                            ]
                        }
                    };
                    callback(JSON.stringify(data));
                    $("#float").html(1026 + '元')
                },
                wtQueryStockRe: function () {

                }
            };
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {

                }
            };
            return obj1;
        }
    }
}

//订阅行情数据市场合约代码 var symbolData = {};
//市场合约代码集合，存储需要订阅的市场合约代码 var marketData = [];
//订阅字段
//var column = [{'6': '29'}, {'6': '24'}]; var column = [{'6': '29'}];
//持仓信息(存储合约代码相关属性：合约代码，成本价，持仓数，放大倍数，每手数量，买卖方向，浮动盈亏) var stockInfo = [];
//合约代码去重使用 var unique = [],
//浮动盈亏 totalPL,
//持仓的其他信息 position, marketInfo, asset;
var marketInfo,
    totalPL,
    position,
/*column = [{'6': '29'}, {'6': '24'}],*/stockInfo = [],
    p = 0,
    asset,
    refreshFlag = 1;
var CID = pbE.WT().wtGetCurrentConnectionCID();
//平仓浮动盈亏
var closePl, sumPl;


//开仓均价保留到价格精度加上一位
function decimalDec(decimal, price) {
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
function decimalDecPrice(decimal, price) {
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


function tradePart(CID, isNeedRender) {
    var CONTENTS1 = pbE.WT().wtQueryStockRe(CID);
    if (CONTENTS1) {
        position = JSON.parse(CONTENTS1).data;
        if (position.length > 0) {
            var symbolData = {},
                marketData = [],
                unique = [];
            //stockInfo = [];
            marketInfo = [];
            for (var i = 0; i < position.length; i++) {
                position[i]['flag'] = 0;
                var market = position[i]['54'],
                    code = position[i]['63'];
                var obj = {},
                    symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
                marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
                if (code.indexOf('&') >= 0) symbol = 1;
                if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
                    position[i]['flag'] = 1;
                }


                var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
                //获取行情商品价格倍数
                    handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
                //合约代码
                //position[i]['1'] = marketInfo.HQCode;
                //买入均价
                position[i]['2'] = position[i]['136'] - 0;
                //当前数量
                position[i]['3'] = position[i]['135'] - 0;
                //放大倍数
                position[i]['4'] = rate;
                //每手数量
                position[i]['5'] = handNum;
                //买卖方向
                //position[i]['6'] = position[i]['112'];

                //存入持仓信息
                //stockInfo.push(obj);
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

                position[i]['name']= marketInfo.HQName||"";
                position[i]['market'] = marketInfo.HQMarket;
                position[i]['code'] = marketInfo.HQCode;
                position[i]['groupflag'] = pbE.HQ().hqGetGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
                position[i]['decimal'] = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
                //position[i]['136'] = position[i]['136'] + '';
                position[i]['136'] = decimalDec(position[i]['decimal'], position[i]['136']);
                position[i]['available'] = position[i]['137'];

                if (!position[i]['flag']) {
                    position[i]['price'] = pbE.HQ().hqGetNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
                    position[i]['base'] = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
                    //计算每条合约的盈亏
                    if (position[i]['price'] && !isNaN(position[i]['price'])) {
                        position[i]['profit'] = ((position[i]['price'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            position[i]['profit'] = 0 - position[i]['profit'];
                        }
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                    } else if (position[i]['base'] && !isNaN(position[i]['base'])) {
                        //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                        position[i]['profit'] = ((position[i]['base'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            position[i]['profit'] = 0 - position[i]['profit'];
                        }
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        position[i]['price'] = '--';
                    }

                    calcProfit(position, i, handNum);
                } else if (position[i]['flag']) {
                    position[i]['profit'] = '--';
                    position[i]['price'] = '--';
                }
            }

            //position = sortPosition(position);
            position.sort(
                firstBy(function (v) { return v[63].toUpperCase(); })
                    .thenBy("112")
                    .thenBy("503")
            );
            ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
            var completeP = false;
            totalPL = 0, sumPl = 0;
            for (var i = 0, l = position.length; i < l; i++) {
                if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
                    if (position[i]['flag']) {

                    }
                } else {
                    totalPL = totalPL + (position[i]['dayPl'] - 0);
                    completeP = true;
                }
            }
            if (completeP) {
                plFlag = 1;
                if (close) {
                    closePl = closePl - 0;
                    totalPL = totalPL - 0;
                    sumPl = (closePl + totalPL - 0).toFixed(2);
                    $('#float').html(sumPl + '元');
                }
            }

            symbolData['1'] = marketData;
            /*symbolData['5'] = column;*/
            symbolData['7'] = '1';
            pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
        } else if (position.length <= 0) {
            pbE.SYS().stopLoading();
            plFlag = 1;
            totalPL = 0;
            //stockInfo = [];
            $('#contents').empty();
            if (closePl) {
                $('#float').html((closePl - 0).toFixed(2) + '元');
            }
        }
    }
}

function calcProfit(positions, index, handNum) {
    var i = index;
    var currP = positions[index];
    //计算当日盈亏
    if (currP['503'] == '1') {
        //今仓，现价-开仓均价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
            currP['dayPl'] = (( currP['price'] - currP['136'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        }else if(currP['price'] == '--'){
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '2') {
        //昨仓，现价-基准价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
            currP['dayPl'] = ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        }else if(currP['price'] == '--'){
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '0') {
        //不分今昨仓，拆仓，1101字段代表今仓数量
        if (currP['1101'] == currP['135']) {
            //判断有没有昨仓
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
                //没有昨仓，现价-今仓开仓成本
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'];
                }
            }else if(currP['price'] == '--'){
                currP['dayPl'] = 0
            }
        } else if (currP['1101'] < currP['135']) {
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum + ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * (currP['135'] - currP['1101'] - 0) * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'] ;
                }
            }else if(currP['price'] == '--'){
                currP['dayPl'] = 0
            }
        }
    }
/*    console.log("名称："+currP['name']);
    console.log("基准价："+currP['base']);
    console.log("现价："+currP['price']);
    console.log("当日盈亏："+currP['dayPl']);*/
}

function hqPart(msg) {
    hasSubscribe = true;
    var data = msg.jData.Data,
        lastPrice = 0,
        pl = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (!position[i]['flag']) {
            for (var j = 0, ll = data.length; j < ll; j++) {
                if (position[i]['code'] == data[j]['10']) {
                    position[i]['base'] = pbE.HQ().hqGetLastBasePrice(position[i]['code'], position[i]['market']);
                    if (data[j]['29'] && !isNaN(data[j]['29'])) {
                        lastPrice = (data[j]['29'] - 0) / position[i]['4']; //获取现价/最新价
                        pl = ((lastPrice - position[i]['2']).toFixed(4) - 0) * position[i]['3'] * position[i]['5'];
                        if (position[i]['112'] == '1') {
                            pl = 0 - pl;
                        }
                        /*lastPrice = (lastPrice - 0).toFixed(5);
                         lastPrice = fiveDec(lastPrice);*/
                        lastPrice = decimalDecPrice(position[i]['decimal'], lastPrice);
                        //浮动盈亏
                        position[i]['7'] = pl;
                        position[i]['profit'] = pl;
                        position[i]['price'] = lastPrice;
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        //计算当日盈亏
                        calcProfit(position, i, position[i]['5']);
                    } else {
                        position[i]['dayPl'] = 0;
                        position[i]['price'] = '--';
                        if (position[i]['base'] && !isNaN(position[i]['base'])) {
                            //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                            position[i]['profit'] = ((position[i]['base'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * position[i]['5'];
                            if (position[i]['112'] == '1') {
                                position[i]['profit'] = 0 - position[i]['profit'];
                            }
                            position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        } else {
                            position[i]['profit'] = '--';
                        }
                    }

                    setPrice(position[i])
                }
                break;
            }
        } else if (position[i]['flag']) {
            position[i]['profit'] = '--';
            position[i]['price'] = '--';
        }
    }
    //position = sortPosition(position);
    var complete = false;
    totalPL = 0, sumPl = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
            if (position[i]['flag']) {

            }
        } else {
            totalPL = totalPL + (position[i]['dayPl'] - 0);
            complete = true;
        }
    }

    if (complete) {
        plFlag = 1;
        p++;
        if (close) {
            sumPl = (totalPL - 0 + (closePl - 0) - 0).toFixed(2);
            //
            /*asset['457'] = totalPL.toFixed(2);*/
            if (p == 1) pbE.SYS().stopLoading();
        }
        if (sumPl && sumPl != 0)
            $('#float').html(sumPl + '元');
        //position = sortPosition(position);
        //ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
    }
}


function setPrice(currP)
{
    var id = "#"+currP['code']+"_"+currP['112']+"_"+currP['503'];
    if (isNaN(currP['profit'])) {
        $(id).removeClass("redbar");
        $(id).removeClass("greenbar");
        $(id +" .profit").html(currP['profit']);
        $(id +" .profit").removeClass("a3").removeClass("a4").addClass("a1");
    } else {
        if (currP['profit'] > 0) {
            $(id).removeClass("greenbar");
            $(id).addClass("redbar");
            $(id +" .profit").removeClass("a1").removeClass("a4").addClass("a3");
            $(id +" .profit").html("+"+currP['profit']);
        } else if (currP['profit'] < 0) {
            $(id).removeClass("redbar");
            $(id).addClass("greenbar");
            $(id +" .profit").removeClass("a1").removeClass("a3").addClass("a4");
            $(id +" .profit").html(currP['profit']);
        } else if (currP['profit'] == 0) {
            $(id).removeClass("redbar");
            $(id).removeClass("greenbar");
            $(id +" .profit").html(currP['profit']);
            $(id +" .profit").removeClass("a3").removeClass("a4").addClass("a1");
        }
    }
    $(id +" .price").html(currP['price']);
}

//先取上一次查询结果显示
var close = 0,
    plFlag = 0; //close平仓浮动盈亏是否返回的标志，plFlag总盈亏是否计算出来的标志



$(function () {
    var option = {
        callbacks: [{fun: 6012, module: 90002, callback: function(msg){
            asset = msg.jData.data[0];
            //console.log("查询资金:"+close);
            close = 1;
            closePl = asset['102'] - 0;
            asset['97'] = (asset['97'] - 0).toFixed(2);
            asset['152'] = (asset['152'] - 0).toFixed(2);
            asset['111'] = (asset['111'] - 0).toFixed(2);
            if (plFlag) {
                asset['sumPl'] = (totalPL - 0 + (closePl - 0) - 0).toFixed(2);
            } else {
                var arr = $('#float').html();
                asset['sumPl'] = arr.substring(0, arr.length - 1);
            }
            ReactDOM.render(React.createElement(FundsInfoFutures, {info: asset}), document.getElementById('fund'));
        }},
            {fun: 56004, module: 90002, callback: function(msg){
                if (msg.reservId == CID && msg.jData['223'] == 5) {
                    if (!refreshFlag) {
                        pbE.SYS().stopLoading();
                        refreshFlag = 1;
                    }
                    fresh();
                }
            }},
            {fun: 56005, module: 90002, callback: function(msg){
                if(msg.reservId == CID)
                    pbPage.fresh();
            }},
            {fun: 56006, module: 90002, callback: function(msg){
                if(msg.reservId == CID)
                    pbPage.fresh();
            }},
            {fun: 56014, module: 90002, callback: function(msg){
                if(msg.reservId == CID)
                    pbPage.fresh();
            }},
            {module: 90000, callback: function(msg){
                totalPL = 0;
                hqPart(msg);
            }}],

        reload: function () {
            close = 0;
            //console.log("重新加载:"+close);
            plFlag = 0;
            CID = pbE.WT().wtGetCurrentConnectionCID();
            p = 0;
            tradePart(CID, true);
            pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
        },
        refresh: function () {
            close = 0, plFlag = 0;
            pbE.SYS().startLoading();
            refreshFlag = 0;
            pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
            pbE.WT().wtSynFlash(CID);
        },
        fresh: function () {
            close = 0, plFlag = 0;
            p = 0;
            tradePart(CID, true);
            pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
        },
        doShow: function (flag) {
            if (!flag) pbE.SYS().stopLoading();
        }
    };
    pbPage.initPage(option);

    var CONTENT1 = pbE.WT().wtQueryMoneyRe(CID);
    if (CONTENT1) {
        var assetHis = JSON.parse(CONTENT1).data[0];
        assetHis['97'] = (assetHis['97'] - 0).toFixed(2);
        assetHis['152'] = (assetHis['152'] - 0).toFixed(2);
        assetHis['111'] = (assetHis['111'] - 0).toFixed(2);
        assetHis['sumPl'] = '--';
        ReactDOM.render(React.createElement(FundsInfoFutures, {info: assetHis}), document.getElementById('fund'));
    }
    p = 0;
    pbE.SYS().startLoading();
    tradePart(CID, true);
    pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
});

