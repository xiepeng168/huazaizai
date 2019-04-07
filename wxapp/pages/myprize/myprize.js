function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../libs/js/common.js")), t = (a(require("../../service/app.setting.js")), 
a(require("../../config/api.config.js"))), n = (a(require("../../siteinfo.js")), 
a(require("../../model/userData.js"))), o = a(require("../../model/balance.js")), i = a(require("../../model/version.js")), r = a(require("../../service/service.js")), s = a(require("../../model/adModel.js")), l = getApp();

Page({
    data: {
        userInfo: null,
        userTakeMoney: 3,
        serviceButton: "客服小姐姐",
        myprizeList: null
    },
    recordListFn: function() {
        var a = this;
        e.default.request({
            url: t.default.api.Award,
            success: function(e) {
                if (e.data.error) wx.showToast({
                    title: e.data.msg || "服务器开小差了，稍后再试"
                }); else {
                    var t = e.data.data.items;
                    a.setData({
                        myprizeList: t
                    });
                }
            }
        });
    },
    requestFn: function() {
        var a = this;
        e.default.request({
            url: t.default.api.userDetail,
            success: function(e) {
                if (e.data.error) wx.showToast({
                    title: e.data.msg || "服务器开小差了，稍后再试"
                }); else {
                    var t = e.data.data;
                    n.default.userData = t, a.setData({
                        userInfo: t.items,
                        userTakeMoney: t.min_cash_out,
                        serviceButton: t.kefu_name
                    }), o.default.balance = a.data.userInfo.balance;
                }
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        if (wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), "game" == a.page) this.requestFn(), this.recordListFn(), wx.setNavigationBarTitle({
            title: l.globalData.appConfig.txts.nav_bar_title
        }), this.setData({
            banner: s.default.banner,
            block_hidden: i.default.block_hidden,
            userTakeMoney: l.globalData.appConfig.txts.cash_out,
            serviceButton: l.globalData.appConfig.txts.kefu_name
        }); else if (l.appLoaded) {
            var t = this.compareVersion(l.globalData.version, l.globalData.appConfig.txts.version);
            this.recordListFn(), this.setData({
                banner: s.default.banner,
                block_hidden: 1 == t,
                allow: !!l.authConfig.authSetting["scope.userInfo"],
                userInfo: n.default.userData.items,
                userTakeMoney: l.globalData.appConfig.txts.cash_out,
                serviceButton: l.globalData.appConfig.txts.kefu_name
            }), wx.setNavigationBarTitle({
                title: l.globalData.appConfig.txts.nav_bar_title
            }), i.default.block_hidden = 1 == t;
        } else l.onAppLoaded = function() {
            var a = e.compareVersion(l.globalData.version, l.globalData.appConfig.txts.version);
            e.recordListFn(), e.setData({
                banner: s.default.banner,
                block_hidden: 1 == a,
                allow: !!l.authConfig.authSetting["scope.userInfo"],
                userInfo: n.default.userData.items,
                userTakeMoney: l.globalData.appConfig.txts.cash_out,
                serviceButton: l.globalData.appConfig.txts.kefu_name
            }), wx.setNavigationBarTitle({
                title: l.globalData.appConfig.txts.nav_bar_title
            }), i.default.block_hidden = 1 == a;
        };
    },
    bindGetUserInfo: function(a) {
        var t = this;
        this.data.allow ? wx.navigateTo({
            url: "/pages/withdraw/withdraw"
        }) : a.detail && a.detail.encryptedData && a.detail.rawData ? e.default.getUserInfo(a.detail, function(a) {
            t.setData({
                allow: !0
            }), wx.navigateTo({
                url: "/pages/withdraw/withdraw"
            });
        }) : wx.showModal({
            content: "授权失败，请重试"
        });
    },
    compareVersion: function(a, e) {
        if (null == a || null == e || void 0 == a || void 0 == e) return -2;
        a = (a + '""').split("."), e = (e + '""').split(".");
        for (var t = Math.max(a.length, e.length); a.length < t; ) a.push("0");
        for (;e.length < t; ) e.push("0");
        for (var n = 0; n < t; n++) {
            var o = parseInt(a[n]), i = parseInt(e[n]);
            if (o > i) return 1;
            if (o < i) return -1;
        }
        return 0;
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            userTakeMoney: l.globalData.appConfig.txts.cash_out,
            serviceButton: l.globalData.appConfig.txts.kefu_name
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = r.default.convertText(l.globalData.appConfig.txts.share_title, l.globalData.userInfo.nickname), e = l.globalData.appConfig.images.share_image, t = r.default.handleShare(l.globalData.appConfig.share_item, l.globalData.userInfo);
        return {
            title: t.title || a,
            imageUrl: t.imageUrl || e,
            path: "/pages/index/index"
        };
    },
    gowithdraw: function() {
        wx.navigateTo({
            url: "/pages/withdraw/withdraw"
        });
    }
});