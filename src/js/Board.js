;(function (bs, $) {
    var Board = function (game) {
        var self = this;
        self.$el = $('<div>', {'class': 'board'});
        self.game = game;
        self.deck = bs.newDeck();
        self.slots = [];

        self.init();
    };

    Board.prototype.init = function () {
        var self = this;
        self.$el.append(self.deck.$el);
    };

    Board.prototype.addSlots = function (n) {
        var self = this;
        var i;

        for(i=0;i<n;i++){
            var slot = bs.newSlot(i+1);
            self.slots.push(slot);
            self.$el.append(slot.$el);
        }
    };

    bs.newBoard = function (game) {
        return new Board(game);
    };
}(bs, jQuery));