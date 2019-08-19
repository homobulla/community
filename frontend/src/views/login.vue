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
export default {
    name: "login",
    data() {
        return {
            name: "",
            password: ""
        };
    },
    methods: {
        login() {
            if (!this.name || !this.password) {
                this.$toast({
                    content: "请填写完整信息",
                    type: "warning"
                });
                return;
            }
            // this.$loading(true);

            api.login({ name: this.name, password: this.password })
                .then(res => {
                    this.$loading(false);
                    var type = res.message ? "success" : "error";
                    this.$toast({
                        content: res.log,
                        type
                    });
                    if (res.message) {
                        localStorage.setItem("userId", res.data.id);
                        localStorage.setItem("name", res.data.user);
                        localStorage.setItem("login", "success");
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
