import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    jgid: '1000',
    LoginName: '',
    Token: '',
    UserId: '',
  },
  mutations: {
    login (state, userInfo) {
      if (userInfo) {
        state.LoginName = userInfo.loginName;
        state.Token = userInfo.token;
        state.UserId = userInfo.userId;
      } else {
        state.LoginName = '';
        state.Token = '';
        state.UserId = '';
      }
    }
  }
});

export default store;