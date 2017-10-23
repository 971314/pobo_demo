/**
 * Created by kuo zi on 2016/10/18.
 */
import Vue from "vue";
import axios from "axios";
import restUrl from "./config/restUrl";
import config from "./../../config/config.js";
import uiHead from "./../components/uiHead";
import coMessageIcon from "./../components/coMessageIcon.vue";
import coCommonNav from "./../components/coCommonNav.vue";

let projectPrefix = [];
for (let i in config.projectConfig) {
    if (process.env.NODE_ENV == 'dev') {
        projectPrefix[i] = config.projectConfig[i].projectPrefix + "/";
    }
    if (process.env.NODE_ENV == 'production') {
        projectPrefix[i] = config.projectConfig[i].productionServer + "/" + config.projectConfig[i].projectPrefix + "/";
    }
}

//全局混合
Vue.mixin({
    components: {
        "ui-head": uiHead,
        "message-icon": coMessageIcon,
        "common-nav": coCommonNav
    },
    data() {
        return {
            // 图片服务器前缀
            PrefixImg: config.PrefixImg + "/",
            pageSize: 15
        }
    },
    methods: {
        /**
         *get请求
         * @param restKey [项目索引,url键]
         * @param join url拼接
         */
        $get(restKey, join, options, noloading) {
            if (!noloading) {
                this.$loading();
            }
            //快捷写法 默认第一个项目
            if (typeof restKey === "string") {
                restKey = [0, restKey];
            }
            return new Promise((resolve, reject) => {
                axios.get(join ? projectPrefix[restKey[0]] + restUrl[restKey[1]].url + "/" + join : projectPrefix[restKey[0]] + restUrl[restKey[1]].url, options)
                    .then(res => {
                        if (!noloading) {
                            this.$loaded();
                        }
                        if (res.data.code == 0) {
                            resolve ? resolve(res.data.data || {}) : null;
                        } else if (res.data.code == 999) {
                            this.$router.push("login");
                        } else {
                            if (restKey != 'auth') {
                                this.$toast(res.data.message);
                            }
                            reject ? reject() : null;
                        }
                    }, res => {
                        this.$toast("请求服务器失败，请稍后再试");
                        this.$loaded();
                        reject ? reject() : null;
                    });
            });
        },
        /**
         *post请求
         * @param restKey [项目索引,url键]
         * @param params 请求参数
         */
        $post(restKey, params, join, options, noloading) {
            if (!noloading) {
                this.$loading();
            }
            if (typeof restKey === "string") {
                restKey = [0, restKey];
            }
            return new Promise((resolve, reject) => {
                axios.post(join ? projectPrefix[restKey[0]] + restUrl[restKey[1]].url + "/" + join : projectPrefix[restKey[0]] + restUrl[restKey[1]].url, params, options)
                    .then((res) => {
                        if (!noloading) {
                            this.$loaded();
                        }
                        if (res.data.code == 0) {
                            resolve ? resolve(res.data.data || {}) : null;
                        } else {
                            if (restKey != 'auth') {
                                this.$toast(res.data.message);
                            }
                            reject ? reject() : null;
                        }
                    }, () => {
                        this.$toast("请求服务器失败，请稍后再试");
                        this.$loaded();
                        reject ? reject() : null;
                    });
            });
        },
        /**
         * [$back description]返回事件
         * @return {[type]} [description]
         */
        $back() {
            window.history.back("-1");
        },
        $loading() {
            this.$store.commit("loading");
        },
        $loaded() {
            this.$store.commit("loaded");
        },
        /**
         * [$encodeURI description] encode url 默认encode当前url
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        $encodeURI(url) {
            return window.encodeURIComponent(url ? url : window.location);
        },
        /**
         * [$decodeURI description] decode url
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        $decodeURI(url) {
            return window.decodeURIComponent(url);
        },
        $getParam(key, url) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = (url ? url : window.location).search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
    },
    beforeDestroy() {
        this.$loaded ? this.$loaded() : null;
        this.$loaded ? this.$loaded() : null;
        this.$indicator ? this.$indicator.close() : null;
    }
});
