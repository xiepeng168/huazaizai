function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../config/api.config.js")), a = e(require("underscore.js")), n = e(require("../../siteinfo.js")), i = e(require("md5.js")), o = getApp();

exports.default = {
    showLoading: function() {
        wx.getStorageSync("isShowLoading") && (wx.hideLoading(), wx.setStorageSync("isShowLoading", !1)), 
        wx.showLoading({
            title: "加载中",
            complete: function() {
                wx.setStorageSync("isShowLoading", !0);
            },
            fail: function() {
                wx.setStorageSync("isShowLoading", !1);
            }
        });
    },
    createUrl: function(e, a) {
        var i = n.default.siteroot + "?i=" + n.default.uniacid + "&gp=" + t.default.gp + "&t=" + n.default.multiid + "&v=" + n.default.version + "&from=wxapp&", o = null;
        if ((o = e ? e.split("/") : [])[0] && (i += "c=" + o[0] + "&"), o[1] && (i += "a=" + o[1] + "&"), 
        o[2] && (i += "do=" + o[2] + "&"), a && "[object Object]" == Object.prototype.toString.call(a)) for (var s in a) i += s + "=" + a[s] + "&";
        return i;
    },
    getQuery: function(e) {
        var t = [], a = "";
        return -1 != e.indexOf("?") && (a = e.split("?")[1].split("&")), a.map(function(e, a, n) {
            e.split("=")[0] && unescape(e.split("=")[1]) && (t[a] = {
                name: e.split("=")[0],
                value: unescape(e.split("=")[1])
            });
        }), t;
    },
    getUrlParam: function(e, t) {
        var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].match(a);
        return n ? unescape(n[2]) : null;
    },
    getSign: function(e, t, o) {
        var s = "", r = [], c = this.getUrlParam(e, "sign");
        if (c || t && t.sign) return !1;
        if (e && (s = this.getQuery(e)), t) for (var u in t) r = r.concat({
            name: u,
            value: t[u]
        });
        s = s.concat(r), s = a.default.sortBy(s, "name"), s = a.default.uniq(s, !0, "name");
        var f = "", l = (s = a.default.compact(s)).length;
        return s.map(function(e, t, a) {
            e && e.name && e.value && (f += e.name + "=" + e.value), t < l - 1 && (f += "&");
        }), o = o || n.default.token, c = (0, i.default)(f + o);
    },
    request: function(e, a) {
        var n = "", s = wx.getStorageSync("userInfo").sessionid;
        if ("[object Object]" !== Object.prototype.toString(e)) throw new Error(arguments[0] + "必须是一个对象");
        if (!t.default.m) return wx.showModal({
            title: "提示",
            content: "清配置模块名"
        }), !1;
        e && e.data && (e.cachetime = e.cachetime ? e.cachetime : 0, e.data.m = t.default.m), 
        o && (e.data.version = o.globalData.version), e.cachetime = e.cachetime ? e.cachetime : 0, 
        e.showLoading = void 0 === e.showLoading || e.showLoading, e.url && -1 == e.url.indexOf("http://") && -1 == e.url.indexOf("https://") && (n = this.createUrl(e.url, e.data)), 
        e.withoutLogin || this.getUrlParam(n, "state") || e.data && e.data.state || !s || (n += "state=we7sid-" + s);
        var r = this.getSign(n, e.data);
        if (r && (n += "&sign=" + r), !n) return !1;
        if (e.showLoading && this.showLoading(), e.cachetime) {
            var c = (0, i.default)(n), u = wx.getStorageSync(c), f = Date.parse(new Date());
            if (u && u.data) {
                if (u.expire > f) return e.complete && "function" == typeof e.complete && e.complete(u), 
                e.success && "function" == typeof e.success && e.success(u), wx.hideLoading(), !0;
                wx.removeStorageSync(c);
            }
        }
        if (a && "file" === a) {
            wx.uploadFile({
                url: n + "&m=" + t.default.m,
                filePath: e.filePath,
                name: e.name || "file",
                formData: e.formData,
                success: function(t) {
                    t.data.errno ? e.fail && e.fail(t) : e.success && e.success(t);
                },
                fail: function(t) {
                    e.fail && e.fail(t);
                }
            });
            return !1;
        }
        wx.request({
            url: n,
            data: e.data ? e.data : {
                m: t.default.m
            },
            header: e.header ? e.header : {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: e.method ? e.method : "GET",
            cachetime: e.cachetime ? e.cachetime : 0,
            success: function(t) {
                if (wx.hideNavigationBarLoading(), wx.hideLoading(), t.data.errno) e.fail && e.fail(t); else if (e.success && e.success(t), 
                e.cachetime) {
                    var a = {
                        data: t.data,
                        expire: "" + timestamp + 1e3 * e.cachetime
                    };
                    wx.setStorageSync(cachekey, a);
                }
            },
            fail: function(t) {
                wx.hideNavigationBarLoading(), wx.hideLoading();
                var a = (0, i.default)(n), o = wx.getStorageSync(a);
                if (o && o.data) return e.success && e.success(o), !0;
                e.fail && e.fail(t);
            },
            complete: function(t) {
                e.complete && e.complete(t);
            }
        });
    },
    checkLogin: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        a.sessionid ? this.request({
            url: "auth/session/check",
            method: "POST",
            cachetime: 0,
            showLoading: !0,
            success: function(n) {
                n.data.errno ? (a.sessionid = "", wx.removeStorageSync("userInfo"), t.login(e)) : e && e(a);
            },
            fail: function(a) {
                t.login(e);
            }
        }) : this.login(e);
    },
    login: function(e) {
        var t = this;
        wx.login({
            success: function(a) {
                t.request({
                    url: "auth/session/openid",
                    data: {
                        code: a.code
                    },
                    cachetime: 0,
                    success: function(t) {
                        var a = wx.getStorageSync("userInfo") || {};
                        t.data.errno || (a.sessionid = t.data.data.sessionid, a.memberInfo = t.data.data.userinfo, 
                        wx.setStorageSync("userInfo", a), e(wx.getStorageSync("userInfo")));
                    }
                });
            },
            fail: function(a) {
                wx.removeStorageSync("userInfo"), wx.showModal({
                    title: "哎呀,出错了",
                    content: "登录失败，请重试",
                    success: function(a) {
                        a.confirm && t.login(e);
                    }
                });
            }
        });
    },
    getUserInfo: function(e, t) {
        var a = this;
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? a.checkLogin(function(n) {
                    n.sessionid && a.uploadUserInfo(e, t);
                }) : a.showMessage(null, "请允许授权，以便我们为您提供更好的服务");
            },
            fail: function(e) {
                a.showMessage(null, "请允许授权，以便我们为您提供更好的服务");
            }
        });
    },
    uploadUserInfo: function(e, a) {
        var n = this, i = wx.getStorageSync("userInfo") || {};
        e ? (i.wxInfo = e.userInfo, this.request({
            url: "auth/session/userinfo",
            data: {
                signature: e.signature,
                rawData: e.rawData,
                iv: e.iv,
                encryptedData: e.encryptedData
            },
            cachetime: 0,
            method: "POST",
            success: function(e) {
                e.data.errno || (i.memberInfo = e.data.data, wx.setStorageSync("userInfo", i), a && a(i), 
                n.request({
                    url: t.default.api.init,
                    showLoading: !1
                }));
            },
            fail: function(t) {
                wx.clearStorageSync("userInfo"), n.checkLogin(function(t) {
                    t.session && n.uploadUserInfo(e, a);
                });
            }
        })) : a && a(i);
    },
    showMessage: function(e, t) {
        wx.showModal({
            title: e || "温馨提示",
            content: "" + t
        });
    },
    compareVersion: function(e, t) {
        if (!e || !t) return !1;
        e = e.split("."), t = t.split(".");
        for (var a = Math.max(e.length, t.length); e.length < a; ) e.push("0");
        for (;t.length < a; ) t.push("0");
        for (var n = 0; n < a; n++) {
            var i = parseInt(e[n]), o = parseInt(t[n]);
            if (i > o) return 1;
            if (i < o) return -1;
        }
        return 0;
    }
};