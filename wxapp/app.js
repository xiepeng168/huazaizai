App({
    onLaunch: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.globalData.brand = t.brand, e.globalData.screenWidth = t.windowWidth, e.globalData.screenHeight = t.windowHeight;
            }
        });
    },
    util: require("we7/resource/js/util.js"),
    globalData: {
        userInfo: null,
        device: {}
    },
    siteInfo: require("siteinfo.js")
});