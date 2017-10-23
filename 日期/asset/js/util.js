var isPoboApp = typeof pbE != 'undefined';
if (isPoboApp) {
  var pbESYS = pbE.SYS();
}
var util = {
  // 判断是否为手机号
  isPhoneNum: function (val) {
    return !!val.match(/^\d{11}$/);
  },
  // 判断是否为空
  isNull: function (val) {
    if ($.trim(val).length == 0) {
      return true;
    }
    return false;
  },
  isIDNo: function (val) {
    return !!val.match(/(^\d{17}(\d|X|x)$)/);
  },
  getDeviceJsonInfo: function () {
    var DeviceJsonInfo = {};
    if (isPoboApp) {
      DeviceJsonInfo = JSON.parse(pbESYS.getDeviceJsonInfo());
    }
    return DeviceJsonInfo;
  },
  getAppCertifyInfo: function () {
    var AppCertifyInfo = {};
    if (isPoboApp) {
      AppCertifyInfo.LoginName = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
      AppCertifyInfo.Token = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_Token');
      AppCertifyInfo.UserId = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');
    }
    return AppCertifyInfo;
  },
  storePrivateData: function (key, value) {
    if (isPoboApp) {
      return pbESYS.storePrivateData(key, value);
    } else {
      return false;
    }
  },
  getPrivateData: function (key) {
    if (isPoboApp) {
      return pbESYS.getPrivateData(key);
    } else {
      return null;
    }
  },
  readConfig: function () {
    var config = {};
    if (isPoboApp) {
      config = JSON.parse(pbESYS.readConfig("asset/conf/asset.json"));
    } else {
      $.ajax({
        url: 'conf/asset.json',
        async: false,
        dataType: 'json',
        success: function (data) {
          config = data;
        }
      });
    }
    return config;
  }
}