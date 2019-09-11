const Koa = require("koa");
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log("1");
    await next();
    console.log(2);
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}123`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    console.log(3);
    await next();
    console.log(4);
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async ctx => {
    ctx.body = "Hello World";
});

app.listen(3000);
app.listen(3001);

// 执行顺序 1 3 4 2
