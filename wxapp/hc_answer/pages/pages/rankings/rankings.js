var t = getApp(), a = "frends";

Page({
    data: {
        status: 0
    },
    onLoad: function(n) {
        a = "frends";
        var o = t.globalData.appname;
        "" != o.fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
            frontColor: o.fontcolor,
            backgroundColor: o.maincolor
        }), wx.setNavigationBarTitle({
            title: o.title
        }), this.setData({
            answerimg: o.answerimg,
            worldtext: o.worldtext,
            appname: o
        });
    },
    Ranklist: function() {
        var n = t.globalData.user_id, o = this;
        t.util.request({
            url: "entry/wxapp/Ranklist",
            method: "post",
            dataType: "json",
            data: {
                user_id: n,
                type: a
            },
            success: function(t) {
                o.setData({
                    dan: t.data.data,
                    user_id: n
                });
            }
        });
    },
    click: function(t) {
        var n = t.currentTarget.dataset.index;
        a = 0 == n ? "frends" : "else", this.Ranklist(), this.setData({
            status: n
        });
    },
    lastseason: function() {
        wx.navigateTo({
            url: "../lastseason/lastseason"
        });
    },
    onShow: function() {
        this.Ranklist();
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var n = t.globalData.title;
        return a.from, console.log(a.target), {
            title: n.title,
            imageUrl: n.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});