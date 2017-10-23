var Vue = require('vue');
var VueRouter = require('vue-router');
var Vuex = require('vuex');
var Nav = require('./components/Nav.vue');
var Main = require('./components/Main.vue');

Vue.use(VueRouter);
Vue.use(Vuex);

var router = require('./router.js');
var store = require('./store.js');

var nav = new Vue ({
  el: '#nav',
  store,
  render: h => h(Nav)
});

var main = new Vue({
  el: '#main',
  router,
  store,
  render: h => h(Main)
});
