var t = require("./date-picker"), e = require("./utils"), a = (e.genNumber, e.moment);

Component({
    properties: {
        placeholder: {
            type: String,
            value: "请选择时间"
        },
        format: {
            type: String,
            value: "YYYY-MM-DD HH:mm:ss"
        },
        pickerView: {
            type: Boolean
        },
        date: {
            type: String,
            observer: function(t) {
                if (t === {}.toString()) throw new Error("参数必须是一个字符串");
                /^[0-9]+$/.test(t) && (t = +t), this.updateDate(t);
            }
        },
        notUse: {
            type: Array
        }
    },
    externalClasses: [ "placeholder-class" ],
    data: {
        transPos: [ 0, 0, 0, 0, 0, 0 ]
    },
    attached: function() {
        var e = this;
        this.use = {}, [ "years", "months", "days", "hours", "minutes", "seconds" ].forEach(function(t) {
            -1 === (e.data.notUse || []).indexOf(t) && (e.use[t] = !0);
        }), this.picker = new t(this.data.date);
        var a = this.picker.getData(this.data.date), i = a.dataList, s = a.selected;
        this.setData({
            use: this.use,
            dataList: i
        }, function() {
            e.setData({
                selected: s
            });
        }), this._indexs = s;
    },
    methods: {
        updatePicker: function() {
            for (var t = {}, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = Array.isArray(e), i = 0, e = a ? e : e[Symbol.iterator](); ;) {
                var s;
                if (a) {
                    if (i >= e.length) break;
                    s = e[i++];
                } else {
                    if ((i = e.next()).done) break;
                    s = i.value;
                }
                var n = s, r = n.col, o = n.index, c = n.data;
                (~o && this._indexs[r] !== o || 0 === r) && (t["selected[" + r + "]"] = o, this._indexs[r] = o), 
                c && (t["dataList[" + r + "]"] = c);
            }
            this.setData(t);
        },
        updateDate: function(t) {
            var e = this, a = this.picker.getData(t), i = a.dataList, s = a.selected;
            this._indexs = s, this.setData({
                dataList: i
            }, function() {
                e.setData({
                    selected: s,
                    text: e.getFormatStr()
                });
            });
        },
        getFormatStr: function() {
            var t = this, e = new Date();
            return [ "FullYear", "Month", "Date", "Hours", "Minutes", "Seconds" ].forEach(function(a, i) {
                var s = t.data.dataList[i][t._indexs[i]];
                "Month" === a && (s = +t.data.dataList[i][t._indexs[i]] - 1), e["set" + a](+s);
            }), a(e, this.data.format);
        },
        showPicker: function() {
            this.setData({
                show: !0
            });
        },
        hidePicker: function(t) {
            var e = t.currentTarget.dataset.action;
            this.setData({
                show: !1
            }), "cancel" === e ? this.cancel({
                detail: {}
            }) : this.change({
                detail: {
                    value: this._indexs
                }
            });
        },
        columnchange: function(t) {
            var e = t.detail, a = e.column, i = e.value, s = this.picker.update(a, i);
            this.updatePicker(s);
        },
        change: function(t) {
            var e = t.detail.value, a = this.data.dataList.map(function(t, a) {
                return +t[e[a]];
            });
            this.triggerEvent("change", {
                value: a
            });
            for (var i = 0; i < e.length; i++) this._indexs[i] !== e[i] && this.columnchange({
                detail: {
                    column: i,
                    value: e[i]
                }
            });
            this.setData({
                text: this.getFormatStr()
            });
        },
        cancel: function(t) {
            this.triggerEvent("cancel", t.detail);
        }
    }
});