/**
 * Created by pobo on 2016/10/19.
 */

if(typeof pbE == 'undefined'){
    window.pbE = {
        WT:function () {
            var obj = {
                wtGetCurrentConnectionCID:function () {

                },
                wtEncrypt:function () {
                    
                },
                wtGeneralRequest:function (a,b) {
                    if(b == 6200){
                                var data = {
                                    functionNO:6200,
                                    jData:{
                                        '1':0,
                                        data:[
                                                {
                                                '214':'1234561111111',
                                                '215':11111111,
                                                '216':'招商银行',
                                                '56':0,
                                                '51':2222222222,
                                                '217':5,
                                                '353':111,
                                                '219':4
                                            },
                                            {
                                                '214':'1234560222',
                                                '215':11111111,
                                                '216':'农业银行',
                                                '56':0,
                                                '51':2222222222,
                                                '217':6,
                                                '353':111,
                                                '219':5
                                            },
                                            {
                                                '214':'12345600789',
                                                '215':11111111,
                                                '216':'工商银行',
                                                '56':0,
                                                '51':2222222222,
                                                '217':4,
                                                '353':111,
                                                '219':6
                                            }
                                        ]
                                    }
                                }
                            }else{
                                var data = {
                                    functionNO:6203,
                                    jData:{
                                        '1':0,
                                        data:[
                                            {
                                                '200':0,
                                                '224':123
                                            }
                                        ]
                                    }
                                }
                            }
                            callback(JSON.stringify(data))
                },
            }
            return obj;
        }
    }
    $('#goBack').click(function () {
        location.href = document.referrer;
    })
}else{
    $('#goBack').click(function () {
        location.href = 'goBack';
    })
}

var CID = pbE.WT().wtGetCurrentConnectionCID();
var pipeCode;
var bankAccount, bankCode, fundAccount, currencyCode, bankCenter;
var oBank = document.getElementById('bank');
var oCurrency = document.getElementById('currency');
var fundPwd = '', bankPwd = '';

function getCurrency(code) {
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

//币种单位
function getUnit(code) {
    code = code - 0;
    switch(code) {
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

//判断输入是不是空
function JTrim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

//设置币种的下拉列表
function setLiCurrency(data) {
    var domStr = '';
    for (var i = 0, l = data.length; i < l; i++) {
        if (parseInt(data[i] + 1)) {
            var currency = getCurrency(data[i]);
            var unit = getUnit(data[i]);
            if (i == 0) {
                domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '" class="hover">' +  currency + '</li>';
                oCurrency.innerHTML = currency;
                $('#currency-unit').val(unit);
                currencyCode = data[i];
            } else {
                domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '">' +  currency + '</li>';
            }}
    }
    return domStr;
}

function confirmIn() {
    $('.my-modal').addClass('hide');
    $('#error').addClass('hide');
    var reg = new RegExp("^[0-9]*$");
    var obj = document.getElementById("inAmount");
    var obj1 = document.getElementById("inBankPwd").value;
    var obj2 = document.getElementById("inFundPwd").value;
    if(JTrim(obj.value) == '') {
        $('#error').removeClass('hide');
        $('#error').html('请输入转账金额！');
        return;
    } else if(!/^[0-9]+(.[0-9]{1,8})?$/.test(obj.value)){
        $('#error').removeClass('hide');
        $('#error').html('转账金额要为数字！');
        return;
    }
    if (!$('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {
        if(JTrim(obj1) == '') {
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码！');
            return;
        } else if(JTrim(obj2) == '') {
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码！');
            return;
        } else {
            $('#error').addClass('hide');
            $('.my-modal').removeClass('hide');
            $('.my-modal-backdrop').click(function () {
                $('.my-modal').addClass('hide');
            });
            $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
            fundPwd = pbE.WT().wtEncrypt(CID, $('#inFundPwd').val());
            bankPwd = pbE.WT().wtEncrypt(CID, $('#inBankPwd').val());
        }
    } else if ($('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {
        if(JTrim(obj1) == '') {
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码！');
            return;
        } else {
            $('#error').addClass('hide');
            $('.my-modal').removeClass('hide');
            $('.my-modal-backdrop').click(function () {
                $('.my-modal').addClass('hide');
            });
            $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
            bankPwd = pbE.WT().wtEncrypt(CID, $('#inBankPwd').val());
        }
    } else if (!$('#moneyPwd').hasClass('hide') && $('#bankPwd').hasClass('hide')) {
        if(JTrim(obj2) == '') {
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码！');
            return;
        } else {
            $('#error').addClass('hide');
            $('.my-modal').removeClass('hide');
            $('.my-modal-backdrop').click(function () {
                $('.my-modal').addClass('hide');
            });
            $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
            fundPwd = pbE.WT().wtEncrypt(CID, $('#inFundPwd').val());
        }
    } else {
        $('#error').addClass('hide');
        $('.my-modal').removeClass('hide');
        $('.my-modal-backdrop').click(function () {
            $('.my-modal').addClass('hide');
        });
        $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
    }
}

function completeIn() {
    $('.my-modal').addClass('hide');
    $('#error').addClass('hide');
    var data = {
        '214': bankAccount,
        '215': bankCode,
        '51': fundAccount,
        '56': currencyCode,
        '59': fundPwd,
        '60': bankPwd,
        '220': $('#inAmount').val(),
        '353': bankCenter
    };
    pbE.WT().wtGeneralRequest(CID, 6202, JSON.stringify(data));
}

function completeOut() {
    $('.my-modal').addClass('hide');
    $('#error').addClass('hide');
    var data = {
        '214': bankAccount,
        '215': bankCode,
        '51': fundAccount,
        '56': currencyCode,
        '59': fundPwd,
        '60': bankPwd,
        '220': $('#inAmount').val(),
        '353': bankCenter
    };
    pbE.WT().wtGeneralRequest(CID, 6201, JSON.stringify(data));
}

function queryBalance() {  //点击查询按钮
    var fundPwd = '', bankPwd = '';
    //需要资金密码，不需要银行密码
    if (!$('#moneyPwd').hasClass('hide') && $('#bankPwd').hasClass('hide')) {
        if (!$('#money-pwd').val()) {  //没有输入资金密码，提示错误
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码');
            return;
        } else {
            fundPwd = pbE.WT().wtEncrypt(CID, $('#money-pwd').val());
        }
    } else if (!$('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {  //资金密码银行密码都需要
        if (!$('#bank-pwd').val()) {  //没有输入银行密码
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码');
            return;
        } else if ($('#bank-pwd').val() && !$('#money-pwd').val()) {  //输入了银行密码，没有输入资金密码
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码');
            return;
        } else {
            fundPwd = pbE.WT().wtEncrypt(CID, $('#money-pwd').val());
            bankPwd = pbE.WT().wtEncrypt(CID, $('#bank-pwd').val());
        }
    } else if ($('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {  //需要银行密码，不需要资金密码
        if (!$('#bank-pwd').val()) {
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码');
            return;
        } else {
            bankPwd = pbE.WT().wtEncrypt(CID, $('#bank-pwd').val());
        }
    }
    var data = {
        '214': bankAccount,
        '215': bankCode,
        '51': fundAccount,
        '56': currencyCode,
        '59': fundPwd,
        '60': bankPwd,
        '353': bankCenter
    };
    pbE.WT().wtGeneralRequest(CID, 6203, JSON.stringify(data));
}

function cancelIn() {
    $('.my-modal').addClass('hide');
}

//214银行账号，215银行编码，216银行名称，56开通币种，51资金账号
function bankBalanceView(){
    window.setLiBank = function (data) {
        var domStr = '';
        for (var i = 0, l = data.length; i < l; i++) {
            if (i == 0) {
                var tail = data[i]['214'].slice(-4);
                //value银行账号，data-code银行编号，data-currency开通币种，data-account资金账号
                domStr += '<li value="' + data[i]['214'] + '" data-code="' + data[i]['215']
                    + '" data-currency="' + data[i]['56'] + '" data-account="' + data[i]['51'] + '" balnceFlag="' + data[i]['217']
                    + '" class="hover">' + data[i]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'  + '</li>';
                bankAccount = data[i]['214'];
                bankCode = data[i]['215'];
                currencyCode = data[i]['56'];
                fundAccount = data[i]['51'];
                bankCenter = data[i]['353'];
                if (data[i]['217'] == 4) {
                    $('#moneyPwd').removeClass('hide');
                    $('#bankPwd').addClass('hide');
                } else if (data[i]['217'] == 5) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').addClass('hide');
                } else if (data[i]['217'] == 6) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').removeClass('hide');
                } else if (data[i]['217'] == 7) {
                    $('#bankPwd').addClass('hide');
                    $('#moneyPwd').addClass('hide');
                }else if (data[i]['217'] == 3) {
                    flag = 1;
                    $('#bankPwd').addClass('hide');
                    $('#moneyPwd').addClass('hide');
                }
                else
                {
                    $('#bankPwd').addClass('hide');
                    $('#moneyPwd').addClass('hide');
                }
                $('#bank').html('<span class="b1">' + data[i]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>');
                $('#fund-account').val(data[i]['51']);  //资金账号
                $('#bank-currency').val(data[i]['56']);  //开通币种
                $('#bank-val').val(data[i]['214']);  //银行账号
                $('#bank-code').val(data[i]['215']);  //银行编码
                $('#bank').val(data[i]['216']);  //银行名称
            } else {
                var tail = data[i]['214'].slice(-4);
                domStr += '<li value="' + data[i]['214'] + '" data-code="' + data[i]['215'] + '" data-center="' + data[i]['353']
                    + '" data-currency="' + data[i]['56'] + '" data-account="' + data[i]['51'] + '" balnceFlag="' + data[i]['217']
                    + '">' + data[i]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'  + '</li>';
            }
        }
        return domStr;
    };
    window.ready = function () {
        $('body').click(function () {
            $('#bank-ul').addClass('hide');
        });
        $('.bank-div').click(function (e) {
            $('#bank-ul').toggleClass('hide');
            $('#bank').focus();
            e.stopPropagation();
        });
        $('#bank-ul').on('click', 'li', function () {
            bankAccount = $(this).attr('value');
            bankCode = $(this).attr('data-code');
            currencyCode = $(this).attr('data-currency');
            fundAccount = $(this).attr('data-account');
            flag = 0;
            $('#bank').html($(this).html());
            $('#bank-val').val($(this).attr('value'));
            $('#bank-code').val($(this).attr('data-code'));
            $('#bank-currency').val($(this).attr('data-currency'));
            $('#fund-account').val($(this).attr('data-account'));
            $('#bank-ul .hover').removeClass('hover');
            $(this).addClass('hover');
            if ($(this).attr('balnceFlag') == 4) {
                $('#moneyPwd').removeClass('hide');
                $('#bankPwd').addClass('hide');
            } else if ($(this).attr('balnceFlag') == 5) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if ($(this).attr('balnceFlag') == 6) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').removeClass('hide');
            } else if ($(this).attr('balnceFlag') == 7) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if ($(this).attr('balnceFlag') == 3) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
                flag=1;
            } else if (($(this).attr('balnceFlag') == 0) || (!($(this).attr('balnceFlag')))) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            }
        });
    };
    pbE.WT().wtGeneralRequest(CID, 6200, JSON.stringify({}));
}
//214银行账号，215银行编码，216银行名称，56开通币种，51资金账号
function fundInOutView(){
    window.ready = function () {
        $('body').click(function () {
            $('#bank-ul').addClass('hide');
            $('#currency-ul').addClass('hide');
        });
        $('.bank-div').click(function (e) {
            $('#currency-ul').addClass('hide');
            $('#bank-ul').toggleClass('hide');
            $('#bank').focus();
            e.stopPropagation();
        });
        $('#bank-ul').on('click', 'li', function () {
            bankCode = $(this).attr('data-code');
            bankAccount = $(this).attr('bank-account');
            fundAccount = $(this).attr('data-account');
            bankCenter = $(this).attr('center-code');
            $('#bank').val($(this).html());
            $('#bank-name').val($(this).attr('data-name'));
            $('#bank-val').val($(this).attr('value'));
            $('#bank-code').val($(this).attr('data-code'));
            $('#bank-currency').val($(this).attr('data-currency'));
            $('#fund-account').val($(this).attr('data-account'));
            $('#bank-center').val($(this).attr('center-code'));
            $('#bank-ul .hover').removeClass('hover');
            $(this).addClass('hover');
            if ($(this).attr('balnceFlag') == 4) {
                $('#moneyPwd').removeClass('hide');
                $('#bankPwd').addClass('hide');
            } else if ($(this).attr('balnceFlag') == 5) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if ($(this).attr('balnceFlag') == 6) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').removeClass('hide');
            } else if ($(this).attr('balnceFlag') == 7) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if (($(this).attr('balnceFlag') == 0) || (!($(this).attr('balnceFlag')))) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            }
            oBank.innerHTML = $('#bank').val();
            var currencyContents = setLiCurrency($('#bank-currency').val());
            $('#currency-ul').empty();
            $('#currency-ul').append(currencyContents);
            $('#result-account').html($('#bank-val').val());
            $('#result-bank').html($('#bank-name').val());

            $('#currency-ul li').click(function () {
                currencyCode = $(this).attr('currencyCode');
                $('#currency').html($(this).val());
                $('#currency-unit').val($(this).attr('currency-unit'));
                $('#currency-ul .hover').removeClass('hover');
                $(this).addClass('hover');
                oCurrency.innerHTML = $(this).html();
            });
            /*$('#result-amount').html($('#inAmount').val());*/
        });
        $('.currency-div').click(function (e) {
            $('#bank-ul').addClass('hide');
            $('#currency-ul').toggleClass('hide');
            $('#currency').focus();
            e.stopPropagation();
        });
        $('#currency-ul li').click(function () {
            $('#currency').html($(this).val());
            $('#currency-unit').val($(this).attr('currency-unit'));
            $('#currency-ul .hover').removeClass('hover');
            $(this).addClass('hover');
            oCurrency.innerHTML = $(this).html();
        });
    }
    pbE.WT().wtGeneralRequest(CID, 6200, JSON.stringify({}));
}

function fundInView() {
    window.setLiBank = function(data) {
        var domStr = '', arr = [], indexArr = [];
        //每个币种一条记录，如果一个银行有多个币种则有多条记录，合并相同银行账号的币种
        var account = {};
        for (var i = 0, l = data.length;i<l;i++) {
            var key = data[i]['214'];
            var accountAttr = {
                '56': []
            };
            if (!account.hasOwnProperty(key)) {
                accountAttr['56'].push(data[i]['56']);
                accountAttr['215'] = data[i]['215'];
                accountAttr['216'] = data[i]['216'];
                accountAttr['51'] = data[i]['51'];
                accountAttr['353'] = data[i]['353'];
                accountAttr['219'] = data[i]['219'];
                accountAttr['214'] = data[i]['214'];
                account[key] = accountAttr;
            } else {
                if (account[key]['56'].indexOf(data[i]['56']) < 0) {
                    account[key]['56'].push(data[i]['56']);
                }
            }
        } //合并结束
        var k = 0;
        for (var acc in account) {
            if (k == 0) {
                var tail = acc.slice(-4);
                domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51'] + '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['219'] + '" bank-account="' + account[acc]['214'] + '" class="hover">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
                if (account[acc]['219'] == 4) {
                    $('#moneyPwd').removeClass('hide');
                    $('#bankPwd').addClass('hide');
                } else if (account[acc]['219'] == 5) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').addClass('hide');
                } else if (account[acc]['219'] == 6) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').removeClass('hide');
                } else if (account[acc]['219'] == 7) {
                    $('#bankPwd').addClass('hide');
                    $('#moneyPwd').addClass('hide');
                }
                oBank.innerHTML = '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>';
                var currencyContents = setLiCurrency(account[acc]['56']);
                $('#currency-ul').empty();
                $('#currency-ul').append(currencyContents);
                $('#result-account').html(acc);
                $('#result-bank').html(account[acc]['216']);
                bankCode = account[acc]['215']; bankAccount = account[acc]['214']; fundAccount = account[acc]['51']; bankCenter = account[acc]['353'];
                k++;
            } else {
                var tail = acc.slice(-4);
                domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51']+ '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['219'] + '" bank-account="' + account[acc]['214'] + '">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
                k++;
            }
        }
        return domStr;
    };
}

function fundOutView() {
    window.setLiBank = function (data) {
        var domStr = '', arr = [], indexArr = [];
        //每个币种一条记录，如果一个银行有多个币种则有多条记录，合并相同银行账号的币种
        var account = {};
        for (var i = 0, l = data.length;i<l;i++) {
            var key = data[i]['214'];
            var accountAttr = {
                '56': []
            };
            if (!account.hasOwnProperty(key)) {
                accountAttr['56'].push(data[i]['56']);
                accountAttr['215'] = data[i]['215'];
                accountAttr['216'] = data[i]['216'];
                accountAttr['51'] = data[i]['51'];
                accountAttr['353'] = data[i]['353'];
                accountAttr['218'] = data[i]['218'];
                accountAttr['214'] = data[i]['214'];
                account[key] = accountAttr;
            } else {
                if (account[key]['56'].indexOf(data[i]['56']) < 0) {
                    account[key]['56'].push(data[i]['56']);
                }
            }
        } //合并结束
        var k = 0;
        for (var acc in account) {
            if (k == 0) {
                var tail = acc.slice(-4);
                domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51'] + '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '" class="hover">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
                if (account[acc]['218'] == 4) {
                    $('#moneyPwd').removeClass('hide');
                    $('#bankPwd').addClass('hide');
                } else if (account[acc]['218'] == 5) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').addClass('hide');
                } else if (account[acc]['218'] == 6) {
                    $('#bankPwd').removeClass('hide');
                    $('#moneyPwd').removeClass('hide');
                } else if (account[acc]['218'] == 7) {
                    $('#bankPwd').addClass('hide');
                    $('#moneyPwd').addClass('hide');
                }
                oBank.innerHTML = '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>';
                var currencyContents = setLiCurrency(account[acc]['56']);
                $('#currency-ul').empty();
                $('#currency-ul').append(currencyContents);
                $('#result-account').html(acc);
                $('#result-bank').html(account[acc]['216']);
                bankCode = account[acc]['215']; bankAccount = account[acc]['214']; fundAccount = account[acc]['51']; bankCenter = account[acc]['353'];
                k++;
            } else {
                var tail = acc.slice(-4);
                domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51']+ '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
                k++;
            }
        }
        return domStr;
    }
}

function callback(message) {
    var msg = parseJSON(message);
    if (msg.functionNO == 6200) {  //查银行账号
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            var accountInfo = msg.jData.data;
            var bankContents = setLiBank(accountInfo);
            $('#bank-ul').empty();
            $('#bank-ul').append(bankContents);
        }
    } else if (msg.functionNO == 6203) {
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            pipeCode = msg.jData.data[0]['200'];
            var remain = msg.jData.data[0]['224'];
            if (pipeCode) {
                alert("请求已提交，请到转账记录页面查看");  //转账记录
            } else if (!pipeCode && remain) {
                alert('您的银行余额为：'+remain+'元');
            } else if (!pipeCode && !remain) {
                alert("查询失败，请稍后再试");
            }
        }
    }else if (msg.functionNO == 6202 || msg.functionNO == 6201) {
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            alert('提交银行处理');
            /*var pipeCode = msg.jData.data[0]['200'];  //流水号
             pbE.WT().wtGeneralRequest(CID, 6205, JSON.stringify(pipeCode));*/
        }
    }
}

// pbE.WT().wtGeneralRequestRe(CID, 6200, JSON.stringify({}));  //查银行账号
