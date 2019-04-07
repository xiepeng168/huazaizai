var e;

Component({
    relations: (e = {}, e["../cell/index"] = {
        type: "child",
        linked: function() {
            this._updateIsLastElement("../cell/index");
        },
        linkChanged: function() {
            this._updateIsLastElement("../cell/index");
        },
        unlinked: function() {
            this._updateIsLastElement("../cell/index");
        }
    }, e["../field/index"] = {
        type: "child",
        linked: function() {
            this._updateIsLastElement("../field/index");
        },
        linkChanged: function() {
            this._updateIsLastElement("../field/index");
        },
        unlinked: function() {
            this._updateIsLastElement("../field/index");
        }
    }, e),
    data: {
        elementUpdateTimeout: 0
    },
    methods: {
        _updateIsLastElement: function(e) {
            var t = this;
            if (!(this.data.elementUpdateTimeout > 0)) {
                var n = setTimeout(function() {
                    t.setData({
                        elementUpdateTimeout: 0
                    });
                    var n = t.getRelationNodes(e);
                    if (n.length > 0) {
                        var i = n.length - 1;
                        n.forEach(function(e, t) {
                            e.updateIsLastElement(t === i);
                        });
                    }
                });
                this.setData({
                    elementUpdateTimeout: n
                });
            }
        }
    }
});