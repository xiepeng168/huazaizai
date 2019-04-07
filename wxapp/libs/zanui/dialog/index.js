var t = function() {};

Component({
    properties: {},
    data: {
        title: "",
        buttons: [],
        message: " ",
        selector: "#zan-dialog",
        buttonsShowVertical: !1,
        showConfirmButton: !0,
        confirmButtonText: "确定",
        confirmButtonColor: "#3CC51F",
        showCancelButton: !1,
        cancelButtonText: "取消",
        cancelButtonColor: "#333",
        key: "",
        show: !1,
        showCustomBtns: !1,
        promiseFunc: {}
    },
    methods: {
        handleButtonClick: function(o) {
            var e = o.currentTarget, n = (void 0 === e ? {} : e).dataset, s = void 0 === n ? {} : n, a = this.data.promiseFunc || {}, i = a.resolve, c = void 0 === i ? t : i, r = a.reject, u = void 0 === r ? t : r;
            this.setData({
                show: !1
            }), this.data.showCustomBtns ? c({
                type: s.type
            }) : "confirm" === s.type ? c({
                type: "confirm"
            }) : u({
                type: "cancel"
            });
        }
    }
});