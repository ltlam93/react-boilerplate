/**
 * Created by Tester-Ali on 30-09-2016.
 */
var dic = require('./vi-VN.json');
module.exports = {
    t: function (message) {
        if (dic[message]) {
            return dic[message];
        }
        return message;
    }
};