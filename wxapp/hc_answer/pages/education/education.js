var n = require("../../../wxParse/wxParse.js"), t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = t.globalData.appname;
        wx.setNavigationBarTitle({
            title: o.title
        });
        var e = a.id, i = this;
        t.util.request({
            url: "entry/wxapp/wenzhang",
            method: "POST",
            data: {
                id: e
            },
            success: function(t) {
                var a = t.data.data.content;
                n.wxParse("article", "html", a, i, 5);
            },
            fail: function(n) {
                console.log("失败");
            }
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