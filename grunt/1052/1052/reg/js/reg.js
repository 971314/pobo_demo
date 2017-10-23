//服务器地址本地测试用
//var serverAddr = 'https://192.168.6.118:8080/pobocertification_WebService/';
//var serverAddr = 'http://192.168.6.49/pobocertification_WebService/';
//服务器地址手机用
var serverAddr = 'https://pbmobile.pobo.net.cn/pobocertification_WebService/';
//var serverAddr = 'https://61.172.197.217:8443/pobocertification_WebService/';

// 判断浏览器
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
if (isAndroid) {
    document.write('<style>body{padding-top: 48px;} .navbar-fixed-top{min-height: 48px;} .navbar .navbar-brand{height: 48px; padding: 15px;} .navbar .navbar-text{line-height: 48px;}</style>');
}

var loginType = '1';
var userId;
var poboNumber = '123';
var deviceId = '127.0.0.1';
var FatherAccount = 'pobo';
var OS = 'iOS';
var version = '1.0.0';
var orgNumber = '789';  //券商编号
var testTiem = 120;
var ajaxTimeoutTest;


if (typeof pbE != "undefined") {
    var deviceInfo1 = pbE.SYS().getDeviceJsonInfo();
    if (deviceInfo1) {
        var deviceInfo = JSON.parse(deviceInfo1);
        if (deviceInfo['71']) {
            deviceId = deviceInfo['71'];  //客户端本机ip地址
        }
        if (deviceInfo['255']) {  //平台
            var platNum = deviceInfo['255'];
            if (platNum == '2') {
                OS = 'iOS';
            } else if (platNum == '3') {
                OS = 'Android';
            }
        }
        if (deviceInfo['73']) {
            version = deviceInfo['73']; //版本号
        }
        if (deviceInfo['jgid']) {
            orgNumber = deviceInfo['jgid'];  //机构代码/券商编号
        }
    }
}

// 获取url地址name
function GetQueryString(name) {
    var urls = decodeURI(window.location.search.substr(1));
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = urls.match(reg);
    if (r) return unescape(r[2]);
    return null;
}

// 判断是否为手机号

function isPhoneNum(val) {
    var phoneReg = !!val.match(/^[0-9]{11}$/);
    return phoneReg;
}

// 判断密码输入是否符合规则

function isRightPwd(val) {
    var pwdReg = !!val.match(/^(?!\D+$)(?!\d+$)[a-zA-Z0-9]{6,16}$/);
    return pwdReg;
}

// 判断是否为空

function isNull(val) {
    if ($.trim(val).length == 0) {
        return true;
    }
    return false;
}

// 获取验证码按钮

function sendOTPBtn(seconds) {
    var countdown = seconds;
    var i = setInterval(function () {
        if (countdown == 0) {
            $('#btn-send').removeClass('disabled');
            $('#btn-send').val('获取校验码');
            clearInterval(i);
        } else {
            $('#btn-send').val('(' + countdown + 'S)');
            $('#btn-send').addClass('disabled');
        }
        countdown--;
    }, 1000);
}

// 注册验证码
function sendRegOTP() {
    var phone = $.trim($('#phone').val());
    if (typeof pbE != 'undefined') {
        //验证输入是否是手机号，如果是手机号，则发送校验码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //检查发送验证码时间
            if ($('#btn-send')[0]) {
                var time = new Date().getTime();
                var sendOTPTime = pbE.SYS().getPrivateData('sendOTPTime');
                if (sendOTPTime) {
                    var period = time - sendOTPTime;
                    if (period > (testTiem * 1000)) {
                        $.ajax({
                            type: 'POST',
                            url: serverAddr + 'firstregister',
                            timeout:30000,
                            data: {
                                poboNumber: poboNumber,
                                loginName: phone,
                                loginType: loginType,
                                deviceId: deviceId,
                                pwd: '',
                                FatherAccount: FatherAccount,
                                OS: OS,
                                version: version,
                                orgNumber: orgNumber
                            },
                            dataType: 'json',
                            success: function (data) {
                                if (data.loginUser.returnFlag == 0) {
                                    //延时器，120秒后可以重发校验码
                                    sendOTPBtn(testTiem);
                                    //存储发送验证码时间，防止用户刷新重新发送验证码
                                    pbE.SYS().storePrivateData('sendOTPTime', time + '');
                                    $('.error').addClass('hide');
                                    $('.registered').addClass('hide');
                                } else if (data.loginUser.returnFlag == 5) {
                                    $('.error').addClass('hide').empty();
                                    $('.registered').removeClass('hide');
                                    $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                                } else {
                                    $('.registered').addClass('hide');
                                    /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                    alert("发送失败，请稍后重试");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $('#backdrop').addClass('hide');
                                if(textStatus = 'error'){
                                    alert('连接超时，请检查网络后重试');
                                }else if(textStatus = 'timeout'){
                                    alert('连接超时，请稍后再试');
                                }
                            }
                        });
                    } else {
                        var countdown = testTiem - Math.round(period / 1000);
                        var i = setInterval(function () {
                            if (countdown == 0) {
                                $('#btn-send').removeClass('disabled');
                                $('#btn-send').val('获取校验码');
                                clearInterval(i);
                                return;
                            } else {
                                $('#btn-send').val('(' + countdown + 'S)');
                                $('#btn-send').addClass('disabled');
                            }
                            countdown--;
                        }, 1000);
                    }
                } else {
                    $.ajax({
                        type: 'POST',
                        url: serverAddr + 'firstregister',
                        timeout:30000,
                        data: {
                            poboNumber: poboNumber,
                            loginName: phone,
                            loginType: loginType,
                            deviceId: deviceId,
                            pwd: '',
                            FatherAccount: FatherAccount,
                            OS: OS,
                            version: version,
                            orgNumber: orgNumber
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.loginUser.returnFlag == 0) {
                                sendOTPBtn(testTiem);
                                pbE.SYS().storePrivateData('sendOTPTime', time + '');
                                $('.error').addClass('hide');
                                $('.registered').addClass('hide');
                            } else if (data.loginUser.returnFlag == 5) {
                                $('.error').addClass('hide').empty();
                                $('.registered').removeClass('hide');
                                $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                            } else {
                                $('.registered').addClass('hide');
                                /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                alert("发送失败，请稍后重试");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#backdrop').addClass('hide');
                            if(textStatus = 'error'){
                                alert('连接超时，请检查网络后重试');
                            }else if(textStatus = 'timeout'){
                                alert('连接超时，请稍后再试');
                            }
                        }
                    });
                }
            }
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    } else {
        //验证输入是否是手机号，如果是手机号，则发送校验码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //检查发送验证码时间
            if ($('#btn-send')[0]) {
                var time = new Date().getTime();
                var sendOTPTime = localStorage.getItem('sendOTPTime');
                if (sendOTPTime) {
                    var period = time - sendOTPTime;
                    if (period > (testTiem * 1000)) {
                        $.ajax({
                            type: 'POST',
                            url: serverAddr + 'firstregister',
                            timeout:30000,
                            data: {
                                poboNumber: poboNumber,
                                loginName: phone,
                                loginType: loginType,
                                deviceId: deviceId,
                                pwd: '',
                                FatherAccount: FatherAccount,
                                OS: OS,
                                version: version,
                                orgNumber: orgNumber
                            },
                            dataType: 'json',
                            success: function (data) {
                                if (data.loginUser.returnFlag == 0) {
                                    //延时器，120秒后可以重发校验码
                                    sendOTPBtn(testTiem);
                                    //存储发送验证码时间，防止用户刷新重新发送验证码
                                    localStorage.setItem('sendOTPTime', time + '');
                                    $('.error').addClass('hide');
                                    $('.registered').addClass('hide');
                                } else if (data.loginUser.returnFlag == 5) {
                                    $('.error').addClass('hide').empty();
                                    $('.registered').removeClass('hide');
                                    $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                                } else {
                                    $('.registered').addClass('hide');
                                    /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                    alert("发送失败，请稍后重试");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $('#backdrop').addClass('hide');
                                if(textStatus = 'error'){
                                    alert('连接超时，请检查网络后重试');
                                }else if(textStatus = 'timeout'){
                                    alert('连接超时，请稍后再试');
                                }
                            }
                        });
                    } else {
                        var countdown = testTiem - Math.round(period / 1000);
                        var i = setInterval(function () {
                            if (countdown == 0) {
                                $('#btn-send').removeClass('disabled');
                                $('#btn-send').val('获取校验码');
                                clearInterval(i);
                                return;
                            } else {
                                $('#btn-send').val('(' + countdown + 'S)');
                                $('#btn-send').addClass('disabled');
                            }
                            countdown--;
                        }, 1000);
                    }
                } else {
                    $.ajax({
                        type: 'POST',
                        url: serverAddr + 'firstregister',
                        timeout:30000,
                        data: {
                            poboNumber: poboNumber,
                            loginName: phone,
                            loginType: loginType,
                            deviceId: deviceId,
                            pwd: '',
                            FatherAccount: FatherAccount,
                            OS: OS,
                            version: version,
                            orgNumber: orgNumber
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.loginUser.returnFlag == 0) {
                                sendOTPBtn(testTiem);
                                localStorage.setItem('sendOTPTime', time + '');
                                $('.error').addClass('hide');
                                $('.registered').addClass('hide');
                            } else if (data.loginUser.returnFlag == 5) {
                                $('.error').addClass('hide').empty();
                                $('.registered').removeClass('hide');
                                $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                            } else {
                                $('.registered').addClass('hide');
                                /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                alert("发送失败，请稍后重试");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#backdrop').addClass('hide');
                            if(textStatus = 'error'){
                                alert('连接超时，请检查网络后重试');
                            }else if(textStatus = 'timeout'){
                                alert('连接超时，请稍后再试');
                            }
                        }
                    });
                }
            }
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    }

}

// 修改密码验证码
function sendPwdOTP() {
    var phone = $.trim($('#phone').val());
    if (typeof pbE != 'undefined') {
        //验证输入是否是手机号，如果是手机号，则发送校验码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //检查发送验证码时间
            if ($('#btn-send')[0]) {
                var time = new Date().getTime();
                var sendOTPTime = pbE.SYS().getPrivateData('sendOTPTime');
                if (sendOTPTime) {
                    var period = time - sendOTPTime;
                    if (period > (testTiem * 1000)) {
                        $.ajax({
                            type: 'POST',
                            url: serverAddr + 'getOtp',
                            timeout:30000,
                            data: {
                                poboNumber: poboNumber,
                                loginName: phone,
                                loginType: loginType,
                                deviceId: deviceId,
                                orgNumber: orgNumber
                            },
                            dataType: 'json',
                            success: function (data) {
                                if (data.findByPhone.returnFlag == 0) {
                                    //延时器，120秒后可以重发校验码
                                    sendOTPBtn(testTiem);
                                    //存储发送验证码时间，防止用户刷新重新发送验证码
                                    pbE.SYS().storePrivateData('sendOTPTime', time + '');
                                    $('.error').addClass('hide');
                                    userId = data.findByPhone.userId;
                                } else if (data.findByPhone.returnFlag == 11) {
                                    /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                                    alert("该用户尚未注册");
                                } else {
                                    /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                    alert("发送失败，请稍后重试");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $('#backdrop').addClass('hide');
                                if(textStatus = 'error'){
                                    alert('连接超时，请检查网络后重试');
                                }else if(textStatus = 'timeout'){
                                    alert('连接超时，请稍后再试');
                                }
                            }
                        });
                    } else {
                        var countdown = testTiem - Math.round(period / 1000);
                        var i = setInterval(function () {
                            if (countdown == 0) {
                                $('#btn-send').removeClass('disabled');
                                $('#btn-send').val('获取校验码');
                                clearInterval(i);
                                return;
                            } else {
                                $('#btn-send').val('(' + countdown + 'S)');
                                $('#btn-send').addClass('disabled');
                            }
                            countdown--;
                        }, 1000);
                    }
                } else {
                    $.ajax({
                        type: 'POST',
                        url: serverAddr + 'getOtp',
                        timeout:30000,
                        data: {
                            poboNumber: poboNumber,
                            loginName: phone,
                            loginType: loginType,
                            deviceId: deviceId,
                            orgNumber: orgNumber
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.findByPhone.returnFlag == 0) {
                                sendOTPBtn(testTiem);
                                pbE.SYS().storePrivateData('sendOTPTime', time + '');
                                $('.error').addClass('hide');
                                userId = data.findByPhone.userId;
                            } else if (data.findByPhone.returnFlag == 11) {
                                /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                                alert("该用户尚未注册");
                            } else {
                                /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                alert("发送失败，请稍后重试");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#backdrop').addClass('hide');
                            if(textStatus = 'error'){
                                alert('连接超时，请检查网络后重试');
                            }else if(textStatus = 'timeout'){
                                alert('连接超时，请稍后再试');
                            }
                        }
                    });
                }
            }
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    } else {
        //验证输入是否是手机号，如果是手机号，则发送校验码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //检查发送验证码时间
            if ($('#btn-send')[0]) {
                var time = new Date().getTime();
                var sendOTPTime = localStorage.getItem('sendOTPTime');
                if (sendOTPTime) {
                    var period = time - sendOTPTime;
                    if (period > (testTiem * 1000)) {
                        $.ajax({
                            type: 'POST',
                            url: serverAddr + 'getOtp',
                            timeout:30000,
                            data: {
                                poboNumber: poboNumber,
                                loginName: phone,
                                loginType: loginType,
                                deviceId: deviceId,
                                orgNumber: orgNumber
                            },
                            dataType: 'json',
                            success: function (data) {
                                if (data.findByPhone.returnFlag == 0) {
                                    //延时器，120秒后可以重发校验码
                                    sendOTPBtn(testTiem);
                                    //存储发送验证码时间，防止用户刷新重新发送验证码
                                    localStorage.setItem('sendOTPTime', time + '');
                                    $('.error').addClass('hide');
                                    userId = data.findByPhone.userId;
                                } else if (data.findByPhone.returnFlag == 11) {
                                    /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                                    alert("该用户尚未注册");
                                } else {
                                    /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                    alert("发送失败，请稍后重试");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $('#backdrop').addClass('hide');
                                if(textStatus = 'error'){
                                    alert('连接超时，请检查网络后重试');
                                }else if(textStatus = 'timeout'){
                                    alert('连接超时，请稍后再试');
                                }
                            }
                        });
                    } else {
                        var countdown = testTiem - Math.round(period / 1000);
                        var i = setInterval(function () {
                            if (countdown == 0) {
                                $('#btn-send').removeClass('disabled');
                                $('#btn-send').val('获取校验码');
                                clearInterval(i);
                                return;
                            } else {
                                $('#btn-send').val('(' + countdown + 'S)');
                                $('#btn-send').addClass('disabled');
                            }
                            countdown--;
                        }, 1000);
                    }
                } else {
                    $.ajax({
                        type: 'POST',
                        url: serverAddr + 'getOtp',
                        timeout:30000,
                        data: {
                            poboNumber: poboNumber,
                            loginName: phone,
                            loginType: loginType,
                            deviceId: deviceId,
                            orgNumber: orgNumber
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.findByPhone.returnFlag == 0) {
                                sendOTPBtn(testTiem);
                                pbE.SYS().storePrivateData('sendOTPTime', time + '');
                                $('.error').addClass('hide');
                                userId = data.findByPhone.userId;
                            } else if (data.findByPhone.returnFlag == 11) {
                                /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                                alert("该用户尚未注册");
                            } else {
                                /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                                alert("发送失败，请稍后重试");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#backdrop').addClass('hide');
                            if(textStatus = 'error'){
                                alert('连接超时，请检查网络后重试');
                            }else if(textStatus = 'timeout'){
                                alert('连接超时，请稍后再试');
                            }
                        }
                    });
                }
            }
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    }

}

// 注册
function register() {
    var phone = $.trim($('#phone').val()),
        code = $.trim($('#code').val()),
        pwd = $.trim($('#pwdInit').val()),
        cfm = $.trim($('#confirm').val());
    if (typeof pbE != 'undefined') {
        if (isPhoneNum(phone)) {
            //判断验证码是否为空
            if (isNull(code)) {
                /*$('.error').html('请输入验证码').removeClass('hide');*/
                alert("请输入验证码");
                $('#code').focus();
                return false;
            }
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#pwdInit").focus();
                return false;
            }
            //判断密码输入是否符合规则
            if (!isRightPwd(pwd)) {
                /*$(".error").html("密码是6-16位字母和数字的组合").removeClass("hide");*/
                alert("密码是6-16位字母和数字的组合");
                $("#pwdInit").focus();
                return false;
            }
            //判断确认密码是否为空
            if (isNull(cfm)) {
                /*$(".error").html("请输入确认密码").removeClass("hide");*/
                alert("请输入确认密码");
                $("#confirm").focus();
                return false;
            }
            //判断两次输入密码是否一致
            if (cfm != pwd) {
                /*$(".error").html("两次输入密码不一致").removeClass("hide");*/
                alert("两次输入密码不一致");
                $("#confirm").focus();
                return false;
            }
            // 判断注册协议是否选择
            if (ht.checked == false) {
                alert('请选择注册协议');
                return false;
            }
            $('#backdrop').removeClass('hide');
            $.ajax({
                type: 'POST',
                url: serverAddr + 'checkRegister',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    OTP: code,
                    deviceId: deviceId,
                    pwd: pwd,
                    orgNumber: orgNumber
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.checkOTP.returnFlag == 0) {
                        $('.error').addClass('hide');
                        $('.registered').addClass('hide');
                        delete(data.checkOTP.returnFlag);
                        data.checkOTP.pwd = pwd;
                        data.checkOTP.loginName = phone;
                        data.checkOTP.loginType = loginType;
                        pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.checkOTP));
                    } else if (data.checkOTP.returnFlag == 5) {
                        $('.error').addClass('hide').empty();
                        $('.registered').removeClass('hide');
                        $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                    } else if (data.checkOTP.returnFlag == 8) {
                        $('.registered').addClass('hide');
                        /*$('.error').html('校验码错误，请重新获取').removeClass('hide');*/
                        alert("校验码错误，请重新获取");
                    } else {
                        $('.registered').addClass('hide');
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                        alert("发送失败，请稍后重试");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    } else {
        //验证输入是否是手机号，如果是手机号，则确认注册，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //判断验证码是否为空
            if (isNull(code)) {
                /*$('.error').html('请输入验证码').removeClass('hide');*/
                alert("请输入验证码");
                $('#code').focus();
                return false;
            }
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#pwdInit").focus();
                return false;
            }
            //判断密码输入是否符合规则
            if (!isRightPwd(pwd)) {
                /*$(".error").html("密码是6-16位字母和数字的组合").removeClass("hide");*/
                alert("密码是6-16位字母和数字的组合");
                $("#pwdInit").focus();
                return false;
            }
            //判断确认密码是否为空
            if (isNull(cfm)) {
                /*$(".error").html("请输入确认密码").removeClass("hide");*/
                alert("请输入确认密码");
                $("#confirm").focus();
                return false;
            }
            //判断两次输入密码是否一致
            if (cfm != pwd) {
                /*$(".error").html("两次输入密码不一致").removeClass("hide");*/
                alert("两次输入密码不一致");
                $("#confirm").focus();
                return false;
            }
            // 判断注册协议是否选择
            if (ht.checked == false) {
                alert('请选择注册协议');
                return false;
            }
            $('#backdrop').removeClass('hide');
            $.ajax({
                type: 'POST',
                url: serverAddr + 'checkRegister',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    OTP: code,
                    deviceId: deviceId,
                    pwd: pwd,
                    orgNumber: orgNumber
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.checkOTP.returnFlag == 0) {
                        $('.error').addClass('hide');
                        $('.registered').addClass('hide');
                        delete(data.checkOTP.returnFlag);
                        data.checkOTP.pwd = phone.substr(-6);
                        data.checkOTP.loginName = phone;
                        data.checkOTP.loginType = loginType;
                        // pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.checkOTP));
                        window.location.href = 'reg-regsuc.html';
                    } else if (data.checkOTP.returnFlag == 5) {
                        $('.error').addClass('hide').empty();
                        $('.registered').removeClass('hide');
                        $('.registered a').attr('href', 'reg-pwd.html?phone=' + phone);
                    } else if (data.checkOTP.returnFlag == 8) {
                        $('.registered').addClass('hide');
                        /*$('.error').html('校验码错误，请重新获取').removeClass('hide');*/
                        alert("校验码错误，请重新获取");
                    } else {
                        $('.registered').addClass('hide');
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                        alert("发送失败，请稍后重试");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    }

}

// 设置密码
function setPwd() {
    var phone = $.trim($('#phone').val()),
        code = $.trim($('#code').val()),
        pwd = $.trim($('#password').val()),
        cfm = $.trim($('#confirm').val());
    if (typeof pbE != 'undefined') {
        //验证输入是否是手机号，如果是手机号，则设置密码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //判断验证码是否为空
            if (isNull(code)) {
                /*$('.error').html('请输入验证码').removeClass('hide');*/
                alert("请请输入验证码");
                $('#code').focus();
                return false;
            }
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#password").focus();
                return false;
            }
            //判断密码输入是否符合规则
            if (!isRightPwd(pwd)) {
                /*$(".error").html("密码是6-16位字母和数字的组合").removeClass("hide");*/
                alert("密码是6-16位字母和数字的组合");
                $("#password").focus();
                return false;
            }
            //判断确认密码是否为空
            if (isNull(cfm)) {
                /*$(".error").html("请输入确认密码").removeClass("hide");*/
                alert("请输入确认密码");
                $("#confirm").focus();
                return false;
            }
            //判断两次输入密码是否一致
            if (cfm != pwd) {
                /*$(".error").html("两次输入密码不一致").removeClass("hide");*/
                alert("两次输入密码不一致");
                $("#confirm").focus();
                return false;
            }
            $('#backdrop').removeClass('hide');
            $.ajax({
                type: 'POST',
                url: serverAddr + 'changePwd',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    pwd: pwd,
                    uid: userId,
                    orgNumber: orgNumber,
                    deviceId: deviceId,
                    OS: OS,
                    version: version,
                    OTP: code
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.loginUser.returnFlag == 0) {
                        $('.error').addClass('hide');
                        delete(data.loginUser.returnFlag);
                        data.loginUser.pwd = pwd;
                        data.loginUser.loginName = phone;
                        data.loginUser.loginType = loginType;
                        pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.loginUser));
                    } else if (data.loginUser.returnFlag == 8) {
                        /*$('.error').html('校验码错误，请重新获取').removeClass('hide');*/
                        alert("校验码错误，请重新获取");
                    } else if (data.loginUser.returnFlag == 11) {
                        /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                        alert("该用户尚未注册");
                    } else {
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                        alert("发送失败，请稍后重试");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    } else {
        //验证输入是否是手机号，如果是手机号，则设置密码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //判断验证码是否为空
            if (isNull(code)) {
                /*$('.error').html('请输入验证码').removeClass('hide');*/
                alert("请请输入验证码");
                $('#code').focus();
                return false;
            }
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#password").focus();
                return false;
            }
            //判断密码输入是否符合规则
            if (!isRightPwd(pwd)) {
                /*$(".error").html("密码是6-16位字母和数字的组合").removeClass("hide");*/
                alert("密码是6-16位字母和数字的组合");
                $("#password").focus();
                return false;
            }
            //判断确认密码是否为空
            if (isNull(cfm)) {
                /*$(".error").html("请输入确认密码").removeClass("hide");*/
                alert("请输入确认密码");
                $("#confirm").focus();
                return false;
            }
            //判断两次输入密码是否一致
            if (cfm != pwd) {
                /*$(".error").html("两次输入密码不一致").removeClass("hide");*/
                alert("两次输入密码不一致");
                $("#confirm").focus();
                return false;
            }
            $('#backdrop').removeClass('hide');
            ajaxTimeoutTest = $.ajax({
                type: 'POST',
                url: serverAddr + 'changePwd',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    pwd: pwd,
                    uid: userId,
                    orgNumber: orgNumber,
                    deviceId: deviceId,
                    OS: OS,
                    version: version,
                    OTP: code
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.loginUser.returnFlag == 0) {
                        $('.error').addClass('hide');
                        delete(data.loginUser.returnFlag);
                        data.loginUser.pwd = pwd;
                        data.loginUser.loginName = phone;
                        data.loginUser.loginType = loginType;
                        location.href = 'reg-pwdsuc.html';
                    } else if (data.loginUser.returnFlag == 8) {
                        /*$('.error').html('校验码错误，请重新获取').removeClass('hide');*/
                        alert("校验码错误，请重新获取");
                    } else if (data.loginUser.returnFlag == 11) {
                        /*$('.error').html('该用户尚未注册').removeClass('hide');*/
                        alert("该用户尚未注册");
                    } else {
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                        alert("发送失败，请稍后重试");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    }

}

// 登录
function login() {
    var phone = $.trim($('#phone').val()),
        pwd = $.trim($('#password').val());
    if (typeof pbE != "undefined") {
        //验证输入是否是手机号，如果是手机号，则设置密码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#password").focus();
                return false;
            }
            $('#backdrop').removeClass('hide');
            $.ajax({
                type: 'POST',
                url: serverAddr + 'login',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    pwd: pwd,
                    orgNumber: orgNumber,
                    deviceId: deviceId,
                    OS: OS,
                    version: version
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.loginUser.returnFlag == 0) {
                        $('.error').addClass('hide');
                        delete(data.loginUser.returnFlag);
                        data.loginUser.pwd = pwd;
                        data.loginUser.loginName = phone;
                        data.loginUser.loginType = loginType;
                        pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.loginUser));
                    } else if (data.loginUser.returnFlag == 2) {
                        /*$('.error').html('账号或密码有误，请修改后重试').removeClass('hide');*/
                        alert("账号或密码有误，请修改后重试");
                        $('#phone').focus();
                    } else {
                        alert("发送失败，请稍后重试");
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    } else {
        //验证输入是否是手机号，如果是手机号，则设置密码，不是则显示错误信息
        if (isPhoneNum(phone)) {
            //判断密码是否为空
            if (isNull(pwd)) {
                /*$(".error").html("请输入密码").removeClass("hide");*/
                alert("请输入密码");
                $("#password").focus();
                return false;
            }
            $('#backdrop').removeClass('hide');
            $.ajax({
                type: 'POST',
                url: serverAddr + 'login',
                timeout:30000,
                data: {
                    poboNumber: poboNumber,
                    loginName: phone,
                    loginType: loginType,
                    pwd: pwd,
                    orgNumber: orgNumber,
                    deviceId: deviceId,
                    OS: OS,
                    version: version
                },
                dataType: 'json',
                success: function (data) {
                    $('#backdrop').addClass('hide');
                    if (data.loginUser.returnFlag == 0) {
                        $('.error').addClass('hide');
                        delete(data.loginUser.returnFlag);
                        data.loginUser.pwd = pwd;
                        data.loginUser.loginName = phone;
                        data.loginUser.loginType = loginType;
                        location.href = '../../main/index.html';
                    } else if (data.loginUser.returnFlag == 2) {
                        /*$('.error').html('账号或密码有误，请修改后重试').removeClass('hide');*/
                        alert("账号或密码有误，请修改后重试");
                        $('#phone').focus();
                    } else {
                        alert("发送失败，请稍后重试");
                        /*$('.error').html('连接超时，请检查网络后重试').removeClass('hide');*/
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#backdrop').addClass('hide');
                    if(textStatus = 'error'){
                        alert('连接超时，请检查网络后重试');
                    }else if(textStatus = 'timeout'){
                        alert('连接超时，请稍后再试');
                    }
                }
            });
        } else {
            /*$('.error').html('请输入正确的手机号').removeClass('hide');*/
            alert("请输入正确的手机号");
            $('#phone').focus();
        }
    }

}

//当用户输入完之后，按回车键，立马跳到下一个输入框，到最后一个输入框输入完成时，就按回车，focus到提交标签那里
function jump(next) {
    var nextInp = document.getElementById(next);
    var event = arguments.callee.caller.arguments[0] || window.event;
    if (event.keyCode == 13) {//判断是否按了回车，enter的keycode代码是13
        nextInp.focus();
    }
}

//点击空白处键盘收起
function fold() {
    $('input').blur();
}

// 返回
function goBack() {
    if (typeof pbE != 'undefined') {
        location.href = 'goBack';
    } else {
        location.href = document.referrer;
    }
}