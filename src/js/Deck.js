;(function (bs, $) {
    var Deck = function () {
        var self = this;
        bs.Slot.call(self, -1, 0);
        self.$el = $('<div>', {'class': 'deck'});
        self._cardsID = 1;
        self._init();
    };

    Deck.prototype = Object.create(bs.Slot.prototype);
    Deck.prototype.constructor = Deck;


    Deck.prototype._init = function () {
        var self = this;
    };

    Deck.prototype.createCards = function (cards) {
        if(typeof cards !== "object" || !cards.hasOwnProperty('colors') || !cards.hasOwnProperty('numbers')) {
            return;
        }
        var self = this;
        var c, n;

        for(c = 0; c < cards.colors; c++){
            for(n = 0; n < cards.numbers; n++) {
                self.cards.push(new bs.Card(self._cardsID, c, n));
                self._cardsID++;
            }
        }
        self.$el.removeClass('deck-empty');
        return self;
    };

    Deck.prototype.shuffle = function () {
        var self = this;
        self.cards = bs.Helpers.shuffleArray(self.cards);
        return self;
    };

    Deck.prototype.drawCards = function (n) {
        var self = this;
        var drawnCards = [], i;
        if(n > self.cards.length) n = self.cards.length;
        for(i=0;i<n;i++){
            drawnCards.push(self.cards.pop());
        }
        if(!self.cards.length) self.$el.addClass('deck-empty');
        return drawnCards;
    };
    //
    // Deck.prototype.addCards = function (cards) {
    //     var self = this;
    //     self.cards = self.cards.concat(cards);
    //
    //     cards.forEach(function (card) {
    //         if(card.slot){
    //             card.slot.removeCard(card);
    //         }
    //         card.$el.remove();
    //     });
    //     return self;
    // };

    bs.Deck = Deck;
}(bs, jQuery));