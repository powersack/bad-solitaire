;(function (bs, $) {
    var Game = function (containerId) {
        var self = this;
        self.$container = $('#'+containerId);
        self.board = new bs.Board();
        self.GUI = new bs.GUI(self);
        self.gameType = null;

        self._init();
    };

    Game.prototype._init = function () {
        var self = this;
        self.$container.append(self.GUI.$topBar);
        self.$container.append(self.GUI.$menu);
        self.$container.append(self.board.$el);
    };

    Game.prototype.start = function () {
        var self = this;

    };

    Game.prototype.startKlondike = function () {
        var self = this;
        self.board.clearBoard();
        self.gameType = new bs.klondike.GameType(self);
        self.gameType.startGame();
    };

    Game.prototype.startSpider = function () {
        var self = this;
        self.board.clearBoard();
        self.gameType = new bs.spider.GameType(self);
        self.gameType.startGame();
    };

    Game.prototype.win = function () {
        var self = this;
        alert('you win ')
    };

    bs.Game = Game;
}(bs, jQuery));