function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../libs/js/common.js")), e = (t(require("../../service/app.setting.js")), 
t(require("../../config/api.config.js"))), n = (t(require("../../siteinfo.js")), 
t(require("../../model/balance.js"))), o = t(require("../../service/service.js")), i = getApp();

Page({
    data: {
        balance: 0,
        inputMoney: null,
        userTakeMoney: 3,
        WarmTips: [ "1.请搜索公众号", "2.如果忘记提现码，可以到提现记录查看" ]
    },
    getMoney: function(t) {
        var a = t.detail.value;
        this.setData({
            inputMoney: a
        });
    },
    withdrawBtn: null,
    gowithdraw: function() {
        var t = this;
        1 * this.data.inputMoney > 1 * this.data.balance ? wx.showToast({
            title: "余额不足",
            icon: "none"
        }) : 1 * this.data.inputMoney < 1 * this.data.userTakeMoney ? wx.showToast({
            title: "提现金额不能小于" + this.data.userTakeMoney + "元",
            icon: "none"
        }) : 1 * this.data.userTakeMoney == 1 ? 1 == this.withdrawBtn ? wx.showModal({
            title: "",
            content: "是否要连续提现",
            success: function(a) {
                a.confirm && (t.withdrawBtn = null, t.gowithdraw());
            }
        }) : wx.showModal({
            title: "",
            content: "确定提现到微信钱包",
            success: function(a) {
                a.confirm ? (t.withdrawBtn = !0, t.requestFn()) : wx.showModal({
                    title: "",
                    content: "提现已取消",
                    showCancel: !1
                });
            }
        }) : 1 * this.data.inputMoney % (1 * this.data.userTakeMoney) ? wx.showToast({
            title: "提现金额只能是" + this.data.userTakeMoney + "的整数倍",
            icon: "none"
        }) : 1 == this.withdrawBtn ? wx.showModal({
            title: "",
            content: "是否要连续提现",
            success: function(a) {
                a.confirm && (t.withdrawBtn = null, t.gowithdraw());
            }
        }) : wx.showModal({
            title: "",
            content: "确定提现到微信钱包",
            success: function(a) {
                a.confirm ? (t.withdrawBtn = !0, t.requestFn()) : wx.showModal({
                    title: "",
                    content: "提现已取消",
                    showCancel: !1
                });
            }
        });
    },
    requestFn: function() {
        var t = this;
        a.default.request({
            url: e.default.api.Withdrawal,
            data: {
                money: this.data.inputMoney
            },
            success: function(a) {
                a.data.error ? wx.showToast({
                    title: a.data.msg || "服务器开小差了，稍后再试",
                    icon: "none"
                }) : (t.setData({
                    balance: (1 * t.data.balance - 1 * t.data.inputMoney).toFixed(2)
                }), n.default.balance = t.data.balance, wx.showToast({
                    title: "提现成功",
                    icon: "none"
                }));
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络错误，稍后再试"
                });
            }
        });
    },
    withAll: function() {
        this.setData({
            inputMoney: this.data.balance - 1 * this.data.balance % (1 * this.data.userTakeMoney)
        });
    },
    onLoad: function(t) {
        wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), wx.setNavigationBarTitle({
            title: i.globalData.appConfig.txts.nav_bar_title
        }), this.setData({
            balance: n.default.balance,
            userTakeMoney: i.globalData.appConfig.txts.cash_out
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = o.default.convertText(i.globalData.appConfig.txts.share_title, i.globalData.userInfo.nickname), a = i.globalData.appConfig.images.share_image, e = o.default.handleShare(i.globalData.appConfig.share_item, i.globalData.userInfo);
        return {
            title: e.title || t,
            imageUrl: e.imageUrl || a,
            path: "/pages/index/index"
        };
    },
    withdrawlog: function() {
        wx.navigateTo({
            url: "/pages/withdrawlog/withdrawlog"
        });
    },
    goindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});