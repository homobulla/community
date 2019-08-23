/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:28:32
 * @LastEditTime: 2019-08-23 14:46:40
 * @LastEditors: Please set LastEditors
 */
const Joi = require("joi");
const commentSchema = {
    postId: Joi.number()
        .integer()
        .min(1)
        .required(), //文章id
    content: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .required() // 评论内容
};
var obj = {};
let value = Joi.validate(obj, commentSchema);

const commentSchemas = function(ctx, obj) {
    console.log(obj, "=============");
    return new Promise((resolve, reject) => {
        let value = Joi.validate(obj, commentSchema);
        console.log(value);
        if (value.error) {
            responseData(ctx, { code: 400, log: value.error });
        } else {
            resolve();
        }
    });
};
commentSchemas();
