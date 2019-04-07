var a = getApp();

Page({
    data: {},
    onLoad: function(a) {},
    onReady: function() {
        var t = a.globalData.appname;
        wx.setNavigationBarTitle({
            title: t.title
        }), "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), this.setData({
            answerimg: t.answerimg,
            appname: t
        }), this.Ranklist();
    },
    Ranklist: function() {
        var t = a.globalData.user_id, n = this;
        a.util.request({
            url: "entry/wxapp/Ranklist",
            method: "post",
            dataType: "json",
            data: {
                type: "last"
            },
            success: function(a) {
                n.setData({
                    dan: a.data.data,
                    user_id: t
                });
            }
        });
    },
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var n = a.globalData.title;
        return t.from, console.log(t.target), {
            title: n.title,
            imageUrl: n.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});