function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return "object" === (void 0 === t ? "undefined" : e(t)) ? t : {
        content: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = getCurrentPages(), n = o[o.length - 1], r = {
        selector: "#zan-toptips",
        duration: 3e3
    };
    e = Object.assign(r, t(e));
    var s = n.selectComponent(e.selector);
    delete e.selector, s.setData(Object.assign({}, e)), s && s.show();
};