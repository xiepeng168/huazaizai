var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../service/service.js")), a = getApp();

Page({
    data: {
        items: [ {
            value: "色情"
        }, {
            value: "欺诈"
        }, {
            value: "骚扰"
        }, {
            value: "违法犯罪"
        }, {
            value: "隐私信息收集"
        }, {
            value: "内容不符"
        } ],
        select: null
    },
    checkboxChange: function(e) {
        var a = [];
        a[0] = !!e.detail.value.includes("色情"), a[1] = !!e.detail.value.includes("欺诈"), 
        a[2] = !!e.detail.value.includes("骚扰"), a[3] = !!e.detail.value.includes("违法犯罪"), 
        a[4] = !!e.detail.value.includes("隐私信息收集"), a[5] = !!e.detail.value.includes("内容不符"), 
        this.setData({
            select: a
        });
    },
    submit: function() {
        wx.showModal({
            title: "",
            content: "我们已受理您的投诉，将在24小时内尽快处理",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({});
            }
        });
    },
    onLoad: function(e) {
        wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), wx.setNavigationBarTitle({
            title: a.globalData.appConfig.txts.nav_bar_title
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var n = e.default.convertText(a.globalData.appConfig.txts.share_title, a.globalData.userInfo.nickname), t = a.globalData.appConfig.images.share_image, l = e.default.handleShare(a.globalData.appConfig.share_item, a.globalData.userInfo);
        return {
            title: l.title || n,
            imageUrl: l.imageUrl || t,
            path: "/pages/index/index"
        };
    }
});