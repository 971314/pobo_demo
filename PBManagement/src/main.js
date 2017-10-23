import Vue from 'vue';
import Axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './css/common.css';
import router from './router.js';
import store from './store.js';

// import './util/mockData.js';

Vue.use(ElementUI);

Axios.defaults.baseURL = PBConf.baseURL;
Axios.defaults.withCredentials = false;
Vue.prototype.$axios = Axios;

router.beforeEach((to, from, next) => {
  let user = window.sessionStorage.getItem('userInfo');
  if (to.path !='/login' && !user) {
    next('/login');
  } else {
    next();
  }
})

const main = new Vue({
  el: '#main',
  router,
  store
});
