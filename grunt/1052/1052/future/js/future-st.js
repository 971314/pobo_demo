var isApp = typeof pbE != 'undefined';
if(isApp){
    process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
}else{
    $.get('../conf/future.json',process);
}


function scc() {
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



 /*   //小数转百分数
    Number.prototype.toPercent = function(n) {
        n = n || 2;
        return ( Math.round( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
    };*/

    if(typeof pbE == 'undefined'){
        window.pbE = {
            WT:function () {
                var obj = {
                    wtGetCurrentConnectionCID:function () {

                    },
                    wtQueryMoney:function () {
                        var data = {
                            functionNO:6012,
                            jData:{
                                data:[
                                    {
                                        '51':10,
                                        '56':0,
                                        '97':11,
                                        '99':111,
                                        '111':10000,
                                        '345':'35.2%',
                                        '101':-10,
                                        '102':10,
                                        '94':20,
                                        '95':20,
                                        '152':100,
                                        '182':222,
                                        '442':20
                                    }
                                ]
                            }
                        };
                        callback(JSON.stringify(data));
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
            }
        }
        $('#goBack').click(function () {
            location.href = document.referrer;
        })
    }else{
        $('#goBack').click(function () {
            location.href = 'goBack';
        });
    }

    var myDate = new Date();
    var strToday = myDate.format('yyyy-MM-dd');
    $('#date').html(strToday);
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    pbE.SYS().startLoading();
    pbE.WT().wtQueryMoney(CID, JSON.stringify({}));

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






function callback(message) {
    pbE.SYS().stopLoading();
    var msg = JSON.parse(message);
    if (msg.functionNO == 6012) {
        asset = msg.jData.data[0];
        $('#accNum').html(asset['51']);
        $('#currency').html(getCurrency(asset['56']));
        $('#rightNow').html(pbUtils.doubleToStr(asset['97']));
        $('#rightLast').html(pbUtils.doubleToStr(asset['99']));
        $('#available').html(pbUtils.doubleToStr(asset['111']));
        $('#canTrans').html(pbUtils.doubleToStr(asset['95']));
        if ((asset['345'] + '').indexOf('%') >= 0) {  //带有百分号，直接显示
            $('#risk').html(asset['345']);
        }else{
         $('#risk').html(pbUtils.doubleToPecent(asset['345']));
        }

        if (asset['101'] > 0) {
            $('#ccpl').addClass('a3');
        } else if (asset['101'] < 0) {
            $('#ccpl').addClass('a4');
        } else if (asset['101'] == 0) {
            $('#ccpl').addClass('bolder');
        }
        if (asset['102'] > 0) {
            $('#pcpl').addClass('a3');
        } else if (asset['102'] < 0) {
            $('#pcpl').addClass('a4');
        } else if (asset['102'] == 0) {
            $('#pcpl').addClass('bolder');
        }
        console.log();
        $('#ccpl').html(pbUtils.doubleToStr(asset['101']));
        $('#pcpl').html(pbUtils.doubleToStr(asset['102']));
        $('#frozen').html(pbUtils.doubleToStr(asset['94']));
        $('#take').html(pbUtils.doubleToStr(asset['152']));
      /*if (!isNaN(asset['105'])) {
       $('#charge').html((asset['105'] - 0).toFixed(2));
       }*/
        $('#charge').html(pbUtils.doubleToStr(asset['182']));
      /*$('#takeCharge').html((asset['443'] - 0).toFixed(2));*/
        $('#inOut').html(pbUtils.doubleToStr(asset['442']));
    }
}

function reload() {
    CID = pbE.WT().wtGetCurrentConnectionCID();
    pbE.SYS().startLoading();
    myDate = new Date();
    strToday = myDate.format('yyyy-MM-dd');
    $('#date').html(strToday);
    pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
    if(isApp){
        process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
    }else{
        $.get('../conf/future.json',process);
    }
}

function doShow(flag) {
    if (!flag) pbE.SYS().stopLoading();
}

function process(data) {
    var dat = data.st;
    var i = '', e = '',s = '',v = '<div class="nav-blank1 row"></div>';
    dat.dataA.forEach(function (n) {
        i += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
    });
    dat.dataB.forEach(function (n) {
        e += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
    });
    dat.dataC.forEach(function (n) {
        s += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
    });
    $('.clearfix').html(v+i+v+e+v+s);
    scc()
}
