;(function (bs, $) {
    var Game = function ($el) {
        var self = this;
        self.$el = $el;
        self.board = new bs.Board();
        self.GUI = new bs.GUI(self);
        self.gameType = null;


        self._init();
    };

    Game.prototype._init = function () {
        var self = this;
        self.$el.append(self.GUI.$topBar);
        self.$el.append(self.GUI.$menu);
        self.$el.append(self.board.$el);
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