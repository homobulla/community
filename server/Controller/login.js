const Mysql = require("../lib/mysql");
const md5 = require("md5");
const getToken = require("../middlewares/getToken");
const responseData = require("../middlewares/responseData");
class LoginModel extends Mysql {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next;
    }
    async login(ctx, next) {
        let { name, password } = ctx.request.body;
        // 字段校验
        const ret = await commentSchemas(ctx, { name, password }, "removeComment");
        if (ret) {
            return;
        }
        await super
            .findDataByName(name)
            .then(res => {
                let log = "登录成功!";
                let data = {};
                if (res[0] && name === res[0]["name"] && md5(password) === res[0]["pass"]) {
                    data = {
                        user: res[0]["name"],
                        id: res[0]["id"],
                        token: getToken({ name })
                    };
                } else {
                    log = "登录失败，账户或密码错误！";
                }
                responseData(ctx, { data, log });
            })
            .catch(err => {
                responseData(ctx, { code: 500, log: err });
            });
    }
}

module.exports = new LoginModel();
