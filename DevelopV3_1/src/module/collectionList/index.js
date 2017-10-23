/**
 * Created by pobo on 2017/3/24.
 */
import Vue from 'vue';
import collection from './collection.vue';
import '../../assets/style/common.css';

new Vue({
  el:'#collection',
  render:h => h(collection)
});
