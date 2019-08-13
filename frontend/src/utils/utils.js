export default {
    install: function(Vue, opt) {
        (Vue.prototype.getQueryString = function(name) {
            var url = window.location.href;
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = url.substring(url.lastIndexOf("?") + 1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }),
            // 时间格式化
            (Vue.prototype.dateFtt = function(date, data) {
                let time = new Date(data);
                let fmt = "yyyy.MM.dd hh:mm:ss";
                let o = {
                    "M+": time.getMonth() + 1,
                    "d+": time.getDate(),
                    "h+": time.getHours(),
                    "m+": time.getMinutes(),
                    "s+": time.getSeconds(),
                    "q+": Math.floor((time.getMonth() + 3) / 3),
                    S: time.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(fmt)) {
                            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                        }
                    }
                }
                if (date === "date") {
                    return fmt.substring(0, 10);
                } else if (date === "time") {
                    return fmt.substring(10);
                } else {
                    return fmt;
                }
            });
    }
};
