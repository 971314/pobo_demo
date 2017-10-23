/**
 * Created by xiajing on 2017/3/8.
 */
import Vue from 'vue';
import '../../assets/style/impression.css';
import Impression from 'vue-impression';
import App from './index.vue';
Vue.use(Impression);
new Vue({
    el:'#app',
    components:{App}
})
