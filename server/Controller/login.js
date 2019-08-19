const Mysql = require("../lib/mysql");
const md5 = require("md5");

class LoginModel extends Mysql {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next;
        // 统一的数据格式
        this.data = {
            message: "",
            data: ""
        };
    }
    async login(ctx, next) {
        let { name, password } = ctx.request.body;
        await super
            .findDataByName(name)
            .then(res => {
                if (res[0] && name === res[0]["name"] && md5(password) === res[0]["pass"]) {
                    this.data = {
                        message: true,
                        data: {
                            user: res[0]["name"],
                            id: res[0]["id"]
                        },

                        log: "登录成功！"
                    };
                } else {
                    this.data = {
                        message: false,
                        data: {},
                        log: "登录失败，账户或密码错误！"
                    };
                }
                ctx.session.user = res[0]["name"];
                ctx.session.id = res[0]["id"];
                ctx.body = this.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = new LoginModel();
