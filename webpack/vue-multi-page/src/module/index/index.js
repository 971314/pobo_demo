/**
 * Created by xiajing on 2017/3/8.
 */
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
//import  configRouter   from './routerConfig.js';
import '../../assets/common.css';
import '../../assets/impression.css';
import Impression from 'vue-impression';
Vue.use(Impression);
Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    { path:'/',component: require('./App.vue')},
    {path:'/list',component:require('./components/list.vue')}
  ]
})
const app = new Vue({ router}).$mount('#app');

