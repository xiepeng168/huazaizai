var t, a, e, o = function(t) {
    if (t && t.__esModule) return t;
    var a = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
    return a.default = t, a;
}(require("../../../ec-canvas/echarts")), s = getApp();

Page({
    data: {
        ec: {
            onInit: function(i, r, c) {
                var u = o.init(i, null, {
                    width: r,
                    height: c
                }), l = e;
                return s.util.request({
                    url: "entry/wxapp/Lookshare",
                    method: "post",
                    dataType: "json",
                    data: {
                        user_id: l
                    },
                    success: function(e) {
                        t = e.data.data.cator, a = e.data.data.indicator, i.setChart(u), u.setOption(n);
                    }
                }), u;
            }
        }
    },
    onLoad: function(t) {
        this.Sys();
        var a = t.user_id;
        e = t.user_id, this.getDetail(a);
    },
    getDetail: function(t) {
        var a = this;
        s.util.request({
            url: "entry/wxapp/Lookshare",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(t) {
                n.series[0].data[0].value = t.data.data.cator, n.radar.indicator = t.data.data.indicator, 
                a.setData({
                    mydetail: t.data.data.bottom,
                    user: t.data.data.user
                });
            }
        });
    },
    Sys: function() {
        var t = this;
        s.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var e = JSON.parse(a.data.data.ques).times, o = JSON.parse(a.data.data.answer), n = JSON.parse(a.data.data.basic);
                wx.setNavigationBarTitle({
                    title: n.title
                }), "" != n.fontcolor && "" !== n.maincolor && wx.setNavigationBarColor({
                    frontColor: n.fontcolor,
                    backgroundColor: n.maincolor
                }), s.globalData.pic = o, t.setData({
                    times: 100 * e,
                    seconds: e,
                    allseconds: e,
                    appname: n,
                    successpic: o.success,
                    draw: o.draw,
                    pic: o,
                    answerimg: n.answerimg
                });
            }
        });
    },
    myshare: function() {
        wx.redirectTo({
            url: "../detail/detail"
        });
    },
    onShareAppMessage: function(t) {
        var a = e, o = s.globalData.title;
        return t.from, console.log(t.target), {
            title: o.title,
            imageUrl: o.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + a
        };
    },
    index: function() {
        wx.redirectTo({
            url: "../../index/index"
        });
    },
    getUserInfo: function(t) {
        var a = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? wx.checkSession({
                    success: function(t) {
                        console.log("未过期"), a.register();
                    },
                    fail: function(e) {
                        console.log("已过期"), a.login(t);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    login: function(t) {
        var a = this;
        s.globalData.userInfo ? "function" == typeof cb && cb(s.globalData.userInfo) : wx.login({
            success: function(e) {
                var o = t.detail;
                s.globalData.userInfo = o, o.act = "autologin", o.code = e.code, s.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: o,
                    success: function(e) {
                        0 == e.data.errno && (o.session_key = e.data.data.session_key, o.openid = e.data.data.openid, 
                        s.globalData.userInfo = o, wx.setStorageSync("user", t), "function" == typeof cb && cb(s.globalData.userInfo), 
                        a.register(function(t) {}));
                    }
                });
            },
            fail: function(t) {
                console.log("获取失败");
            }
        });
    },
    register: function(t) {
        var a = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var e = a.data.detail, o = e.session_key, n = e.encryptedData, i = e.iv;
                s.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: o,
                        encryptedData: n,
                        iv: i
                    },
                    success: function(a) {
                        s.globalData.user_id = a.data.data, "function" == typeof t && t(a.data.data), wx.reLaunch({
                            url: "../detail/detail"
                        });
                    }
                });
            },
            fail: function(t) {
                a.setData({});
            }
        });
    }
});

var n = {
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