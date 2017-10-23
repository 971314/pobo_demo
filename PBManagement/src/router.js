import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: resolve => require(['./components/Login.vue'], resolve) },
  {
    path: '/', component: resolve => require(['./components/Main.vue'], resolve),
    children: [
      { path: '', component: resolve => require(['./components/Welcom.vue'], resolve) },
      // { path: 'subpage', component: resolve => require(['./components/Subpage.vue'], resolve) },
      { path: 'notify', component: resolve => require(['./components/Notify.vue'], resolve) },
      { path: 'password', component: resolve => require(['./components/Password.vue'], resolve) },
      {
        path: 'userroot', component: resolve => require(['./components/UserRoot.vue'], resolve),
        children: [
          { path: '', component: resolve => require(['./components/UserQuery.vue'], resolve) },
          { path: 'useradd', component: resolve => require(['./components/UserAdd.vue'], resolve) },
          { path: 'role', component: resolve => require(['./components/RoleQuery.vue'], resolve) },
          { path: 'roleadd', component: resolve => require(['./components/RoleAdd.vue'], resolve) },
          { path: 'auz', component: resolve => require(['./components/AuzQuery.vue'], resolve) },
          { path: 'opslog', component: resolve => require(['./components/OperationsLog.vue'], resolve) },
          // { path: 'auzadd', component: resolve => require(['./components/AuzAdd.vue'], resolve) }
        ]
      }
    ]
  },
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

export default router;