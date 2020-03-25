/*
 * @Description: 登录模块
 * @Author: homobulla
 * @Date: 2019-08-16 18:10:18
 * @LastEditTime: 2019-08-23 17:36:56
 * @LastEditors: Please set LastEditors
 */
const Mysql = require("../lib/mysql");
const md5 = require("md5");
const getToken = require("../middlewares/getToken");
const responseData = require("../middlewares/responseData");
const { commentSchemas } = require("../lib/validator");
const RSA = require("../lib/rsa");
/**
 * @getClientIP
 * @desc 获取用户 ip 地址  为了给token加一层安全
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return (
        req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress
    );
}

/**
 * @description:
 * @param {type}
 * @return:
 */
function setCookie(ctx, name, value) {
    ctx.cookies.set(name, value, { signed: true, maxAge: 60 * 60 * 24 * 1000 });
}
class LoginModel extends Mysql {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next;
    }
    async login(ctx, next) {
        let { name, password } = ctx.request.body;
        // 字段校验
        const ret = await commentSchemas(ctx, { name, password }, "login");
        password = await RSA(password);
        if (ret) return;
        await super
            .findDataByName(name)
            .then(res => {
                let log = "登录成功!";
                let code;
                let data = {};
                if (res[0] && name === res[0]["name"] && md5(password) === res[0]["pass"]) {
                    let token = getToken({ name, ip: getClientIP(ctx.req) });
                    data = {
                        user: res[0]["name"],
                        id: res[0]["id"]
                    };
                    setCookie(ctx, "seesion", token);
                } else {
                    code = 200;
                    log = "登录失败，账户或密码错误！";
                }
                responseData(ctx, { data, log, code });
            })
            .catch(err => {
                console.log(err, "errr");
                ctx.status = 500;
                responseData(ctx, { code: 500, log: err });
            });
    }

    async loginout(ctx, next) {
        ctx.cookies.set("seesion", "", { signed: true, maxAge: 0 });
        responseData(ctx, { log: "您已退出登录！" });
    }
}

module.exports = new LoginModel();
