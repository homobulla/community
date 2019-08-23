/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 12:20:32
 * @LastEditTime: 2019-08-23 14:10:17
 * @LastEditors: Please set LastEditors
 */
// 统一返回值
module.exports = function(ctx, obj = {}) {
    const { data = {}, log, code, err } = obj;
    if (Object.keys(data).length || !code) {
        ctx.body = {
            code: code ? code : 200,
            success: true,
            log: log ? log : "数据获取成功！",
            data
        };
    } else {
        ctx.body = {
            code: code ? code : 200,
            success: false,
            log: log ? log : err ? err : "数据获取失败！"
        };
    }
};
