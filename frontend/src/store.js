/*
 * @Description: 状态管理
 * @Author: homobulla
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-09-23 10:34:53
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import { LOGIN_STATUS, LOGIN_INFO } from "./store/mutation-types.js";

export default new Vuex.Store({
    state: {
        isLogin: ""
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
    actions: {},
    plugins: [createPersistedState()]
});
