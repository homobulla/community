const router = require("koa-router")();
const userModel = require("../lib/mysql.js");
const checkNotLogin = require("../middlewares/check.js").checkNotLogin;
const checkLogin = require("../middlewares/check.js").checkLogin;
const controller = require("../Controller/login");
router.post("/login", async (ctx, next) => {
    return controller.login(ctx, next);
});

router.get("/signout", async (ctx, next) => {
    ctx.session = "";
    ctx.user = "";
    ctx.body = true;
});
module.exports = router;
