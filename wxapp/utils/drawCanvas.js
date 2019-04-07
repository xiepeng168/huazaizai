Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    canvasId: null,
    canvasWidth: null,
    canvasHeight: null,
    ctx: null,
    init: function(t) {
        return t instanceof Object ? (this.canvasId = t.canvasId, !!this.canvasId && (this.ctx = wx.createCanvasContext(this.canvasId), 
        this.canvasWidth = t.width || 320, this.canvasHeight = t.height || 150, this.ctx)) : void console.warn([].slice.call(arguments) + "无效参数");
    },
    drawCanvasBg: function() {
        var t = this.ctx, e = [].slice.call(arguments), i = e[0] ? e[0] : 0, a = e[1] ? e[1] : 0, n = e[2] ? e[2] : this.canvasWidth, s = e[3] ? e[3] : this.canvasHeight, r = e[4] ? e[4] : "#666666";
        t.save(), t.setFillStyle(r), t.fillRect(i, a, n, s), t.restore();
    },
    drawImage: function(t, e, i, a, n) {
        var s = this.ctx;
        s.save(), s.drawImage(t, e, i, a, n), s.restore();
    },
    imgClip: function(t) {
        var e = this.ctx, i = t.r || 40, a = t.x || i, n = t.y || i, s = t.lineWidth || 1, r = t.lineColor || "#000000", l = t.src;
        e.save(), e.beginPath(), e.arc(a, n, i, 0, 2 * Math.PI), e.setStrokeStyle(r), e.setLineWidth(s), 
        e.stroke(), e.clip(), e.drawImage(l, a - i + .25 * s, n - i - .25 * s, 2 * i + s, 2 * i + s), 
        e.restore();
    },
    drawText: function(t, e) {
        var i = this.ctx, a = {
            x: 0,
            y: 0,
            textAlign: "left",
            baseLine: "top",
            fontSize: "16",
            color: "#333",
            lineHeight: 1,
            direction: "horizontal",
            max: 100,
            textIndent: 0,
            wordBreak: !1
        };
        t = t || "测试文字", e || (e = a);
        for (var n in a) e.hasOwnProperty(n) || (e[n] = a[n]);
        if (i.save(), i.setFillStyle(e.color), i.setFontSize(e.fontSize), i.setTextAlign(e.textAlign), 
        i.setTextBaseline(e.baseLine), "horizontal" != e.direction || 0 != e.wordBreak) {
            if (1 == e.wordBreak) {
                if ("horizontal" == e.direction) {
                    for (var s = 0, r = 0, l = e.fontSize - 0 + e.lineHeight, o = e.y, c = 0; c < t.length; c++) {
                        var h = 0 == r ? e.x + e.textIndent : e.x;
                        (s += i.measureText(t[c]).width) + h > e.max && (i.fillText(t.substring(r, c), h, o), 
                        o += l, s = 0, r = c), c == t.length - 1 && i.fillText(t.substring(r, c + 1), h, o);
                    }
                    return;
                }
                if ("vertical" == e.direction) for (var x = 0, d = 0, v = e.x, f = e.y, g = 0; g < t.length; g++) x += i.measureText(t[0]).width + 4, 
                i.fillText(t[g], v + d, f + x), x > e.max && (f = e.y, x = 0, d += e.fontSize - 0 + e.lineHeight);
            }
            i.restore();
        } else i.fillText(t, e.x, e.y);
    },
    saveCanvasToImage: function(t) {
        wx.canvasToTempFilePath(t, this);
    },
    draw: function() {
        this.ctx.draw();
    }
};

exports.drawCanvas = t;