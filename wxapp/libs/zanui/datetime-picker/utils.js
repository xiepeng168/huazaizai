function e(e, t) {
    for (var n = ""; n.length < t; ) n += "0";
    return (n + e).slice(-t);
}

module.exports.genNumber = function(t, n, r) {
    for (var u = []; t <= n; ) u.push(e(t, r)), t++;
    return u;
}, module.exports.moment = function(t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY:MM:DD";
    if (t || 0 === t || (t = new Date()), "Invalid Date" === (t = new Date(t)).toString()) throw new Error("Invalid Date");
    var r = function(e, n) {
        return n ? n(t["get" + e]()) : t["get" + e]();
    }, u = new Map();
    u.set(/(Y+)/i, function() {
        return r("FullYear", function(e) {
            return (e + "").substr(4 - RegExp.$1.length);
        });
    }), u.set(/(M+)/, function() {
        return r("Month", function(t) {
            return e(t + 1, RegExp.$1.length);
        });
    }), u.set(/(D+)/i, function() {
        return r("Date", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), u.set(/(H+)/i, function() {
        return r("Hours", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), u.set(/(m+)/, function() {
        return r("Minutes", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), u.set(/(s+)/, function() {
        return r("Seconds", function(t) {
            return e(t, RegExp.$1.length);
        });
    });
    for (var o = u, i = Array.isArray(o), s = 0, o = i ? o : o[Symbol.iterator](); ;) {
        var a;
        if (i) {
            if (s >= o.length) break;
            a = o[s++];
        } else {
            if ((s = o.next()).done) break;
            a = s.value;
        }
        var f = a, l = f[0], c = f[1];
        l.test(n) && (n = n.replace(RegExp.$1, c.call(null)));
    }
    return n;
}, module.exports.iso2utc = function(e) {
    if (e) {
        var t = e.match(new RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?")), n = 0, r = new Date(t[1], 0, 1);
        return t[3] && r.setMonth(t[3] - 1), t[5] && r.setDate(+t[5]), t[7] && r.setHours(t[7]), 
        t[8] && r.setMinutes(t[8]), t[10] && r.setSeconds(t[10]), t[12] && r.setMilliseconds(1e3 * Number("0." + t[12])), 
        t[14] && (n = 60 * Number(t[16]) + Number(t[17]), n *= "-" == t[15] ? 1 : -1), n -= r.getTimezoneOffset(), 
        Number(r) + 60 * n * 1e3;
    }
    return e;
};