const router = require("koa-router")();
const userModel = require("../lib/mysql");
const moment = require("moment");
const { checkNotLogin, checkLogin } = require("../middlewares/JWTPath");
const md = require("markdown-it")();
const colors = require("colors");
const app = require("../index");
const controller = require("../Controller/index");
router.get("/", async (ctx, next) => {
    ctx.body = "首页";
});
// 文章
router.get("/allposts", (ctx, next) => {
    return controller.getAllPosts(ctx, next);
});

// 单篇文章详情
router.get("/posts", (ctx, next) => {
    return controller.getArticleById(ctx, next);
});

// 发表评论
router.post("/comment", async (ctx, next) => {
    return controller.commentArticle(ctx, next);
});

// 删除评论
router.post("/comment/remove", async (ctx, next) => {
    return controller.deletComments(ctx, next);
});

// 首页文章默认十条
router.post("/posts/page", async (ctx, next) => {
    let page = ctx.request.body.page;
    await userModel
        .findPostByPage(page)
        .then(result => {
            ctx.body = result;
        })
        .catch(err => {
            ctx.body = "error";
        });
});

// 个人文章分页 默认十条
router.post("/posts/self/page", async (ctx, next) => {
    let { name, page } = ctx.request.body;
    await userModel
        .findPostByUserPage(name, page)
        .then(res => {
            ctx.body = res;
        })
        .catch(err => {
            ctx.body = err;
        });
});

// 发表文章页面
router.get("/create", async (ctx, next) => {
    await ctx.render("create", {
        session: ctx.session
    });
});

// 发表文章接口
router.post("/create", async (ctx, next) => {
    let { title, content } = ctx.request.body,
        name = ctx.session.user,
        time = moment().format("YYYY-MM-DD HH:mm:ss"),
        avator;
    // 获取用户头像
    await userModel.findDataByUser(name).then(res => {
        avator = res[0].avator;
    });
    await userModel
        .insertPost([name, title, content, "", "", time, avator])
        .then(res => {
            ctx.body = true;
        })
        .catch(err => {
            ctx.body = false;
        });
});

// 评论分页
router.post("/posts/:postId/commentPage", async (ctx, next) => {
    let postId = ctx.params.postId,
        page = ctx.request.body.page;
    await userModel
        .findCommentByPage(postId, page)
        .then(res => {
            ctx.body = res;
        })
        .catch(err => {
            ctx.body = err;
        });
});

// 删除文章
router.post("/posts/:postId/remove", async (ctx, next) => {
    let { postId } = ctx.params;
    await userModel
        .deletePost(postId)
        .then(res => {
            ctx.body = {
                data: 1
            };
        })
        .catch(err => {
            ctx.body = {
                data: 2
            };
        });
});

// 编辑文章:路由
router.get("/posts/:postId/edit", async (ctx, next) => {
    let name = ctx.session.user,
        postId = ctx.params.postId,
        res;
    await userModel.findDataById(postId).then(result => {
        res = result[0];
    });
    await ctx.render("edit", {
        session: ctx.session,
        postsContent: res.content,
        postsTitle: res.title
    });
});

// 编辑文章:修改
router.post("/posts/:postId/edit", async (ctx, next) => {
    let id = ctx.params.postId,
        { title, content } = ctx.request.body;
    await userModel
        .editPost([title, content, id])
        .then(res => {
            ctx.body = true;
        })
        .catch(err => {
            console.log(err);
            ctx.body = false;
        });
});
module.exports = router;
