/*
 * @Description: 接口字段检测
 * @Author: homobulla
 * @Date: 2019-08-22 15:50:57
 * @LastEditTime: 2019-08-23 17:08:53
 * @LastEditors: Please set LastEditors
 */
const Joi = require("joi");
const responseData = require("../middlewares/responseData");
const Schema = {
    // 登录
    login: {
        name: Joi.string()
            .min(2)
            .max(12)
            .required(), // 用户名
        password: Joi.string()
            .min(30)
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

/**
 * @description: 统一处理字段错误返回值
 * @param {Obj} ctx 上下文
 * @param {Obj} obj 接口传入字段，即需要检测的字段
 * @param {string} type 检测类型
 * @return:null
 */
exports.commentSchemas = function(ctx, obj, type) {
    return new Promise((resolve, reject) => {
        let value = Joi.validate(obj, Schema[type]);
        errorhandle(ctx, value);
        resolve(value.error);
    });
};

/**
 * @description: 错误处理函数
 * @param {Obj} value 错误详情
 * @return: null
 */
function errorhandle(ctx, value) {
    if (value.error) {
        ctx.status = 400;
        responseData(ctx, { code: 400, log: value.error.details });
    }
}
