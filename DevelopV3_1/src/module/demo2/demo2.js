/**
 * Created by xiajing on 2017/3/8.
 */
import Vue from 'vue';
import App from './app.vue';
import Impression from 'vue-impression';
import '../../assets/style/impression.css';

Vue.use(Impression);

new Vue({
    el:'#app',
    components:{App}
})
