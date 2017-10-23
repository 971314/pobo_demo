import Vue from 'vue'
import VueRouter from 'vue-router';
import '../../assets/style/impression.css';
import './css/indNews.css';
import '../../assets/js/jroll.min.js'
import Impression from 'vue-impression';
import pbUI from '../../components'

/*import info from './Index.vue';
import details from './view/details.vue';*/

Vue.use(Impression);
Vue.use(VueRouter)
Vue.use(pbUI)

const router = new VueRouter({
  routes:[
    { path:'/',component: require('./Index.vue'),
      children:[
        {path:'/jtyx',component:require('./view/jtyx.vue')},
        {path:'/hyzx',component:require('./view/hyzx.vue')}
      ]
    },
    {
      path: '/details/:id', component: require('./view/details.vue')
    }
  ]
})

//const app = new Vue({ router}).$mount('#app');

/*new Vue({
  el: '#app',
  render: h => h(App)
})*/
new Vue({
  el:'#app',
  router
});