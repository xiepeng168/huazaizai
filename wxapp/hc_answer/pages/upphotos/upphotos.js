var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = getApp();

Page({
    data: {
        showexample: !1,
        getdanmoney: !0
    },
    onLoad: function(o) {
        var t = e.globalData.appname;
        "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), wx.setNavigationBarTitle({
            title: t.title
        });
        var a = e.globalData.mylevel;
        "" != a.moneycode && this.setData({
            logo: a.moneycode,
            showexample: !0,
            condition: o.condition
        }), this.setData({
            condition: o.condition,
            appname: t,
            dan_idss: o.dan_idss
        });
    },
    chooseImg: function() {
        var o = this;
        wx.chooseImage({
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e), o.setData({
                    logo: e.tempFilePaths,
                    showexample: !0
                });
            }
        });
    },
    delpic: function() {
        this.setData({
            logo: void 0,
            showexample: !1
        });
    },
    upImg: function() {
        var t = this.data.dan_idss, a = this.data.logo;
        if (console.log(void 0 === a ? "undefined" : o(a)), wx.showToast({
            title: "上传中..."
        }), void 0 == a) return wx.showToast({
            title: "请选择照片"
        }), !1;
        if ("string" == typeof a) return wx.redirectTo({
            url: "../passLevel/passLevel?dan_idss=" + t
        }), !1;
        var n = this;
        wx.uploadFile({
            url: e.util.url("entry/wxapp/Uploadimg"),
            filePath: a[0],
            name: "image",
            formData: {
                m: "hc_answer"
            },
            success: function(o) {
                wx.hideLoading(), console.log("上传图片", o);
                var e = o.data;
                e = JSON.parse(e), n.Uploadmoneycode(e.data);
            }
        });
    },
    Uploadmoneycode: function(o) {
        var t = e.globalData.user_id;
        e.util.request({
            url: "entry/wxapp/Uploadmoneycode",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                moneycode: o
            },
            success: function(o) {
                console.log(o), wx.showToast({
                    title: o.data.message
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../passLevel/passLevel"
                    });
                }, 2e3);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});