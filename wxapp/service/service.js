function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../libs/js/common.js"));

t(require("../config/assets.config.js"));

exports.default = {
    getList: function(t, a, n, r) {
        e.default.request({
            url: t,
            showLoading: !0,
            data: {
                page: a
            },
            success: function(t) {
                n && n(t);
            },
            fail: function(t) {
                r && r(t);
            }
        });
    },
    convertText: function(t, e) {
        return t.replace(/#昵称#/g, e || "有人");
    },
    startCountDate: function(t, e) {
        var a = "", n = void 0, r = void 0, o = void 0, i = void 0, s = void 0, c = void 0;
        return n = setInterval(function() {
            (c = Math.ceil((t - new Date().getTime()) / 1e3)) < 0 ? (a = "", clearInterval(n), 
            n = null) : (r = parseInt(c / 86400), o = parseInt((c - 3600 * r * 24) / 3600), 
            i = parseInt((c - 3600 * o - 24 * r * 3600) / 60), s = c - 3600 * r * 24 - 3600 * o - 60 * i, 
            c < 0 && e && e(a), o < 10 && (o = "0" + o), i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), 
            a = r + "天" + o + "小时" + i + "分" + s + "秒"), e && e(a);
        }, 1e3);
    },
    wxShare: function(t) {
        return t && t.constructor == Object ? (wx.showShareMenu({
            withShareTicket: !0
        }), {
            title: t.share_title,
            imageUrl: t.imageUrl,
            path: t.path
        }) : {};
    },
    payRequest: function(t, a, n) {
        e.default.request({
            url: t,
            data: a,
            success: function(t) {
                t.data && t.data.data && wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function(t) {
                        n && n(t);
                    },
                    fail: function(t) {
                        var e = t.errorMsg || errMsg || t.msg || t.message;
                        e.indexOf("cancel") > 0 ? wx.showModal({
                            content: "支付已取消",
                            showCancel: !1
                        }) : wx.showModal({
                            content: e,
                            showCancel: !1
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "" + t.data.msg
                });
            }
        });
    },
    handleShare: function(t, e) {
        var a = t.length, n = "", r = "";
        if (a > 0) {
            var o = Math.floor(Math.random() * a + 1) - 1;
            n = t[o].title, r = t[o].thumb;
        }
        return {
            title: this.convertText(n, e.nickname),
            imageUrl: r || ""
        };
    }
};