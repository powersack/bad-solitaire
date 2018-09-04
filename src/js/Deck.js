;(function (bs, $) {
    var Deck = function () {
        var self = this;
        self.$el = $('<div>', {'class': 'deck'});
        self.cards = [];
        self._cardsID = 1;
        self._init();
    };

    Deck.prototype._init = function () {
        var self = this;
    };

    Deck.prototype.addCards = function (cards) {
        if(typeof cards !== "object" || !cards.hasOwnProperty('colors') || !cards.hasOwnProperty('numbers')) {
            return;
        }
        var self = this;
        var c, n;

        for(c = 0; c < cards.colors; c++){
            for(n = 0; n < cards.numbers; n++) {
                self.cards.push(bs.newCard(self._cardsID, c, n));
                self._cardsID++;
            }
        }
        return self;
    };

    Deck.prototype.shuffle = function () {
        var self = this;
        self.cards = self.cards.sort(function(){return Math.random()});
        return self;
    };
    Deck.prototype.drawCards = function (n) {
        var self = this;
        var drawnCards = [], i;
        for(i=0;i<n;i++){
            drawnCards.push(self.cards.pop());
        }
        return drawnCards;
    };

    bs.newDeck = function () {
        return new Deck();
    };
}(bs, jQuery));