Component({
    properties: {
        content: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: "#e64340"
        },
        isShow: {
            type: Boolean,
            value: !1
        },
        duration: {
            type: Number,
            value: 3e3
        }
    },
    methods: {
        show: function() {
            var t = this, e = this.data.duration;
            this._timer && clearTimeout(this._timer), this.setData({
                isShow: !0
            }), e > 0 && e !== 1 / 0 && (this._timer = setTimeout(function() {
                t.hide();
            }, e));
        },
        hide: function() {
            this._timer = clearTimeout(this._timer), this.setData({
                isShow: !1,
                backgroundColor: "#e64340"
            });
        }
    }
});