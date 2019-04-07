var a, t, e = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}(require("../../ec-canvas/echarts")), o = getApp(), r = {
    color: [ "#ffffff", "#ffffff" ],
    radar: {
        splitNumber: 4,
        shape: "circle",
        color: "#ffffff",
        splitArea: {
            areaStyle: {
                opacity: 0
            }
        },
        radius: 90
    },
    series: [ {
        areaStyle: {
            color: "#fff",
            opacity: .8
        },
        lineStyle: {
            width: 0
        },
        type: "radar",
        symbol: "none",
        data: [ {
            value: []
        } ]
    } ]
};

Page({
    data: {
        ec: {
            onInit: function(i, s, n) {
                var l = e.init(i, null, {
                    width: s,
                    height: n
                }), c = o.globalData.user_id;
                return o.util.request({
                    url: "entry/wxapp/Share",
                    method: "post",
                    dataType: "json",
                    data: {
                        user_id: c
                    },
                    success: function(e) {
                        a = e.data.data.cator, t = e.data.data.indicator, r.series[0].data[0].value = a, 
                        r.radar.indicator = t, i.setChart(l), l.setOption(r);
                    }
                }), l;
            }
        }
    },
    onLoad: function() {
        var a = this, t = o.globalData.appname;
        "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), wx.setNavigationBarTitle({
            title: t.title
        }), a.setData({
            answerimg: t.answerimg
        }), wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function(a) {}
        }), a.Shareimg();
    },
    download: function() {
        var a = this.data.imag;
        wx.downloadFile({
            url: a,
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showToast({
                            title: "已保存",
                            icon: "success"
                        });
                    }
                });
            }
        });
    },
    Shareimg: function() {
        var a = o.globalData.user_id, t = this;
        wx.showLoading({
            title: "生成分享图片..."
        }), o.util.request({
            url: "entry/wxapp/Shareimg",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                wx.hideLoading(), t.setData({
                    imag: a.data.data
                });
            }
        });
    },
    jumpdan: function() {
        wx.redirectTo({
            url: "../../pages/passLevel/passLevel"
        });
    },
    onShareAppMessage: function(a) {
        var t = o.globalData.user_id, e = o.globalData.title;
        console.log(o.globalData.title), wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {}
        });
        var r = this;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            withShareTicket: !0,
            success: function(a) {
                console.log(a), wx.getShareInfo({
                    shareTicket: a.shareTickets[0],
                    success: function(a) {
                        r.Forward(a);
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
        var t = o.globalData.user_id;
        o.util.request({
            url: "entry/wxapp/Forward",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                encryptedData: a.encryptedData,
                iv: a.iv
            },
            success: function(a) {
                console.log(a), wx.showModal({
                    title: "分享奖励",
                    content: "金币奖励+" + a.data.data,
                    showCancel: !1
                });
            }
        });
    },
    onReady: function() {
        var a = o.globalData.mylevel;
        this.setData({
            mylevel: a
        });
    }
});