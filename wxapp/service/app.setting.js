function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../libs/js/common.js")), o = t(require("../config/api.config.js")), r = t(require("../config/assets.config.js"));

exports.default = {
    settings: r.default,
    getSetting: function() {
        var t = this;
        return new Promise(function(a, n) {
            e.default.request({
                url: o.default.api.setting,
                withoutLogin: !0,
                success: function(e) {
                    if (e.data.error) return n(e.data.msg), !1;
                    for (var o in e.data.data.setting) r.default.hasOwnProperty(o) && (r.default[o] = e.data.data.setting[o]);
                    t.settings = r.default, "on" == t.settings.txts.set_nav_bar && t.setNavBar({
                        title: r.default.txts.nav_bar_title,
                        frontColor: r.default.txts.nav_bar_title_style,
                        backgroundColor: r.default.txts.nav_bar_bg
                    }), a(t.settings);
                },
                fail: function(t) {
                    n(t.data.message);
                }
            });
        });
    },
    setNavBar: function(t) {
        t && t.constructor == Object ? (!t.title && (t.title = "YI FU YUANMA出品"), !t.frontColor && (t.frontColor = "#ffffff"), 
        !t.backgroundColor && (t.backgroundColor = "#000000")) : t = {
            title: "YI FU YUANMA出品",
            frontColor: "#ffffff",
            backgroundColor: "#000000"
        }, wx.setNavigationBarTitle({
            title: t.title
        }), wx.setNavigationBarColor({
            frontColor: t.frontColor,
            backgroundColor: t.backgroundColor
        });
    }
};