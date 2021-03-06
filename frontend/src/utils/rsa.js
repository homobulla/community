/*
 * @Description: 公匙加密
 * @Author: homobulla
 * @Date: 2019-08-23 16:56:33
 * @LastEditTime: 2019-08-28 14:36:51
 * @LastEditors: Please set LastEditors
 */
const NodeRSA = require("node-rsa");

const _pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzIPwulKDf80Bj5FSy0OMiJ0CY
61CBKdqJ9VumBPZPDi2J1ypSPGPFpaMz6sEohE2SG78nLICtmJx040QefzL8MSln
2Jr/ZzsA2p7o7oHp/nwInA7wvMZseSfH9IZbXjm/3gBMQ96n7X07nJZp4KKTXVD/
G7MnICKioE/m4XeuRQIDAQAB
-----END PUBLIC KEY-----`;

module.exports = function(str) {
    let publicKey = new NodeRSA(_pubKey);
    let encrypted = publicKey.encrypt(str, "base64");
    return encrypted;
};
