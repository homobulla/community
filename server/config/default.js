/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 12:02:24
 * @LastEditTime : 2020-01-13 12:07:29
 * @LastEditors  : Please set LastEditors
 */
const config = {
    port: 4000,
    database: {
        DATABASE: "blog",
        USERNAME: "root",
        PASSWORD: "root",
        HOST: "localhost"
    },
    cookieKey: [ " rsgjrdlgredf43jks" ],
    Allow_Origin: [ "http://10.0.0.101:8082", "http://127.0.0.1:8080", "http://10.0.0.193:8080" ] // 允许请求的header origin
};
module.exports = config;
