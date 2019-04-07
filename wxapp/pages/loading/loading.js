function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var o = n(require("../../libs/js/common.js")), e = n(require("../../config/api.config.js"));

getApp();

Page({
    data: {},
    onLoad: function(n) {
        n.is_black || o.default.request({
            url: e.default.api.Black
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});