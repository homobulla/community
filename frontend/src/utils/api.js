/**
 * api接口统一管理
 */
const axios = require("./axios");
const { get, post } = axios;
// 获取所有文章列表
const getAllPosts = params => get("/posts", params);

module.exports = {
    getAllPosts
};
