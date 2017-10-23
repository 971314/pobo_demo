/**
 * Created by pobo on 2017/3/24.
 */
import Vue from 'vue';
import myInfo from './myInfo.vue';
import '../../assets/style/common.css';

new Vue({
  el:'#myInfo',
  render:h => h(myInfo)
})
