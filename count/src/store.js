import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:0,
        waiting:false,
        anotherIncrement:6
    },
    mutations:{
        INCREMENT(state){
            state.count++;
        },
        DECREMECT(state){
            state.count--;
        },
        INCREMENT_WITH_VALUE(state,value){
            state.count += value;
        },
        SHOW_WAITING_MESSAGE(state){
            state.waiting = true;
        },
        HIDE_WAITING_MESSAGE(state){
            state.waiting = false;
        }
    },
    actions:{
        increment({commit}){
            commit('INCREMENT');
        },
        decremect({commit}){
            commit('DECREMECT');
        },
        incrementWithValue({commit},value){
            // commit('INCREMENT_WITH_VALUE',parseInt(value));
            // let intValue = parseInt(value);
            // if(isNaN(intValue)){
            //     throw "not an Interget"
            // }else{
            //     commit('INCREMENT_WITH_VALUE',intValue)
            // }

            //如果action 中进行的是异步操作，那就需要在回调函数中进行错误处理
            let intValue = parseInt(value);
            setTimeout(function () {
                if(isNaN(intValue)){
                    alert('not an interget')
                }else{
                    commit('INCREMENT_WITH_VALUE',intValue)
                }
            },2000)
        }
    },
    getters:{
        countAnother(state){
            return state.anotherIncrement;
        }
    }
});

export default store;