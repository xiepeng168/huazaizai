var t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = t.globalData.appname;
        "" != o.fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
            frontColor: o.fontcolor,
            backgroundColor: o.maincolor
        }), wx.setNavigationBarTitle({
            title: o.title
        }), this.setData({
            answerimg: o.answerimg,
            appname: o
        });
    },
    getgoods: function() {
        var a = this, o = t.globalData.user_id;
        t.util.request({
            url: "entry/wxapp/Selfprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    goods: t.data.data
                });
            }
        });
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    close1: function() {
        this.setData({
            getGoods: !1
        });
    },
    getdetail: function(t) {
        var a = t.currentTarget.dataset.id, o = this.data.goods;
        for (var e in o) if (o[e].id == a) var s = o[e];
        this.setData({
            getM: !0,
            goodsdetail: s
        });
    },
    pay: function() {},
    use: function(a) {
        var o = a.currentTarget.dataset.id, e = a.currentTarget.dataset.type;
        console.log(e);
        var s = this.data.goodsdetail;
        s.num--;
        var n = s.num - 1;
        console.log(e);
        var i = this, r = t.globalData.user_id;
        t.util.request({
            url: "entry/wxapp/Useprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: r,
                pid: o
            },
            success: function(t) {
                i.getgoods(), i.setData({
                    goodsdetail: s,
                    getAllGoods: t.data.data
                }), -1 == n && i.setData({
                    getM: !1
                }), 3 == e || 4 == e ? wx.showToast({
                    title: "金币+" + s.jb
                }) : wx.showToast({
                    title: "使用成功",
                    duration: 1e3
                }), 1 != e && 2 != e || i.setData({
                    getGoods: !0
                });
            }
        });
    },
    onShow: function() {
        this.getgoods();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var o = t.globalData.title;
        return a.from, console.log(a.target), {
            desc: o.title,
            imageUrl: o.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});