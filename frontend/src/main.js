/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime: 2019-09-11 12:59:06
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
import io from "socket.io-client";
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

//
function notifyMe(title, options, data) {
    // 先检查浏览器是否支持
    console.log("%c 这儿触发几次", "background:#aaa;color:#bada55");
    if (!window.Notification) {
        console.log("浏览器不支持通知");
    } else {
        // 检查用户曾经是否同意接受通知
        if (Notification.permission === "granted") {
            var notification = new Notification(title, options); // 显示通知
            notification.onclick = function(options) {
                console.log(data.url, data);
                window.open(data.url); // 不触发
            };
        } else if (Notification.permission === "default") {
            // 用户还未选择，可以询问用户是否同意发送通知
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("用户同意授权");
                    var notification = new Notification(title, options); // 显示通知
                    notification.onclick = function(options) {
                        window.open(data.url);
                    };
                } else if (permission === "default") {
                    console.warn("用户关闭授权 未刷新页面之前 可以再次请求授权");
                } else {
                    // denied
                    console.log("用户拒绝授权 不能显示通知");
                }
            });
        } else {
            // denied 用户拒绝
            console.log("用户曾经拒绝显示通知");
        }
    }
}
console.log(store);
var socket = io("http://localhost:4000");
socket.on("comment", data => {
    if (data.person != localStorage.getItem("name")) {
        return;
    }
    var options = {
        dir: "auto", // 文字方向
        body: `${data.user}评论了你的帖子`, // 通知主体
        requireInteraction: false, // 不自动关闭通知
        url: data.url
        // 通知图标
    };
    notifyMe("通知", options, data);
});

socket.on("disconnect", function(data) {
    // console.log(colors.green('disconnect'),data)
});
new Vue({
    router,
    vuetify: theme,
    store,
    render: h => h(App)
}).$mount("#app");
