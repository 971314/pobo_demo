var VueRouter = require('vue-router');
var ErrorPage = require('./components/Error.vue');
var Nsp = require('./components/Nsp.vue');
var Qii = require('./components/Qii.vue');
var Risk = require('./components/Risk.vue');
var Rslt = require('./components/Rslt.vue');
var Private = require('./components/Private.vue');
var Order = require('./components/Order.vue');
var Detail = require('./components/Detail.vue');
var Hnv = require('./components/Hnv.vue');
var Binfo = require('./components/Binfo.vue');
var Prate = require('./components/Prate.vue');
var Prc = require('./components/Prc.vue');
var Oinfo = require('./components/Oinfo.vue');
var Phone = require('./components/Phone.vue');
var Query = require('./components/Query.vue');

const routes = [
  { path: '/', component: ErrorPage },
  { path: '/order/:flag', component: Order },
  { path: '/nsp', component: Nsp },
  { path: '/qii', component: Qii },
  { path: '/risk/:flag', component: Risk },
  { path: '/rslt', component: Rslt },
  { path: '/private', component: Private },
  { path: '/detail', component: Detail },
  { path: '/hnv', component: Hnv },
  { path: '/binfo', component: Binfo },
  { path: '/prate', component: Prate },
  { path: '/prc', component: Prc },
  { path: '/oinfo', component: Oinfo },
  { path: '/phone', component: Phone },
  { path: '/query', component: Query },
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

function bodyScroll(event) {
  event.preventDefault();
}
router.beforeEach((to, from, next) => {
  $('body').removeClass();
  $('body').scrollTop(0);
  if (to.path =='/hnv') {
    document.addEventListener('touchmove', bodyScroll, false);
  } else {
    document.removeEventListener('touchmove', bodyScroll, false);
  }
  next();
})

module.exports = router;