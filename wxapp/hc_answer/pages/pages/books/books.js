var t = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var a = t.globalData.appname;
        console.log(a), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg,
            appname: a
        }), "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        });
    },
    close: function() {
        this.setData({
            getM: !1,
            success: !1
        });
    },
    getBooks: function() {
        var e = t.globalData.user_id, a = this;
        t.util.request({
            url: "entry/wxapp/Knowledge",
            method: "post",
            dataType: "json",
            data: {
                user_id: e
            },
            success: function(t) {
                a.setData({
                    getBooks: t.data.data
                });
            }
        });
    },
    upLevel: function(e) {
        var a = t.globalData.user_id, s = e.currentTarget.dataset.id, o = this.data.usebook;
        if (parseInt(o.have) - parseInt(o.need) < 0) this.setData({
            fail: 1,
            success: !0
        }); else {
            var n = this;
            t.util.request({
                url: "entry/wxapp/Upgrade",
                method: "post",
                dataType: "json",
                data: {
                    user_id: a,
                    tid: s
                },
                success: function(t) {
                    n.getBooks(), wx.showToast({
                        title: t.data.message
                    }), o.level++, n.setData({
                        usebook: o,
                        success: !0,
                        fail: 0
                    });
                },
                fail: function(t) {
                    "知识书不足" == t.data.message ? n.setData({
                        fail: 1,
                        success: !0
                    }) : n.setData({
                        fail: 2,
                        success: !0
                    });
                }
            });
        }
    },
    buy: function() {
        wx.redirectTo({
            url: "../market/market"
        });
    },
    onShow: function() {
        this.getBooks();
    },
    onHide: function() {},
    show: function(t) {
        var e = t.currentTarget.dataset, a = parseInt(e.score) - parseInt(e.plus);
        parseInt(e.maxlevel) - parseInt(e.level) == 0 ? wx.showToast({
            title: "已达最高等级"
        }) : (null == e.have && (e.have = 0), this.setData({
            usebook: e,
            getexper: a,
            getM: !0
        }));
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var a = t.globalData.title;
        return e.from, console.log(e.target), {
            title: a.title,
            imageUrl: a.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});