/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-08-23 16:56:43
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./assets/css/public.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./components/toast/plugin";
import loading from "./components/loading/plugin";

import colors from "vuetify/lib/util/colors";
const theme = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3
            },
            dark: {
                primary: colors.blue.lighten3
            }
        }
    }
});
Vue.use(toast);
Vue.use(loading);
Vue.use(Vuetify);
import api from "./utils/api";
global.api = api;

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify: theme,
    store,
    render: h => h(App)
}).$mount("#app");
