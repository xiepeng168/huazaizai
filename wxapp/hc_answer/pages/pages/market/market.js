var t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var e = t.globalData.appname;
        "" != e.fontcolor && "" !== e.maincolor && wx.setNavigationBarColor({
            frontColor: e.fontcolor,
            backgroundColor: e.maincolor
        }), wx.setNavigationBarTitle({
            title: e.title
        }), this.setData({
            answerimg: e.answerimg,
            appname: e
        }), this.getallgoods();
    },
    getallgoods: function() {
        var a = t.globalData.user_id, e = this;
        t.util.request({
            url: "entry/wxapp/Shop",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(t) {
                e.setData({
                    bottom: t.data.data.bottom,
                    sales: t.data.data.new,
                    goods: t.data.data.goods
                });
            }
        });
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    buy: function(t) {
        var a = t.currentTarget.dataset.index;
        if (-1 == a) e = this.data.sales; else var e = this.data.goods[a];
        this.setData({
            getM: !0,
            goodsDetail: e
        });
    },
    paybtn: function(a) {
        var e = t.globalData.user_id, o = a.currentTarget.dataset.id, s = this;
        t.util.request({
            url: "entry/wxapp/Pay",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                pid: o
            },
            success: function(t) {
                s.pay(t.data.data);
            }
        });
    },
    pay: function(t) {
        var a = this;
        wx.requestPayment({
            timeStamp: "" + t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: "MD5",
            paySign: t.sign,
            success: function(t) {
                wx.showToast({
                    title: "支付成功"
                }), a.setData({
                    getM: !1
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "支付失败"
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var e = t.globalData.user_id, o = t.globalData.title;
        wx.showShareMenu({
            withShareTicket: !0,
            success: function(t) {}
        });
        var s = this;
        return {
            title: o.title,
            imageUrl: o.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + e,
            withShareTicket: !0,
            success: function(t) {
                wx.getShareInfo({
                    shareTicket: t.shareTickets[0],
                    success: function(t) {
                        s.Forward(t);
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    },
    Forward: function(a) {
        var e = t.globalData.user_id;
        t.util.request({
            url: "entry/wxapp/Forward",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                encryptedData: a.encryptedData,
                iv: a.iv
            },
            success: function(t) {
                wx.showModal({
                    title: "分享奖励",
                    content: "金币奖励+" + t.data.data,
                    showCancel: !1
                });
            }
        });
    }
});