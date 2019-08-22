/**
 * api接口统一管理
 */
const axios = require("./axios");
const { get, post } = axios;
// 获取所有文章列表
const getAllPosts = params => get("/allposts", params);
// 获取单个文章
const getPostById = params => get("/posts", params);
// 发表评论
const comment = params => post("/comment", params);
// 删除评论
const deleteComment = params => post("/comment/remove", params);

// 登录
const login = params => post("/login", params);

module.exports = {
    getAllPosts,
    getPostById,
    login,
    comment,
    deleteComment
};
