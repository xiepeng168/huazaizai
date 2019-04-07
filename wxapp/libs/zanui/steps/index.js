Component({
    externalClasses: [ "steps-class", "icon-class", "title-class", "desc-class" ],
    properties: {
        type: {
            type: String,
            value: "horizon"
        },
        hasDesc: {
            type: Boolean,
            value: !1
        },
        steps: {
            type: Array,
            value: []
        },
        className: String
    }
});