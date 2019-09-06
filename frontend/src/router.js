/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-09-04 18:59:13
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
Vue.use(Router);
console.log(process.env.BASE_URL, "process.env.BASE_URL");
const route = new Router({
    mode: "history",
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
