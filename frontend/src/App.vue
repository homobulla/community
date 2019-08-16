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
                    <v-btn class="primary">
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
export default {
    components: {
        MyFooter
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
