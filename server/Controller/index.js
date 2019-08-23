/*
 * @Description: 业务函数
 * @Author: homobulla
 * @Date: 2019-08-16 14:34:22
 * @LastEditTime: 2019-08-23 15:43:42
 * @LastEditors: Please set LastEditors
 */
const Mysql = require("../lib/mysql");
const responseData = require("../middlewares/responseData");
const moment = require("moment");
const { commentSchemas } = require("../lib/validator");
const colors = require("colors");
class PostModel extends Mysql {
    constructor(ctx, next) {
        super();
        this.ctx = ctx;
        this.next = next;
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

            let data = {
                session: ctx.session,
                posts: res,
                postsPageLength: Math.ceil(postsLength / 10)
            };
            responseData(ctx, { data });
        } else {
            await super.findPostByPage(1).then(result => {
                res = result;
            });
            await super.findAllPost().then(result => {
                postsLength = result.length;
            });

            let data = {
                session: ctx.session,
                posts: res,
                postsLength: postsLength,
                postsPageLength: Math.ceil(postsLength / 10)
            };
            responseData(ctx, { data });
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

        let data = {
            session: ctx.session,
            posts: res[0],
            commentLenght: comment_res.length,
            commentPageLenght: Math.ceil(comment_res.length / 10),
            pageOne: pageOne
        };
        responseData(ctx, { data });
    }
    // 新增评论
    async commentArticle(ctx, next) {
        let name = ctx.user ? ctx.user.name : "homo",
            content = ctx.request.body.content,
            postId = ctx.request.body.postId,
            res_comments,
            time = moment().format("YYYY-MM-DD HH:mm:ss"),
            avator,
            person,
            url = ctx.request.header.referer;

        // 字段校验
        const ret = await commentSchemas(ctx, { postId, content }, "comment");
        if (ret) return;
        // 获取用户头像
        await super.findUserData(name).then(res => {
            avator = res[0].avator;
        });
        // 写入数据
        await super.insertComment([name, content, time, postId, avator]);

        await super.findDataById(postId).then(result => {
            res_comments = parseInt(result[0]["comments"]);
            res_comments += 1;
            person = result[0].name;
        });
        await super
            .updatePostComment([res_comments, postId])
            .then(() => {
                //  user 评论人 person发帖人即需要通知的人
                // if (ctx.session.user != person) {
                //     app.io.emit("comment", { user: ctx.session.user, person, url });
                // }
                let log = "评论成功！";
                responseData(ctx, { log });
            })
            .catch(err => {
                let log = "评论失败！";
                responseData(ctx, { log });
            });
    }
    // 删除评论
    async deletComments(ctx, next) {
        let { postId, commentId } = ctx.request.body;
        let account;

        // 字段校验
        const ret = await commentSchemas(ctx, { postId, commentId }, "removeComment");
        if (ret) return;
        // 删评论
        await super.deletComment(commentId);
        // 获取当前评论数
        await super.findDataById(postId).then(res => {
            account = res[0].comments-- < 0 ? 0 : res[0].comments--;
        });

        // 评论数修改 -1
        await super
            .updatePostComment([account, postId])
            .then(_ => {
                let log = "删除评论成功！";
                responseData(ctx, { log });
            })
            .catch(_ => {
                let log = "删除评论失败！";
                responseData(ctx, { log, data: _ });
            });
    }
}

module.exports = new PostModel();
