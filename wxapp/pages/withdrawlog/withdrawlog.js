function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a) {
    for (var t in a) return a.hasOwnProperty(t) ? 0 : 1;
    return 1;
}

var e = a(require("../../libs/js/common.js")), i = (a(require("../../service/app.setting.js")), 
a(require("../../config/api.config.js"))), n = (a(require("../../siteinfo.js")), 
a(require("../../service/service.js"))), o = getApp();

Page({
    data: {
        logList: null,
        isLast: !1,
        page: 1
    },
    _loadData: function() {
        var a = this;
        if (!this.data.isLast) {
            var n = this.data.page;
            e.default.request({
                url: i.default.api.PersonalRecord,
                data: {
                    page: n
                },
                success: function(e) {
                    if (e.data.error) wx.showToast({
                        title: e.data.msg || "服务器开小差了，稍后再试"
                    }); else {
                        var i = a.data.logList;
                        if (!t(e.data.data.items)) {
                            var n = e.data.data;
                            i = i ? i.concat(n.items) : n.items, a.setData({
                                logList: i
                            });
                        }
                        e.data.data.current_page == e.data.data.page_total ? a.setData({
                            isLast: !0
                        }) : a.setData({
                            page: 1 * e.data.data.current_page + 1
                        });
                    }
                }
            });
        }
    },
    onLoad: function(a) {
        wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), wx.setNavigationBarTitle({
            title: o.globalData.appConfig.txts.nav_bar_title
        }), this._loadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this._loadData();
    },
    onShareAppMessage: function() {
        var a = n.default.convertText(o.globalData.appConfig.txts.share_title, o.globalData.userInfo.nickname), t = o.globalData.appConfig.images.share_image, e = n.default.handleShare(o.globalData.appConfig.share_item, o.globalData.userInfo);
        return {
            title: e.title || a,
            imageUrl: e.imageUrl || t,
            path: "/pages/index/index"
        };
    }
});