/*
 * @Description: 状态管理
 * @Author: homobulla
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-09-11 12:46:19
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { LOGIN_STATUS, LOGIN_INFO } from "./store/mutation-types.js";

export default new Vuex.Store({
    state: {
        isLogin: "111"
    },
    // getters属性可以做 store 的计算，依赖改变而改变
    // getters: {
    //     change: state => tag => {
    //         return "ccc";
    //     }
    // },
    mutations: {
        [LOGIN_STATUS](state, stauts) {
            state.isLogin = stauts;
        },
        [LOGIN_INFO](state, obj) {
            Object.assign(state, obj);
        }
    },
    actions: {}
});
