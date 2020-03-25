/*
 * @Description: 跨域请求的业务拦截
 * @Author: your name
 * @Date: 2019-08-26 16:27:04
 * @LastEditTime: 2019-09-11 11:18:51
 * @LastEditors: Please set LastEditors
 */
const config = require("../config/default");

module.exports = function() {
    return async function(ctx, next) {
        if (config.Allow_Origin.find(item => item === ctx.header.origin)) {
            await next();
            return false;
        } else {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                message: "请求源不被允许!"
            };
        }
    };
};
