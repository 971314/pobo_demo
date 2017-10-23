import Vue from 'vue';
import VueRouter from 'vue-router';
import Impression from 'vue-impression';
import Index from './Index.vue';
import My from './view/My.vue';
import Risk from './view/Risk.vue';
import Qii from './view/Qii.vue';
import Qnr from './view/Qnr.vue';
import Rslt from './view/Rslt.vue';
import CoList from './view/CoList.vue';
import Invitation from './view/invitation.vue';
import pbUI from '../../components';

Vue.use(pbUI);
Vue.use(Impression);
Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    { path: '/', component: My },
    { path: '/list', component: CoList },
    { path: '/invitation', component: Invitation },
    {
      path:'/risk',
      component: Risk,
      children: [
        { path:'',component: Qii },
        { path:'qnr',component: Qnr },
        { path:'rslt/:rslt',component: Rslt }
      ]
    }
  ]
});

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
