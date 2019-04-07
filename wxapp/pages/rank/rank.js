function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../libs/js/common.js")), a = (e(require("../../service/app.setting.js")), 
e(require("../../siteinfo.js")), e(require("../../config/api.config.js"))), n = (e(require("../../model/version.js")), 
e(require("../../service/service.js"))), i = e(require("../../model/adModel.js")), o = getApp();

Page({
    data: {
        ishistory: !1,
        honorList: null,
        persevereList: null
    },
    honorBtn: function() {
        this.requestFn(a.default.api.HonorRank), this.setData({
            ishistory: !1
        });
    },
    speedBtn: function() {
        this.requestFn(a.default.api.PerseveranceRank), this.setData({
            ishistory: !0
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), o.appLoaded ? (wx.setNavigationBarTitle({
            title: o.globalData.appConfig.txts.nav_bar_title
        }), this.requestFn(a.default.api.HonorRank), this.setData({
            banner: i.default.banner
        })) : o.onAppLoaded = function() {
            wx.setNavigationBarTitle({
                title: o.globalData.appConfig.txts.nav_bar_title
            }), t.requestFn(a.default.api.HonorRank), t.setData({
                banner: i.default.banner
            });
        };
    },
    requestFn: function(e) {
        var n = this;
        t.default.request({
            url: e,
            data: {
                version: getApp().globalData.version
            },
            success: function(t) {
                t.data.error ? wx.showToast({
                    title: t.data.msg || "服务器开小差了，稍后再试"
                }) : n.setData({
                    honorList: e == a.default.api.HonorRank ? t.data.data.items : [],
                    persevereList: e == a.default.api.PerseveranceRank ? t.data.data.items : []
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = n.default.convertText(o.globalData.appConfig.txts.share_title, o.globalData.userInfo.nickname);
        return {
            title: n.default.handleShare(o.globalData.appConfig.share_item, o.globalData.userInfo).title || e
        };
    }
});