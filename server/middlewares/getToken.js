/*
 * @Description: Token 生成
 * @Author: homobulla
 * @Date: 2019-08-22 11:20:38
 * @LastEditTime: 2019-08-23 11:58:06
 * @LastEditors: Please set LastEditors
 */
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

const util = require("util");
const verify = util.promisify(jwt.verify); //将回调函数promise化，写法修改

/* 获取一个期限为24小时的token */
module.exports = function getToken(payload = {}) {
    return jwt.sign(payload, secret.sign, { expiresIn: "24h" });
};
