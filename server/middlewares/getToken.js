const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

const util = require("util");
const verify = util.promisify(jwt.verify); //将回调函数promise化，写法修改

/* 获取一个期限为半小时的token */
module.exports = function getToken(payload = {}) {
    return jwt.sign(payload, secret.sign, { expiresIn: "0.5h" });
};
