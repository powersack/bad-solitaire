;(function (bs, $) {
    var Game = function (containerId) {
        var self = this;
        self.$container = $('#'+containerId);
        self.board = bs.newBoard(self);
        self.GUI = bs.newGUI(self);

        self._init();
    };

    Game.prototype._init = function () {
        var self = this;
        self.$container.append(self.board.$el);
    };

    Game.prototype.start = function () {
        var self = this;

    };

    Game.prototype.startGame = function () {
        var self = this;
        self.board.addDeck(bs.opts.cards);
        self.board.addSlots(bs.opts.slots);
        self.board.deck.shuffle();
        self.board.addInitialCardsToSlots();
    };



    bs.newGame = function (containerId) {
        return new Game(containerId);
    };
}(bs, jQuery));