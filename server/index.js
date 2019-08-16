const Koa = require("koa");
const path = require("path");
const bodyParse = require("koa-bodyparser");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const config = require("./config/default.js");
var cors = require("koa2-cors");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
const logger = require("./middlewares/logger");
module.exports = { io };
// session配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST
};
// cors配置
app.use(
    cors({
        origin: "*", // 可以是一个函数，将ctx对象传入针对不同请求做区分
        credentials: true,
        allowMethods: ["GET", "POST", "DELETE", "PUT"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
);
app.use(
    session({
        key: "USER_SID",
        store: new MysqlStore(sessionMysqlConfig)
    })
);

// cookie 有问题没效果
app.use(async (ctx, next) => {
    if (ctx.url === "/posts") {
        ctx.cookies.set("cid", "hello world", {
            domain: "localhost", // 写cookie所在的域名
            path: "/", // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date("2019-09-15"), // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
    }
    await next();
});

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
// app.use(logger());
app.use(function(ctx, next) {
    ctx.body = { error: "Not Found", message: false };
    next();
});
server.listen(4000, function() {
    console.log(`this is listening on port ${config.port}`);
});
