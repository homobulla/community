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
console.log(value);
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
