var a, t, e = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}(require("../../../ec-canvas/echarts")), r = getApp(), s = {
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
            onInit: function(o, i, n) {
                var l = e.init(o, null, {
                    width: i,
                    height: n
                }), c = r.globalData.user_id;
                return r.util.request({
                    url: "entry/wxapp/Lookshare",
                    method: "post",
                    dataType: "json",
                    data: {
                        user_id: c
                    },
                    success: function(e) {
                        a = e.data.data.cator, t = e.data.data.indicator, s.series[0].data[0].value = a, 
                        s.radar.indicator = t, o.setChart(l), l.setOption(s);
                    }
                }), l;
            }
        }
    },
    onLoad: function() {
        this.Sys();
        var a = r.globalData.user_id;
        this.getDetail(a);
    },
    getDetail: function(a) {
        var t = this;
        r.util.request({
            url: "entry/wxapp/Lookshare",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    mydetail: a.data.data.bottom,
                    user: a.data.data.user
                });
            }
        });
    },
    Sys: function() {
        var a = this;
        r.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(t) {
                var e = JSON.parse(t.data.data.ques).times, s = JSON.parse(t.data.data.answer), o = JSON.parse(t.data.data.basic);
                wx.setNavigationBarTitle({
                    title: o.title
                }), "" != o.fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
                    frontColor: o.fontcolor,
                    backgroundColor: o.maincolor
                }), r.globalData.pic = s, console.log(s), a.setData({
                    times: 100 * e,
                    seconds: e,
                    appname: o,
                    allseconds: e,
                    successpic: s.success,
                    draw: s.draw,
                    pic: s,
                    answerimg: o.answerimg
                });
            }
        });
    },
    index: function() {
        wx.redirectTo({
            url: "../../index/index"
        });
    },
    myshare: function() {
        wx.redirectTo({
            url: "../detail/detail"
        });
    },
    onShareAppMessage: function(a) {
        var t = r.globalData.user_id, e = r.globalData.title;
        return a.from, console.log(a.target), {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            success: function() {},
            fail: function() {}
        };
    }
});