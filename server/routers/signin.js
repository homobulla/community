/*
 * @Description: 个人相关路由层
 * @Author: homobulla
 * @Date: 2019-08-13 12:02:24
 * @LastEditTime: 2019-08-26 12:18:11
 * @LastEditors: Please set LastEditors
 */
const router = require("koa-router")();
const controller = require("../Controller/login");

router.post("/login", async (ctx, next) => {
    return controller.login(ctx, next);
});

router.post("/loginout", async (ctx, next) => {
    return controller.loginout(ctx, next);
});
module.exports = router;
