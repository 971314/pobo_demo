import Vue from 'vue';
import VueRouter from 'vue-router';
import Impression from 'vue-impression';
import Index from './Index.vue';
import Qii from './view/Qii.vue';
import Risk from './view/Risk.vue';
import Rslt from './view/Rslt.vue';

Vue.use(Impression);
Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    { path:'/',component: Qii },
    { path:'/risk',component: Risk },
    { path:'/rslt/:rslt',component: Rslt },
  ]
});

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});