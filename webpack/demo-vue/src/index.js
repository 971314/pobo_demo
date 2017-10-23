/**
 * Created by pobo on 2017/3/8.
 */
import Vue from 'vue';
import isApp from './component/isApp.vue';
new Vue({
    el:'#app',
    render:h => h(isApp)
});