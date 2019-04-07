function e(e, r, a) {
    return r in e ? Object.defineProperty(e, r, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = a, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r, a = "entry/wxapp/";

exports.default = {
    m: "bbd_guesspinyin",
    gp: 1,
    api: (r = {
        submit: a + "Formid",
        createOrder: a + "CreateOrder",
        setting: a + "setting",
        rank: a + "rank",
        userDetail: a + "UserDetail",
        index: a + "index",
        init: a + "init",
        MoreBanner: a + "MoreBanner",
        MoreApp: a + "MoreApp"
    }, e(r, "userDetail", a + "userDetail"), e(r, "Question", a + "Question"), e(r, "PlayGame", a + "PlayGame"), 
    e(r, "Award", a + "Award"), e(r, "HonorRank", a + "HonorRank"), e(r, "PerseveranceRank", a + "PerseveranceRank"), 
    e(r, "gamerecord", a + "gamerecord"), e(r, "Withdrawal", a + "Withdrawal"), e(r, "PersonalRecord", a + "PersonalRecord"), 
    e(r, "ShareGetChance", a + "ShareGetChance"), e(r, "Index", a + "Index"), e(r, "Black", a + "Black"), 
    r)
};