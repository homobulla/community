<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 17:32:50
 * @LastEditTime: 2019-09-04 18:57:50
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="login">
        <p>欢迎</p>
        <div>
            <form action>
                <input type="text" placeholder="用户名" v-model="name" />
                <input type="password" placeholder="密码" v-model="password" autocomplete="on" />
            </form>
            <v-btn @click="login">登录</v-btn>
        </div>
    </div>
</template>
<script>
import rsa from "../utils/rsa";
import { mapMutations } from "vuex";
export default {
    name: "login",
    data() {
        return {
            name: "",
            password: ""
        };
    },
    created() {
        // console.log(this.$route.path);
    },
    methods: {
        ...mapMutations(["LOGIN_STATUS"]),
        login() {
            console.log(this.$route.path);

            if (!this.name || !this.password) {
                this.$toast({
                    content: "请填写完整信息",
                    type: "warning"
                });
                return;
            }
            let password = rsa(String(this.password)); //加密
            api.login({ name: this.name, password })
                .then(res => {
                    this.$loading(false);
                    if (res.success) {
                        localStorage.setItem("userId", res.data.id);
                        localStorage.setItem("name", res.data.user);
                        localStorage.setItem("login", "success");
                        this.LOGIN_STATUS(true);
                        let path = this.$route.query.redirect;
                        path = path ? path : "/";
                        this.$router.push(path);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted: function() {}
};
</script>

<style lang="scss" scoped>
    .login {
        margin: 100px 0 200px;
    }
</style>
