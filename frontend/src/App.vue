<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:57:52
 * @LastEditTime : 2020-01-12 15:13:34
 * @LastEditors  : Please set LastEditors
 -->
<template>
    <div id="app">
        <v-app>
            <div id="nav">
                <div class="text-center header">
                    <v-btn class="indigo">
                        <router-link to="/">首页</router-link>
                    </v-btn>
                    <v-btn class="deep-purple lighten-2">我的文章</v-btn>
                    <v-btn class="blue lighten-3">发布文章</v-btn>
                    <v-btn class="primary" v-if="$store.state.isLogin" @click="loginout">退出登录</v-btn>
                    <v-btn class="primary" v-else>
                        <router-link to="/login">登录</router-link>
                    </v-btn>

                    <v-btn class="teal">注册</v-btn>
                </div>
            </div>
            <router-view />
            <MyFooter />
        </v-app>
    </div>
</template>
<script>
import MyFooter from "./components/MyFooter";
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        MyFooter
    },
    data() {
        return {
            // isLogin: this.$store.state.isLogin
        };
    },
    computed: {
        // ...mapState(["isLogin"])
    },
    mounted() {},
    methods: {
        ...mapMutations(["LOGIN_STATUS"]),
        loginout() {
            api.loginout()
                .then(res => {
                    if (res.success) {
                        localStorage.removeItem("login");
                        localStorage.removeItem("name");
                        localStorage.removeItem("userId");
                        this.LOGIN_STATUS(false);
                    }
                })
                .catch(err => {});
        }
    }
};
</script>
<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .header .v-btn {
        margin: 0 12px;
    }
</style>
