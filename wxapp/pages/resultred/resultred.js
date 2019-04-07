function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../libs/js/common.js")), n = (e(require("../../service/app.setting.js")), 
e(require("../../config/api.config.js"))), t = (e(require("../../siteinfo.js")), 
e(require("../../model/version.js"))), o = e(require("../../service/service.js")), i = e(require("../../model/adModel.js")), r = getApp();

Page({
    data: {
        logo: null,
        redmoney: 0,
        redTips: null
    },
    requestFn: function() {
        var e = this;
        a.default.request({
            url: n.default.api.gamerecord,
            success: function(a) {
                a.data.error ? wx.showToast({
                    title: a.data.msg || "服务器开小差了，稍后再试"
                }) : (console.log(a.data.data), e.setData({
                    redTips: a.data.data.red_tips,
                    redmoney: a.data.data.items.money
                }));
            }
        });
    },
    onLoad: function(e) {
        wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), wx.setNavigationBarTitle({
            title: r.globalData.appConfig.txts.nav_bar_title
        }), this.requestFn(), this.setData({
            banner: i.default.banner,
            block_hidden: t.default.block_hidden,
            logo: r.globalData.appConfig.images.red_packets_logo
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var e = o.default.convertText(r.globalData.appConfig.txts.share_title, r.globalData.userInfo.nickname);
        return {
            title: o.default.handleShare(r.globalData.appConfig.share_item, r.globalData.userInfo).title || e,
            path: "/pages/index/index"
        };
    },
    onShareAppMessage: function() {},
    goindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    gomyprize: function() {
        wx.reLaunch({
            url: "/pages/myprize/myprize?page=game"
        });
    }
});