/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
let router = new Router({
    // history模式需要后台支持
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
        name: "index",
        path: "/index",
        component: require('./../view/indexNm.vue')//res => require(['./../view/indexNm.vue'], res)
    }, {
        name: "home",
        path: "/home",
        component: require('./../view/home.vue')//res => require(['./../view/home.vue'], res)
    }, {
        name: "institution",
        path: "/institution",
        meta: { noAuth: true },
        component: require('./../view/institution.vue')//res => require(['./../view/institution.vue'], res)
    }, {
        name: "checkCompany",
        path: "/checkCompany",
        component: require('./../view/checkCompany.vue')//res => require(['./../view/checkCompany.vue'], res)
    }, {
        name: "institutionChart",
        path: "/institutionChart",
        component: require('./../view/institutionChart.vue')//res => require(['./../view/institutionChart.vue'], res)
    }, {
        name: "meeting",
        path: "/meeting",
        component: require('./../view/meeting.vue')//res => require(['./../view/meeting.vue'], res)
    }, {
        name: "meetingList",
        path: "/meetingList",
        component: require('./../view/meetingList.vue')//res => require(['./../view/meetingList.vue'], res)
    }, {
        name: "informationList",
        path: "/informationList",
        component: require('./../view/informationList.vue')//res => require(['./../view/informationList.vue'], res)
    }, {
        name: "signUp",
        path: "/signUp",
        component: require('./../view/signUp.vue')//res => require(['./../view/signUp.vue'], res)
    }, {
        name: "standardContract",
        path: "/standardContract",
        component: require('./../view/standardContract.vue')//res => require(['./../view/standardContract.vue'], res)
    }, {
        name: "mapList",
        path: "/mapList",
        component: require('./../view/mapList.vue')//res => require(['./../view/mapList.vue'], res)
    }, {
        name: "mapDetail",
        path: "/mapDetail",
        component: require('./../view/mapDetail.vue')//res => require(['./../view/mapDetail.vue'], res)
    }, {
        name: "marginComputed",
        path: "/marginComputed",
        component: require('./../view/marginComputed.vue')//res => require(['./../view/marginComputed.vue'], res)
    }, {
        name: "incomeComputed",
        path: "/incomeComputed",
        component: require('./../view/incomeComputed.vue')//res => require(['./../view/incomeComputed.vue'], res)
    }, {
        name: "nationalDebt",
        path: "/nationalDebt",
        component: require('./../view/nationalDebt.vue')//res => require(['./../view/nationalDebt.vue'], res)
    }, {
        name: "companyIntroduce",
        path: "/companyIntroduce",
        component: require('./../view/companyIntroduce.vue')//res => require(['./../view/companyIntroduce.vue'], res)
    }, {
        name: "detail",
        path: "/detail",
        component: require('./../view/detail.vue')//res => require(['./../view/detail.vue'], res)
    }, {
        name: "tradeCalendar",
        path: "/tradeCalendar",
        component: require('./../view/tradeCalendar.vue')//res => require(['./../view/tradeCalendar.vue'], res)
    }, {
        name: "inventory",
        path: "/inventory",
        component: require('./../view/inventory.vue')//res => require(['./../view/inventory.vue'], res)
    }]
});
//路由跳转钱操作
router.beforeEach((to, form, next) => {
    next();
})

export default router;
