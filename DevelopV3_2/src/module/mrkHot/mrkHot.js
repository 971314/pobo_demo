import Vue from 'vue'
import App from './Index'
import VueRouter from 'vue-router';
import '../../assets/style/impression.css';
import Impression from 'vue-impression';
import Axios from 'axios';
import './css/mrkHot.css';
import pbUI from '../../components'

Vue.use(Impression);
Vue.use(VueRouter)
Vue.use(Axios)
Vue.use(pbUI)

const router = new VueRouter({
  routes:[
    { path:'/',component: require('./Index.vue'),
     children:[
        {path:'/mrkHot',component:require('./view/mrkHot.vue'),
           children:[
            {path:'/zjlx',component:require('./view/zjlx.vue')},
            {path:'/zjcd',component:require('./view/zjcd.vue')},
            {path:'/hypz',component:require('./view/hypz.vue')}
          ]
        },
        {path:'/jgdx',component:require('./view/jgdx.vue')},
        {path:'/tlfx',component:require('./view/tlfx.vue')},
        {path:'/cdkc',component:require('./view/cdkc.vue')}
      ]
    },
    {
      path:'/details',component: require('./components/details.vue')
    }
  ]
})

//const app = new Vue({ router}).$mount('#app');

/*new Vue ({
  el: '#app',
  render: h => h(App)
});*/

window.parseJSON = function(text)
    {
        var tempStr = text.replace(/\r\n/g,"").replace(/\n/g,"").replace(/\\/g, "/");
        return JSON.parse(tempStr);
    }


new Vue({
  el:'#app',
  router
});