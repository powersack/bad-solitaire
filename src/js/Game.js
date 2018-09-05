;(function (bs, $) {
    var Game = function (containerId) {
        var self = this;
        self.$container = $('#'+containerId);
        self.board = new bs.Board(self);
        self.GUI = new bs.GUI(self);

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
        self.board.addDrawSlot();
        self.board.addFinalSlots(bs.opts.cards.colors);
        self.board.addSlots(bs.opts.slots);
        self.board.deck.shuffle();
        self.board.addInitialCardsToSlots();
    };



    bs.Game = Game;
}(bs, jQuery));