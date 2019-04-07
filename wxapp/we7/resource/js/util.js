function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var n = e.split("?")[1].split("&"), r = 0; r < n.length; r++) n[r].split("=")[0] && unescape(n[r].split("=")[1]) && (t[r] = {
        name: n[r].split("=")[0],
        value: unescape(n[r].split("=")[1])
    });
    return t;
}

function getUrlParam(e, t) {
    var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), r = e.split("?")[1].match(n);
    return null != r ? unescape(r[2]) : null;
}

function getSign(e, t, n) {
    var r = require("underscore.js"), a = require("md5.js"), s = "", i = getUrlParam(e, "sign");
    if (i || t && t.sign) return !1;
    if (e && (s = getQuery(e)), t) {
        var o = [];
        for (var u in t) u && t[u] && (o = o.concat({
            name: u,
            value: t[u]
        }));
        s = s.concat(o);
    }
    s = r.sortBy(s, "name"), s = r.uniq(s, !0, "name");
    for (var c = "", f = 0; f < s.length; f++) s[f] && s[f].name && s[f].value && (c += s[f].name + "=" + s[f].value, 
    f < s.length - 1 && (c += "&"));
    return n = n || getApp().siteInfo.token, i = a(c + n);
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _base = require("base64"), _md = require("md5"), _md2 = _interopRequireDefault(_md), util = {};

util.base64_encode = function(e) {
    return (0, _base.base64_encode)(e);
}, util.base64_decode = function(e) {
    return (0, _base.base64_decode)(e);
}, util.md5 = function(e) {
    return (0, _md2.default)(e);
}, util.url = function(e, t) {
    var n = getApp(), r = n.siteInfo.siteroot + "?i=" + n.siteInfo.uniacid + "&t=" + n.siteInfo.multiid + "&v=" + n.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (r += "c=" + e[0] + "&"), e[1] && (r += "a=" + e[1] + "&"), 
    e[2] && (r += "do=" + e[2] + "&")), t && "object" === (void 0 === t ? "undefined" : _typeof(t))) for (var a in t) a && t.hasOwnProperty(params) && t[a] && (r += a + "=" + t[a] + "&");
    return r;
}, util.getSign = function(e, t, n) {
    return getSign(e, t, n);
}, util.request = function(e) {
    require("underscore.js");
    var t, n = require("md5.js"), r = getApp();
    (e = e || {}).cachetime = e.cachetime ? e.cachetime : 0;
    var a = wx.getStorageSync("userInfo").sessionid, s = e.url;
    if (-1 == s.indexOf("http://") && -1 == s.indexOf("https://") && (s = util.url(s)), 
    getUrlParam(s, "state") || e.data && e.data.state || !a || (s = s + "&state=we7sid-" + a), 
    !e.data || !e.data.m) {
        var i = getCurrentPages();
        i.length && (i = i[getCurrentPages().length - 1]) && i.__route__ && (s = s + "&m=" + i.__route__.split("/")[0]);
    }
    var o = getSign(s, e.data);
    if (o && (s = s + "&sign=" + o), !s) return !1;
    if (e.cachetime) {
        var u = n(s), c = wx.getStorageSync(u), f = Date.parse(new Date());
        if (c && c.data) {
            if (c.expire > f) return e.complete && "function" == typeof e.complete && e.complete(c), 
            e.success && "function" == typeof e.success && e.success(c), console.log("cache:" + s), 
            !0;
            wx.removeStorageSync(u);
        }
    }
    wx.request((t = {
        url: s,
        data: e.data ? e.data : {},
        header: e.header ? e.header : {},
        method: e.method ? e.method : "GET"
    }, _defineProperty(t, "header", {
        "content-type": "application/x-www-form-urlencoded"
    }), _defineProperty(t, "success", function(t) {
        if (t.data.errno) {
            if ("41009" == t.data.errno) return wx.setStorageSync("userInfo", ""), void util.getUserInfo(function() {
                util.request(e);
            });
            if (e.fail && "function" == typeof e.fail) e.fail(t); else if (t.data.message) {
                if (null != t.data.data && t.data.data.redirect) n = t.data.data.redirect; else var n = "";
                r.util.message(t.data.message, n, "error");
            }
        } else if (e.success && "function" == typeof e.success && e.success(t), e.cachetime) {
            var a = {
                data: t.data,
                expire: f + 1e3 * e.cachetime
            };
            wx.setStorageSync(u, a);
        }
    }), _defineProperty(t, "fail", function(t) {
        var n = require("md5.js")(s), r = wx.getStorageSync(n);
        if (r && r.data) return e.success && "function" == typeof e.success && e.success(r), 
        console.log("failreadcache:" + s), !0;
        e.fail && "function" == typeof e.fail && e.fail(t);
    }), _defineProperty(t, "complete", function(t) {
        e.complete && "function" == typeof e.complete && e.complete(t);
    }), t));
}, util.getUserInfo = function(e) {
    var t = function() {
        console.log("start login");
        var t = {
            sessionid: "",
            wxInfo: "",
            memberInfo: ""
        };
        wx.login({
            success: function(n) {
                util.request({
                    url: "auth/session/openid",
                    data: {
                        code: n.code
                    },
                    cachetime: 0,
                    success: function(n) {
                        n.data.errno || (t.sessionid = n.data.data.sessionid, wx.setStorageSync("userInfo", t), 
                        wx.getUserInfo({
                            success: function(n) {
                                t.wxInfo = n.userInfo, wx.setStorageSync("userInfo", t), util.request({
                                    url: "auth/session/userinfo",
                                    data: {
                                        signature: n.signature,
                                        rawData: n.rawData,
                                        iv: n.iv,
                                        encryptedData: n.encryptedData
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    cachetime: 0,
                                    success: function(n) {
                                        n.data.errno || (t.memberInfo = n.data.data, wx.setStorageSync("userInfo", t)), 
                                        "function" == typeof e && e(t);
                                    }
                                });
                            },
                            fail: function() {
                                "function" == typeof e && e(t);
                            },
                            complete: function() {}
                        }));
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function(e) {
                        e.confirm && util.getUserInfo();
                    }
                });
            }
        });
    }, n = wx.getStorageSync("userInfo");
    n.sessionid ? wx.checkSession({
        success: function() {
            "function" == typeof e && e(n);
        },
        fail: function() {
            n.sessionid = "", console.log("relogin"), wx.removeStorageSync("userInfo"), t();
        }
    }) : t();
}, util.navigateBack = function(e) {
    var t = e.delta ? e.delta : 1;
    if (e.data) {
        var n = getCurrentPages(), r = n[n.length - (t + 1)];
        r.pageForResult ? r.pageForResult(e.data) : r.setData(e.data);
    }
    wx.navigateBack({
        delta: t,
        success: function(t) {
            "function" == typeof e.success && e.success(t);
        },
        fail: function(t) {
            "function" == typeof e.fail && e.fail(t);
        },
        complete: function() {
            "function" == typeof e.complete && e.complete();
        }
    });
}, util.footer = function(e) {
    var t = e, n = getApp().tabBar;
    for (var r in n.list) n.list[r].pageUrl = n.list[r].pagePath.replace(/(\?|#)[^"]*/g, "");
    t.setData({
        tabBar: n,
        "tabBar.thisurl": t.__route__
    });
}, util.message = function(e, t, n) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, n = e.type, 
    e = e.title), t) {
        var r = t.substring(0, 9), a = "", s = "";
        "navigate:" == r ? (s = "navigateTo", a = t.substring(9)) : "redirect:" == r ? (s = "redirectTo", 
        a = t.substring(9)) : (a = t, s = "redirectTo");
    }
    console.log(a), n || (n = "success"), "success" == n ? wx.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!a,
        complete: function() {
            a && setTimeout(function() {
                wx[s]({
                    url: a
                });
            }, 1800);
        }
    }) : "error" == n && wx.showModal({
        title: "系统信息",
        content: e,
        showCancel: !1,
        complete: function() {
            a && wx[s]({
                url: a
            });
        }
    });
}, util.user = util.getUserInfo, util.showImage = function(e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    wx.previewImage({
        urls: [ t ]
    });
}, util.parseContent = function(e) {
    if (!e) return e;
    var t = [ "\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]" ], n = e.match(new RegExp(t.join("|"), "g"));
    if (n) for (var r in n) e = e.replace(n[r], "[U+" + n[r].codePointAt(0).toString(16).toUpperCase() + "]");
    return e;
}, util.date = function() {
    this.isLeapYear = function(e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0);
    }, this.dateToStr = function(e, t) {
        e = arguments[0] || "yyyy-MM-dd HH:mm:ss", t = arguments[1] || new Date();
        var n = e, r = [ "日", "一", "二", "三", "四", "五", "六" ];
        return n = n.replace(/yyyy|YYYY/, t.getFullYear()), n = n.replace(/yy|YY/, t.getYear() % 100 > 9 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100), 
        n = n.replace(/MM/, t.getMonth() > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)), 
        n = n.replace(/M/g, t.getMonth()), n = n.replace(/w|W/g, r[t.getDay()]), n = n.replace(/dd|DD/, t.getDate() > 9 ? t.getDate().toString() : "0" + t.getDate()), 
        n = n.replace(/d|D/g, t.getDate()), n = n.replace(/hh|HH/, t.getHours() > 9 ? t.getHours().toString() : "0" + t.getHours()), 
        n = n.replace(/h|H/g, t.getHours()), n = n.replace(/mm/, t.getMinutes() > 9 ? t.getMinutes().toString() : "0" + t.getMinutes()), 
        n = n.replace(/m/g, t.getMinutes()), n = n.replace(/ss|SS/, t.getSeconds() > 9 ? t.getSeconds().toString() : "0" + t.getSeconds()), 
        n = n.replace(/s|S/g, t.getSeconds());
    }, this.dateAdd = function(e, t, n) {
        switch (n = arguments[2] || new Date(), e) {
          case "s":
            return new Date(n.getTime() + 1e3 * t);

          case "n":
            return new Date(n.getTime() + 6e4 * t);

          case "h":
            return new Date(n.getTime() + 36e5 * t);

          case "d":
            return new Date(n.getTime() + 864e5 * t);

          case "w":
            return new Date(n.getTime() + 6048e5 * t);

          case "m":
            return new Date(n.getFullYear(), n.getMonth() + t, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());

          case "y":
            return new Date(n.getFullYear() + t, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());
        }
    }, this.dateDiff = function(e, t, n) {
        switch (e) {
          case "s":
            return parseInt((n - t) / 1e3);

          case "n":
            return parseInt((n - t) / 6e4);

          case "h":
            return parseInt((n - t) / 36e5);

          case "d":
            return parseInt((n - t) / 864e5);

          case "w":
            return parseInt((n - t) / 6048e5);

          case "m":
            return n.getMonth() + 1 + 12 * (n.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);

          case "y":
            return n.getFullYear() - t.getFullYear();
        }
    }, this.strToDate = function(dateStr) {
        var data = dateStr, reCat = /(\d{1,4})/gm, t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d;
    }, this.strFormatToDate = function(e, t) {
        var n = 0, r = -1, a = t.length;
        (r = e.indexOf("yyyy")) > -1 && r < a && (n = t.substr(r, 4));
        var s = 0;
        (r = e.indexOf("MM")) > -1 && r < a && (s = parseInt(t.substr(r, 2)) - 1);
        var i = 0;
        (r = e.indexOf("dd")) > -1 && r < a && (i = parseInt(t.substr(r, 2)));
        var o = 0;
        ((r = e.indexOf("HH")) > -1 || (r = e.indexOf("hh")) > 1) && r < a && (o = parseInt(t.substr(r, 2)));
        var u = 0;
        (r = e.indexOf("mm")) > -1 && r < a && (u = t.substr(r, 2));
        var c = 0;
        return (r = e.indexOf("ss")) > -1 && r < a && (c = t.substr(r, 2)), new Date(n, s, i, o, u, c);
    }, this.dateToLong = function(e) {
        return e.getTime();
    }, this.longToDate = function(e) {
        return new Date(e);
    }, this.isDate = function(e, t) {
        null == t && (t = "yyyyMMdd");
        var n = t.indexOf("yyyy");
        if (-1 == n) return !1;
        var r = e.substring(n, n + 4), a = t.indexOf("MM");
        if (-1 == a) return !1;
        var s = e.substring(a, a + 2), i = t.indexOf("dd");
        if (-1 == i) return !1;
        var o = e.substring(i, i + 2);
        return !(!isNumber(r) || r > "2100" || r < "1900") && (!(!isNumber(s) || s > "12" || s < "01") && !(o > getMaxDay(r, s) || o < "01"));
    }, this.getMaxDay = function(e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31";
    }, this.isNumber = function(e) {
        return /^\d+$/g.test(e);
    }, this.toArray = function(e) {
        e = arguments[0] || new Date();
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(), 
        t[4] = e.getMinutes(), t[5] = e.getSeconds(), t;
    }, this.datePart = function(e, t) {
        t = arguments[1] || new Date();
        var n = "", r = [ "日", "一", "二", "三", "四", "五", "六" ];
        switch (e) {
          case "y":
            n = t.getFullYear();
            break;

          case "M":
            n = t.getMonth() + 1;
            break;

          case "d":
            n = t.getDate();
            break;

          case "w":
            n = r[t.getDay()];
            break;

          case "ww":
            n = t.WeekNumOfYear();
            break;

          case "h":
            n = t.getHours();
            break;

          case "m":
            n = t.getMinutes();
            break;

          case "s":
            n = t.getSeconds();
        }
        return n;
    }, this.maxDayOfDate = function(e) {
        (e = arguments[0] || new Date()).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate();
    };
}, module.exports = util;