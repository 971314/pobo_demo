// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from "lodash";
import "./../static/PB.Api.js";
import "./../static/PB.Page.js";
import Vue from "vue";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from './routers/router';
import store from './store/store';
import "./common/directive";
import "./common/mixin";
import "./common/filter";
import App from "./App";

import vueEventCalendar from './components/plugs/vue-event-calendar/index.js';
Vue.use(vueEventCalendar, {locale: 'zh',color: '#eb1212'});

import FastClick from "fastclick";

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);

Vue.use(MintUI);

Vue.config.devtools = true;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
