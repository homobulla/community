const Mysql = require("../lib/mysql");

class PostModel extends Mysql {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next;
        // 统一的数据格式
        this.data = {
            message: "",
            data: ""
        };
    }
    // 获取全部文章
    async getAllPosts(ctx, next) {
        let res,
            postsLength,
            name = decodeURIComponent(ctx.request.querystring.split("=")[1]);
        if (ctx.request.querystring) {
            await super.findDataByUser(name).then(result => {
                postsLength = result.length;
            });
            await super.findPostByUserPage(name, 1).then(result => {
                res = result;
            });

            this.data.data = {
                session: ctx.session,
                posts: res,
                postsPageLength: Math.ceil(postsLength / 10)
            };
            this.data.message = true;

            ctx.body = this.data;
        } else {
            await super.findPostByPage(1).then(result => {
                res = result;
            });
            await super.findAllPost().then(result => {
                postsLength = result.length;
            });

            this.data.data = {
                session: ctx.session,
                posts: res,
                postsLength: postsLength,
                postsPageLength: Math.ceil(postsLength / 10)
            };
            this.data.message = true;
            ctx.body = this.data;
        }
    }
    // 获取单篇文章
    async getArticleById(ctx, next) {
        let comment_res, res, pageOne, res_pv;

        await super.findDataById(ctx.query.postId).then(result => {
            res = result;
            res_pv = parseInt(res[0].pv);
            res_pv++;
        });

        await super.updatePostPv(res_pv, ctx.query.postId);
        await super.findCommentByPage(1, ctx.query.postId).then(result => {
            pageOne = result; // 第一页数数据永远是
        });
        await super.findCommentById(ctx.query.postId).then(result => {
            comment_res = result;
        });
        this.data.message = true;
        this.data.data = {
            session: ctx.session,
            posts: res[0],
            commentLenght: comment_res.length,
            commentPageLenght: Math.ceil(comment_res.length / 10),
            pageOne: pageOne
        };
        ctx.body = this.data;
    }
}

module.exports = new PostModel();
