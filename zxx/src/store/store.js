/**
 * Created by kuo zi on 2016/10/19.
 */
import Vue from "vue";
import Vuex from "vuex";
import nav from "./modules/nav";
//import webIm from "./modules/webIm";
//import DB from "./modules/DB";
//import webImListener from "./plugins/webImListener";
//import timer from "./plugins/timer";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //加载中
        spinner: true,
        loading: false,
        // 当前时间
        now: 0,
    },
    mutations: {
        spinner(state, param) {
            state.spinner = param;
        },
        loading(state) {
            state.loading = true;
        },
        loaded(state) {
            state.loading = false;
        },
        timer(state, now) {
            state.now = now;
        }
    },
    actions: {
        filterSensitiveWords({ state }, message) {
            return new Promise((resolve, reject) => {
                for (let sensitiveWord of state.sensitiveWords) {
                    let regExp = new RegExp(sensitiveWord, "g");
                    let replaceWord = "";
                    for (let i = 0; i < sensitiveWord.length; i++) {
                        replaceWord = (replaceWord + "*");
                    }
                    message = message.replace(regExp, replaceWord);
                }
                resolve(message);
            });
        }
    },
    modules: {
        nav
    },
    getters: {

    },
    plugins: []
});

export default store;
