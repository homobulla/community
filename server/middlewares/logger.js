/*
 * @Description: log中间件
 * @Author: homobulla
 * @Date: 2019-08-15 16:53:22
 * @LastEditTime: 2019-08-26 12:17:47
 * @LastEditors: Please set LastEditors
 */
function log(ctx) {
    console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function() {
    return async function(ctx, next) {
        log(ctx);
        await next();
    };
};
