;(function (bs, $) {
    var Deck = function () {
        var self = this;
        self.$el = $('<div>', {'class': 'deck'});
        self.cards = [];
        self.init();
    };

    Deck.prototype.init = function () {
        var self = this;
        var c, n;
        for(c = 0; c < bs.opts.cards.colors; c++){
            for(n = 0; n < bs.opts.cards.numbers; n++) {
                self.cards.push(bs.newCard(c, n));
            }
        }
    };

    Deck.prototype.shuffle = function () {
        var self = this;
        self.cards = self.cards.sort(function(){return Math.random()});
        return self.cards;
    };

    bs.newDeck = function () {
        return new Deck();
    };
}(bs, jQuery));