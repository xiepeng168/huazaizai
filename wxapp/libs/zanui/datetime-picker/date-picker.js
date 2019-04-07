function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = require("./utils"), s = e.genNumber, i = e.iso2utc;

module.exports = function() {
    function e() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date();
        t(this, e), this.types = [ "year", "month", "day", "hour", "minute", "second" ], 
        this.months = s(1, 12, 2), this.hours = s(0, 23, 2), this.seconds = s(0, 59, 2), 
        this.minutes = s(0, 59, 2), this._date = i;
    }
    return e.prototype.getYears = function(t) {
        var e = Math.floor(25);
        return s(t - e, t + (50 - e), 4);
    }, e.prototype.lastDay = function(t, e) {
        return 12 !== e ? new Date(new Date(t + "/" + (e + 1) + "/1").getTime() - 864e5).getDate() : 31;
    }, e.prototype.getData = function(t) {
        "string" == typeof (t = t || this._date || new Date()) && t.indexOf("-") > 0 && (t = i(t));
        var e = new Date(t), a = e.getFullYear(), n = e.getMonth() + 1, h = this.getYears(a), r = this.lastDay(a, n), o = s(1, r, 2);
        return this._years = h, this._dataList = [ h, this.months, o, this.hours, this.minutes, this.seconds ], 
        this._indexs = [ 25, n - 1, e.getDate() - 1, e.getHours(), e.getMinutes(), e.getSeconds() ], 
        {
            dataList: this._dataList,
            selected: this._indexs
        };
    }, e.prototype.update = function(t, e) {
        switch (this.types[t]) {
          case "year":
            return this._updateYear(t, e);

          case "month":
            return this._updateMonth(t, e);

          default:
            return this._indexs[t] = e, [ {
                col: t,
                index: e
            } ];
        }
    }, e.prototype._updateYear = function(t, e, s) {
        var i = this._dataList[t][e];
        return this._dataList[t] = this.getYears(+i), this._indexs[t] = Math.floor(25), 
        [ {
            col: 0,
            index: this._indexs[t],
            data: this._dataList[t]
        } ];
    }, e.prototype._updateMonth = function(t, e) {
        var i = this._dataList[t][e], a = this._dataList[0][this._indexs[0]], n = this.lastDay(+a, +i);
        return this._indexs[t] = e, this._dataList[2] = s(1, n, 2), this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2], 
        [ {
            col: 1,
            index: e
        }, {
            col: 2,
            index: this._indexs[2],
            data: this._dataList[2]
        } ];
    }, e;
}();