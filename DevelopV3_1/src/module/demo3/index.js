/**
 * Created by pobo on 2017/3/20.
 */
import Vue from 'vue';
import app from './app.vue';
import Impression from 'vue-impression';
import '../../assets/style/common.css';
import '../../assets/style/impression.css'
// import '../../../node_modules/vue-impression/dist/styles/index.scss';
// import 'myProjectCss';
Vue.use(Impression);
new Vue({
  el:'#app',
  render: h => h(app)
});
