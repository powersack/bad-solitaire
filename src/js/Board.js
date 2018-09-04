;(function (bs, $) {
    var Board = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'board'});
        self.game = game;
        self.deck = bs.newDeck();
        self.slots = [];

        self._init();
    };

    Board.prototype._init = function () {
        var self = this;
    };

    Board.prototype.addDeck = function (cards) {
        var self = this;
        self.$el.append(self.deck.$el);
        self.deck.addCards(cards);
        return self;
    };

    Board.prototype.addSlots = function (n) {
        var self = this;
        var i;

        for(i=0;i<n;i++){
            var slot = bs.newSlot(i, i+1);
            self.slots.push(slot);
            self.$el.append(slot.$el);
        }
        return self;
    };

    Board.prototype.addInitialCardsToSlots = function (n) {
        var self = this;
        var i;
        self.slots.forEach(function (slot) {
            var initialCardsNumber = slot.initialCardsNumber;
            var drawnCards = self.deck.drawCards(initialCardsNumber);
            slot.addCards(drawnCards);
            slot.revealLastCard();
            slot.updateDraggable();
        });
        return self;
    };

    bs.newBoard = function (game) {
        return new Board(game);
    };
}(bs, jQuery));