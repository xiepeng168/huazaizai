var t = getApp();

Page({
    data: {
        title: [ "文化程度", "奖励", "头像框" ]
    },
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
    Danlist: function() {
        t.globalData.user_id;
        var a = this;
        t.util.request({
            url: "entry/wxapp/Danlist",
            method: "post",
            dataType: "json",
            success: function(t) {
                a.setData({
                    dan: t.data.data
                });
            }
        });
    },
    onShow: function() {
        this.Danlist();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var o = t.globalData.title;
        return a.from, console.log(a.target), {
            title: o.title,
            imageUrl: o.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});