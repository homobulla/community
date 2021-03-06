/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-09-11 13:01:11
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
Vue.use(Router);
//测试合并分支的问题
const route = new Router({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },

        {
            path: "/postView",
            name: "postView",
            component: () => import("./views/PostView.vue"),
            meta: {
                login: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/login.vue")
        }
    ]
});

route.beforeEach((to, from, next) => {
    if (to.meta.login) {
        console.log(store.state, "state");
        if (!store.state.isLogin) {
            route.replace({
                path: "/login",
                query: {
                    redirect: route.currentRoute.fullPath
                }
            });
        }
        next();
    }
    next();
});

export default route;
