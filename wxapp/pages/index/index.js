function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../libs/js/common.js")), t = (a(require("../../service/app.setting.js")), 
a(require("../../config/api.config.js"))), n = (a(require("../../siteinfo.js")), 
a(require("../../model/userData.js"))), i = a(require("../../model/balance.js")), o = a(require("../../model/version.js")), r = a(require("../../libs/js/md5.js")), s = a(require("../../service/service.js")), l = a(require("../../model/adModel.js")), u = getApp();

Page({
    data: {
        redData: {},
        sharechance: {
            Button: "发给群友",
            num: 0
        },
        getchance: !1,
        getRed: !1,
        banner: null,
        appList: null,
        allow: null,
        indexLogo: null,
        loadShow: !0,
        ruleShow: !1,
        chances: null,
        ruleInfo: {}
    },
    requestFn: function() {
        var a = this;
        e.default.request({
            url: t.default.api.userDetail,
            success: function(e) {
                if (e.data.error) wx.showToast({
                    title: e.data.msg || "服务器开小差了，稍后再试"
                }); else {
                    if (1 * e.data.data.items.is_black) return void wx.reLaunch({
                        url: "/pages/loading/loading?is_black=black"
                    });
                    n.default.userData = e.data.data, a.data.chances = e.data.data.items.chance_num, 
                    i.default.balance = e.data.data.items.balance;
                }
            }
        });
    },
    onLoad: function(a) {
        this.onloadOptions = a, wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        });
    },
    requestRed: function(a, n, i, o, r, s) {
        var l = this;
        e.default.request({
            url: t.default.api.ShareGetChance,
            data: {
                uid: a,
                hash_md5: n,
                num: i,
                encryptedData: o,
                iv: r
            },
            success: function(a) {
                console.log(a), l.setData({
                    redData: {
                        getnum: a.data.msg
                    }
                }), s && s();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        if (u.appLoaded) {
            this.getShareTiket(), wx.showShareMenu({
                withShareTicket: !0
            }), wx.setNavigationBarTitle({
                title: u.globalData.appConfig.txts.nav_bar_title
            });
            var e = this.compareVersion(u.globalData.version, u.globalData.appConfig.txts.version);
            this.requestAd(), this.setData({
                block_hidden: 1 == e,
                allow: !!u.authConfig.authSetting["scope.userInfo"],
                loadShow: !1,
                indexLogo: u.globalData.appConfig.images.index_title,
                sharechance: {
                    Button: "发给群友",
                    num: u.globalData.appConfig.txts.share_prop_num
                }
            }), o.default.block_hidden = 1 == e;
        } else u.onAppLoaded = function() {
            a.getShareTiket(), wx.showShareMenu({
                withShareTicket: !0
            }), wx.setNavigationBarTitle({
                title: u.globalData.appConfig.txts.nav_bar_title
            });
            var e = a.compareVersion(u.globalData.version, u.globalData.appConfig.txts.version);
            a.requestAd(), a.setData({
                block_hidden: 1 == e,
                allow: !!u.authConfig.authSetting["scope.userInfo"],
                loadShow: !1,
                indexLogo: u.globalData.appConfig.images.index_title,
                sharechance: {
                    Button: "发给群友",
                    num: u.globalData.appConfig.txts.share_prop_num
                }
            }), o.default.block_hidden = 1 == e;
        };
    },
    getShareTiket: function() {
        var a = this, e = this.onloadOptions;
        u.globalData.shareTicket ? (wx.getShareInfo({
            shareTicket: u.globalData.shareTicket,
            success: function(t) {
                if (e.uid) {
                    var n = e.uid, i = e.hash_md5, o = e.num;
                    a.requestRed(n, i, o, t.encryptedData, t.iv, function() {
                        a.requestFn();
                    }), a.setData({
                        getRed: !0
                    });
                }
            }
        }), u.globalData.shareTicket = null) : this.requestFn();
    },
    share: null,
    shareFn: function() {
        var a = this;
        e.default.request({
            url: t.default.api.GetChance,
            success: function(e) {
                a.setData({
                    getchance: !1
                });
            }
        });
    },
    compareVersion: function(a, e) {
        if (null == a || null == e || void 0 == a || void 0 == e) return -2;
        a = (a + '""').split("."), e = (e + '""').split(".");
        for (var t = Math.max(a.length, e.length); a.length < t; ) a.push("0");
        for (;e.length < t; ) e.push("0");
        for (var n = 0; n < t; n++) {
            var i = parseInt(a[n]), o = parseInt(e[n]);
            if (i > o) return 1;
            if (i < o) return -1;
        }
        return 0;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var e = s.default.convertText(u.globalData.appConfig.txts.share_title, u.globalData.userInfo.nickname), t = u.globalData.appConfig.images.share_image, n = s.default.handleShare(u.globalData.appConfig.share_item, u.globalData.userInfo), i = "";
        if ("button" == a.from) {
            this.setData({
                getchance: !1
            });
            var o = u.globalData.userInfo.uid, l = new Date();
            i = "/pages/index/index?uid=" + o + "&hash_md5=" + (0, r.default)(o + l) + "&num=" + this.data.sharechance.num;
        }
        return {
            title: n.title || e,
            imageUrl: n.imageUrl || t,
            path: i
        };
    },
    ruletap: function() {
        this.setData({
            ruleShow: !0
        });
    },
    closerule: function() {
        this.setData({
            ruleShow: !1
        });
    },
    gameStart: function(a) {
        var t = this;
        0 == this.data.chances ? (this.gametap = null, this.setData({
            getchance: !0
        })) : this.data.allow ? wx.navigateTo({
            url: "/pages/game/game"
        }) : a.detail && a.detail.encryptedData && a.detail.rawData ? e.default.getUserInfo(a.detail, function(a) {
            t.setData({
                allow: !0
            }), wx.navigateTo({
                url: "/pages/game/game"
            });
        }) : wx.showModal({
            content: "授权失败，请重试"
        });
    },
    closeChance: function() {
        this.setData({
            getchance: !1,
            nochance: !0
        });
    },
    closeNochance: function() {
        this.setData({
            nochance: !1
        });
    },
    maskback: function() {
        this.setData({
            getchance: !0,
            nochance: !1
        });
    },
    closred: function() {
        this.setData({
            getRed: !1
        });
    },
    requestAd: function() {
        var a = this;
        e.default.request({
            url: t.default.api.Index,
            success: function(e) {
                e.data.error || (a.setData({
                    banner: e.data.data.index_banner,
                    appList: e.data.data.index_wxapp,
                    ruleInfo: {
                        ruleList: e.data.data.rule
                    }
                }), l.default.banner = e.data.data.index_banner);
            }
        });
    },
    gomin: function(a) {
        var e = a.currentTarget.dataset.appid, t = a.currentTarget.dataset.opentype, n = a.currentTarget.dataset.path;
        switch (t) {
          case "page":
            wx.reLaunch({
                url: n
            });
            break;

          case "website":
            wx.reLaunch({
                url: "/pages/go/go?url=" + encodeURIComponent(n)
            });
            break;

          case "wxapp":
            wx.navigateToMiniProgram({
                appId: e,
                path: n,
                success: function(a) {},
                fail: function(a) {}
            });
            break;

          case "qrcode":
            var i = a.currentTarget.dataset.qrcode, o = [];
            o[0] = i, wx.previewImage({
                urls: o
            });
        }
    }
});