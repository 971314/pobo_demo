import Vue from 'vue';
import VueScroller from 'vue-scroller';
import App from './App.vue';


Vue.use(VueScroller)

new Vue({
  el: '#app',
  render: h => h(App)
})
