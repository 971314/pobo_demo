var Vuex = require('vuex');

const AppCertifyInfo = util.getAppCertifyInfo();
const DeviceJsonInfo = util.getDeviceJsonInfo();
window.config = util.readConfig();

const store = new Vuex.Store({
  state: {
    title: '认证',
    goBack: 'goBack',
    jgid: DeviceJsonInfo.jgid,
    LoginName: AppCertifyInfo.LoginName,
    Token: AppCertifyInfo.Token,
    UserId: AppCertifyInfo.UserId,
    name: '',
    id: '',
    level: 0,
    assetProds: [],
    wealthProds: [],
    detlProd: {},
    orderPhoneNum: ''
  },
  mutations: {
    changeTitle (state, newTitle) {
      state.title = newTitle;
    },
    changeGoBack (state, newGoBack) {
      state.goBack = newGoBack;
    },
    changeName (state, newName) {
      state.name = newName;
    },
    changeId (state, newId) {
      state.id = newId;
    },
    changeLevel (state, newLevel) {
      state.level = newLevel;
    },
    changeAssetProds (state, newAssetProds) {
      state.assetProds = newAssetProds;
    },
    changeWealthProds (state, newWealthProds) {
      state.wealthProds = newWealthProds;
    },
    changeDetlProd (state, newDetlProd) {
      state.detlProd = newDetlProd;
    },
    changeOrderPhoneNum (state, newPhoneNum) {
      state.orderPhoneNum = newPhoneNum;
    }
  }
});

module.exports = store;