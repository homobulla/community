/**
 * api接口统一管理
 */
const axios = require("./axios");

// 获取所有文章列表
const getAllPosts = params => axios.get("/posts", params);

module.exports = {
    getAllPosts
};
