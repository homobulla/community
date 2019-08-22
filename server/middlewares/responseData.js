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
