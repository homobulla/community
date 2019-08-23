/*
 * @Description: server层
 * @Author: homobulla
 * @Date: 2019-08-13 11:39:54
 * @LastEditTime: 2019-08-23 17:31:06
 * @LastEditors: Please set LastEditors
 */
/**
 * api接口统一管理
 */
const axios = require("./axios");
const { get, post } = axios;

// 业务模块相关

// 获取所有文章列表
const getAllPosts = params => get("/allposts", params);
// 获取单个文章
const getPostById = params => get("/posts", params);
// 发表评论
const comment = params => post("/comment", params);
// 删除评论
const deleteComment = params => post("/comment/remove", params);

// 用户数据模块相关

// 登录
const login = params => post("/login", params);
// 等出
const loginout = _ => post("/loginout");

module.exports = {
    getAllPosts,
    getPostById,
    login,
    comment,
    deleteComment,
    loginout
};
