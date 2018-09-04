;(function (bs, $) {
    var GUI = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'gui'});
        self.game = game;

        self.init();
    };

    GUI.prototype.init = function () {
        var self = this;
    };

    bs.newGUI = function (game) {
        return new GUI(game);
    };
}(bs, jQuery));