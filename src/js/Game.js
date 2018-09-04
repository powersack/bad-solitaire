;(function (bs, $) {
    var Game = function (containerId) {
        var self = this;
        self.$container = $('#'+containerId);
        self.board = bs.newBoard(self);
        self.GUI = bs.newGUI(self);

        self.init();
    };

    Game.prototype.init = function () {
        var self = this;
        self.$container.append(self.board.$el);
    };

    Game.prototype.start = function () {
        var self = this;
        self.board.addSlots(7);
    };



    bs.newGame = function (containerId) {
        return new Game(containerId);
    };
}(bs, jQuery));