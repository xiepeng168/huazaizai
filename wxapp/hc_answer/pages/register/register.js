var t = getApp();

Page({
    data: {},
    onLoad: function() {
        this.home();
    },
    getUserInfo: function(t) {
        console.log("res1", t);
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? e.login(t) : wx.showModal({
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
    onShow: function() {
        this.Sys();
    },
    register: function(e) {
        wx.getStorage({
            key: "user",
            success: function(a) {
                var o = a.data.detail, n = o.session_key, s = o.encryptedData, i = o.iv;
                t.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: n,
                        iv: i,
                        encryptedData: s
                    },
                    success: function(a) {
                        t.globalData.user_id = a.data.data, "function" == typeof e && e(a.data.data), wx.reLaunch({
                            url: "../index/index"
                        });
                    }
                });
            },
            fail: function(t) {
                console.log("本地缓存失效");
            }
        });
    },
    xiangqig: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../education/education?id=" + e
        });
    },
    Sys: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var o = JSON.parse(a.data.data.basic);
                t.globalData.appname = o, "" != o.fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
                    frontColor: o.fontcolor,
                    backgroundColor: o.maincolor
                }), wx.setNavigationBarTitle({
                    title: o.title
                }), e.setData({
                    appname: o
                });
            }
        });
    },
    home: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/home",
            method: "POST",
            success: function(t) {
                e.setData({
                    stake: t.data.data.stake,
                    shenhe: t.data.data.shenhe
                });
            }
        });
    },
    login: function(e) {
        var a = this;
        wx.login({
            success: function(o) {
                var n = e.detail;
                console.log("login", n), t.globalData.userInfo = n, n.act = "autologin", n.code = o.code, 
                t.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: n,
                    success: function(o) {
                        console.log("res3", o), 0 == o.data.errno && (n.session_key = o.data.data.session_key, 
                        n.openid = o.data.data.openid, t.globalData.userInfo = n, wx.setStorageSync("user", e), 
                        "function" == typeof cb && cb(t.globalData.userInfo), a.register());
                    }
                });
            },
            fail: function(t) {
                console.log("获取失败");
            }
        });
    }
});