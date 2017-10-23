// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'; //阿里js
import VueImpression from 'vue-impression';
import './assets/scss/impression.scss';

Vue.use(VueImpression);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
