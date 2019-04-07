function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

function t(a, t) {
    return Math.random() > .5 ? -1 : 1;
}

var e, n, s, i, r, o, c, d = getApp(), u = 0, l = 0, m = !1, p = 0;

Page({
    data: (e = {
        matching: !1,
        matched: !1,
        loop: !1,
        question: [],
        click: !1
    }, a(e, "matched", !0), a(e, "loop", !0), a(e, "answerShow", !0), a(e, "score", {
        myscore: {
            myscore: "0",
            myrate: "10"
        },
        enemy: {
            enemy: "0",
            enemyrate: "10"
        }
    }), a(e, "seconds", 10), e),
    onLoad: function(a) {
        u = 0, p = 0, l = 0;
        var t = d.globalData.appname, e = d.globalData.mp3;
        wx.setNavigationBarTitle({
            title: t.title
        }), "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), this.setData({
            answerimg: t.answerimg,
            dan_idss: a.dan_idss,
            dan_id: a.dan_id,
            appname: t,
            mp3: e
        });
        var n = d.globalData.mylevel;
        console.log(n);
        var s = this.data.seconds, i = d.globalData.screenHeight, r = d.globalData.screenWidth;
        this.setData({
            screenHeight: i,
            screenWidth: r,
            seconds: s,
            mylevel: n,
            mysum: 0,
            enemysum: 0,
            Allshow: !0,
            showprogress: !1
        }), this.matching(a.dan_id);
    },
    onShow: function() {
        this.Sys(), wx.getNetworkType({
            success: function(a) {
                a.networkType;
            }
        }), wx.onNetworkStatusChange(function(a) {
            "none" == a.networkType && (clearInterval(n), clearInterval(s), clearInterval(i), 
            clearTimeout(r), clearTimeout(o), wx.showModal({
                title: "当前无网络",
                content: "请先确认网络链接没问题",
                showCancel: !1,
                success: function(a) {
                    a.confirm && (wx.navigateBack({
                        delta: 1
                    }), this.audioCtx.pause());
                }
            }));
        });
    },
    passlevel: function() {
        wx.navigateBack({
            delta: 1
        }), this.audioCtx.pause();
    },
    matching: function(a) {
        var t = this;
        t.getenemy = function() {
            var e = d.globalData.user_id;
            d.util.request({
                url: "entry/wxapp/Matching",
                method: "post",
                dataType: "json",
                data: {
                    user_id: e,
                    dan: a
                },
                success: function(a) {
                    clearInterval(n);
                    var s = a.data.data.user;
                    for (var i in s) if (s[i].uid == e) var r = s[i]; else var o = s[i];
                    t.moveLeft(), t.moveRight(), t.vs(), t.setData({
                        myself: r,
                        enemy: o,
                        matched: !1,
                        matching: !0,
                        user_id: e,
                        rid: a.data.data.rid
                    }), t.Getques(a.data.data.rid);
                },
                fail: function(a) {}
            });
        }, n = setInterval(t.getenemy, 1e3);
    },
    Sys: function() {
        var a = this;
        d.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(t) {
                var e = JSON.parse(t.data.data.ques).times, n = JSON.parse(t.data.data.answer), s = JSON.parse(t.data.data.ques), i = JSON.parse(t.data.data.basic);
                a.setData({
                    times: 100 * e,
                    seconds: e,
                    allseconds: e,
                    successpic: n.success,
                    draw: n.draw,
                    mp3: s,
                    allansnum: s.quesnum,
                    basic: i
                });
            }
        });
    },
    moveLeft: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        setTimeout(function() {
            a.translateX(140).translateY(190).step(), this.setData({
                animationData: a.export()
            });
        }.bind(this), 100);
    },
    Getques: function(a) {
        clearInterval(s);
        var e = d.globalData.user_id, c = this;
        c.data.ans = void 0, c.setData({
            click: !1
        }), c.data.hh = void 0;
        var u = d.globalData.screenWidth;
        d.util.request({
            url: "entry/wxapp/Getques",
            method: "post",
            dataType: "json",
            data: {
                rid: a,
                user_id: e,
                ansnumber: p
            },
            success: function(a) {
                if (void 0 == a.data.data.status) {
                    var d = a.data.data;
                    console.log("未排序", a.data.data), d.ans.sort(t), console.log("排序", d), setTimeout(function() {
                        c.setData({
                            ans: a.data.data,
                            matched: !0,
                            answerShow: !1,
                            seconds: c.data.allseconds
                        }), c.left(), c.right(), c.down();
                    }, 2e3), setTimeout(function() {
                        c.clear(), c.opacity(), c.scale(), c.Lprogress(), c.Rprogress();
                    }, 3500), r = setTimeout(function() {
                        c.getenemys(a.data.data), c.drawCircle(c.data.seconds);
                    }, 4e3);
                } else {
                    clearInterval(n), clearInterval(s), clearInterval(i), clearTimeout(r), clearTimeout(o), 
                    c.delRprogress(), c.delLprogress();
                    var l, m;
                    e == a.data.data.userid_one ? (m = parseInt(a.data.data.userone_score), l = parseInt(a.data.data.usertwo_score)) : e == a.data.data.userid_two && (m = parseInt(a.data.data.usertwo_score), 
                    l = parseInt(a.data.data.userone_score));
                    var p, g, f, h;
                    m + l != 0 ? (p = m / (m + l), g = l / (m + l)) : p = g = .5, p < .3 && g > .7 ? (f = parseInt(.3 * u), 
                    h = parseInt(.7 * u)) : g < .3 && p > .7 ? (f = parseInt(.7 * u), h = parseInt(.3 * u)) : .5 == p && .5 == g ? (f = parseInt(.5 * u), 
                    h = parseInt(.5 * u)) : (f = parseInt(u * p), h = parseInt(u * g)), c.Selfdan(), 
                    c.picopacity(), c.audioCtx.pause();
                    var v = a.data.data;
                    c.setData({
                        scoreone: m,
                        scoretwo: l,
                        leftw: f,
                        add: v,
                        rightw: h,
                        Allshow: !1,
                        showprogress: !0
                    }), setTimeout(function() {
                        c.leftscore(f), c.rightscore(h);
                    }, 200);
                }
            }
        });
    },
    Selfdan: function() {
        var a = d.globalData.user_id, t = this;
        d.util.request({
            url: "entry/wxapp/Selfdan",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                for (var e = a.data.data, n = 0; n < e.length; n++) t.data.dan_idss == e[n].dan_id && 1 == e[n].status && t.data.dan_id == t.data.dan_idss && wx.setStorageSync("getdanmoney", 1);
            }
        });
    },
    Putanswer: function(a, t) {
        var e = this, n = d.globalData.user_id, s = e.data.ans.qid, i = e.data.rid;
        d.util.request({
            url: "entry/wxapp/Putanswer",
            method: "post",
            dataType: "json",
            data: {
                user_id: n,
                rid: i,
                qid: s,
                ans: a,
                min: t
            },
            success: function(a) {
                var t = e.data.enemyans, n = a.data.data;
                e.showstatus(n, t), u = a.data.data.score, e.setData({
                    mysum: u,
                    hh: a.data.data
                });
            }
        });
    },
    getenemys: function(a) {
        clearInterval(s);
        var t = this, e = a.qid;
        t.data.enemyans = void 0, t.reloadans = function() {
            var a = d.globalData.user_id, n = t.data.rid, s = t.data.seconds, i = t.data.allseconds - t.data.seconds;
            d.util.request({
                url: "entry/wxapp/Reloadans",
                method: "post",
                dataType: "json",
                data: {
                    user_id: a,
                    rid: n,
                    qid: e,
                    min: i
                },
                success: function(a) {
                    if (0 == s || 1 == a.data.data.status) {
                        var e = t.data.hh;
                        if (0 == a.data.data.status) n = void 0; else {
                            var n = a.data.data;
                            l = n.score;
                        }
                        t.showstatus(e, n), t.setData({
                            enemyans: a.data.data,
                            enemysum: l
                        });
                    }
                }
            });
        }, s = setInterval(t.reloadans, 500);
    },
    showstatus: function(a, t) {
        var e, n, r = this.data.rid, d = this.data.ans;
        console.log("两人答题结果", a, t);
        var u = this, r = u.data.rid, l = u.data.seconds, g = this.data.allseconds;
        if (void 0 != t && void 0 != a) {
            clearInterval(s), clearInterval(i);
            for (var f in d.ans) d.ans[f].key == t.answer && (e = f);
            for (var f in d.ans) d.ans[f].key == d.right && (n = f);
            console.log("对手答题", e), d.ans[e].right = 1, d.ans[e].rstatus = "0", d.ans[n].rstatus = "1", 
            u.setData({
                ans: d
            }), l = g, m = !0, o = setTimeout(function() {
                p += 1, console.log(p), u.Lscale(), u.Lopacity(), u.Getques(r), u.audioCtx.pause(), 
                clearTimeout(c), clearTimeout(o);
            }, 1e3);
        }
        if (0 == l) {
            if (void 0 != a && void 0 == t) {
                clearInterval(s), clearInterval(i);
                for (var f in d.ans) d.ans[f].key == d.right && (n = f);
                d.ans[n].rstatus = "1", m = !0, u.setData({
                    ans: d
                }), o = setTimeout(function() {
                    p += 1, u.Lscale(), u.Lopacity(), u.Getques(r), u.audioCtx.pause(), clearTimeout(c), 
                    clearTimeout(o);
                }, 1e3);
            }
            if (void 0 == a && void 0 != t) {
                clearInterval(s), clearInterval(i);
                for (var f in d.ans) d.ans[f].key == t.answer && (e = f);
                for (var f in d.ans) d.ans[f].key == d.right && (n = f);
                console.log(e), d.ans[e].right = 1, d.ans[e].rstatus = "0", d.ans[n].rstatus = "1", 
                m = !0, u.setData({
                    ans: d
                }), o = setTimeout(function() {
                    p += 1, u.Lscale(), u.Lopacity(), u.Getques(r), u.audioCtx.pause(), clearTimeout(c), 
                    clearTimeout(o);
                }, 1e3);
            }
            if (void 0 == a && void 0 == t) {
                clearInterval(i), clearInterval(s);
                for (var f in d.ans) d.ans[f].key == d.right && (n = f);
                d.ans[n].rstatus = "1", m = !0, u.setData({
                    ans: d
                }), o = setTimeout(function() {
                    p += 1, u.Lscale(), u.Lopacity(), u.Getques(r), u.audioCtx.pause(), clearTimeout(c), 
                    clearTimeout(o);
                }, 1e3);
            }
        }
    },
    click: function(a) {
        var t = this, e = t.data.mp3, n = (a.currentTarget.dataset.status, a.currentTarget.dataset.index), s = a.currentTarget.dataset.key, i = t.data.allseconds - t.data.seconds, r = t.data.ans;
        1 == r.ans[n].status ? (t.audioCtx = wx.createAudioContext("myAudio"), t.audioCtx.setSrc(e.rightmp3), 
        t.audioCtx.play()) : (t.audioCtx = wx.createAudioContext("myAudio"), t.audioCtx.setSrc(e.errormp3), 
        t.audioCtx.play()), t.data.seconds > 0 && (t.Putanswer(s, i), r.ans[n].left = 1, 
        r.ans[n].rstatus = "0", t.setData({
            ans: r,
            click: !0
        }));
    },
    moveRight: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        setTimeout(function() {
            a.translateX(-140).translateY(-190).step(), this.setData({
                animationData1: a.export()
            });
        }.bind(this), 600);
    },
    vs: function() {
        var a = this.data.screenHeight, t = this.data.screenWidth, e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 300,
            timingFunction: "linear"
        });
        setTimeout(function() {
            e.translateX(-t).translateY(a).step(), this.setData({
                animationData2: e.export()
            });
        }.bind(this), 100);
    },
    stop: function(a) {
        clearInterval(i), this.drawCircle(that.data.times);
    },
    drawCircle: function(a) {
        var t = this, e = t.data.mp3, n = 1e3 * parseInt(a - 3);
        c = setTimeout(function() {
            t.audioCtx = wx.createAudioContext("myAudio"), t.audioCtx.setSrc(e.descbgm), t.audioCtx.play();
        }, n), clearInterval(i), t.animation = function() {
            a >= 1 ? (a--, t.setData({
                seconds: a
            })) : (clearInterval(i), t.audioCtx.pause(), clearTimeout(c), t.setData({
                seconds: 0
            }));
        }, i = setInterval(t.animation, 1e3);
    },
    onReady: function() {
        var a = wx.createCanvasContext("canvasCircle");
        a.setLineWidth(10), a.setStrokeStyle("#fff"), a.beginPath(), a.arc(35, 35, 29, 0, 2 * Math.PI, !1), 
        a.stroke(), a.draw();
    },
    leftscore: function(a) {
        console.log("leftW"), console.log(a);
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(a).step(), this.setData({
            leftscore: t.export()
        });
    },
    rightscore: function(a) {
        console.log("rightw"), console.log(a);
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-a).step(), this.setData({
            rightscore: t.export()
        });
    },
    left: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(125).step(), this.setData({
            left: a.export()
        });
    },
    right: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-125).step(), this.setData({
            right: a.export()
        });
    },
    down: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateY(75).opacity(1).step(), this.setData({
            down: a.export()
        });
        var t = this, e = t.data.mp3;
        parseInt(e.quesnum) - p == 1 && t.lastque();
    },
    clear: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "step-start"
        });
        a.translateY(-75).opacity(0).step(), this.setData({
            down: a.export()
        });
    },
    Lprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(100).step(), this.setData({
            Lprogress: a.export()
        });
    },
    delLprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-100).step(), this.setData({
            Lprogress: a.export()
        });
    },
    delRprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(100).step(), this.setData({
            Rprogress: a.export()
        });
    },
    Rprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-100).step(), this.setData({
            Rprogress: a.export()
        });
    },
    opacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(1).step(), this.setData({
            opacity: a.export()
        });
    },
    picopacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(1).step(), this.setData({
            picopacity: a.export()
        });
    },
    Lopacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(0).step(), this.setData({
            opacity: a.export()
        });
    },
    scale: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(1, 1).step(), this.setData({
            scale: a.export()
        });
    },
    lastque: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(1, 1).step(), this.setData({
            lastque: a.export()
        });
    },
    Lscale: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(0, 0).step(), this.setData({
            scale: a.export()
        });
    },
    onUnload: function() {
        console.log("返回上一级页面"), clearInterval(n), clearInterval(s), clearInterval(i), clearTimeout(r), 
        clearTimeout(o), clearTimeout(c), this.audioCtx && this.audioCtx.pause();
    },
    onShareAppMessage: function(a) {
        var t = d.globalData.user_id, e = d.globalData.title;
        wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {}
        });
        var n = this;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            withShareTicket: !0,
            success: function(a) {
                wx.getShareInfo({
                    shareTicket: a.shareTickets[0],
                    success: function(a) {
                        n.Forward(a);
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    },
    Forward: function(a) {
        var t = d.globalData.user_id;
        d.util.request({
            url: "entry/wxapp/Forward",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                encryptedData: a.encryptedData,
                iv: a.iv
            },
            success: function(a) {
                wx.showModal({
                    title: "分享奖励",
                    content: "金币奖励+" + a.data.data,
                    showCancel: !1
                });
            }
        });
    }
});