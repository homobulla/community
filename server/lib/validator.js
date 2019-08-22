const Joi = require("joi");
const responseData = require("../middlewares/responseData");
const Schema = {
    // 登录
    login: {
        name: Joi.string()
            .min(4)
            .max(12)
            .required(), // 用户名
        password: Joi.string()
            .min(3)
            .max(18)
            .required() // 密码
    },
    // 评论文章接口
    comment: {
        postId: Joi.number()
            .integer()
            .min(1)
            .required(), //文章id
        content: Joi.string()
            .trim()
            .min(1)
            .max(30)
            .required() // 评论内容
    },
    // 删除评论接口
    removeComment: {
        postId: Joi.number()
            .integer()
            .min(1)
            .required(), //文章id
        commentId: Joi.number()
            .integer()
            .min(0)
            .required() // 评论id
    }
};

// Schemas
exports.commentSchemas = function(ctx, obj, type) {
    return new Promise((resolve, reject) => {
        let value = Joi.validate(obj, Schema[type]);
        errorhandle(ctx, value);
        resolve(value.error);
    });
};

// 错误函数
function errorhandle(ctx, value) {
    if (value.error) {
        ctx.status = 400;
        responseData(ctx, { code: 400, log: value.error.details });
    }
}
