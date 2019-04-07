function t(t, a) {
    return Math.random() > .5 ? -1 : 1;
}

var a, e, n, s, i, r, o, c = getApp(), u = 0, l = 0, d = !1, p = !1, f = 0;

Page({
    data: {
        matching: !0,
        matched: !0,
        question: [],
        click: !1,
        answerShow: !1,
        status: 0,
        showtime: !0,
        showmaster: !1,
        loginstatus: !0,
        fqs: 1,
        loop: !0,
        shareShowans: 0
    },
    onLoad: function(t) {
        console.log(t), u = 0, f = 0, l = 0;
        var a = c.globalData.screenHeight, e = c.globalData.screenWidth;
        t.user_id;
        this.setData({
            screenHeight: a,
            screenWidth: e,
            mysum: 0,
            enemysum: 0,
            Allshow: !0,
            showprogress: !0,
            battleid: t.battleid,
            Lstatus: 0,
            statusshow: 0,
            options: t
        }), this.left(), this.right();
        var n = this;
        wx.checkSession({
            success: function(t) {
                n.setData({
                    loginstatus: !0
                }), n.register(function(t) {
                    console.log("未过期", t);
                });
            },
            fail: function(t) {
                console.log("已过期"), n.setData({
                    loginstatus: !1
                });
            }
        });
    },
    getmyLevel: function() {
        var t = this;
        c.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: o
            },
            success: function(a) {
                c.globalData.mylevel = a.data.data, t.setData({
                    mylevel: a.data.data,
                    shareShowans: 1
                });
            }
        });
    },
    Friendsjoin: function(t, a) {
        c.util.request({
            url: "entry/wxapp/Friendsjoin",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                rid: t.battleid
            },
            success: function(t) {}
        });
    },
    Startans: function() {
        var t = this.data.battleid;
        c.util.request({
            url: "entry/wxapp/Startans",
            method: "post",
            dataType: "json",
            data: {
                rid: t
            },
            success: function(t) {}
        });
    },
    Startstatus: function(t, a) {
        var e = this;
        e.startan = function() {
            c.util.request({
                url: "entry/wxapp/Startstatus",
                method: "post",
                dataType: "json",
                data: {
                    rid: t.battleid
                },
                success: function(n) {
                    2 == n.data.data && (clearInterval(r), e.Getques(t.battleid, a, f), e.setData({
                        showtime: !1
                    })), 3 == n.data.data && (clearInterval(r), wx.showModal({
                        title: "若其中一人离开房间",
                        content: "需请重新邀请好友，并通知好友进入游戏",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.reLaunch({
                                url: "../../index/index"
                            });
                        }
                    }));
                }
            });
        }, r = setInterval(e.startan, 1e3);
    },
    saveFormId: function(t) {
        "the formId is a mock one" != t.detail.formId && (this.data.formId = t.detail.formId);
    },
    getBtn: function(t) {
        this.saveFormId(t);
        var a = this.data.formId, e = c.globalData.user_id;
        c.util.request({
            url: "entry/wxapp/getformid",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                formid: a
            },
            success: function(t) {}
        });
    },
    matching: function(t, e) {
        var n = this;
        n.getenemy = function() {
            c.util.request({
                url: "entry/wxapp/Checkjoin",
                method: "post",
                dataType: "json",
                data: {
                    user_id: e,
                    rid: t.battleid
                },
                success: function(t) {
                    var s = t.data.data;
                    if ("" != s) {
                        for (var i in s) s[i].uid != e && (0 == i ? n.setData({
                            Lstatus: 1,
                            Rstatus: 0
                        }) : n.setData({
                            Lstatus: 0,
                            Rstatus: 1
                        }), n.setData({
                            enemy: s[i],
                            statusshow: 1,
                            showmaster: !0,
                            fq: s[i].fq,
                            fqs: 0
                        }));
                        clearInterval(a);
                    }
                }
            });
        }, a = setInterval(n.getenemy, 1e3);
    },
    index: function() {
        wx.showModal({
            title: "确定放弃吗？",
            content: "离开之后，好友就不能参与活动",
            success: function(t) {
                t.confirm && wx.reLaunch({
                    url: "../../index/index"
                });
            }
        });
    },
    goindex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    onShow: function() {
        this.Sys(), wx.getNetworkType({
            success: function(t) {
                t.networkType;
            }
        }), wx.onNetworkStatusChange(function(t) {
            "none" == t.networkType && (clearInterval(a), clearInterval(e), clearInterval(n), 
            clearTimeout(s), clearTimeout(i), clearInterval(r), wx.showModal({
                title: "当前无网络",
                content: "请先确认网络链接没问题",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.reLaunch({
                        url: "../../index/index"
                    });
                }
            }));
        });
    },
    Sys: function() {
        var t = this;
        c.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var e = JSON.parse(a.data.data.ques).times, n = JSON.parse(a.data.data.ques).quesnum, s = JSON.parse(a.data.data.basic), i = JSON.parse(a.data.data.answer), r = JSON.parse(a.data.data.ques);
                wx.setNavigationBarTitle({
                    title: s.title
                }), "" != s.fontcolor && "" !== s.maincolor && wx.setNavigationBarColor({
                    frontColor: s.fontcolor,
                    backgroundColor: s.maincolor
                }), t.setData({
                    times: 100 * e,
                    seconds: e,
                    allseconds: e,
                    successpic: i.success,
                    appname: s,
                    draw: i.draw,
                    quesnum: n,
                    answerimg: s.answerimg,
                    mp3: r
                });
            }
        });
    },
    moveLeft: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(140).translateY(190).step(), this.setData({
            animationData: t.export()
        });
    },
    Getques: function(o, u, l) {
        console.log("请求问题", o, u, l), clearTimeout(i), clearInterval(r);
        var d = this;
        clearInterval(e), console.log("ansnumber"), console.log(l), d.data.ans = void 0, 
        d.setData({
            click: !1,
            showprogress: !1
        }), d.data.hh = void 0;
        var p = c.globalData.screenWidth;
        c.util.request({
            url: "entry/wxapp/Getques",
            method: "post",
            dataType: "json",
            data: {
                rid: o,
                user_id: u,
                ansnumber: l
            },
            success: function(o) {
                if (console.log("获取题目", o), void 0 == o.data.data.status) {
                    var c = o.data.data;
                    c.ans.sort(t), setTimeout(function() {
                        d.setData({
                            ans: c,
                            matched: !0,
                            answerShow: !1,
                            seconds: d.data.allseconds
                        }), d.down();
                    }, 2e3), setTimeout(function() {
                        d.clear(), d.opacity(), d.scale(), d.Lprogress(), d.Rprogress();
                    }, 3e3), s = setTimeout(function() {
                        d.getenemys(o.data.data, u), d.drawCircle(d.data.seconds);
                    }, 4e3);
                } else {
                    clearInterval(e), clearInterval(a), clearInterval(n), clearTimeout(s), clearTimeout(i), 
                    clearInterval(r), d.delRprogress(), d.delLprogress();
                    var l, f;
                    u == o.data.data.userid_one ? (f = parseInt(o.data.data.userone_score), l = parseInt(o.data.data.usertwo_score)) : u == o.data.data.userid_two && (f = parseInt(o.data.data.usertwo_score), 
                    l = parseInt(o.data.data.userone_score));
                    var m, h, g, v;
                    f + l != 0 ? (m = f / (f + l), h = l / (f + l)) : m = h = .5, m < .3 && h > .7 ? (g = parseInt(.3 * p), 
                    v = parseInt(.7 * p)) : h < .3 && m > .7 ? (g = parseInt(.7 * p), v = parseInt(.3 * p)) : .5 == m && .5 == h ? (g = parseInt(.5 * p), 
                    v = parseInt(.5 * p)) : (g = parseInt(p * m), v = parseInt(p * h)), d.picopacity();
                    var w = o.data.data;
                    d.setData({
                        scoreone: f,
                        add: w,
                        scoretwo: l,
                        leftw: g,
                        rightw: v,
                        showmaster: !0,
                        Allshow: !1,
                        showprogress: !0,
                        showtime: !1,
                        showT: !0
                    }), setTimeout(function() {
                        d.leftscore(g), d.rightscore(v);
                    }, 200);
                }
            }
        });
    },
    Putanswer: function(t, a) {
        var e = this, n = e.data.ans.qid, s = e.data.battleid;
        c.util.request({
            url: "entry/wxapp/Putanswer",
            method: "post",
            dataType: "json",
            data: {
                user_id: o,
                rid: s,
                qid: n,
                ans: t,
                min: a
            },
            success: function(t) {
                var a = e.data.enemyans, n = t.data.data;
                e.showstatus(n, a, o), u = t.data.data.score, e.setData({
                    mysum: u,
                    hh: t.data.data
                });
            }
        });
    },
    getenemys: function(t, a) {
        clearInterval(e);
        var n = this, s = t.qid;
        n.data.enemyans = void 0, n.reloadans = function() {
            var t = n.data.battleid, e = n.data.seconds, i = n.data.allseconds - n.data.seconds;
            c.util.request({
                url: "entry/wxapp/Reloadans",
                method: "post",
                dataType: "json",
                data: {
                    user_id: a,
                    rid: t,
                    qid: s,
                    min: i
                },
                success: function(t) {
                    if (0 == e || 1 == t.data.data.status) {
                        var s = n.data.hh;
                        if (0 == t.data.data.status) i = void 0; else {
                            var i = t.data.data;
                            l = i.score;
                        }
                        n.showstatus(s, i, a), n.setData({
                            enemyans: t.data.data,
                            enemysum: l
                        });
                    }
                }
            });
        }, e = setInterval(n.reloadans, 500);
    },
    showstatus: function(t, a, s) {
        var r, o, c = this.data.battleid, u = this.data.ans;
        console.log(u), console.log("两人答题结果", t, a);
        var l = this, p = l.data.seconds, m = this.data.allseconds;
        if (void 0 != a && void 0 != t) {
            clearInterval(e), clearInterval(n);
            for (var h in u.ans) u.ans[h].key == a.answer && (r = h);
            for (var h in u.ans) u.ans[h].key == u.right && (o = h);
            console.log("对手答题", r), u.ans[r].right = 1, u.ans[r].rstatus = "0", u.ans[o].rstatus = "1", 
            l.setData({
                ans: u
            }), p = m, d = !0, i = setTimeout(function() {
                console.log("下一题"), f += 1, l.Lscale(), l.Lopacity(), l.Getques(c, s, f), clearTimeout(i);
            }, 1e3);
        }
        if (0 == p) {
            if (void 0 != t && void 0 == a) {
                clearInterval(e), clearInterval(n);
                for (var h in u.ans) u.ans[h].key == u.right && (o = h);
                u.ans[o].rstatus = "1", d = !0, l.setData({
                    ans: u
                }), i = setTimeout(function() {
                    console.log("下一题"), f += 1, l.Lscale(), l.Lopacity(), l.Getques(c, s, f), clearTimeout(i);
                }, 1e3);
            }
            if (void 0 == t && void 0 != a) {
                clearInterval(e), clearInterval(n);
                for (var h in u.ans) u.ans[h].key == a.answer && (r = h);
                for (var h in u.ans) u.ans[h].key == u.right && (o = h);
                console.log(r), u.ans[r].right = 1, u.ans[r].rstatus = "0", u.ans[o].rstatus = "1", 
                d = !0, l.setData({
                    ans: u
                }), i = setTimeout(function() {
                    console.log("下一题"), f += 1, l.Lscale(), l.Lopacity(), l.Getques(c, s, f), clearTimeout(i);
                }, 1e3);
            }
            if (void 0 == t && void 0 == a) {
                clearInterval(n), clearInterval(e);
                for (var h in u.ans) u.ans[h].key == u.right && (o = h);
                u.ans[o].rstatus = "1", d = !0, l.setData({
                    ans: u
                }), i = setTimeout(function() {
                    console.log("下一题"), f += 1, l.Lscale(), l.Lopacity(), l.Getques(c, s, f), clearTimeout(i);
                }, 1e3);
            }
        }
    },
    click: function(t) {
        var a = this, e = (t.currentTarget.dataset.status, t.currentTarget.dataset.index), n = t.currentTarget.dataset.key, s = a.data.allseconds - a.data.seconds, i = a.data.ans;
        1 == i.ans[e].status ? a.playVoice("rightmp3") : a.playVoice("errormp3"), a.data.seconds > 0 && (a.Putanswer(n, s), 
        i.ans[e].left = 1, i.ans[e].rstatus = "0", a.setData({
            ans: i,
            click: !0
        }));
    },
    moveRight: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-140).translateY(-190).step(), this.setData({
            animationData1: t.export()
        });
    },
    vs: function() {
        var t = this.data.screenHeight, a = this.data.screenWidth, e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 300,
            timingFunction: "linear"
        });
        e.translateX(-a).translateY(t).step(), this.setData({
            animationData2: e.export()
        });
    },
    stop: function(t) {
        clearInterval(n), this.drawCircle(that.data.times);
    },
    drawCircle: function(t) {
        var a = this;
        clearInterval(n), a.animation = function() {
            t >= 1 ? (t--, a.setData({
                seconds: t
            })) : (clearInterval(n), a.setData({
                seconds: 0
            }));
        }, n = setInterval(a.animation, 1e3);
    },
    onReady: function() {
        var t = wx.createCanvasContext("canvasCircle");
        t.setLineWidth(10), t.setStrokeStyle("#fff"), t.beginPath(), t.arc(35, 35, 29, 0, 2 * Math.PI, !1), 
        t.stroke(), t.draw();
    },
    leftscore: function(t) {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(t).step(), this.setData({
            leftscore: a.export()
        });
    },
    rightscore: function(t) {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-t).step(), this.setData({
            rightscore: a.export()
        });
    },
    left: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(125).step(), this.setData({
            left: t.export()
        });
    },
    right: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-125).step(), this.setData({
            right: t.export()
        });
    },
    down: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateY(75).opacity(1).step(), this.setData({
            down: t.export()
        });
    },
    clear: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "step-start"
        });
        t.translateY(-75).opacity(0).step(), this.setData({
            down: t.export()
        });
    },
    Lprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(100).step(), this.setData({
            Lprogress: t.export()
        });
    },
    delLprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-100).step(), this.setData({
            Lprogress: t.export()
        });
    },
    delRprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(100).step(), this.setData({
            Rprogress: t.export()
        });
    },
    Rprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-100).step(), this.setData({
            Rprogress: t.export()
        });
    },
    opacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(1).step(), this.setData({
            opacity: t.export()
        });
    },
    picopacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(1).step(), this.setData({
            picopacity: t.export()
        });
    },
    Lopacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(0).step(), this.setData({
            opacity: t.export()
        });
    },
    scale: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.scale(1, 1).step(), this.setData({
            scale: t.export()
        });
    },
    Lscale: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.scale(0, 0).step(), this.setData({
            scale: t.export()
        });
    },
    onUnload: function() {
        clearInterval(a), clearInterval(e), clearInterval(n), clearTimeout(s), clearTimeout(i), 
        this.Friendsquit(), clearInterval(r);
    },
    onHide: function() {},
    passLevel: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    Friendsquit: function() {
        var t = this.data.battleid;
        c.util.request({
            url: "entry/wxapp/Friendsquit",
            method: "post",
            dataType: "json",
            data: {
                user_id: o,
                rid: t
            },
            success: function(t) {}
        });
    },
    playVoice: function(t) {
        var a = this.data.mp3;
        this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.setSrc(a[t]), this.audioCtx.play();
    },
    onShareAppMessage: function(t) {
        var a = this.data.battleid, e = c.globalData.title;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/passLevel/shareanswer/shareanswer?user_id=" + o + "&battleid=" + a,
            success: function(t) {
                p = !0, wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    },
    getUserInfo: function(t) {
        var a = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? a.login(t) : wx.showModal({
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
    register: function(t) {
        var a = this;
        wx.getStorage({
            key: "user",
            success: function(e) {
                var n = e.data.detail, s = n.session_key, i = n.encryptedData, r = n.iv;
                c.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: s,
                        encryptedData: i,
                        iv: r
                    },
                    success: function(e) {
                        c.globalData.user_id = e.data.data, "function" == typeof t && t(e.data.data), o = e.data.data, 
                        void 0 != a.data.options.user_id && a.Friendsjoin(a.data.options, o), a.matching(a.data.options, o), 
                        a.Startstatus(a.data.options, o), a.getmyLevel(o), a.setData({
                            loginstatus: !0
                        });
                    }
                });
            },
            fail: function(t) {
                a.setData({
                    loginstatus: !1
                });
            }
        });
    },
    login: function(t) {
        var a = this;
        c.globalData.userInfo ? "function" == typeof cb && cb(c.globalData.userInfo) : wx.login({
            success: function(e) {
                var n = t.detail;
                c.globalData.userInfo = n, n.act = "autologin", n.code = e.code, c.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: n,
                    success: function(e) {
                        0 == e.data.errno && (n.session_key = e.data.data.session_key, n.openid = e.data.data.openid, 
                        c.globalData.userInfo = n, wx.setStorageSync("user", t), "function" == typeof cb && cb(c.globalData.userInfo), 
                        a.register());
                    }
                });
            },
            fail: function(t) {
                console.log("获取失败");
            }
        });
    }
});