var a, t, e = getApp(), s = 0;

Page({
    data: {
        numday: 2,
        loop: !1,
        Notice: !0,
        formId: "",
        getHead: !0,
        getdanreward: !0,
        getdanmoney: !0,
        apples: !0,
        showlogos: !0,
        season: !0,
        showindex: !0,
        Public: 0,
        Publics: 0
    },
    onLoad: function(t) {
        var s = e.globalData.screenHeight;
        a = t, this.setData({
            screenHeight: s
        }), this.Indexmodule();
    },
    Indexmodule: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/Indexmodule",
            method: "post",
            dataType: "json",
            success: function(t) {
                a.setData({
                    left: t.data.data.left,
                    right: t.data.data.right
                });
            }
        });
    },
    xiangqig: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../education/education?id=" + t
        });
    },
    getmyLevel: function(a) {
        var t = a, s = this;
        e.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(a) {
                e.globalData.mylevel = a.data.data, 0 == a.data.data.sover ? s.setData({
                    showlogos: !1,
                    showlogo: !0,
                    showindex: !0
                }) : s.setData({
                    showlogos: !0,
                    showlogo: !0,
                    showindex: !1
                }), s.setData({
                    mylevel: a.data.data,
                    sign: a.data.data.sign
                });
            }
        });
    },
    Ranklist: function(a) {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "rank"
            },
            success: function(e) {
                t.setData({
                    dan: e.data.data.list,
                    user_id: a,
                    danname: e.data.data.name
                });
            }
        });
    },
    getM: function(a) {
        var t = this;
        e.util.request({
            url: "entry/wxapp/Signprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    Signprop: a.data.data
                });
            }
        });
    },
    onShow: function() {
        this.Sys(), this.home(), this.setData({
            getHead: !0,
            getdanreward: !0,
            getdanmoney: !0,
            apples: !0,
            showlogos: !0
        }), s = 0;
    },
    closeT: function() {
        this.setData({
            changlle: 1
        });
    },
    saveFormId: function(a) {
        "the formId is a mock one" != a.detail.formId && (this.data.formId = a.detail.formId);
    },
    getBtn: function(a) {
        this.saveFormId(a);
        var t, s = this.data.formId, o = this.data.Signprop;
        for (var i in o) "今天" == o[i].show && (t = parseInt(i) + 1);
        var n = e.globalData.user_id, d = this;
        e.util.request({
            url: "entry/wxapp/Getprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: n,
                day: t,
                formid: s
            },
            success: function(a) {
                wx.showModal({
                    content: "领取成功",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && d.setData({
                            Notice: !1
                        });
                    }
                }), d.setData({
                    sign: 1
                });
            }
        });
    },
    Notice: function() {
        this.setData({
            Notice: !0
        });
    },
    rankings: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/rankings/rankings"
        });
    },
    market: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/market/market"
        });
    },
    goods: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/goods/goods"
        });
    },
    books: function() {
        wx.navigateTo({
            url: "../pages/books/books"
        });
    },
    passLevel: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../passLevel/passLevel"
        });
    },
    changlle: function(a) {
        var t = this.data.active.dan_id, s = this.data.active.condition;
        this.saveFormId(a);
        this.data.formId;
        var o = e.globalData.user_id, i = this;
        e.util.request({
            url: "entry/wxapp/Activetx",
            method: "post",
            dataType: "json",
            data: {
                user_id: o
            },
            success: function(a) {}
        }), i.setData({
            changlle: 1
        }), "" != i.data.mylevel.moneycode ? ((i = this).audioCtx.pause(), wx.navigateTo({
            url: "../passLevel/passLevel?dan_idss=" + t
        })) : ((i = this).audioCtx.pause(), wx.navigateTo({
            url: "../upphotos/upphotos?dan_idss=" + t + "&condition=" + s
        }));
    },
    getreward: function() {
        this.setData({
            apples: !1,
            showlogos: !0,
            getHead: !1,
            showindex: !0
        });
        var a = e.globalData.user_id, t = this;
        e.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "border"
            },
            success: function(a) {
                t.setData({
                    border: a.data.data.border,
                    name: a.data.data.name
                }), t.Getreward("border");
            }
        });
    },
    getHead: function() {
        this.setData({
            getHead: !0,
            getdanreward: !1
        });
        var a = e.globalData.user_id, t = this;
        e.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "prop"
            },
            success: function(a) {
                t.setData({
                    reward: a.data.data.reward,
                    rewardnum: a.data.data.rewardnum,
                    thumb: a.data.data.thumb
                }), t.Getreward("prop");
            }
        });
    },
    getdanreward: function() {
        this.setData({
            getHead: !0,
            getdanreward: !0,
            getdanmoney: !1
        });
        var a = e.globalData.user_id, t = this;
        e.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "money"
            },
            success: function(a) {
                t.setData({
                    result: a.data.data,
                    resStatus: a.data.data.status
                }), t.Getreward("money");
            }
        });
    },
    Getreward: function(a) {
        var t = e.globalData.user_id, s = this;
        e.util.request({
            url: "entry/wxapp/Getreward",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                type: a
            },
            success: function(a) {
                s.setData({});
            }
        });
    },
    getdanmoney: function() {
        this.setData({
            apples: !0,
            getseason: !1,
            season: !1
        });
        var a = e.globalData.user_id, t = this;
        e.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    newname: a.data.data.name,
                    starttime: a.data.data.starttime,
                    endtime: a.data.data.endtime
                });
            }
        });
    },
    getindex: function() {
        this.setData({
            season: !0,
            showlogo: !0,
            showindex: !1
        });
    },
    jump: function(a) {
        var t = a.currentTarget.dataset.link, s = a.currentTarget.dataset.appid, o = a.currentTarget.dataset.path, i = a.currentTarget.dataset.url, n = this.data.active.dan_id, d = this.data.pic.share2, r = this;
        if (void 0 == s) if ("../passLevel/shareanswer/shareanswer" == t) {
            var u = e.globalData.user_id;
            e.util.request({
                url: "entry/wxapp/Friendspk",
                method: "post",
                dataType: "json",
                data: {
                    user_id: u
                },
                success: function(a) {
                    r.audioCtx.pause(), wx.navigateTo({
                        url: t + "?battleid=" + a.data.data
                    });
                }
            });
        } else "h5" == t ? (r.audioCtx.pause(), wx.navigateTo({
            url: "../singleh5/singleh5?url=" + i
        })) : "../passLevel/passLevel" == t ? (r.audioCtx.pause(), wx.navigateTo({
            url: t + "?dan_idss=" + n + "&share2=" + d
        })) : (r.audioCtx.pause(), wx.navigateTo({
            url: t
        })); else wx.navigateToMiniProgram({
            appId: s,
            path: o,
            success: function(a) {}
        });
    },
    share: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../share/share"
        });
    },
    share1: function() {
        var a = this.data.active.condition, t = this.data.active.dan_id;
        this.audioCtx.pause(), wx.navigateTo({
            url: "../upphotos/upphotos?condition=" + a + "&dan_idss=" + t
        });
    },
    home: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/home",
            method: "POST",
            success: function(t) {
                0 == t.data.data.stake && wx.checkSession({
                    success: function(t) {
                        console.log("未过期", t), a.register(function(t) {
                            var e = t;
                            a.getM(e), a.getmyLevel(e), a.Ranklist(e);
                        });
                    },
                    fail: function(a) {
                        console.log("已过期"), wx.navigateTo({
                            url: "../register/register"
                        });
                    }
                }), a.setData({
                    stake: t.data.data.stake,
                    shenhe: t.data.data.shenhe
                });
            }
        });
    },
    register: function(a) {
        wx.getStorage({
            key: "user",
            success: function(t) {
                var s = t.data.detail, o = s.session_key, i = s.encryptedData, n = s.iv;
                void 0 != t.data.detail.session_key ? e.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: o,
                        iv: n,
                        encryptedData: i
                    },
                    success: function(t) {
                        e.globalData.user_id = t.data.data, "function" == typeof a && a(t.data.data);
                    }
                }) : wx.navigateTo({
                    url: "../register/register"
                });
            },
            fail: function(a) {
                wx.navigateTo({
                    url: "../register/register"
                });
            }
        });
    },
    Sys: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(o) {
                var i = JSON.parse(o.data.data.ques).times, n = JSON.parse(o.data.data.answer), d = JSON.parse(o.data.data.forward), r = JSON.parse(o.data.data.basic);
                e.globalData.appname = r, "" != r.fontcolor && "" !== r.maincolor && wx.setNavigationBarColor({
                    frontColor: r.fontcolor,
                    backgroundColor: r.maincolor
                }), wx.setNavigationBarTitle({
                    title: r.title
                });
                var u = JSON.parse(o.data.data.notice);
                1 == u.switch ? a.setData({
                    switchs: !1
                }) : a.setData({
                    switchs: !0
                });
                var l = JSON.parse(o.data.data.ques), c = JSON.parse(o.data.data.basic).contact, p = JSON.parse(o.data.data.active);
                e.globalData.mp3 = l, a.audioCtx = wx.createAudioContext("myAudio"), a.audioCtx.setSrc(r.indexbgm), 
                a.audioCtx.play(), a.getenemy = function() {
                    var e = p.people;
                    s += parseInt(e / 30), a.setData({
                        people: s
                    }), s >= e && (clearInterval(t), a.setData({
                        people: e
                    }));
                }, t = setInterval(a.getenemy, 10), e.globalData.pic = n, e.globalData.title = d, 
                a.setData({
                    times: 100 * i,
                    title: d,
                    seconds: i,
                    allseconds: i,
                    successpic: n.success,
                    draw: n.draw,
                    pic: n,
                    notice: u,
                    mp3: l,
                    contenttitle: c,
                    appname: r,
                    loginimg: r.loginimg,
                    answerimg: r.answerimg,
                    active: p
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = this.data.title;
        return a.from, {
            title: t.title,
            imageUrl: t.img,
            path: "/hc_answer/pages/index/index"
        };
    },
    showseason: function() {
        this.setData({
            changlle: 0
        });
    },
    Publicclose: function() {
        var a = this, t = a.data.Public;
        t = 0 == t ? 1 : 0, a.setData({
            Public: t
        });
    }
});