/*
 * @Description: 封装axios
 * @Author: your homobulla
 * @Date: 2019-08-13 10:23:30
 * @LastEditTime: 2019-08-23 14:57:11
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
import QS from "qs";
// axios.use(Toast);
import Vue from "vue";
import router from "../router";
import { setTimeout } from "timers";
// 环境切换
const surroundings = {
    development: "http://10.0.0.101:4000/",
    production: ""
};
axios.defaults.baseURL = surroundings[process.env.NODE_ENV];

// 请求超时时长
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
//  请求拦截
axios.interceptors.request.use(
    config => {
        // 这里的config包含每次请求的内容

        if (localStorage.getItem("token")) {
            config.headers.Authorization = localStorage.getItem("token");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const Toast = Vue.prototype.$toast;
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    Toast({
                        content: "未登录",
                        type: "warning"
                    });
                    // localStorage.removeItem("token");
                    setTimeout(() => {
                        router.replace({
                            path: "/login",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);

                    break;

                case 403:
                    Toast({
                        content: "登录过期，请重新登录",
                        type: "warning"
                    });
                    // 清除token
                    localStorage.removeItem("token");
                    store.commit("loginSuccess", null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: "/login",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    Toast({
                        content: "网络请求不存在",
                        type: "error"
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        content: error.response.data.log,
                        type: "error"
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, QS.stringify(params))
            .then(res => {
                Vue.prototype.$toast({
                    content: res.data.log,
                    type: res.data.success ? "success" : "error"
                });
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
