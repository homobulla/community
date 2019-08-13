import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./components/toast/plugin";
Vue.use(toast);
Vue.use(Vuetify);
import api from "./utils/api";
global.api = api;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
