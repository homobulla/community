/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 17:22:28
 * @LastEditTime: 2019-08-26 11:46:51
 * @LastEditors: Please set LastEditors
 */
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const util = require("util");
const verify = util.promisify(jwt.verify); //将回调函数promise化，写法修改
const JWTPath = require("./JWTPath");

/**
 * 判断token是否可用
 */
module.exports = function() {
    return async function(ctx, next) {
        // 检测过滤的路由就不做解析JWT了
        console.log(ctx.request.url);
        if (JWTPath.find(item => item === ctx.request.url)) {
            await next();
            return false;
        }
        try {
            // 获取jwt
            // 后端用cookie来存token,前端不需要做这个操作了
            // const token = ctx.header.authorization;
            const token = ctx.cookies.get("seesion", { signed: true });

            if (token) {
                let payload;
                try {
                    // 解密payload，获取用户名和ID
                    payload = await verify(token, secret.sign);
                    console.log(payload);
                    ctx.user = {
                        name: payload.name,
                        ip: payload.ip
                    };
                    await next();
                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        code: 401,
                        message: "Token无效!"
                    };
                }
            } else {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    err: "未登录"
                };
            }
        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    err
                };
            } else {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    err
                };
            }
        }
    };
};
