function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../libs/js/common.js")), i = (t(require("../../service/app.setting.js")), 
t(require("../../config/api.config.js"))), e = (t(require("../../siteinfo.js")), 
t(require("../../model/musicStatus.js"))), s = t(require("../../model/version.js")), u = t(require("../../service/service.js")), o = t(require("../../model/adModel.js")), n = getApp();

Page({
    data: {
        matts: null,
        block_hidden: null,
        getred: !1,
        readyTimes: 3,
        gameShow: null,
        timeoutReadyGo: null,
        timeout_1: null,
        step: 0,
        times: 10,
        question: null,
        questionList: null,
        countDown: null,
        start: !1,
        answerOk: null,
        curentItem: null,
        message1: "差一点就成功了",
        message2: "加油,你可以的",
        message3: "转发到群，机会+1",
        message4: "回到首页"
    },
    readyAudio: null,
    musicAudio: null,
    downAudio: null,
    errAudio: null,
    failAudio: null,
    answerfn: function(t) {
        clearTimeout(this.data.timeout_1);
        var a = t.currentTarget.dataset.idx;
        if (t.currentTarget.dataset.item == this.data.question.answer) {
            if (this.setData({
                curentItem: a,
                answerOk: !0,
                start: !1
            }), this.data.musicStatus) {
                var i = this._creatAudio(n.globalData.appConfig.audios.click_music);
                this.downAudio = i;
            }
            this.nextQuestion();
        } else if (this.setData({
            curentItem: a,
            answerOk: !1,
            gameShow: !1
        }), null != this.musicAudio && this.musicAudio.destroy(), this.data.musicStatus) {
            var e = this._creatAudio(n.globalData.appConfig.audios.error_music);
            this.errAudio = e;
            var s = this._creatAudio(n.globalData.appConfig.audios.fail_music);
            this.failAudio = s;
        }
    },
    nextQuestion: function() {
        var t = this;
        if (this.data.step != 1 * n.globalData.appConfig.txts.question_num - 1) {
            var a = setTimeout(function() {
                clearTimeout(a);
                var i = t.data.step + 1;
                t.setData({
                    question: t.data.questionList[i],
                    start: !0,
                    step: i,
                    answerOk: null,
                    countDown: t.data.times,
                    curentItem: null
                }), t.anserTime();
            }, 500);
            this.setData({
                timout_2: a
            });
        } else if (this.data.block_hidden ? wx.navigateTo({
            url: "/pages/resultred/resultred"
        }) : this.setData({
            getred: !0
        }), null != this.musicAudio && this.musicAudio.destroy(), this.data.musicStatus) {
            var i = this._creatAudio(n.globalData.appConfig.audios.success_music);
            this.successAudio = i;
        }
    },
    anserTime: function() {
        var t = this, a = setTimeout(function() {
            if (clearTimeout(a), 1 != t.data.countDown || null != t.data.answerOk) t.setData({
                countDown: t.data.countDown - 1
            }), t.anserTime(); else if (t.setData({
                start: !1,
                gameShow: !1
            }), null != t.musicAudio && t.musicAudio.destroy(), t.data.musicStatus) {
                var i = t._creatAudio(n.globalData.appConfig.audios.error_music);
                t.errAudio = i;
                var e = t._creatAudio(n.globalData.appConfig.audios.fail_music);
                t.failAudio = e;
            }
        }, 1e3);
        this.setData({
            timeout_1: a
        });
    },
    readyGo: function() {
        var t = this, a = setTimeout(function() {
            if (clearTimeout(a), 1 != t.data.readyTimes) t.setData({
                readyTimes: t.data.readyTimes - 1
            }), t.readyGo(); else if (t.setData({
                readyTimes: "",
                gameShow: !0,
                start: !0,
                countDown: t.data.times
            }), t.anserTime(), null != t.readyAudio && t.readyAudio.destroy(), t.data.musicStatus) {
                var i = t._creatAudio(n.globalData.appConfig.audios.bg_music, !0);
                t.musicAudio = i;
            }
        }, 1e3);
        this.setData({
            timeoutReadyGo: a
        });
    },
    sendChance: function() {
        a.default.request({
            url: i.default.api.PlayGame
        });
    },
    onLoad: function(t) {
        if (wx.onUserCaptureScreen(function() {
            wx.reLaunch({
                url: "/pages/loading/loading"
            });
        }), this.readyGo(), wx.setNavigationBarTitle({
            title: n.globalData.appConfig.txts.nav_bar_title
        }), this.musicStatus = e.default.musicStatus, this.setData({
            matts: n.globalData.appConfig.images.matts,
            banner: o.default.banner,
            block_hidden: s.default.block_hidden,
            items: {
                redbg: n.globalData.appConfig.images.red_packets_bg
            },
            musicStatus: e.default.musicStatus
        }), this.sendChance(), this.questionRequFn(), this.data.musicStatus) {
            var a = this._creatAudio(n.globalData.appConfig.audios.ready_music);
            this.readyAudio = a;
        }
    },
    questionRequFn: function() {
        var t = this;
        a.default.request({
            url: i.default.api.Question,
            success: function(a) {
                var i = a.data.data, e = i[0];
                a.data.error ? wx.showToast({
                    title: a.data.msg || "服务器开小差了，稍后再试"
                }) : t.setData({
                    questionList: i,
                    question: e
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.timeoutReadyGo), clearTimeout(this.data.timeout_1), clearTimeout(this.data.timout_2), 
        null != this.readyAudio && this.readyAudio.destroy(), null != this.musicAudio && this.musicAudio.destroy(), 
        null != this.downAudio && this.downAudio.destroy(), null != this.errAudio && this.errAudio.destroy(), 
        null != this.failAudio && this.failAudio.destroy(), null != this.successAudio && this.successAudio.destroy();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = u.default.convertText(n.globalData.appConfig.txts.share_title, n.globalData.userInfo.nickname), a = n.globalData.appConfig.images.share_image, i = u.default.handleShare(n.globalData.appConfig.share_item, n.globalData.userInfo);
        return {
            title: i.title || t,
            imageUrl: i.imageUrl || a,
            path: "/pages/index/index"
        };
    },
    redresult: function() {
        wx.navigateTo({
            url: "/pages/resultred/resultred"
        });
    },
    goindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    _creatAudio: function(t, a) {
        var i = wx.createInnerAudioContext();
        return i.src = t, i.autoplay = !0, i.loop = a, i;
    },
    switchMusic: function() {
        1 == this.data.musicStatus ? (this.setData({
            musicStatus: !1
        }), e.default.musicStatus = !1, null != this.musicAudio && this.musicAudio.destroy(), 
        null != this.readyAudio && this.readyAudio.destroy()) : 0 == this.data.musicStatus && (this.setData({
            musicStatus: !0
        }), e.default.musicStatus = !0, this.musicAudio = this._creatAudio(n.globalData.appConfig.audios.bg_music, !0));
    }
});