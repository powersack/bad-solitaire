;(function (bs, $) {
    var GUI = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'gui'});

        self._init();
    };

    GUI.prototype._init = function () {
        var self = this;
    };

    bs.GUI = GUI;
}(bs, jQuery));