import Vue from 'vue';
import Impression from 'vue-impression';
import Index from './Index.vue';

Vue.use(Impression);

const index = new Vue({
  el: '#app',
  render: h => h(Index)
});