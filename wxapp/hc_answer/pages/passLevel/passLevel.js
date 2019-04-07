function t(e) {
    var s = e.data.Oftenuse;
    for (var n in s) if (void 0 != s[n].synum) {
        var i = s[n].synum || [], r = new Date().getTime() / 1e3, o = i - (r = parseInt(r)) || [], d = a(o);
        o <= 0 && (s[n].alltime = ""), s[n].alltime = d;
    }
    e.setData({
        Oftenuse: s
    }), setTimeout(function() {
        o -= 1, t(e);
    }, 1e3);
}

function a(t) {
    var a = Math.floor(t), e = Math.floor(a / 60);
    e < 10 && (e = "0" + e);
    var s = Math.floor(a % 60);
    return s < 10 && (s = "0" + s), e + ":" + s;
}

var e = getApp();

Page({
    data: {
        answer: !1,
        disabled: !1,
        getdanmoney: !0,
        loop: !1
    },
    onLoad: function(t) {
        var a = e.globalData.appname;
        "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        }), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg,
            appname: a,
            dan_idss: t.dan_idss,
            share2: t.share2
        });
        var s = e.globalData.screenHeight, n = e.globalData.screenWidth;
        this.setData({
            screenHeight: s,
            screenWidth: n
        });
    },
    array: function() {},
    onShow: function() {
        this.Sys(), this.array(), this.getmyLevel(), this.Selfdan(), this.Oftenuse(), this.Currentsj();
    },
    Sys: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var e = JSON.parse(a.data.data.active), s = JSON.parse(a.data.data.answer), n = JSON.parse(a.data.data.basic);
                void 0 != n.rankbgm ? (t.audioCtx = wx.createAudioContext("myAudios"), t.audioCtx.setSrc(n.rankbgm), 
                t.audioCtx.play()) : (t.audioCtx = wx.createAudioContext("myAudios"), t.audioCtx.setSrc(n.indexbgm), 
                t.audioCtx.play()), t.setData({
                    active: e,
                    pic: s
                });
            }
        });
    },
    Currentsj: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Currentsj",
            method: "post",
            dataType: "json",
            success: function(a) {
                var e = a.data.data;
                t.setData({
                    season: e
                });
            }
        });
    },
    saveFormId: function(t) {
        "the formId is a mock one" != t.detail.formId && (this.data.formId = t.detail.formId);
    },
    getBtn: function(t) {
        wx.setStorageSync("getdanmoney", 0), this.saveFormId(t), this.setData({
            getdanmoney: !0
        });
        var a = this.data.formId;
        console.log(a);
        var s = e.globalData.user_id;
        e.util.request({
            url: "entry/wxapp/getformid",
            method: "post",
            dataType: "json",
            data: {
                user_id: s,
                formid: a
            },
            success: function(t) {}
        });
    },
    Selfdan: function() {
        var t = e.globalData.user_id, a = this, s = wx.getStorageSync("getdanmoney");
        e.util.request({
            url: "entry/wxapp/Selfdan",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(t) {
                for (var e = t.data.data, n = 244 * (e.length - 2), i = 0; i < e.length; i++) a.data.dan_idss == e[i].dan_id && 1 == e[i].status && 1 == s && (a.setData({
                    getdanmoney: !1
                }), a.Getreward());
                a.setData({
                    array: e,
                    scrolltop: n
                });
            }
        });
    },
    Getreward: function(t) {
        var a = e.globalData.user_id, s = this;
        e.util.request({
            url: "entry/wxapp/Richactive",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(t) {
                s.setData({
                    result: t.data.data
                });
            }
        });
    },
    match: function(t) {
        var a = this.data.dan_idss, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.needcoin;
        this.data.mylevel.gold - s < 0 ? wx.showToast({
            title: "金币不足"
        }) : (wx.navigateTo({
            url: "answer/answer?dan_id=" + e + "&dan_idss=" + a
        }), this.audioCtx.pause());
    },
    Oftenuse: function() {
        var a = e.globalData.user_id, s = this;
        e.util.request({
            url: "entry/wxapp/Oftenuse",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                var e = a.data.data;
                s.setData({
                    Oftenuse: e
                }), t(s);
            }
        });
    },
    buy: function() {
        wx.redirectTo({
            url: "../pages/market/market"
        }), this.audioCtx.pause();
    },
    getmyLevel: function() {
        var t = e.globalData.user_id, a = this;
        e.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(t) {
                e.globalData.mylevel = t.data.data, a.setData({
                    mylevel: t.data.data
                });
            }
        });
    },
    getM: function(t) {
        var a = t.currentTarget.dataset, e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateY(300).scale(0).step(), this.setData({
            animationData: e.export()
        }), this.setData({
            getM: !0,
            detail: a
        }), setTimeout(function() {
            e.translateY(0).scale(1).step(), this.setData({
                animationData: e,
                getM: !0
            });
        }.bind(this), 10);
    },
    dan: function() {
        wx.navigateTo({
            url: "dan/dan"
        }), this.audioCtx.pause();
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    use: function(t) {
        var a = t.currentTarget.dataset.id, s = this.data.detail;
        s.num--, 0 == s.num && this.setData({
            disabled: !0
        });
        s.num;
        var n = this, i = e.globalData.user_id;
        e.util.request({
            url: "entry/wxapp/Useprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: i,
                pid: a
            },
            success: function(t) {
                n.Oftenuse(), wx.showToast({
                    title: t.data.message
                }), n.setData({
                    detail: s
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var a = e.globalData.title;
        return t.from, {
            title: a.title,
            imageUrl: a.img,
            path: "/hc_answer/pages/register/register"
        };
    }
});