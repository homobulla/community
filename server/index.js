/*
 * @Description: 入口文件
 * @Author: homobulla
 * @Date: 2019-08-13 12:02:24
 * @LastEditTime: 2019-09-24 15:22:14
 * @LastEditors: Please set LastEditors
 */
const Koa = require("koa");
const path = require("path");
const bodyParse = require("koa-bodyparser");
const helmet = require("koa-helmet");
const config = require("./config/default.js");
const InterceptUrl = require("./middlewares/Intercept");
var cors = require("koa2-cors");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
const logger = require("./middlewares/logger");
module.exports = { io };
const JWTToken = require("./middlewares/JWTToken");
app.keys = config.cookieKey; //设置签名的 Cookie 密钥。
// cors配置
app.use(
    cors({
        origin: function(ctx) {
            if (config.Allow_Origin.find(item => item == ctx.header.origin)) {
                return ctx.header.origin;
            } else {
                return false;
            }
        },
        credentials: true,
        allowMethods: ["GET", "POST", "DELETE", "PUT"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
);
app.use(helmet()); //安全检测
app.use(InterceptUrl());
app.use(JWTToken());

// 服务端渲染模板引擎
app.use(
    bodyParse({
        formLimit: "1mb"
    })
);

// 路由
app.use(require("./routers/signup.js").routes());
app.use(require("./routers/signin.js").routes());
app.use(require("./routers/posts.js").routes());

// 错误处理中间件
app.use(logger());

app.use(function(ctx, next) {
    ctx.status = 404;
    ctx.body = { error: "Not Found", message: false };
    next();
});
server.listen(4000, function() {
    console.log(`this is listening on port ${config.port}`);
});
