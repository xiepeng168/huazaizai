Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "field-class" ],
    relations: {
        "../cell-group/index": {
            type: "parent"
        }
    },
    properties: {
        title: String,
        type: {
            type: String,
            value: "input"
        },
        disabled: Boolean,
        focus: Boolean,
        inputType: {
            type: String,
            value: "text"
        },
        placeholder: String,
        mode: {
            type: String,
            value: "normal"
        },
        right: Boolean,
        error: Boolean,
        maxlength: {
            type: Number,
            value: 140
        }
    },
    data: {
        showBorder: !0
    },
    methods: {
        handleFieldChange: function(e) {
            var t = e.detail, a = (void 0 === t ? {} : t).value, n = void 0 === a ? "" : a;
            this.setData({
                value: n
            }), this.triggerEvent("change", e);
        },
        handleFieldFocus: function(e) {
            this.triggerEvent("focus", e);
        },
        handleFieldBlur: function(e) {
            this.triggerEvent("blur", e);
        },
        updateIsLastElement: function(e) {
            var t = !0;
            e && "normal" === this.data.mode && (t = !1), this.setData({
                showBorder: t
            });
        }
    }
});